# 🎯 Post-Merge Development Guide

**Congratulations on merging your PR!** Your coding platform now has a complete foundation with Next.js, backend APIs, database schema, and all integrations set up. This guide will walk you through the next steps to continue development effectively.

---

## 📋 Table of Contents

1. [Quick Start Checklist](#-quick-start-checklist)
2. [Environment Setup](#-environment-setup)
3. [Running the Project Locally](#-running-the-project-locally)
4. [Testing Initial Setup](#-testing-initial-setup)
5. [Feature Development Roadmap](#-feature-development-roadmap)
6. [Priority Matrix](#-priority-matrix)
7. [Development Workflow](#-development-workflow)
8. [Best Practices](#-best-practices)
9. [Troubleshooting](#-troubleshooting)
10. [Next Steps](#-next-steps)

---

## ✅ Quick Start Checklist

Complete these steps in order to get your development environment ready:

### Phase 1: Environment Setup (30-60 minutes)
- [ ] Pull latest changes from main branch: `git pull origin main`
- [ ] Install Node.js dependencies: `npm install`
- [ ] Copy environment file: `cp .env.example .env`
- [ ] Set up required services (see [Environment Setup](#-environment-setup))
- [ ] Configure at least the essential services (Supabase, NextAuth)
- [ ] Generate NextAuth secret: `openssl rand -base64 32`

### Phase 2: Database Setup (15-30 minutes)
- [ ] Create Supabase project
- [ ] Run database migrations (see `DATABASE_SCHEMA.md`)
- [ ] Verify tables are created correctly
- [ ] Test database connection

### Phase 3: Local Development (10 minutes)
- [ ] Start development server: `npm run dev`
- [ ] Open browser to `http://localhost:3000`
- [ ] Verify landing page loads
- [ ] Test authentication flow

### Phase 4: Code Verification (15 minutes)
- [ ] Run type checking: `npm run type-check`
- [ ] Run linter: `npm run lint`
- [ ] Fix any errors that appear
- [ ] Ensure build succeeds: `npm run build`

---

## 🔧 Environment Setup

### Essential Services (Required for Basic Functionality)

#### 1. Supabase (Database + Auth + Storage)
**Priority: CRITICAL** - Required for app to function

```bash
# Steps:
# 1. Go to https://supabase.com and create account
# 2. Create new project
# 3. Get credentials from Settings → API
# 4. Add to .env:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# 5. Run database migrations from DATABASE_SCHEMA.md
```

**Setup Time:** 15 minutes  
**Documentation:** See `SETUP_GUIDE.md` lines 12-28

#### 2. NextAuth (Authentication)
**Priority: CRITICAL** - Required for user login

```bash
# Generate secret:
openssl rand -base64 32

# Add to .env:
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your_generated_secret>
```

**Setup Time:** 2 minutes

#### 3. OAuth Providers (Google/GitHub)
**Priority: HIGH** - Required for social login

**Google OAuth:**
```bash
# 1. Go to https://console.cloud.google.com
# 2. Create project → APIs & Services → Credentials
# 3. Create OAuth 2.0 Client ID
# 4. Authorized redirect: http://localhost:3000/api/auth/callback/google
# 5. Add to .env:
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

**GitHub OAuth:**
```bash
# 1. Go to https://github.com/settings/developers
# 2. New OAuth App
# 3. Callback: http://localhost:3000/api/auth/callback/github
# 4. Add to .env:
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

**Setup Time:** 10 minutes each  
**Documentation:** See `SETUP_GUIDE.md` lines 183-208

### Optional Services (Can Add Later)

#### 4. AI Services (Ollama/HuggingFace/Gemini)
**Priority: MEDIUM** - For AI-powered features

**Ollama (Recommended for Development):**
```bash
# Install locally for unlimited free usage
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3
ollama serve

# Add to .env:
OLLAMA_HOST=http://localhost:11434
```

**HuggingFace:**
```bash
# 1. Sign up at https://huggingface.co
# 2. Create access token
# 3. Add to .env:
HUGGINGFACE_API_KEY=hf_xxxxx
```

**Google Gemini:**
```bash
# 1. Get API key from https://makersuite.google.com/app/apikey
# 2. Add to .env:
GOOGLE_GEMINI_API_KEY=xxxxx
```

**Setup Time:** 20-30 minutes  
**When to set up:** When implementing AI chat, code explanations, or hint features

#### 5. Piston API (Code Execution)
**Priority: MEDIUM** - For code running features

```bash
# Option A - Use public API (easiest):
PISTON_API_URL=https://emkc.org/api/v2/piston

# Option B - Self-host (recommended for production):
git clone https://github.com/engineer-man/piston.git
cd piston
docker-compose up -d
# Then set: PISTON_API_URL=http://localhost:2000/api/v2/piston
```

**Setup Time:** 5 minutes (public) or 30 minutes (self-hosted)  
**When to set up:** When implementing problem solving and code testing features

#### 6. Upstash Redis (Caching)
**Priority: LOW** - For performance optimization

```bash
# 1. Sign up at https://upstash.com
# 2. Create Redis database
# 3. Add to .env:
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx
```

**Setup Time:** 10 minutes  
**When to set up:** When optimizing performance or implementing rate limiting

#### 7. Cloudinary (File Storage)
**Priority: LOW** - For user uploads

```bash
# 1. Sign up at https://cloudinary.com
# 2. Get credentials from dashboard
# 3. Create upload preset "prep-cp"
# 4. Add to .env:
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Setup Time:** 10 minutes  
**When to set up:** When implementing avatar uploads or file sharing

#### 8. Resend (Email Service)
**Priority: LOW** - For email notifications

```bash
# 1. Sign up at https://resend.com
# 2. Verify domain or use testing domain
# 3. Create API key
# 4. Add to .env:
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

**Setup Time:** 15 minutes  
**When to set up:** When implementing email notifications or password reset

#### 9. Monitoring Services (Sentry + PostHog)
**Priority: LOW** - For production monitoring

**Sentry (Error Tracking):**
```bash
# 1. Sign up at https://sentry.io
# 2. Create Next.js project
# 3. Add to .env:
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

**PostHog (Analytics):**
```bash
# 1. Sign up at https://posthog.com
# 2. Create project
# 3. Add to .env:
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Setup Time:** 20 minutes total  
**When to set up:** Before deploying to production

---

## 🚀 Running the Project Locally

### First Time Setup

```bash
# 1. Clone and navigate to repo (if not already)
cd /path/to/prep-CP

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. Run type check to verify setup
npm run type-check

# 5. Start development server
npm run dev
```

### Daily Development Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Development Server Details

- **URL:** http://localhost:3000
- **Hot Reload:** Enabled (changes reflect automatically)
- **Fast Refresh:** React Fast Refresh enabled for instant updates
- **API Routes:** Available at http://localhost:3000/api/*

---

## 🧪 Testing Initial Setup

### Step 1: Verify Landing Page

```bash
# 1. Start dev server
npm run dev

# 2. Open http://localhost:3000
# ✅ Should see: Landing page with hero section
# ✅ Should see: Sign Up/Login buttons
# ✅ Should see: App description
```

### Step 2: Test Authentication

```bash
# 1. Click "Sign Up" or "Login"
# 2. Try OAuth providers (Google/GitHub)
# ✅ Should redirect to provider
# ✅ Should redirect back after auth
# ✅ Should show user info/session

# 3. Try email/password (if implemented)
# ✅ Should validate form
# ✅ Should create user
# ✅ Should redirect to home
```

### Step 3: Verify Database Connection

```bash
# 1. Check Supabase dashboard
# ✅ Should see: users table created
# ✅ Should see: New user after signup

# 2. Test data persistence
# - Sign up
# - Log out
# - Log in again
# ✅ Should maintain user data
```

### Step 4: Check API Routes

```bash
# Test AI endpoint (if configured)
curl http://localhost:3000/api/ai/chat \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'

# ✅ Should return: AI response

# Test code execution (if configured)
curl http://localhost:3000/api/code-execution/execute \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"language":"python","code":"print(\"Hello\")"}'

# ✅ Should return: Execution result
```

### Step 5: Run Build Test

```bash
# Ensure production build works
npm run build

# ✅ Should complete without errors
# ✅ Should generate .next directory
# ✅ Should show bundle size info
```

### Common Issues to Check

- [ ] All environment variables are set correctly
- [ ] Database tables are created
- [ ] Authentication providers are configured
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No ESLint errors: `npm run lint`
- [ ] Build succeeds: `npm run build`

---

## 🗺️ Feature Development Roadmap

Now that your foundation is complete, here's a recommended order for implementing features. This roadmap is organized by dependency chains and user value.

### Phase 1: Core User Experience (Week 1-2)

#### 1.1 User Profile & Settings (2-3 days)
**Why first:** Foundation for all user-specific features

**Tasks:**
- [ ] Create profile page UI (`src/app/profile/page.tsx`)
- [ ] Implement profile editing functionality
- [ ] Add avatar upload integration (Cloudinary)
- [ ] Create settings page for preferences
- [ ] Add theme toggle (dark/light mode)
- [ ] Implement language preference settings

**Files to create:**
- `src/app/profile/page.tsx`
- `src/app/settings/page.tsx`
- `src/components/profile/ProfileCard.tsx`
- `src/components/profile/AvatarUpload.tsx`
- `src/components/settings/ThemeToggle.tsx`

**Testing:**
- [ ] User can view their profile
- [ ] User can edit profile information
- [ ] Avatar uploads successfully
- [ ] Settings persist after page reload

#### 1.2 Problem Browsing & Display (3-4 days)
**Why second:** Core functionality users need immediately

**Tasks:**
- [ ] Create problems list page with filters
- [ ] Implement problem difficulty badges
- [ ] Add search functionality
- [ ] Create problem detail page
- [ ] Display problem statement and examples
- [ ] Show test cases (sample only)

**Files to create:**
- `src/app/problems/page.tsx`
- `src/app/problems/[id]/page.tsx`
- `src/components/problems/ProblemCard.tsx`
- `src/components/problems/ProblemList.tsx`
- `src/components/problems/ProblemDetail.tsx`
- `src/components/problems/DifficultyBadge.tsx`

**API routes:**
- `src/app/api/problems/list/route.ts`
- `src/app/api/problems/[id]/route.ts`

**Testing:**
- [ ] Problems list displays correctly
- [ ] Filtering works properly
- [ ] Search returns relevant results
- [ ] Problem details show correctly

#### 1.3 Code Editor Integration (2-3 days)
**Why third:** Essential for problem solving

**Tasks:**
- [ ] Integrate Monaco Editor
- [ ] Add language selection dropdown
- [ ] Implement code templates for each language
- [ ] Add theme support (light/dark)
- [ ] Implement anti-cheat measures (paste blocking)
- [ ] Add keyboard shortcuts

**Files to create:**
- `src/components/editor/CodeEditor.tsx`
- `src/components/editor/LanguageSelector.tsx`
- `src/components/editor/EditorToolbar.tsx`
- `src/lib/editor-config.ts`

**Testing:**
- [ ] Editor loads properly
- [ ] Language switching works
- [ ] Code templates load correctly
- [ ] Anti-cheat features are active
- [ ] Syntax highlighting works

### Phase 2: Core Functionality (Week 2-3)

#### 2.1 Code Execution & Testing (3-4 days)
**Why first in Phase 2:** Makes the platform functional

**Tasks:**
- [ ] Implement code submission handler
- [ ] Integrate with Piston API
- [ ] Add test case execution
- [ ] Create results display component
- [ ] Show execution time and memory usage
- [ ] Handle compilation errors gracefully
- [ ] Add loading states and animations

**Files to create:**
- `src/app/api/problems/[id]/submit/route.ts`
- `src/components/problems/SubmissionResult.tsx`
- `src/components/problems/TestCaseResults.tsx`
- `src/lib/code-executor.ts`

**Testing:**
- [ ] Code executes successfully
- [ ] Test cases pass/fail correctly
- [ ] Errors are displayed properly
- [ ] Results show execution stats
- [ ] Loading states work

#### 2.2 Submission History (2 days)
**Why second:** Allows users to track progress

**Tasks:**
- [ ] Create submissions table UI
- [ ] Show submission status (Accepted, Wrong Answer, etc.)
- [ ] Add filtering by problem/language
- [ ] Display submission details
- [ ] Allow viewing previous code

**Files to create:**
- `src/app/submissions/page.tsx`
- `src/components/submissions/SubmissionTable.tsx`
- `src/components/submissions/SubmissionDetail.tsx`
- `src/app/api/submissions/route.ts`

**Testing:**
- [ ] Submissions list displays
- [ ] Filtering works correctly
- [ ] Can view past submissions
- [ ] Status displays properly

### Phase 3: Gamification System (Week 3-4)

#### 3.1 Points & Scoring System (2-3 days)
**Why first in Phase 3:** Foundation for gamification

**Tasks:**
- [ ] Implement points calculation algorithm
- [ ] Award points on successful submissions
- [ ] Create points display component
- [ ] Show points history
- [ ] Add anti-cheat detection (fast solve penalties)

**Files to create:**
- `src/lib/points-calculator.ts`
- `src/components/gamification/PointsDisplay.tsx`
- `src/components/gamification/PointsHistory.tsx`
- `src/app/api/points/award/route.ts`

**Algorithm (from memories):**
```typescript
// Base: 10 points
// -1 per attempt after first
// -2 if too fast (anti-cheat)
// Minimum: 5 points
```

**Testing:**
- [ ] Points awarded correctly
- [ ] Anti-cheat detection works
- [ ] Points display updates
- [ ] History tracks accurately

#### 3.2 League System (2-3 days)
**Why second:** Major engagement driver

**Tasks:**
- [ ] Implement league tiers (Bronze → Grandmaster)
- [ ] Create league badge components
- [ ] Add league progression logic
- [ ] Display current league on profile
- [ ] Show league requirements
- [ ] Implement season system

**Files to create:**
- `src/components/gamification/LeagueBadge.tsx`
- `src/components/gamification/LeagueProgress.tsx`
- `src/lib/league-system.ts`
- `src/app/api/leagues/route.ts`

**League Thresholds (from memories):**
```typescript
Bronze: < 200 points
Silver: < 500 points
Gold: < 1000 points
Platinum: < 2500 points
Diamond: < 5000 points
Master: < 10000 points
Grandmaster: >= 10000 points
```

**Testing:**
- [ ] League badges display correctly
- [ ] League promotions work
- [ ] Progress tracking accurate
- [ ] Season transitions work

#### 3.3 Streak System (1-2 days)
**Why third:** Encourages daily engagement

**Tasks:**
- [ ] Implement daily activity tracking
- [ ] Create streak counter with fire animation
- [ ] Add streak notifications
- [ ] Handle streak breaks gracefully
- [ ] Show streak calendar/history

**Files to create:**
- `src/components/gamification/StreakCounter.tsx`
- `src/components/gamification/StreakCalendar.tsx`
- `src/lib/streak-tracker.ts`

**Testing:**
- [ ] Streak increments daily
- [ ] Streak resets after inactivity
- [ ] Animations work properly
- [ ] Calendar displays correctly

### Phase 4: Social Features (Week 4-5)

#### 4.1 Friend System (2-3 days)
**Why first in Phase 4:** Foundation for social features

**Tasks:**
- [ ] Create friends list page
- [ ] Implement friend requests
- [ ] Add friend search functionality
- [ ] Show friend activity feed
- [ ] Display friend's progress

**Files to create:**
- `src/app/friends/page.tsx`
- `src/components/social/FriendsList.tsx`
- `src/components/social/FriendRequests.tsx`
- `src/components/social/FriendSearch.tsx`
- `src/app/api/friends/route.ts`

**Testing:**
- [ ] Can send friend requests
- [ ] Requests can be accepted/rejected
- [ ] Friends list displays
- [ ] Search finds users

#### 4.2 Leaderboard/Rankings (2 days)
**Why second:** Creates competition

**Tasks:**
- [ ] Create global leaderboard
- [ ] Add filtering (by league, timeframe)
- [ ] Show friend rankings
- [ ] Display user's rank
- [ ] Add pagination

**Files to create:**
- `src/app/rankings/page.tsx`
- `src/components/rankings/Leaderboard.tsx`
- `src/components/rankings/RankCard.tsx`
- `src/app/api/rankings/route.ts`

**Testing:**
- [ ] Leaderboard displays correctly
- [ ] Rankings update properly
- [ ] Filtering works
- [ ] User rank shows accurately

#### 4.3 Community Features (1-2 days)
**Why third:** Enhances engagement

**Tasks:**
- [ ] Create discussion forums/threads
- [ ] Allow comments on problems
- [ ] Add solution sharing (after solving)
- [ ] Implement upvoting system

**Files to create:**
- `src/app/community/page.tsx`
- `src/components/community/DiscussionThread.tsx`
- `src/components/community/Comment.tsx`
- `src/app/api/community/route.ts`

**Testing:**
- [ ] Can create discussions
- [ ] Comments work properly
- [ ] Upvoting functions
- [ ] Solutions display correctly

### Phase 5: Advanced Features (Week 5-6)

#### 5.1 Daily Challenges (2 days)
**Why first in Phase 5:** Drives daily engagement

**Tasks:**
- [ ] Create daily challenge system
- [ ] Implement challenge rotation
- [ ] Add special rewards for completion
- [ ] Show challenge history
- [ ] Display completion stats

**Files to create:**
- `src/app/challenges/page.tsx`
- `src/components/challenges/DailyChallenge.tsx`
- `src/lib/challenge-scheduler.ts`
- `src/app/api/challenges/route.ts`

**Testing:**
- [ ] New challenge appears daily
- [ ] Rewards are awarded
- [ ] History tracks correctly
- [ ] Stats display properly

#### 5.2 AI Assistant (2-3 days)
**Why second:** High-value premium feature

**Tasks:**
- [ ] Create AI chat interface
- [ ] Implement hint system
- [ ] Add code explanation feature
- [ ] Provide approach suggestions
- [ ] Integrate with AI services (Ollama/HuggingFace/Gemini)

**Files to create:**
- `src/components/ai/ChatInterface.tsx`
- `src/components/ai/HintPanel.tsx`
- `src/components/problems/CodeExplanation.tsx`
- `src/app/api/ai/hints/route.ts`

**Testing:**
- [ ] AI responds to queries
- [ ] Hints are contextual
- [ ] Code explanations work
- [ ] Fallback between AI services works

#### 5.3 Puzzle Feature (1-2 days)
**Why third:** Additional engagement mechanism

**Tasks:**
- [ ] Create puzzle challenges
- [ ] Implement puzzle solving interface
- [ ] Add puzzle rewards
- [ ] Show puzzle leaderboard

**Files to create:**
- `src/app/puzzle/page.tsx`
- `src/components/puzzle/PuzzleCard.tsx`
- `src/app/api/puzzle/route.ts`

**Testing:**
- [ ] Puzzles load correctly
- [ ] Solutions can be submitted
- [ ] Rewards are awarded
- [ ] Leaderboard updates

### Phase 6: Monetization & Premium (Week 6-7)

#### 6.1 Pro Subscription Page (1-2 days)
**Why first in Phase 6:** Revenue generation

**Tasks:**
- [ ] Create Pro landing page
- [ ] Display Pro benefits
- [ ] Add pricing plans
- [ ] Implement feature comparison table
- [ ] Create compelling CTAs

**Files to create:**
- `src/app/pro/page.tsx`
- `src/components/pro/PricingCard.tsx`
- `src/components/pro/FeatureComparison.tsx`
- `src/components/pro/ProBadge.tsx`

**Testing:**
- [ ] Page displays attractively
- [ ] Benefits are clear
- [ ] CTAs are prominent

#### 6.2 Payment Integration (2-3 days)
**Why second:** Enables monetization

**Tasks:**
- [ ] Integrate Razorpay
- [ ] Create checkout flow
- [ ] Handle payment success/failure
- [ ] Update user Pro status
- [ ] Send confirmation emails

**Files to create:**
- `src/app/api/payment/create-order/route.ts`
- `src/app/api/payment/verify/route.ts`
- `src/components/payment/CheckoutForm.tsx`
- `src/components/payment/PaymentSuccess.tsx`

**Testing:**
- [ ] Payment flow works
- [ ] Success/failure handled
- [ ] Pro status updates
- [ ] Emails send correctly

#### 6.3 Pro-Only Features (1-2 days)
**Why third:** Adds value to subscription

**Tasks:**
- [ ] Gate Interview Prep section
- [ ] Add unlimited AI queries for Pro
- [ ] Unlock exclusive avatars/badges
- [ ] Provide detailed analytics
- [ ] Add ad-free experience

**Files to modify:**
- Various feature components
- Add Pro checks and gates

**Testing:**
- [ ] Free users see gates
- [ ] Pro users access features
- [ ] Upgrades unlock correctly

### Phase 7: Polish & Production (Week 7-8)

#### 7.1 Notifications System (2 days)
**Why first in Phase 7:** Better user engagement

**Tasks:**
- [ ] Implement notification bell
- [ ] Add notification types (friend requests, achievements, etc.)
- [ ] Create notification dropdown
- [ ] Add unread count badge
- [ ] Implement mark as read functionality

**Files to create:**
- `src/components/notifications/NotificationBell.tsx`
- `src/components/notifications/NotificationDropdown.tsx`
- `src/app/api/notifications/route.ts`

**Testing:**
- [ ] Notifications appear
- [ ] Badge shows count
- [ ] Can mark as read
- [ ] Dropdown works

#### 7.2 Animations & Polish (2-3 days)
**Why second:** Professional appearance

**Tasks:**
- [ ] Add page transitions
- [ ] Implement loading skeletons
- [ ] Create success/error animations
- [ ] Add micro-interactions
- [ ] Optimize animations for 60+ FPS

**Files to modify:**
- Add Framer Motion to components
- Update Tailwind animations

**Testing:**
- [ ] Animations are smooth
- [ ] Performance is good
- [ ] Loading states are elegant

#### 7.3 Bug Reporting System (1-2 days)
**Why third:** Quality improvement

**Tasks:**
- [ ] Create bug report form
- [ ] Implement bug tracking
- [ ] Add status updates
- [ ] Reward users for valid bugs

**Files to create:**
- `src/app/bugs/page.tsx`
- `src/components/bugs/BugReportForm.tsx`
- `src/app/api/bugs/route.ts`

**Testing:**
- [ ] Can submit bug reports
- [ ] Status updates work
- [ ] Rewards are awarded

#### 7.4 Error Monitoring & Analytics (1 day)
**Why last in Phase 7:** Production readiness

**Tasks:**
- [ ] Set up Sentry error tracking
- [ ] Configure PostHog analytics
- [ ] Add custom event tracking
- [ ] Set up error boundaries
- [ ] Create admin dashboard

**Files to create:**
- `src/components/ErrorBoundary.tsx`
- `src/lib/monitoring.ts`

**Testing:**
- [ ] Errors are tracked
- [ ] Analytics capture events
- [ ] Dashboard shows data

### Phase 8: Deployment & Launch (Week 8)

#### 8.1 Production Environment (1 day)
**Tasks:**
- [ ] Set up production environment variables
- [ ] Configure production database
- [ ] Set up production Redis
- [ ] Configure CDN (Cloudflare)

#### 8.2 Deployment (1 day)
**Tasks:**
- [ ] Deploy to Vercel
- [ ] Set up custom domain
- [ ] Configure SSL
- [ ] Test production deployment

#### 8.3 Launch (1 day)
**Tasks:**
- [ ] Final testing on production
- [ ] Create launch announcement
- [ ] Monitor for issues
- [ ] Gather user feedback

---

## 📊 Priority Matrix

Use this matrix to decide what to build next based on **User Value** vs **Implementation Effort**:

```
High Value, Low Effort (DO FIRST) ⭐⭐⭐
├── User Profile & Settings
├── Problem Browsing
├── Code Editor Integration
├── Basic Code Execution
└── Points System

High Value, High Effort (DO SECOND) ⭐⭐
├── League System
├── Friend System
├── AI Assistant
├── Daily Challenges
└── Payment Integration

Low Value, Low Effort (DO WHEN TIME PERMITS) ⭐
├── Streak System
├── Bug Reporting
├── Notification Bell
└── Theme Toggle

Low Value, High Effort (CONSIDER SKIPPING)
├── Advanced Analytics Dashboard
├── Mobile App
├── Real-time Multiplayer Contests
└── Video Tutorials
```

### Decision Framework

**When deciding which feature to build next, ask:**

1. **Does it block other features?**
   - If YES → Build it first
   - Example: User profiles block friend system

2. **Will users immediately notice if it's missing?**
   - If YES → High priority
   - Example: Code execution is critical

3. **Can we launch without it?**
   - If YES → Lower priority
   - Example: AI assistant can wait

4. **Does it generate revenue?**
   - If YES → Consider prioritizing
   - Example: Pro subscription features

5. **How long will it take?**
   - If <2 days → Consider doing it
   - If >1 week → Break into smaller pieces

---

## 💼 Development Workflow

### Creating a New Feature

```bash
# 1. Create a feature branch
git checkout -b feature/problem-browsing

# 2. Create necessary files
# - Component files in src/components/
# - Page files in src/app/
# - API routes in src/app/api/
# - Utilities in src/lib/ or src/utils/

# 3. Implement feature incrementally
# - Start with basic structure
# - Add functionality step by step
# - Test as you go

# 4. Test your feature
npm run dev         # Manual testing
npm run type-check  # Type safety
npm run lint        # Code quality

# 5. Commit your changes
git add .
git commit -m "feat: add problem browsing page"

# 6. Push and create PR
git push origin feature/problem-browsing
# Create PR on GitHub

# 7. After review, merge to main
# Pull latest and start next feature
```

### File Organization Best Practices

```
src/
├── app/                          # Next.js app router
│   ├── api/                      # API routes
│   │   ├── problems/
│   │   ├── users/
│   │   └── ai/
│   ├── problems/                 # Problem pages
│   │   ├── page.tsx             # List page
│   │   └── [id]/page.tsx        # Detail page
│   ├── profile/
│   ├── settings/
│   └── layout.tsx               # Root layout
│
├── components/                   # React components
│   ├── problems/
│   │   ├── ProblemCard.tsx
│   │   ├── ProblemList.tsx
│   │   └── ProblemDetail.tsx
│   ├── editor/
│   │   └── CodeEditor.tsx
│   ├── gamification/
│   └── ui/                      # Reusable UI components
│
├── lib/                         # External integrations
│   ├── supabase.ts
│   ├── ai.ts
│   ├── piston.ts
│   └── payment.ts
│
└── utils/                       # Utility functions
    ├── helpers.ts
    ├── constants.ts
    └── types.ts
```

### Component Creation Template

```typescript
// src/components/problems/ProblemCard.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProblemCardProps {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  solved?: boolean;
}

export default function ProblemCard({
  id,
  title,
  difficulty,
  points,
  solved = false,
}: ProblemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glassmorphism p-6 rounded-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Component content */}
    </motion.div>
  );
}
```

### API Route Template

```typescript
// src/app/api/problems/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');

    // Fetch data from Supabase
    let query = supabase.from('problems').select('*');
    
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate data
    // Insert into database
    // Return response
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create problem' },
      { status: 500 }
    );
  }
}
```

---

## 🎓 Best Practices

### Code Quality

```bash
# Before committing, always run:
npm run type-check    # Catch TypeScript errors
npm run lint          # Fix linting issues
npm run build         # Ensure build succeeds
```

### Performance Optimization

1. **Use React Server Components (RSC) by default**
   ```typescript
   // Server Component (default in app/)
   export default async function ProblemList() {
     const problems = await fetchProblems(); // Direct DB call
     return <div>...</div>;
   }
   ```

2. **Client Components only when needed**
   ```typescript
   // Add 'use client' only for interactivity
   'use client';
   import { useState } from 'react';
   ```

3. **Implement proper caching**
   ```typescript
   // API routes with caching
   export const revalidate = 3600; // 1 hour
   ```

4. **Optimize images**
   ```typescript
   import Image from 'next/image';
   
   <Image
     src={avatar}
     alt="User avatar"
     width={50}
     height={50}
     priority={false}
   />
   ```

### Security Best Practices

1. **Validate all inputs**
   ```typescript
   import { z } from 'zod';
   
   const schema = z.object({
     code: z.string().min(1).max(10000),
     language: z.enum(['python', 'javascript', 'java']),
   });
   ```

2. **Use environment variables for secrets**
   ```typescript
   // ❌ NEVER hardcode secrets
   const apiKey = 'abc123';
   
   // ✅ Use environment variables
   const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
   ```

3. **Implement rate limiting**
   ```typescript
   import { redis } from '@/lib/redis';
   
   // Check rate limit before processing
   const attempts = await redis.incr(`rate:${userId}`);
   if (attempts > 10) throw new Error('Rate limit exceeded');
   ```

4. **Sanitize user input**
   ```typescript
   // Prevent XSS attacks
   import DOMPurify from 'isomorphic-dompurify';
   const clean = DOMPurify.sanitize(userInput);
   ```

### UI/UX Guidelines

1. **Always show loading states**
   ```typescript
   {isLoading ? <Skeleton /> : <Content />}
   ```

2. **Provide feedback for actions**
   ```typescript
   toast.success('Profile updated!');
   toast.error('Failed to save changes');
   ```

3. **Make interactions smooth**
   ```typescript
   <motion.button
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}
   >
     Submit
   </motion.button>
   ```

4. **Ensure accessibility**
   ```typescript
   <button
     aria-label="Close modal"
     onClick={onClose}
   >
     <X className="w-5 h-5" />
   </button>
   ```

### Git Commit Messages

Follow conventional commits:

```bash
feat: add problem browsing page
fix: resolve authentication redirect issue
docs: update setup guide with Supabase instructions
style: improve code editor layout
refactor: optimize points calculation algorithm
test: add tests for league system
chore: update dependencies
perf: optimize database queries
```

### Testing Strategy

1. **Manual testing in development**
   - Test each feature as you build
   - Try edge cases
   - Test error scenarios

2. **Type safety with TypeScript**
   - Define proper interfaces
   - Use strict type checking
   - Run `npm run type-check` regularly

3. **Build verification**
   - Run `npm run build` before pushing
   - Ensures production readiness

4. **User testing**
   - Have others test features
   - Gather feedback
   - Iterate based on feedback

---

## 🔧 Troubleshooting

### Common Issues

#### Issue 1: "Cannot find module '@/...' "

**Problem:** TypeScript path alias not working

**Solution:**
```bash
# Check tsconfig.json has:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

#### Issue 2: "Error: Invalid environment variable"

**Problem:** Missing or incorrect .env variables

**Solution:**
```bash
# 1. Copy from example
cp .env.example .env

# 2. Fill in all required variables
# 3. Restart dev server
npm run dev
```

#### Issue 3: "Supabase connection failed"

**Problem:** Database not accessible

**Solution:**
```bash
# 1. Check .env has correct Supabase credentials
# 2. Verify Supabase project is active
# 3. Check database tables exist
# 4. Try running migrations from DATABASE_SCHEMA.md
```

#### Issue 4: "Module not found: Can't resolve 'fs'"

**Problem:** Using Node.js modules in client components

**Solution:**
```typescript
// ❌ Don't use Node.js modules in client components
'use client';
import fs from 'fs'; // ERROR

// ✅ Move to API route or server component
// API route: src/app/api/file/route.ts
import fs from 'fs'; // OK in API route
```

#### Issue 5: "Build failed: Type error"

**Problem:** TypeScript type errors

**Solution:**
```bash
# 1. Run type check to see errors
npm run type-check

# 2. Fix type errors shown
# 3. Common fixes:
#    - Add proper types to props
#    - Import types correctly
#    - Fix any type assertions

# 4. Verify fix
npm run type-check
npm run build
```

#### Issue 6: "Error: NEXT_PUBLIC_ env variable not available"

**Problem:** Client-side env variables not prefixed correctly

**Solution:**
```bash
# Client-side variables MUST start with NEXT_PUBLIC_
# .env
NEXT_PUBLIC_SUPABASE_URL=...  # ✅ Available in browser
SUPABASE_SERVICE_ROLE_KEY=... # ✅ Server-only (secure)

# Restart dev server after changing .env
npm run dev
```

### Getting Help

1. **Check documentation**
   - `SETUP_GUIDE.md` - Service setup
   - `DATABASE_SCHEMA.md` - Database structure
   - `DEPLOYMENT.md` - Deployment help
   - `README.md` - Project overview

2. **Search existing issues**
   - GitHub Issues: Common problems already solved

3. **Ask for help**
   - Create detailed issue on GitHub
   - Include error messages
   - Share relevant code
   - Describe steps to reproduce

---

## 🚀 Next Steps

### Immediate Actions (Today)

1. **Set up your development environment**
   - [ ] Complete [Quick Start Checklist](#-quick-start-checklist)
   - [ ] Verify you can run `npm run dev` successfully
   - [ ] Test authentication flow

2. **Plan your first feature**
   - [ ] Review [Feature Development Roadmap](#-feature-development-roadmap)
   - [ ] Pick a Phase 1 feature to start with
   - [ ] Create a feature branch

3. **Start building**
   - [ ] Follow [Development Workflow](#-development-workflow)
   - [ ] Build incrementally
   - [ ] Test as you go

### This Week

1. **Complete Phase 1**
   - User profiles
   - Problem browsing
   - Code editor

2. **Get feedback**
   - Share with friends
   - Test on different devices
   - Gather user opinions

3. **Iterate**
   - Fix bugs found
   - Improve based on feedback
   - Move to Phase 2

### This Month

1. **Complete Phases 1-3**
   - Core functionality working
   - Gamification implemented
   - Users can solve problems and earn points

2. **Soft launch**
   - Deploy to production
   - Invite initial users
   - Monitor and fix issues

3. **Gather metrics**
   - Track user engagement
   - Monitor error rates
   - Analyze feature usage

### Long Term

1. **Scale**
   - Upgrade services as needed
   - Optimize performance
   - Add more problems

2. **Monetize**
   - Launch Pro subscription
   - Add premium features
   - Generate revenue

3. **Grow**
   - Market your platform
   - Build community
   - Expand features

---

## 📚 Additional Resources

### Documentation

- **Project Docs:** See repo root for all guides
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **React Docs:** [react.dev](https://react.dev)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

### Free Learning Resources

- **Next.js Tutorial:** [nextjs.org/learn](https://nextjs.org/learn)
- **TypeScript Handbook:** [typescriptlang.org/docs/handbook](https://www.typescriptlang.org/docs/handbook/)
- **Web Dev Best Practices:** [web.dev](https://web.dev)

### Tools & Extensions

**VS Code Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Import Sorter
- GitLens

**Chrome Extensions:**
- React Developer Tools
- Redux DevTools
- Lighthouse

### Community & Support

- **GitHub Issues:** Report bugs and request features
- **GitHub Discussions:** Ask questions and share ideas
- **Discord/Slack:** Join developer community (if available)

---

## 📝 Summary

**You have a complete foundation ready to build on!** 🎉

**What's complete:**
✅ Next.js app structure
✅ All service integrations
✅ Database schema
✅ API routes structure
✅ UI component system
✅ Complete documentation

**What to do next:**
1. Complete environment setup (30-60 min)
2. Run the project locally
3. Start with Phase 1 features
4. Build incrementally
5. Test thoroughly
6. Deploy and launch!

**Remember:**
- Build features in order (follow the roadmap)
- Test as you build
- Keep commits small and focused
- Ask for help when stuck
- Have fun building! 🚀

---

## 🎯 Quick Reference

```bash
# Essential Commands
npm run dev          # Start development server
npm run build        # Build for production
npm run type-check   # Check TypeScript types
npm run lint         # Run linter

# Git Workflow
git checkout -b feature/name
git add .
git commit -m "feat: description"
git push origin feature/name

# Common Tasks
cp .env.example .env              # Create env file
openssl rand -base64 32           # Generate secret
npm install <package>             # Install package
```

**Important Files:**
- `.env` - Environment variables
- `SETUP_GUIDE.md` - Service setup
- `DATABASE_SCHEMA.md` - Database info
- `package.json` - Dependencies

**Important URLs:**
- Development: http://localhost:3000
- Supabase: https://supabase.com/dashboard
- Vercel: https://vercel.com/dashboard

---

**Happy Coding! 🎉** If you have questions, create an issue on GitHub.
