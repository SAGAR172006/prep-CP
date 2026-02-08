# Development Roadmap - CodeMaster Platform

## Project Overview

A comprehensive gamified coding practice platform with advanced features including:
- **60-144 FPS animations** throughout
- **Anti-cheat code editor** with paste completely disabled
- **League system** (Bronze → Conqueror with sub-tiers)
- **Competitive programming** with real-time matchmaking
- **AI-powered assistance** (4 predefined actions)
- **Social features** (friends, challenges)
- **Pro subscription** (₹199/month or ₹1999/year)

## Current Status: Phase 4 Complete ✅

### ✅ Phase 1-4: Foundation (Weeks 1-4)

**Completed Features:**
- Next.js 16.1.6 with TypeScript setup
- Tailwind CSS + Framer Motion configuration
- Prisma schema with comprehensive models
- Landing page with parallax animations
- Authentication UI (Login/Signup)
- Monaco Editor with **CRITICAL anti-cheat paste blocking**
- Home page with course grid
- Problem page with split layout
- NextAuth.js configuration (Google, GitHub, Credentials)
- API routes for authentication and problems

**Technical Achievements:**
- 0 security vulnerabilities
- Successful production build
- Comprehensive database schema
- Multi-layer paste prevention system
- Responsive glassmorphism UI

---

## 📅 Upcoming Phases

### Phase 5: Database & Seed Data (Week 5)

**Goals:**
- Set up PostgreSQL database
- Create seed scripts for problems
- Test database operations

**Tasks:**
- [ ] Create problem seed script (100+ problems)
- [ ] Add test cases for each problem
- [ ] Create sample users for testing
- [ ] Implement database migration scripts
- [ ] Add database indexes for performance
- [ ] Test all CRUD operations

**Acceptance Criteria:**
- ✓ 100+ problems across all difficulties
- ✓ Test cases validate correctly
- ✓ Database queries return in < 100ms
- ✓ Prisma Studio accessible

---

### Phase 6: Code Execution Engine (Weeks 6-7)

**Goals:**
- Implement secure code execution
- Support 6 programming languages
- Add anti-cheat time validation

**Tasks:**
- [ ] Integrate Judge0 API or Docker sandbox
- [ ] Create code execution API endpoint (`/api/code/execute`)
- [ ] Implement timeout (5s) and memory limits (512MB)
- [ ] Add test case validation logic
- [ ] Implement anti-cheat minimum solve time
- [ ] Add language-specific compilation
- [ ] Error handling for runtime errors
- [ ] Support: Python, Java, C++, C, JavaScript, Go

**Technical Requirements:**
```typescript
POST /api/code/execute
{
  "code": "def solution()...",
  "language": "python",
  "problemId": "two-sum",
  "userId": "user123"
}

Response:
{
  "status": "Accepted" | "Wrong Answer" | "Time Limit Exceeded",
  "output": "...",
  "testsPassed": 8,
  "testsTotal": 10,
  "executionTime": 52,
  "memory": 42300,
  "points": 10
}
```

**Security Checklist:**
- [ ] Network isolation in sandbox
- [ ] No file system access
- [ ] Process limits enforced
- [ ] Input sanitization
- [ ] Output size limits

---

### Phase 7: Gamification System (Week 8)

**Goals:**
- Implement points calculation
- Build league promotion logic
- Create score animations

**Tasks:**
- [ ] Points calculation utility
  - Base: 10 points
  - Penalty: -1 per attempt (min 5)
  - Fast penalty: -2 if < minSolveTime
  - Abort penalty: -3
- [ ] League tier logic:
  - Bronze: 0-200
  - Silver: 201-400
  - Gold: 401-600
  - Diamond: 601-800
  - Master: 801-1000
  - Conqueror: 1000+
- [ ] Sub-league calculation (V, IV, III, II, I)
- [ ] League promotion animation (confetti, particles)
- [ ] Score change notification sidebar
- [ ] Update user stats after submission
- [ ] Leaderboard generation (global, course, local)

**Animation Requirements:**
- Full-screen overlay for league change
- 60 FPS confetti animation
- Badge rotation + scale + glow
- Number count-up animation
- Smooth transitions (500-700ms)

---

### Phase 8: Submission System (Week 9)

**Goals:**
- Store user submissions
- Track problem-solving history
- Display submission statistics

**Tasks:**
- [ ] Create submission API endpoint
- [ ] Store code, language, status, points
- [ ] Update user points and league
- [ ] Track attempts per problem
- [ ] Calculate time spent
- [ ] Create submission history page
- [ ] Add filters (topic, difficulty, status)
- [ ] Generate statistics dashboard

**API Design:**
```typescript
POST /api/submissions
{
  "problemId": "two-sum",
  "code": "...",
  "language": "python",
  "timeTaken": 120 // seconds
}

GET /api/submissions?userId=123&page=1&limit=20
{
  "submissions": [...],
  "stats": {
    "totalSolved": 45,
    "totalAttempts": 67,
    "accuracy": 67.2,
    "averageTime": 180
  }
}
```

