# 🚀 Quick Start Guide

Get your coding platform running in under 5 minutes!

---

## ⚡ Fast Track Setup

### Step 1: Install Dependencies (1 minute)
```bash
npm install
```

### Step 2: Configure Environment (2 minutes)
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add at minimum these REQUIRED variables:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXTAUTH_URL=http://localhost:3000
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
```

### Step 3: Start Development Server (30 seconds)
```bash
npm run dev
```

Visit `http://localhost:3000` - You should see the landing page! 🎉

---

## 🏗️ Build & Verify

### Type Check
```bash
npm run type-check
```
Expected: ✓ No TypeScript errors

### Lint Code
```bash
npm run lint
```
Expected: ✓ Passes with warnings only

### Production Build
```bash
npm run build
```
Expected: ✓ Successfully builds 5 routes

### Security Audit
```bash
npm audit
```
Expected: ✓ 0 vulnerabilities

---

## 🔧 Essential Services Setup

### Priority 1: Supabase (REQUIRED)
1. Go to [https://supabase.com](https://supabase.com)
2. Create new project (free tier)
3. Copy Project URL and Anon Key from Settings → API
4. Add to `.env`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
5. Run database migrations from `DATABASE_SCHEMA.md`

**Setup time**: ~10 minutes

### Priority 2: NextAuth (REQUIRED)
```bash
# Generate secret
openssl rand -base64 32

# Add to .env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<paste_generated_secret_here>
```

**Setup time**: ~2 minutes

### Priority 3: OAuth Providers (Recommended)

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 Client ID
3. Authorized redirect: `http://localhost:3000/api/auth/callback/google`
4. Add credentials to `.env`

#### GitHub OAuth
1. Go to [GitHub Settings → Developer Settings](https://github.com/settings/developers)
2. Create OAuth App
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to `.env`

**Setup time**: ~5 minutes each

---

## 🎯 Optional Services (Can Skip Initially)

All other services in `.env.example` are optional and can be configured later:
- Hugging Face AI
- Google Gemini
- Ollama (local AI)
- Upstash Redis
- Cloudinary
- Resend Email
- Razorpay Payments
- Sentry Monitoring
- PostHog Analytics

The app will work without these - they're for production features.

---

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Change port
npm run dev -- -p 3001

# Or kill existing process
lsof -ti:3000 | xargs kill
```

### Build fails with memory error
```bash
export NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

### TypeScript errors after install
```bash
npm run type-check
# If errors persist, check tsconfig.json is present
```

---

## 📚 Next Steps

### Immediate (Do these first)
1. ✅ Set up Supabase database
2. ✅ Configure NextAuth
3. ✅ Test local development server
4. ✅ Review landing page at `localhost:3000`

### Short-term (Within first week)
1. 📖 Read `POST_MERGE_GUIDE.md` for feature development roadmap
2. 🗄️ Complete database setup from `DATABASE_SCHEMA.md`
3. 🔐 Set up OAuth providers (Google/GitHub)
4. 🎨 Start building UI components

### Long-term (Production)
1. 📊 Set up monitoring (Sentry, PostHog)
2. 🤖 Configure AI services (Hugging Face, Gemini, Ollama)
3. 💳 Set up payment processing (Razorpay)
4. 🚀 Deploy to Vercel (see `DEPLOYMENT.md`)

---

## 📦 Project Structure

```
prep-CP/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── api/               # API routes
│   │       ├── ai/chat/
│   │       ├── code-execution/execute/
│   │       └── payment/create-order/
│   ├── lib/                   # Service integrations
│   │   ├── supabase.ts
│   │   ├── ai.ts
│   │   ├── piston.ts
│   │   ├── redis.ts
│   │   └── ...
│   └── utils/
│       └── helpers.ts         # Utility functions
├── .env.example               # Environment template
├── package.json               # Dependencies
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── tsconfig.json             # TypeScript config
```

---

## 💰 Cost Breakdown

### Development
- **Total cost**: $0/month
- All services have generous free tiers
- No credit card required for initial setup

### Production (Free Tier Limits)
- Supabase: 500MB database, 2GB bandwidth
- Vercel: Unlimited personal projects
- Upstash Redis: 10,000 commands/day
- Hugging Face: 30,000 AI requests/month
- Can support **1000+ users** at zero cost

---

## 🎉 Success Checklist

Before you start developing features:

- [ ] Dependencies installed successfully
- [ ] `.env` file configured with essential services
- [ ] `npm run dev` starts without errors
- [ ] Landing page loads at `localhost:3000`
- [ ] `npm run build` completes successfully
- [ ] `npm run type-check` passes
- [ ] Supabase database tables created
- [ ] NextAuth configured
- [ ] Read `POST_MERGE_GUIDE.md`

---

## 🆘 Need Help?

- 📖 Check `POST_MERGE_GUIDE.md` for detailed development guide
- 🔧 Check `SETUP_GUIDE.md` for service-specific setup
- 🗄️ Check `DATABASE_SCHEMA.md` for database structure
- 🚀 Check `DEPLOYMENT.md` for deployment instructions
- 🛡️ Check `SECURITY_UPDATE.md` for security best practices

---

**Ready to build?** Start with `npm run dev` and happy coding! 🚀
