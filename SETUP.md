# Setup Guide for Prep-CP Platform

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (v6 or higher) - You can use MongoDB Atlas (cloud) or local installation
- **Git**

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/SAGAR172006/prep-CP.git
cd prep-CP
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file and fill in your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/prep-cp

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32
JWT_SECRET=your-jwt-secret-here

# OAuth Providers (Optional - for Google/GitHub login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Other services (can be configured later)
STRIPE_SECRET_KEY=your-stripe-key
OPENAI_API_KEY=your-openai-key
```

### 4. Start MongoDB

If using local MongoDB:

```bash
# macOS/Linux
mongod --dbpath /path/to/data/directory

# Windows
mongod.exe --dbpath C:\path\to\data\directory
```

Or use MongoDB Atlas (cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and add to `.env`

### 5. Run the Application

#### Development Mode (Frontend + Backend)

```bash
# Start both frontend and backend
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 - Frontend (Next.js)
npm run dev

# Terminal 2 - Backend (Express)
npm run dev:backend
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### 6. Verify Installation

1. Open http://localhost:3000 in your browser
2. You should see the landing page
3. Try signing up for a new account
4. Check backend health: http://localhost:3001/api/health

## Setting up OAuth (Optional)

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env`

## Building for Production

```bash
# Build the frontend
npm run build

# Start production server
npm start
```

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Review the [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system design
2. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
3. Start by exploring the codebase:
   - `pages/` - Frontend pages and API routes
   - `components/` - React components
   - `backend/` - Backend API server
   - `backend/models/` - Database models

## Need Help?

- Check existing issues on GitHub
- Create a new issue if you encounter problems
- Join our community Discord (link TBD)

---

Happy coding! 🚀
