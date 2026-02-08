# PrepCP - Gamified Coding Practice Platform

A comprehensive gamified coding practice platform similar to HackerRank, focused on interview preparation with advanced league systems, competitive programming, social features, daily challenges, and AI-powered assistance.

## 🚀 Features

### Implemented
- ✅ **Project Setup** - Next.js 16 with TypeScript, Tailwind CSS v4
- ✅ **Database Schema** - Comprehensive Prisma schema with all models
- ✅ **Landing Page** - Modern design with animations and glassmorphism
- ✅ **Design System** - Custom colors, animations, and utility functions
- ✅ **Docker Setup** - PostgreSQL, Redis, and Judge0 containers

### In Progress
- 🔄 **Authentication** - Google OAuth, GitHub OAuth, Email/Password
- 🔄 **Problem Solving** - Code editor with Monaco, submission system
- 🔄 **League System** - Bronze to Conqueror leagues with sub-tiers
- 🔄 **AI Chatbot** - 4 pre-defined actions for assistance
- 🔄 **Social Features** - Friends, challenges, community
- 🔄 **Gamification** - Points, streaks, badges

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.1.6, TypeScript, Tailwind CSS v4
- **UI**: Radix UI, Framer Motion, Lucide Icons
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL + Redis
- **Code Editor**: Monaco Editor
- **Authentication**: NextAuth.js
- **Real-time**: Socket.io

## 📋 Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment

\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

### 3. Start Docker Services

\`\`\`bash
npm run docker:up
\`\`\`

### 4. Set Up Database

\`\`\`bash
npm run db:generate
npm run db:push
\`\`\`

### 5. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 📚 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run docker:up` - Start Docker services

## 📁 Structure

\`\`\`
prep-CP/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utilities and helpers
│   ├── types/           # TypeScript definitions
│   ├── hooks/           # Custom hooks
│   └── store/           # State management
├── prisma/
│   └── schema.prisma    # Database schema
└── docker-compose.yml   # Docker configuration
\`\`\`

## 🎨 Design System

- **Colors**: Blue gradient primary, Purple secondary, Gold accent
- **Fonts**: Inter (body), Poppins (headings), JetBrains Mono (code)
- **Animations**: 60-144 FPS smooth animations
- **Effects**: Glassmorphism, gradients, shadows

## 📈 League System

| League | Points | Sub-Tiers |
|--------|--------|-----------|
| Bronze | 0-200 | V-I |
| Silver | 201-400 | V-I |
| Gold | 401-600 | V-I |
| Diamond | 601-800 | V-I |
| Master | 801-1000 | V-I |
| Conqueror | 1000+ | I, II, III... |

## 📝 Documentation

See [README_PROJECT_REQUIREMENTS.md](./README_PROJECT_REQUIREMENTS.md) for complete feature specifications.

---

**Status**: Active Development | Many features being implemented
