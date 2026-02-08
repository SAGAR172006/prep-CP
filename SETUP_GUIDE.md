# Free Tech Stack Implementation Guide

This document provides a complete guide to setting up and using the **100% FREE** tech stack for the Prep CP platform.

## 🎯 Overview

All services used in this project have generous free tiers that can support **1000+ users** with **zero monthly costs**. The stack is designed to scale, and you only pay when your revenue justifies the upgrade.

---

## 📋 Services Setup Guide

### 1. Supabase (Database + Auth + Storage + Realtime)

**Free Tier:** 500MB database, 2GB bandwidth/month, unlimited API requests

**Setup Steps:**
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Note down:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - Anon/Public Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - Service Role Key (SUPABASE_SERVICE_ROLE_KEY)
4. Run database migrations (see `DATABASE_SCHEMA.md`)

**What it replaces:** PostgreSQL, Auth0, AWS S3, Pusher/Socket.io

---

### 2. Hugging Face (AI/LLM)

**Free Tier:** 30,000 requests/month

**Setup Steps:**
1. Go to [huggingface.co](https://huggingface.co) and sign up
2. Navigate to Settings → Access Tokens
3. Create a new token with 'read' permissions
4. Add to .env: `HUGGINGFACE_API_KEY=hf_...`

**What it replaces:** OpenAI GPT-4, Claude

---

### 3. Google Gemini (AI Fallback)

**Free Tier:** Generous quota (60 requests/minute)

**Setup Steps:**
1. Go to [makersuite.google.com](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add to .env: `GOOGLE_GEMINI_API_KEY=...`

**What it replaces:** OpenAI GPT-4, Claude

---

### 4. Ollama (Local AI - Optional but Recommended)

**Free:** Completely free, self-hosted

**Setup Steps:**
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull models
ollama pull llama3
ollama pull codellama
ollama pull mistral

# Run in background
ollama serve
```

**Benefits:**
- Unlimited requests
- No API costs
- Works offline
- Faster response times

**What it replaces:** OpenAI GPT-4, Claude

---

### 5. Piston API (Code Execution)

**Free:** Public API with rate limits, or self-host unlimited

**Option A - Public API (Easiest):**
```env
PISTON_API_URL=https://emkc.org/api/v2/piston
```

**Option B - Self-Hosted (Recommended for Production):**
```bash
git clone https://github.com/engineer-man/piston.git
cd piston
docker-compose up -d
```

Then set:
```env
PISTON_API_URL=http://localhost:2000/api/v2/piston
```

**What it replaces:** Judge0, AWS Lambda, Custom Docker solutions

---

### 6. Upstash Redis (Caching)

**Free Tier:** 10,000 commands/day

**Setup Steps:**
1. Go to [upstash.com](https://upstash.com) and sign up
2. Create a Redis database
3. Note down:
   - REST URL (UPSTASH_REDIS_REST_URL)
   - REST Token (UPSTASH_REDIS_REST_TOKEN)

**What it replaces:** Redis Cloud, AWS ElastiCache

---

### 7. Cloudinary (File Storage)

**Free Tier:** 25GB storage, 25GB bandwidth/month

**Setup Steps:**
1. Go to [cloudinary.com](https://cloudinary.com) and sign up
2. From dashboard, note:
   - Cloud Name (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
   - API Key (CLOUDINARY_API_KEY)
   - API Secret (CLOUDINARY_API_SECRET)
3. Create upload preset named "prep-cp" (Settings → Upload)
   - Set mode to "unsigned" for client-side uploads
   - Add folder structure

**What it replaces:** AWS S3, Imgur

---

### 8. Resend (Email Service)

**Free Tier:** 3,000 emails/month, 100 emails/day

**Setup Steps:**
1. Go to [resend.com](https://resend.com) and sign up
2. Add and verify your domain (or use their testing domain)
3. Create API key
4. Add to .env:
   ```env
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

**What it replaces:** SendGrid, Mailgun, AWS SES

---

### 9. Razorpay (Payment Processing)

**Free:** No setup fees, only 2% transaction fees

**Setup Steps:**
1. Go to [razorpay.com](https://razorpay.com) and sign up
2. Complete KYC verification
3. Note down:
   - Key ID (NEXT_PUBLIC_RAZORPAY_KEY_ID)
   - Key Secret (RAZORPAY_KEY_SECRET)
4. Enable payment methods in dashboard

**Alternative for India:**
- UPI Direct: Zero fees, instant settlement
- Set up UPI QR code for manual payments

**What it replaces:** Stripe, PayPal

---

### 10. NextAuth.js (Authentication)

**Free:** Completely free, open-source

**Setup Steps:**
1. Generate secret:
   ```bash
   openssl rand -base64 32
   ```
2. Add to .env:
   ```env
   NEXTAUTH_SECRET=your_generated_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add authorized redirect: `http://localhost:3000/api/auth/callback/google`
5. Note Client ID and Secret

**GitHub OAuth:**
1. Go to [GitHub Settings → Developer Settings](https://github.com/settings/developers)
2. New OAuth App
3. Authorization callback: `http://localhost:3000/api/auth/callback/github`
4. Note Client ID and Secret

---

### 11. Sentry (Error Monitoring)

**Free Tier:** 5,000 events/month

**Setup Steps:**
1. Go to [sentry.io](https://sentry.io) and sign up
2. Create new project (Next.js)
3. Note DSN
4. Add to .env:
   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
   ```

---

### 12. PostHog (Analytics)

**Free Tier:** 1M events/month

**Setup Steps:**
1. Go to [posthog.com](https://posthog.com) and sign up
2. Create project
3. Note Project API Key
4. Add to .env:
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=phc_...
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

---

### 13. Vercel (Hosting)

**Free Tier:** Unlimited projects, 100GB bandwidth

**Setup Steps:**
1. Go to [vercel.com](https://vercel.com) and sign up
2. Import GitHub repository
3. Add environment variables
4. Deploy!

**Auto-deploys on every push to main branch**

---

### 14. Cloudflare (CDN + Security)

**Free Tier:** Unlimited bandwidth, DDoS protection

**Setup Steps:**
1. Go to [cloudflare.com](https://cloudflare.com) and sign up
2. Add your domain
3. Update nameservers at your domain registrar
4. Enable:
   - Auto minify (JS, CSS, HTML)
   - Brotli compression
   - Always Use HTTPS
   - Browser cache TTL

---

## 💰 Cost Comparison

### Free Tier Stack (0-1000 users)
- **Total Monthly Cost: $0** ✅

### When You Need to Scale (1000+ users)
- Database: $10-20/month (Supabase Pro or Neon)
- Redis: $0 (still within free tier)
- Code Execution: $0 (Oracle Cloud free tier)
- AI: $0 (still within free tier with caching)
- Everything else: $0 (free tiers are generous)
- **Total: ~$10-20/month**

### Traditional Paid Stack
- Vercel Pro: $20/month
- Database: $25/month
- Redis: $10/month
- OpenAI API: $100-200/month
- Code execution: $20/month
- Email: $10/month
- Monitoring: $20/month
- **Total: $205-305/month**

**Savings: $2,460-3,660/year!** 🎉

---

## 🚀 Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Fill in your API keys (follow setup guide above)
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Additional Resources

- [Database Schema](/docs/DATABASE_SCHEMA.md)
- [API Documentation](/docs/API_DOCS.md)
- [Deployment Guide](/docs/DEPLOYMENT.md)
- [Scaling Guide](/docs/SCALING.md)

---

## 🆘 Support

If you encounter issues:
1. Check the [Troubleshooting Guide](/docs/TROUBLESHOOTING.md)
2. Open an issue on GitHub
3. Join our Discord community

---

## 📝 License

MIT License - Use it freely!
