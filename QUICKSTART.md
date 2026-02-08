# Quick Start Guide

Get Prep-CP running locally in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- MongoDB installed (or use Docker)

## Installation

### Option 1: Using Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/SAGAR172006/prep-CP.git
cd prep-CP

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start MongoDB and Redis with Docker
npm run docker:up

# 5. Seed the database with sample problems
npm run seed

# 6. Start the application
npm run dev:all
```

Visit http://localhost:3000 to see the app!

### Option 2: Manual Setup

```bash
# 1. Clone and install
git clone https://github.com/SAGAR172006/prep-CP.git
cd prep-CP
npm install

# 2. Start MongoDB (in a separate terminal)
mongod

# 3. Copy and configure environment
cp .env.example .env
# Edit .env with your MongoDB connection string

# 4. Seed database
npm run seed

# 5. Start application
npm run dev:all
```

## Default Accounts

After seeding, you can:
- Sign up for a new account at http://localhost:3000/auth/signup
- Or test with OAuth (requires configuration)

## Available Scripts

- `npm run dev` - Start Next.js frontend (port 3000)
- `npm run dev:backend` - Start Express backend (port 3001)
- `npm run dev:all` - Start both frontend and backend
- `npm run seed` - Seed database with sample problems
- `npm run docker:up` - Start Docker services
- `npm run docker:down` - Stop Docker services
- `npm run lint` - Run ESLint
- `npm run build` - Build for production

## Testing the Application

### 1. Landing Page
Visit http://localhost:3000 - Should see hero section

### 2. Sign Up
1. Click "Sign Up"
2. Fill in details
3. Create account

### 3. Home Dashboard
After login, you'll see:
- Course cards
- User stats
- Navigation header

### 4. Problem Solving
1. Click on any course
2. Select a problem
3. Write code in Monaco editor
4. Run test cases

## Project Structure

```
prep-CP/
├── pages/          # Next.js pages
├── components/     # React components
├── backend/        # Express backend
│   ├── models/    # Database models
│   ├── seeders/   # Database seeders
│   └── utils/     # Utility functions
├── styles/        # Global styles
└── public/        # Static assets
```

## Common Issues

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### MongoDB connection error
- Ensure MongoDB is running: `mongod --version`
- Check connection string in `.env`
- Try: `mongodb://localhost:27017/prep-cp`

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ App is running locally
2. 📝 Read [SETUP.md](./SETUP.md) for detailed configuration
3. 🏗️ Check [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system
4. 🤝 See [CONTRIBUTING.md](./CONTRIBUTING.md) to start contributing

## Need Help?

- Check [SETUP.md](./SETUP.md) for detailed instructions
- Read [README_IMPLEMENTATION.md](./README_IMPLEMENTATION.md) for current status
- Open an issue on GitHub

Happy coding! 🚀