---

### Phase 9: AI Integration (Weeks 10-11)

**Goals:**
- Implement AI chatbot
- Add problem generation
- Create bug analysis system

**Tasks:**
- [ ] OpenAI GPT-4 integration
- [ ] Create chatbot API endpoint
- [ ] Implement 4 predefined actions:
  1. "Explain this problem in simple terms"
  2. "What concept should I use?"
  3. "Help me debug my code" (captures editor content)
  4. "Give me a hint"
- [ ] Track query limits (20 free, 100 Pro)
- [ ] Add context capture from editor
- [ ] Create problem generation API
- [ ] Implement bug analysis with NLP
- [ ] Duplicate detection for bugs

**Query Limit Logic:**
```typescript
// Check before each query
const user = await getUser(userId);
const today = startOfDay(new Date());

if (user.lastDailyReset < today) {
  await resetDailyQueries(userId);
}

const limit = user.isPro ? 100 : 20;
if (user.dailyAIQueries >= limit) {
  throw new Error("Daily limit reached. Upgrade to Pro!");
}
```

---

### Phase 10: Competitive Programming Mode (Weeks 12-13)

**Goals:**
- Real-time PvP matchmaking
- Live progress tracking
- Victory/defeat screens

**Tasks:**
- [ ] Socket.io server setup
- [ ] Create matchmaking queue
- [ ] Match users by league (±50 points)
- [ ] AI bot fallback after 50s timeout
- [ ] Split-screen live progress UI
- [ ] Real-time code length tracking
- [ ] Victory/defeat animation screens
- [ ] Update rankings after match
- [ ] Match history storage

**WebSocket Events:**
```typescript
// Client → Server
socket.emit('join-queue', { userId, league, points });

// Server → Client
socket.on('match-found', { opponent, problemId, timeLimit });
socket.on('opponent-progress', { linesOfCode, testsPassed });
socket.on('match-end', { winner, points });
```

---

### Phase 11: Social Features (Week 14)

**Goals:**
- Friends system
- Challenge functionality
- Online status tracking

**Tasks:**
- [ ] Friend search by UID
- [ ] Friend request system (Accept/Reject)
- [ ] Friend limit enforcement (20 free, 100 Pro)
- [ ] Online/offline status indicators
- [ ] Challenge modal with configuration:
  - Topic selection
  - Difficulty selection
  - Time limit (10/20/30/60 min)
  - Number of problems (1/3/5/10)
- [ ] Block invites for 5 minutes feature
- [ ] Live challenge split-screen
- [ ] Post-challenge stats comparison

---

### Phase 12: Additional Features (Weeks 15-16)

**Tasks:**
- [ ] **Ranking System**
  - Global leaderboard
  - Course-wise leaderboard
  - Local leaderboard (with geolocation)
  - Top 100 badges (exact rank)
  - Percentile system (Top 1%, 5%, 10%)
  
- [ ] **Season System**
  - 3-month seasons (Jan-Mar, Apr-Jun, Jul-Sep, Oct-Dec)
  - Point reset at season start
  - Legacy badge conversion
  - Seasonal rewards with timers
  
- [ ] **Profile & Collections**
  - Public profile view
  - V-Badge for Pro users (golden animated checkmark)
  - Profile banners (static & animated)
  - Custom avatar upload (Pro)
  - Badge collection display
  
- [ ] **Pro Subscription**
  - Stripe integration
  - Monthly: ₹199/month
  - Annual: ₹1999/year
  - Full-screen unlock overlay
  - Webhook handling for renewals
  
- [ ] **History Tab**
  - Table/card view toggle
  - Filters: topic, difficulty, date, status
  - Heatmap calendar
  - Statistics graphs (Recharts)
  
- [ ] **Bug Reporting**
  - Bug report form
  - Type classification
  - AI analysis and duplicate detection
  - Status workflow (Submitted → Resolved)
  - Admin dashboard
  - +5 points for resolved bugs
  
- [ ] **Community Forum**
  - Categories: Discussions, Study Groups, Interviews
  - Upvote/downvote system
  - Comment threads
  - Emoji reactions
  - User reputation badges
  - Rich text editor with code blocks
  
- [ ] **Daily Puzzle**
  - One unique puzzle per day (resets 00:30 AM)
  - 30 bonus points
  - Leaderboard for fastest solvers (24h)
  - Puzzle archive (Pro only)
  
- [ ] **Streaks System**
  - Login streak tracking
  - Solve streak tracking
  - Fire emoji with animated flame
  - GitHub-style heatmap calendar
  - Milestones: 7-day (50 pts), 30-day (200 pts), 100-day (1000 pts), 365-day (5000 pts)
  - Streak freeze (1/week for Pro)

---

### Phase 13: Performance & Optimization (Week 17)

**Goals:**
- Achieve 60-144 FPS throughout
- Optimize database queries
- Implement caching

