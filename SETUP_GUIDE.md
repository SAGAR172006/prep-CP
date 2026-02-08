# Prep-CP - Gamified Coding Practice Platform

A modern, gamified coding practice platform built with Next.js 15, designed to help developers prepare for technical interviews through interactive problem-solving, AI assistance, and competitive programming features.

## 🚀 Features

### Core Features
- **Problem Solving**: 1000+ coding problems across multiple difficulty levels
- **Monaco Code Editor**: VS Code-powered editor with anti-cheat (paste disabled)
- **AI Assistant**: GPT-4 powered chatbot for hints, debugging, and explanations
- **Secure Code Execution**: Sandboxed environment using Piston API
- **Gamification System**: Points, leagues (Bronze to Conqueror), and badges
- **League System**: Competitive rankings with 6 tiers and sub-leagues
- **Real-time Leaderboards**: Global, course-wise, and local rankings

### Social Features
- **Friends System**: Add friends and track their progress
- **Challenge System**: 1v1 coding battles with friends
- **Community Forum**: Discuss problems and share knowledge
- **Matchmaking**: Competitive Programming mode with AI bots

### Premium Features (Pro)
- Unlimited daily problems
- 100 AI queries/day
- Exclusive animated banners
- Custom avatar upload
- Ad-free experience
- Priority matchmaking

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.2.9 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **State Management**: Zustand
- **Authentication**: NextAuth.js

### Backend
- **Runtime**: Node.js 18+
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Caching**: Redis (Upstash)
- **Code Execution**: Piston API
- **AI Integration**: OpenAI GPT-4 / Hugging Face

### Services
- **Database**: Supabase (PostgreSQL)
- **Redis**: Upstash
- **Storage**: Cloudinary
- **Payments**: Razorpay
- **Real-time**: Socket.io

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL database (Supabase recommended)
- Redis instance (Upstash recommended)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/SAGAR172006/prep-CP.git
cd prep-CP
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and fill in your configuration:
```env
# Database (Supabase)
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# AI (Choose one)
OPENAI_API_KEY=your-openai-key
# OR
HUGGINGFACE_API_KEY=your-hf-key

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. **Set up database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## 🏗 Project Structure

```
prep-CP/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (main)/            # Main application pages
│   │   │   ├── home/          # Home dashboard
│   │   │   ├── problem/[id]/  # Problem solving page
│   │   │   ├── profile/       # User profile
│   │   │   ├── rankings/      # Leaderboards
│   │   │   ├── community/     # Community forum
│   │   │   └── pro/           # Pro subscription page
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── problems/      # Problem CRUD
│   │   │   ├── code/          # Code execution & verification
│   │   │   ├── chatbot/       # AI assistant
│   │   │   ├── gamification/  # Points, leagues, rankings
│   │   │   └── ...            # Other APIs
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home redirect
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── auth/              # Auth components
│   │   ├── editor/            # Code editor
│   │   ├── problem/           # Problem components
│   │   └── shared/            # Shared components
│   └── lib/
│       ├── db/                # Database utilities
│       │   ├── prisma.ts      # Prisma client
│       │   ├── supabase.ts    # Supabase client
│       │   └── redis.ts       # Redis client
│       ├── ai/                # AI integration
│       │   └── chatbot.ts     # Chatbot logic
│       ├── code-execution/    # Code execution
│       │   └── executor.ts    # Piston API wrapper
│       └── utils/             # Utility functions
│           └── helpers.ts     # Helper functions
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── .env.example               # Environment template
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.js             # Next.js configuration
```

## 🔐 Security Features

- **Anti-Cheat System**: Paste disabled in code editor
- **Time Validation**: Detect suspiciously fast submissions
- **Code Similarity Detection**: Prevent plagiarism
- **Rate Limiting**: Protect APIs from abuse
- **JWT Authentication**: Secure user sessions
- **Input Validation**: Zod schemas for all inputs
- **Sandboxed Code Execution**: Isolated environments

## 🎮 Usage

### For Users
1. **Sign Up**: Create account with email or OAuth (Google/GitHub)
2. **Browse Problems**: Explore problems by difficulty and category
3. **Solve Problems**: Write code in Monaco Editor
4. **Get Help**: Use AI assistant for hints and debugging
5. **Earn Points**: Solve problems to gain points and level up
6. **Compete**: Challenge friends or join matchmaking

### For Developers
1. Fork and clone the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Create Pull Request

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

### Docker
```bash
docker build -t prep-cp .
docker run -p 3000:3000 prep-cp
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Follow code style (ESLint + Prettier)
4. Write meaningful commit messages
5. Submit Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Authors

- SAGAR172006

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- Piston API for code execution
- OpenAI for GPT-4
- All contributors and users!

## 📧 Support

For support, email support@prep-cp.com or open an issue on GitHub.

## 🔗 Links

- [Documentation](https://docs.prep-cp.com)
- [API Reference](./API_DOCUMENTATION.md)
- [Discord Community](https://discord.gg/prep-cp)
- [Twitter](https://twitter.com/prepcp)

---

Made with ❤️ by the Prep-CP team
