# CodeMaster - Gamified Coding Practice Platform

A comprehensive full-stack gamified coding practice platform similar to HackerRank with advanced league systems, competitive programming, social features, daily challenges, and AI-powered assistance.

## 🚀 Features

### Core Features
- ✅ **Authentication & Landing Page** - Google OAuth, GitHub OAuth, Email/Password
- ✅ **Gamification System** - Points, Leagues (Bronze → Conqueror), Streaks
- ✅ **Code Editor** - Monaco Editor with paste disabled for anti-cheat
- ✅ **Problem Solving** - Multi-language support (Python, Java, C++, C, JS, Go)
- ✅ **League System** - Local & Competitive Programming leagues with sub-tiers
- ✅ **Competitive Mode** - Real-time PvP matchmaking
- ✅ **AI Chatbot** - 4 predefined actions with query limits
- ✅ **Social Features** - Friends, Challenges, Community Forum
- ✅ **Pro Subscription** - ₹199/month or ₹1999/year
- ✅ **Bug Reporting** - AI-powered analysis with points reward
- ✅ **Daily Puzzles** - Unique challenges with bonus points
- ✅ **Ranking System** - Global, Course-wise, and Local leaderboards

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 with TypeScript
- **Styling:** Tailwind CSS + Framer Motion (60-144 FPS animations)
- **Code Editor:** Monaco Editor
- **State Management:** Zustand
- **UI Components:** Radix UI
- **Icons:** Lucide React

### Backend
- **Database:** PostgreSQL + Redis (caching)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Real-time:** Socket.io (WebSockets)

### Code Execution
- **Sandbox:** Docker containers or Judge0 API
- **Timeout:** 5s, Memory: 512MB

### AI Integration
- **Chatbot:** OpenAI GPT-4
- **Problem Generation:** Custom AI models

### DevOps
- **Hosting:** Vercel
- **Database:** PostgreSQL (Railway/Supabase)
- **CDN:** Cloudflare
- **Payment:** Stripe

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for local database)
- PostgreSQL 16+
- Redis 7+

## 🚀 Quick Start

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/SAGAR172006/prep-CP.git
cd prep-CP
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your configuration:
- Database URL
- OAuth credentials (Google, GitHub)
- OpenAI API key
- Judge0 API credentials
- Stripe keys

### 4. Start Docker services (PostgreSQL + Redis)

\`\`\`bash
npm run docker:up
\`\`\`

### 5. Initialize database

\`\`\`bash
npm run db:generate
npm run db:push
\`\`\`

### 6. Start development server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
prep-CP/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── auth/         # Authentication pages
│   │   ├── api/          # API routes
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── styles/           # Global styles
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── docker-compose.yml    # Docker configuration
└── package.json
\`\`\`

## 🎮 Key Features Explained

### Anti-Cheat System
- **Paste Disabled:** All paste methods blocked (Ctrl+V, Cmd+V, right-click)
- **Time Validation:** Minimum solve time enforced
- **Code Similarity:** Detection against known solutions
- **Typing Analysis:** ML-based pattern detection

### League System
- **Tiers:** Bronze (0-200), Silver (201-400), Gold (401-600), Diamond (601-800), Master (801-1000), Conqueror (1000+)
- **Sub-leagues:** V, IV, III, II, I (40-point ranges)
- **Seasons:** 3-month cycles with points reset

### Points System
- Base: 10 points per problem
- Penalty: -1 per attempt (minimum 5)
- Fast penalty: -2 if too fast
- Abort penalty: -3 points
- Bug reward: +5 for confirmed bugs
- Daily limit: 20 problems (free), unlimited (Pro)

### Pro Subscription Benefits
- Unlimited daily problems
- 100 AI queries/day (vs 20)
- 100 friends limit (vs 20)
- Interview Prep category access
- Exclusive animated banners
- Priority matchmaking
- Ad-free experience
- Advanced analytics

## 🔒 Security

- JWT authentication with HTTP-only cookies
- **Paste completely disabled in code editor**
- Rate limiting on all endpoints
- Input sanitization (SQL injection, XSS prevention)
- Sandboxed code execution
- HTTPS enforced

## 📊 Performance

- **Target:** 60-144 FPS animations throughout
- GPU-accelerated transforms
- Code splitting and lazy loading
- Virtual scrolling for lists
- Redis caching for hot data
- Optimized database queries with indexing

## 🧪 Development Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run docker:up    # Start Docker services
npm run docker:down  # Stop Docker services
\`\`\`

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/session` - Get current session

### Problem Endpoints
- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get problem details
- `POST /api/problems/:id/submit` - Submit solution

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile
- `GET /api/users/stats` - Get user statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by HackerRank, LeetCode, and Codeforces
- Built with Next.js, Prisma, and Tailwind CSS
- Icons by Lucide
- Animations by Framer Motion

## 📧 Contact

For questions or support, please open an issue or contact the maintainers.

---

**Note:** This is a comprehensive platform with many features. Start with the MVP (authentication, problems, code execution) before implementing advanced features.
