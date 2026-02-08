# Deployment Guide - Free Hosting

Complete guide to deploy your Prep CP platform on free-tier services.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Best for Next.js)

**Free Tier:**
- Unlimited personal projects
- 100GB bandwidth/month
- Automatic HTTPS
- GitHub integration with auto-deploy
- Edge functions included

**Steps:**

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/prep-CP.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - Framework: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
   - Add environment variables (from .env.example)
   - Click "Deploy"

3. **Auto-Deploy Setup**:
   - Every push to `main` branch auto-deploys
   - Pull requests get preview deployments
   - Zero configuration needed!

4. **Custom Domain** (Optional):
   - Add your domain in Vercel dashboard
   - Update DNS records as shown
   - Free HTTPS certificate included

---

### Option 2: Netlify

**Free Tier:**
- 100GB bandwidth/month
- Continuous deployment
- Form handling
- Serverless functions

**Steps:**

1. **Build Configuration**:
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - New site from Git
   - Connect GitHub repo
   - Deploy!

---

### Option 3: Cloudflare Pages

**Free Tier:**
- Unlimited bandwidth! (Best CDN)
- Unlimited builds
- Edge computing
- DDoS protection

**Steps:**

1. **Connect Repository**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect GitHub repo

2. **Build Settings**:
   - Framework: Next.js
   - Build command: `npm run build`
   - Build output: `.next`

3. **Deploy**:
   - Click "Save and Deploy"
   - Cloudflare handles the rest!

---

## 📊 Database Deployment

### Supabase Setup