**Tasks:**
- [ ] Code splitting for routes
- [ ] Lazy loading for heavy components
- [ ] Virtual scrolling for leaderboards
- [ ] Redis caching for hot data:
  - Leaderboards (5 min TTL)
  - Problem list (1 hour TTL)
  - User stats (5 min TTL)
- [ ] Database indexing:
  ```sql
  CREATE INDEX idx_user_league ON "User"(league, seasonPoints);
  CREATE INDEX idx_submission_user ON "Submission"("userId", "createdAt");
  CREATE INDEX idx_problem_difficulty ON "Problem"(difficulty, topic);
  ```
- [ ] Image optimization with Next.js Image
- [ ] Bundle size analysis
- [ ] Lighthouse audit (target: 90+ score)
- [ ] GPU-accelerated animations
- [ ] requestAnimationFrame for custom animations

---

### Phase 14: Security Hardening (Week 18)

**Tasks:**
- [ ] Rate limiting on all API routes:
  ```typescript
  // 10 requests per minute per IP
  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10
  });
  ```
- [ ] Input sanitization (SQL injection, XSS)
- [ ] JWT with HTTP-only cookies
- [ ] CSRF protection
- [ ] Code execution sandboxing verification
- [ ] Environment variable security audit
- [ ] Dependency security scan
- [ ] HTTPS enforcement
- [ ] Content Security Policy headers

---

### Phase 15: Testing (Week 19)

**Tasks:**
- [ ] Unit tests for utilities (points calculation, league logic)
- [ ] Integration tests for API routes
- [ ] E2E tests with Playwright:
  - User registration flow
  - Problem solving flow
  - Code editor paste prevention
- [ ] Performance tests (k6 or Artillery)
- [ ] Security tests (OWASP Top 10)
- [ ] Accessibility tests (axe-core)
- [ ] Cross-browser testing

---

### Phase 16: Admin Dashboard (Week 20)

**Tasks:**
- [ ] Admin authentication
- [ ] User management (view, edit, ban)
- [ ] Problem management (create, edit, delete)
- [ ] Bug report review panel
- [ ] Analytics dashboard:
  - DAU/MAU metrics
  - Problem solve rate
  - User retention (D1, D7, D30)
  - Pro conversion rate
- [ ] Manual league adjustments
- [ ] Fraud detection panel

---

### Phase 17: Documentation & Launch Prep (Week 21)

**Tasks:**
- [ ] User guide (How to use the platform)
- [ ] API documentation (for future integrations)
- [ ] Admin manual
- [ ] Contributing guidelines
- [ ] Code of conduct
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Launch checklist
- [ ] Marketing materials

---

### Phase 18: Launch & Monitoring (Week 22)

**Tasks:**
- [ ] Soft launch (limited users)
- [ ] Monitor performance
- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] Public launch
- [ ] Set up monitoring:
  - Sentry for error tracking
  - Vercel Analytics
  - PostHog or Mixpanel
- [ ] Create feedback loop

---

## Success Metrics

### Phase-wise KPIs

**Phase 5-8 (MVP):**
- ✓ 100+ problems available
- ✓ Code execution working for all languages
- ✓ < 2s submission response time
- ✓ 0 critical bugs

**Phase 9-12 (Core Features):**
- ✓ AI chatbot response time < 3s
- ✓ Matchmaking time < 50s
- ✓ 60 FPS animations
- ✓ Social features working smoothly

**Phase 13-16 (Polish):**
- ✓ Lighthouse score > 90
- ✓ 99.9% uptime
- ✓ < 100ms API response times (simple queries)
- ✓ All tests passing

**Post-Launch:**
- **Day 1 retention**: 70%
- **Day 7 retention**: 40%
- **Day 30 retention**: 25%
- **Average session**: 30+ minutes
- **Problems per user**: 5+ daily
- **Pro conversion**: 5-10%

---

## Tech Debt & Future Enhancements

### Tech Debt to Address
- Replace `any` types in NextAuth configuration
- Add proper error boundaries
- Implement retry logic for API calls
- Add loading states for all async operations

### Future Enhancements (Post-Launch)
- Mobile app (React Native)
- Interview scheduling platform
- Company-specific problem sets
- Custom contests
- Certification program
- Video explanations for problems
- Collaborative coding rooms
- Code review marketplace

---

## Team Recommendations

For faster development:
- **Frontend**: 1-2 developers (React/Next.js experts)
- **Backend**: 1 developer (Node.js, PostgreSQL)
- **DevOps**: 1 developer (part-time, for scaling)
- **Designer**: 1 designer (part-time, for polish)
- **QA**: 1 tester (Week 19+)

---

## Resources & Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Judge0 API](https://judge0.com)
- [OpenAI API](https://platform.openai.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

**Last Updated**: February 8, 2026
**Current Phase**: Phase 4 Complete ✅
**Next Milestone**: Database Setup & Problem Seeding
