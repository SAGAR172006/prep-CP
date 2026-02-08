# Next Steps Checklist

This document outlines the immediate next steps to continue development of CodeMaster.

## ✅ What's Already Done

- [x] Next.js 16.1.6 project initialized
- [x] Tailwind CSS + Framer Motion configured
- [x] Prisma schema created (11 models)
- [x] Landing page with animations
- [x] Login/Signup pages
- [x] Monaco Editor with **CRITICAL paste blocking**
- [x] Problem page with split layout
- [x] Home page with course grid
- [x] NextAuth.js configuration
- [x] API routes for auth and problems
- [x] Comprehensive documentation

## 🎯 Phase 5: Database & Seed Data (NEXT)

### Step 1: Set Up PostgreSQL Database

#### Option A: Railway (Recommended for Development)
1. [ ] Go to https://railway.app
2. [ ] Create new project
3. [ ] Add PostgreSQL service
4. [ ] Copy `DATABASE_URL` from dashboard
5. [ ] Add to `.env` file:
   ```env
   DATABASE_URL="postgresql://..."
   ```

#### Option B: Supabase (Alternative)
1. [ ] Go to https://supabase.com
2. [ ] Create new project
3. [ ] Get connection string from Settings → Database
4. [ ] Add to `.env` file

### Step 2: Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Verify with Prisma Studio
npm run db:studio
```

### Step 3: Create Seed Script

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample problems
  const problems = [
    {
      title: 'Two Sum',
      slug: 'two-sum',
      description: 'Given an array of integers nums and an integer target...',
      difficulty: 'Easy',
      topic: 'Arrays',
      category: 'Beginner',
      points: 10,
      minSolveTime: 60,
      templatePython: 'def twoSum(nums, target):\n    # Write your code here\n    pass',
      templateJava: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n    }\n}',
      // Add more templates...
      testCases: {
        create: [
          {
            input: '[2,7,11,15], 9',
            output: '[0,1]',
            isHidden: false,
          },
          // Add more test cases...
        ],
      },
    },
    // Add 99+ more problems...
  ];

  for (const problem of problems) {
    await prisma.problem.create({ data: problem });
  }

  console.log('✅ Seeded 100+ problems');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:
```json
{
  "scripts": {
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

Install tsx:
```bash
npm install -D tsx
```

Run seed:
```bash
npm run db:seed
```

### Step 4: Configure OAuth Providers

#### Google OAuth
1. [ ] Go to https://console.cloud.google.com
2. [ ] Create new project
3. [ ] Enable Google+ API
4. [ ] Create OAuth 2.0 Client ID
5. [ ] Add redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.vercel.app/api/auth/callback/google`
6. [ ] Copy Client ID and Secret to `.env`:
   ```env
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   ```

#### GitHub OAuth
1. [ ] Go to GitHub Settings → Developer settings → OAuth Apps
2. [ ] Create new OAuth App
3. [ ] Set callback URL: `http://localhost:3000/api/auth/callback/github`
4. [ ] Copy Client ID and Secret to `.env`:
   ```env
   GITHUB_CLIENT_ID="..."
   GITHUB_CLIENT_SECRET="..."
   ```

### Step 5: Set NextAuth Secret

```bash
# Generate secret
openssl rand -base64 32

# Add to .env
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 6: Test Everything

```bash
# Start Docker services
npm run docker:up

# Start dev server
npm run dev

# Test:
# 1. Visit http://localhost:3000
# 2. Click Sign Up → Try email signup
# 3. Try Google OAuth login
# 4. Visit /home to see courses
# 5. Visit /problems/two-sum to test editor
# 6. Verify paste is disabled in editor
```

---

## 🎯 Phase 6: Code Execution Engine (AFTER PHASE 5)

### Step 1: Choose Execution Method

#### Option A: Judge0 API (Easier)
1. [ ] Sign up at https://rapidapi.com
2. [ ] Subscribe to Judge0 CE API
3. [ ] Copy API key to `.env`:
   ```env
   JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
   JUDGE0_API_KEY="..."
   ```

#### Option B: Self-Hosted (Advanced)
1. [ ] Clone https://github.com/judge0/judge0
2. [ ] Deploy with Docker
3. [ ] Configure URL in `.env`

### Step 2: Create Execution API

Create `src/app/api/code/execute/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { code, language, problemId } = await request.json();
  
  // Get language ID for Judge0
  const languageIds = {
    python: 71,
    javascript: 63,
    java: 62,
    cpp: 54,
  };
  
  // Submit to Judge0
  const response = await fetch(`${process.env.JUDGE0_API_URL}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    body: JSON.stringify({
      source_code: code,
      language_id: languageIds[language],
      stdin: '', // Add test case input
      expected_output: '', // Add expected output
    }),
  });
  
  const { token } = await response.json();
  
  // Poll for result
  let result;
  while (true) {
    const resultResponse = await fetch(
      `${process.env.JUDGE0_API_URL}/submissions/${token}`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );
    
    result = await resultResponse.json();
    
    if (result.status.id > 2) break;
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  
  return NextResponse.json({
    status: result.status.description,
    output: result.stdout,
    error: result.stderr,
    executionTime: result.time,
    memory: result.memory,
  });
}
```

### Step 3: Integrate with Problem Page

Update `src/app/problems/[slug]/page.tsx`:

```typescript
const handleRun = async () => {
  setIsRunning(true);
  
  const response = await fetch('/api/code/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      language,
      problemId: 'two-sum',
    }),
  });
  
  const result = await response.json();
  setOutput(result.output || result.error);
  setIsRunning(false);
};
```

---

## 📝 Important Reminders

### Security
- [ ] Never commit `.env` file
- [ ] Keep `NEXTAUTH_SECRET` secure
- [ ] Don't expose OAuth secrets
- [ ] Verify paste is still disabled after any editor changes

### Performance
- [ ] Monitor build times
- [ ] Check bundle size
- [ ] Test on mobile devices
- [ ] Verify 60 FPS animations

### Testing
- [ ] Test all OAuth providers
- [ ] Verify database operations
- [ ] Test code editor anti-cheat
- [ ] Check responsive design

---

## 🐛 Common Issues & Solutions

### Issue: Database connection fails
**Solution:** Check `DATABASE_URL` format, ensure PostgreSQL is running

### Issue: OAuth redirect fails
**Solution:** Verify redirect URIs match exactly in OAuth provider settings

### Issue: Build fails
**Solution:** Clear `.next` folder, reinstall `node_modules`, try again

### Issue: Paste still works in editor
**Solution:** Check browser console for errors, verify event listeners are attached

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Judge0 Docs](https://ce.judge0.com)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

## 🎓 Learning Path

If you're new to any technology:

1. **Next.js 16:** Watch [Next.js Tutorial](https://nextjs.org/learn)
2. **Prisma:** Read [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
3. **TypeScript:** Complete [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
4. **Tailwind:** Follow [Tailwind Tutorial](https://tailwindcss.com/docs/installation)

---

## ✅ Before Moving to Phase 7

Ensure all of these work:
- [ ] Database is seeded with 100+ problems
- [ ] User can sign up and log in
- [ ] OAuth (Google & GitHub) works
- [ ] Problems display correctly
- [ ] Code editor works (with paste disabled)
- [ ] Code execution works for all languages
- [ ] Test cases validate correctly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Build passes

---

**Good luck with Phase 5! 🚀**

If you get stuck, refer to:
- `QUICKSTART.md` for setup
- `DEPLOYMENT.md` for deployment
- `ROADMAP.md` for full plan
- `IMPLEMENTATION_SUMMARY.md` for what's done
