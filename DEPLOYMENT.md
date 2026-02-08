# Deployment Guide - CodeMaster Platform

## Prerequisites

Before deploying, ensure you have:

1. **Vercel Account** - For hosting the Next.js application
2. **PostgreSQL Database** - Railway, Supabase, or AWS RDS
3. **Redis Instance** - Upstash or AWS ElastiCache
4. **API Keys**:
   - Google OAuth credentials
   - GitHub OAuth credentials
   - OpenAI API key (for AI chatbot)
   - Judge0 API key (for code execution)
   - Stripe API keys (for payments)

## Step 1: Database Setup

### Using Railway (Recommended for Development)

1. Create a new Railway project
2. Add PostgreSQL database service
3. Copy the `DATABASE_URL` from Railway dashboard
4. Add to your `.env` file

### Using Supabase (Alternative)

1. Create a new Supabase project
2. Get the database connection string
3. Replace `postgres://` with `postgresql://` in the URL
4. Add to your `.env` file

### Apply Prisma Migrations

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Verify connection
npx prisma studio
```

## Step 2: Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth.js
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Redis
REDIS_URL="redis://default:password@host:port"

# OpenAI
OPENAI_API_KEY="sk-..."

# Judge0
JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
JUDGE0_API_KEY="your-rapidapi-key"

# Stripe
STRIPE_PUBLIC_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Application
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
```

## Step 3: OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret

### GitHub OAuth

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in details:
   - Application name: CodeMaster
   - Homepage URL: `https://your-domain.vercel.app`
   - Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`
4. Copy Client ID and Client Secret

## Step 4: Vercel Deployment

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
# ... add all other environment variables

# Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables in the project settings
6. Deploy

## Step 5: Post-Deployment

### Seed Initial Data

```bash
# Create a seed script (prisma/seed.ts)
npx tsx prisma/seed.ts

# Or run from local and connect to production DB
DATABASE_URL="your-production-db-url" npm run db:seed
```

### Verify Deployment

1. **Test Authentication**:
   - Visit `/auth/login`
   - Try email/password login
   - Try Google OAuth
   - Try GitHub OAuth

2. **Test Problem Solving**:
   - Visit `/problems/two-sum`
   - Write code in the editor
   - Verify paste is disabled
   - Submit a solution

3. **Test API Endpoints**:
   - `GET /api/problems` - List problems
   - `GET /api/problems/two-sum` - Get problem details
   - `POST /api/auth/signup` - Create user

### Monitor Performance

1. **Vercel Analytics**:
   - Enable in Vercel dashboard
   - Monitor Core Web Vitals
   - Track page load times

2. **Sentry (Optional)**:
   ```bash
   npm install @sentry/nextjs
   ```
   Configure error tracking

3. **Database Monitoring**:
   - Monitor connection pool usage
   - Check slow queries
   - Set up alerts

## Step 6: Custom Domain (Optional)

1. Go to Vercel project settings
2. Add your custom domain
3. Update DNS records:
   - Add A record: `76.76.21.21`
   - Add CNAME: `cname.vercel-dns.com`
4. Wait for SSL certificate provisioning (automatic)

## Step 7: Redis Setup

### Using Upstash (Recommended)

1. Create account at [Upstash](https://upstash.com)
2. Create a new Redis database
3. Select region close to your users
4. Copy the REST API URL
5. Add to environment variables

```env
REDIS_URL="redis://default:xxxxx@eu1-xxxxx.upstash.io:6379"
```

## Step 8: Judge0 Setup (Code Execution)

### Option 1: Judge0 API (Easier)

1. Sign up at [RapidAPI](https://rapidapi.com)
2. Subscribe to Judge0 CE API
3. Copy API key
4. Add to environment variables

```env
JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
JUDGE0_API_KEY="your-rapidapi-key"
```

### Option 2: Self-Hosted Judge0 (Advanced)

```bash
# Clone Judge0
git clone https://github.com/judge0/judge0.git
cd judge0

# Deploy with Docker
docker-compose up -d

# Configure URL
JUDGE0_API_URL="https://your-judge0-instance.com"
```

## Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Check connection string format
# Should be: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### Authentication Issues

1. Verify OAuth redirect URLs match exactly
2. Check `NEXTAUTH_URL` is set correctly
3. Ensure `NEXTAUTH_SECRET` is set (generate with `openssl rand -base64 32`)

### Performance Issues

1. Enable Redis caching
2. Add database indexes:
   ```sql
   CREATE INDEX idx_user_email ON "User"(email);
   CREATE INDEX idx_problem_slug ON "Problem"(slug);
   CREATE INDEX idx_submission_user ON "Submission"("userId");
   ```
3. Optimize images with Next.js Image component
4. Enable ISR (Incremental Static Regeneration) for static pages

## Security Checklist

- [ ] All environment variables are set
- [ ] `NEXTAUTH_SECRET` is cryptographically random
- [ ] OAuth redirect URLs are whitelisted
- [ ] Database has SSL enabled
- [ ] Rate limiting is configured
- [ ] CORS is properly configured
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React handles this)
- [ ] Code execution is sandboxed
- [ ] API routes are protected with authentication

## Monitoring & Maintenance

### Set up Monitoring

1. **Vercel Analytics** - Built-in performance monitoring
2. **Sentry** - Error tracking
3. **LogRocket** - Session replay (optional)
4. **Uptime monitoring** - UptimeRobot or Pingdom

### Regular Maintenance

- Weekly: Check error logs
- Monthly: Review performance metrics
- Quarterly: Update dependencies
- As needed: Scale database and Redis

## Scaling Considerations

### When to Scale

- Response times > 2s
- Database CPU > 80%
- Redis memory > 80%
- High error rates

### How to Scale

1. **Database**: Upgrade tier or add read replicas
2. **Redis**: Increase memory or switch to cluster mode
3. **Next.js**: Vercel auto-scales (serverless)
4. **Judge0**: Add more workers or instances

## Cost Estimation (Monthly)

- **Vercel Pro**: $20/month
- **Railway PostgreSQL**: $5-20/month
- **Upstash Redis**: Free tier or $10/month
- **Judge0 API**: $10-50/month (based on usage)
- **OpenAI API**: $5-100/month (based on usage)
- **Stripe**: 2.9% + $0.30 per transaction

**Total**: $50-200/month for small to medium scale

## Support

For deployment issues:
- Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Check [Vercel Docs](https://vercel.com/docs)
- Check [Prisma Docs](https://www.prisma.io/docs)

---

**Note**: This guide assumes you have basic knowledge of web deployment. For production use, consider consulting with a DevOps professional.
