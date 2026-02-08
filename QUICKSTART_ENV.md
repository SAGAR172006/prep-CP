# 🚀 Quick Start - Environment Setup

> **TL;DR:** Fast setup guide for experienced developers. For detailed step-by-step instructions, see [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)

---

## ⚡ 5-Minute Setup

### 1. Clone and Install

```bash
git clone https://github.com/SAGAR172006/prep-CP.git
cd prep-CP
npm install
```

### 2. Copy Environment File

```bash
cp .env.example .env.local
```

### 3. Required Services (Minimum to Run)

#### Essential (Must Have):

1. **Supabase** → [supabase.com](https://supabase.com) → Get URL + Keys
2. **NextAuth Secret** → Run: `openssl rand -base64 32`

#### For Full Features:

3. **Google OAuth** → [console.cloud.google.com](https://console.cloud.google.com)
4. **GitHub OAuth** → [github.com/settings/developers](https://github.com/settings/developers)
5. **Ollama** (Local AI) → `curl -fsSL https://ollama.com/install.sh | sh && ollama pull llama3`

---

## 📝 Environment Variables Quick Reference

### Minimum Working Configuration

```env
# Database (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Auth (Required)
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000

# Code Execution (Free Public API)
PISTON_API_URL=https://emkc.org/api/v2/piston
```

### Recommended Configuration (With OAuth)

Add to above:

```env
# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx

# GitHub OAuth
GITHUB_CLIENT_ID=Iv1.xxx
GITHUB_CLIENT_SECRET=xxx

# AI (Local - Free & Unlimited)
OLLAMA_HOST=http://localhost:11434
```

### Full Production Configuration

See [.env.example](./.env.example) for complete list of all variables.

---

## 🔗 Service Quick Links

| Service | Signup | Get Credentials | Free Tier |
|---------|--------|-----------------|-----------|
| **Supabase** | [signup](https://supabase.com) | Dashboard → Settings → API | 500MB DB, 2GB bandwidth |
| **Google OAuth** | [console](https://console.cloud.google.com) | APIs & Services → Credentials | Unlimited |
| **GitHub OAuth** | [settings](https://github.com/settings/developers) | OAuth Apps → New | Unlimited |
| **Ollama** | [install](https://ollama.com/download) | Local - No account needed | Unlimited |
| **Hugging Face** | [signup](https://huggingface.co) | Settings → Access Tokens | 30k requests/month |
| **Google Gemini** | [signup](https://makersuite.google.com/app/apikey) | Create API Key | 60 req/min |
| **Upstash Redis** | [signup](https://upstash.com) | Create Database | 10k commands/day |
| **Cloudinary** | [signup](https://cloudinary.com/users/register/free) | Dashboard → Account Details | 25GB storage |
| **Resend** | [signup](https://resend.com) | API Keys | 3k emails/month |
| **Razorpay** | [signup](https://dashboard.razorpay.com/signup) | Settings → API Keys | Free integration |
| **Sentry** | [signup](https://sentry.io/signup/) | Project Settings | 5k errors/month |
| **PostHog** | [signup](https://posthog.com/signup) | Project Settings | 1M events/month |

---

## 🚀 Start Development

```bash
# Start Ollama (if installed)
ollama serve

# In another terminal
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📚 Detailed Guides

- **Complete Setup Instructions:** [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)
- **Environment Variables Reference:** [.env.example](./.env.example)
- **Project Setup:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Database Schema:** [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- **Deployment:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🆘 Common Issues

### "Cannot connect to Supabase"
→ Check API keys don't have extra spaces/newlines

### "OAuth redirect_uri_mismatch"
→ Verify callback URL: `http://localhost:3000/api/auth/callback/[provider]`

### "Ollama connection refused"
→ Start Ollama: `ollama serve`

### "Environment variables undefined"
→ Restart dev server: `npm run dev`

**More troubleshooting:** See [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md#13-troubleshooting)

---

## 💡 Tips

- ✅ Use `.env.local` for local development (auto-ignored by Git)
- ✅ Test with free tiers first, upgrade only when needed
- ✅ Set up Ollama for unlimited free AI (recommended)
- ✅ Use test keys during development
- ✅ Keep production secrets in hosting platform (Vercel/Netlify env vars)

---

## 🎯 Priority Services Setup Order

1. **Supabase** (5 min) - Database + Auth backend
2. **NextAuth Secret** (1 min) - Generate secret
3. **OAuth Providers** (10 min each) - Google + GitHub
4. **Ollama** (5 min) - Local AI
5. **Others** (Optional) - Add as needed

**Total time: ~30-40 minutes for full setup**

---

## 📞 Need Help?

- 📖 **Detailed Guide:** [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)
- 🐛 **Issues:** [GitHub Issues](https://github.com/SAGAR172006/prep-CP/issues)
- 💬 **Questions:** Create a discussion or issue

---

**Happy Coding! 🚀**