1. **Create Project**:
   - Go to [supabase.com](https://supabase.com)
   - New project
   - Choose region closest to users
   - Note credentials

2. **Run Migrations**:
   ```sql
   -- Copy and paste from DATABASE_SCHEMA.md
   -- Run in Supabase SQL Editor
   ```

3. **Configure Auth**:
   - Enable Google OAuth
   - Enable GitHub OAuth
   - Add redirect URLs:
     - `https://your-domain.com/api/auth/callback/google`
     - `https://your-domain.com/api/auth/callback/github`

4. **Set Up Storage**:
   - Create buckets: `avatars`, `banners`, `problems`
   - Set public access for required buckets
   - Configure CORS

---

## 🔧 Environment Variables Setup

### Production Environment Variables

Add these to Vercel/Netlify/Cloudflare:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# NextAuth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_production_secret

# OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

# AI Services
HUGGINGFACE_API_KEY=hf_xxx
GOOGLE_GEMINI_API_KEY=AIzaSy...

# Piston API
PISTON_API_URL=https://emkc.org/api/v2/piston

# Redis
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Resend
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=noreply@your-domain.com

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## 🌐 CDN Setup (Cloudflare)

### Add Your Domain to Cloudflare

1. **Add Site**:
   - Go to Cloudflare dashboard
   - Add site → Enter domain
   - Select Free plan

2. **Update Nameservers**:
   - Update at your domain registrar
   - Point to Cloudflare nameservers

3. **Configure Settings**:
   - SSL/TLS → Full (strict)
   - Speed → Optimization:
     - Auto Minify: JS, CSS, HTML
     - Brotli: Enabled
     - Early Hints: Enabled
   - Caching:
     - Browser Cache TTL: 4 hours
     - Always Online: Enabled

4. **Performance Benefits**:
   - Unlimited bandwidth (FREE!)
   - Global CDN
   - DDoS protection
   - Automatic HTTPS

---

## 📈 Self-Hosted Code Execution (Optional)

### Deploy Piston on Oracle Cloud Free Tier

**Oracle Cloud Free Tier:**
- 4 ARM CPUs
- 24GB RAM
- 200GB storage
- 10TB bandwidth/month
- **FOREVER FREE!**

**Steps:**

1. **Create Oracle Cloud Account**:
   - Go to [oracle.com/cloud/free](https://www.oracle.com/cloud/free/)
   - Sign up (requires credit card for verification, but won't charge)

2. **Create Compute Instance**:
   - Compute → Instances → Create Instance
   - Shape: VM.Standard.A1.Flex (ARM)
   - Choose: 4 OCPUs, 24GB RAM
   - OS: Ubuntu 22.04
   - Add SSH key

3. **Install Docker**:
   ```bash
   ssh ubuntu@your-instance-ip
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

4. **Deploy Piston**:
   ```bash
   git clone https://github.com/engineer-man/piston.git
   cd piston
   docker-compose up -d
   ```

5. **Configure Firewall**:
   ```bash
   # Open port 2000
   sudo iptables -I INPUT -p tcp --dport 2000 -j ACCEPT
   sudo netfilter-persistent save
   ```

6. **Update Environment Variable**:
   ```env
   PISTON_API_URL=http://your-instance-ip:2000/api/v2/piston
   ```

**Benefits:**
- Unlimited code executions
- Zero API costs
- Full control
- Powerful specs (4 CPUs, 24GB RAM)

---

## 🔍 Monitoring Setup

### Sentry (Error Tracking)

1. **Create Project**:
   - Go to [sentry.io](https://sentry.io)
   - Create Next.js project

2. **Install**:
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

3. **Configure**:
   - Add DSN to environment variables
   - Auto-reports errors in production

### PostHog (Analytics)

1. **Create Project**:
   - Go to [posthog.com](https://posthog.com)
   - Create new project

2. **Add to App**:
   ```typescript
   // Already configured in src/lib/analytics.ts
   // Just add environment variables
   ```

---

## ✅ Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema applied
- [ ] OAuth redirect URLs updated
- [ ] Cloudinary upload preset created
- [ ] Email domain verified in Resend
- [ ] Razorpay KYC completed (if using payments)
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Custom domain configured (optional)
- [ ] CDN configured (Cloudflare)

---

## 🧪 Testing Production Deployment

```bash
# Test API endpoints
curl https://your-domain.com/api/ai/chat
curl https://your-domain.com/api/code-execution/execute

# Test authentication
# Visit: https://your-domain.com/auth/signin

# Test image upload
# Upload avatar in user settings

# Test payment flow
# Try upgrading to Pro
```

---

## 📊 Post-Deployment Monitoring

### Check Usage Weekly:

```bash
# Supabase Dashboard
- Database size: ___ MB / 500 MB
- API requests: ___ / unlimited

# Upstash Dashboard
- Commands: ___ / 10,000 per day

# Cloudinary Dashboard
- Storage: ___ GB / 25 GB
- Bandwidth: ___ GB / 25 GB

# Vercel Dashboard
- Bandwidth: ___ GB / 100 GB
- Build minutes: ___ / 6,000

# Resend Dashboard
- Emails sent: ___ / 3,000 per month
```

---

## 🚀 Scaling Plan

### When to Upgrade:

1. **Database (>500MB)**:
   - Upgrade to Supabase Pro ($25/month)
   - Or migrate to Neon Pro ($20/month)

2. **Redis (>10K commands/day)**:
   - Upgrade to Upstash Pro ($10/month)
   - Or use Vercel KV

3. **Bandwidth (>100GB/month)**:
   - Use Cloudflare (unlimited, FREE!)
   - Or upgrade Vercel to Pro ($20/month)

4. **Code Execution**:
   - Self-host on Oracle Cloud (FREE!)
   - Or upgrade Piston plan

**Total Scaling Cost: ~$10-25/month** for 5K+ users

---

## 🆘 Troubleshooting

### Build Fails:
```bash
# Check logs in Vercel/Netlify dashboard
# Common issues:
- Missing environment variables
- TypeScript errors
- Dependency conflicts

# Fix:
npm run build # Test locally first
```

### Database Connection Issues:
```bash
# Check Supabase credentials
# Verify IP whitelist (should be disabled for public access)
```

### API Errors:
```bash
# Check Sentry dashboard for error details
# Verify all API keys are correct
# Check rate limits
```

---

## 🎉 Success!

Your platform is now live on 100% free infrastructure! 🚀

**Next Steps:**
1. Share with users
2. Monitor usage
3. Optimize based on analytics
4. Scale when needed

**Support:**
- GitHub Issues: [repo URL]
- Discord: [invite link]
- Email: support@your-domain.com
