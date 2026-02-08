# 🚀 Complete Environment Setup Guide for Prep CP

This guide provides **detailed, step-by-step instructions** for obtaining every API key, secret, and credential needed to run the Prep CP coding platform. All services listed have **FREE TIER** options that can support **1000+ concurrent users** with zero monthly costs.

---

## 📋 Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Supabase (Database + Auth + Storage)](#2-supabase-database--auth--storage)
3. [NextAuth.js Configuration](#3-nextauthjs-configuration)
4. [OAuth Providers](#4-oauth-providers)
   - [4.1 Google OAuth](#41-google-oauth)
   - [4.2 GitHub OAuth](#42-github-oauth)
5. [AI & LLM Services](#5-ai--llm-services)
   - [5.1 Ollama (Self-Hosted)](#51-ollama-self-hosted---recommended)
   - [5.2 Hugging Face](#52-hugging-face)
   - [5.3 Google Gemini](#53-google-gemini)
6. [Piston API (Code Execution)](#6-piston-api-code-execution)
7. [Upstash Redis (Caching)](#7-upstash-redis-caching)
8. [Cloudinary (File Storage)](#8-cloudinary-file-storage)
9. [Resend (Email Service)](#9-resend-email-service)
10. [Razorpay (Payment Processing)](#10-razorpay-payment-processing)
11. [Monitoring & Analytics](#11-monitoring--analytics)
    - [11.1 Sentry](#111-sentry-error-monitoring)
    - [11.2 PostHog](#112-posthog-analytics)
12. [Final Setup & Testing](#12-final-setup--testing)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **npm** or **yarn** package manager
- ✅ **Git** for version control
- ✅ A **valid email address** for signing up to services
- ✅ A **GitHub account** (required for OAuth and some services)
- ✅ A **Google account** (required for OAuth and Gemini)

---

## 2. Supabase (Database + Auth + Storage)

**What it provides:** PostgreSQL database, user authentication, file storage, and real-time subscriptions

**Free Tier:** 500MB database, 2GB bandwidth/month, unlimited API requests

### Step-by-Step Setup:

1. **Sign Up for Supabase**
   - Go to [https://supabase.com](https://supabase.com)
   - Click **"Start your project"**
   - Sign in with GitHub (recommended for easier management)

2. **Create a New Project**
   - Click **"New Project"**
   - Choose an organization (or create one)
   - Fill in project details:
     - **Name:** `prep-cp` (or any name you prefer)
     - **Database Password:** Generate a strong password and **save it securely**
     - **Region:** Choose the closest region to your users (e.g., `us-east-1`, `ap-southeast-1`)
     - **Pricing Plan:** Free tier (default)
   - Click **"Create new project"** (takes 2-3 minutes to provision)

3. **Get Your API Credentials**
   
   Once the project is ready:
   
   - Go to **Settings** → **API** (in the left sidebar)
   - Copy the following values:
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   
   - **Project URL:** Found under "Project URL"
   - **anon/public key:** Found under "Project API keys" → `anon public`
   - **service_role key:** Found under "Project API keys" → `service_role` (⚠️ **Keep this secret!**)

4. **Get Database Connection String**
   
   - Go to **Settings** → **Database**
   - Scroll to **Connection string** → **URI**
   - Copy the connection string (it looks like):
   
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project-ref.supabase.co:5432/postgres
   ```
   
   - Replace `[YOUR-PASSWORD]` with the database password you set in step 2

5. **Configure Authentication Providers (Optional but Recommended)**
   
   - Go to **Authentication** → **Providers**
   - Enable **Email** (enabled by default)
   - Configure Google and GitHub OAuth (see sections 4.1 and 4.2)

6. **Set Up Database Schema**
   
   ```bash
   # If using Prisma (recommended)
   npx prisma db push
   
   # Or run SQL migrations in Supabase SQL Editor
   # Go to SQL Editor → New Query
   # Copy and paste your schema from DATABASE_SCHEMA.md
   ```

---

## 3. NextAuth.js Configuration

**What it provides:** Unified authentication handling for all OAuth providers and email/password

### Step-by-Step Setup:

1. **Generate NextAuth Secret**
   
   Open your terminal and run:
   
   ```bash
   openssl rand -base64 32
   ```
   
   This generates a secure random string like: `k8jH5x9Lm2Qp7Wr3Vt6Yn1Zb4Cd8Fg0`

2. **Add to .env**
   
   ```env
   NEXTAUTH_SECRET=k8jH5x9Lm2Qp7Wr3Vt6Yn1Zb4Cd8Fg0
   NEXTAUTH_URL=http://localhost:3000
   ```
   
   ⚠️ **Important:** 
   - For production, set `NEXTAUTH_URL` to your actual domain (e.g., `https://yourdomain.com`)
   - Keep `NEXTAUTH_SECRET` **secret** and **unique** for each environment (dev, staging, prod)

---

## 4. OAuth Providers

### 4.1 Google OAuth

**What it provides:** Allow users to sign in with their Google account

**Cost:** FREE forever

#### Step-by-Step Setup:

1. **Go to Google Cloud Console**
   - Visit [https://console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account

2. **Create a New Project** (if you don't have one)
   - Click the project dropdown at the top
   - Click **"New Project"**
   - Name: `Prep CP` (or any name)
   - Click **"Create"**

3. **Enable Google+ API** (Required for OAuth)
   - In the left sidebar, go to **"APIs & Services"** → **"Library"**
   - Search for **"Google+ API"** or **"Google People API"**
   - Click on it and press **"Enable"**

4. **Configure OAuth Consent Screen**
   - Go to **"APIs & Services"** → **"OAuth consent screen"**
   - Choose **"External"** (unless you have Google Workspace)
   - Click **"Create"**
   - Fill in required fields:
     - **App name:** Prep CP
     - **User support email:** your-email@gmail.com
     - **Developer contact:** your-email@gmail.com
   - Click **"Save and Continue"**
   - **Scopes:** Click "Add or Remove Scopes"
     - Add: `email`, `profile`, `openid`
   - Click **"Save and Continue"**
   - **Test users:** Add your email for testing (during development)
   - Click **"Save and Continue"**

5. **Create OAuth Credentials**
   - Go to **"APIs & Services"** → **"Credentials"**
   - Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
   - Application type: **"Web application"**
   - Name: `Prep CP Web App`
   - **Authorized JavaScript origins:**
     ```
     http://localhost:3000
     https://yourdomain.com (add later for production)
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:3000/api/auth/callback/google
     https://yourdomain.com/api/auth/callback/google (add later)
     ```
   - Click **"Create"**

6. **Copy Your Credentials**
   
   A popup will show your credentials:
   
   ```env
   GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-abcd1234efgh5678
   ```
   
   Copy both and add to your `.env` file

7. **Publish Your App (Optional - For Production)**
   - Go to **OAuth consent screen**
   - Click **"Publish App"**
   - This removes the "unverified app" warning for users

---

### 4.2 GitHub OAuth

**What it provides:** Allow users to sign in with their GitHub account

**Cost:** FREE forever

#### Step-by-Step Setup:

1. **Go to GitHub Developer Settings**
   - Visit [https://github.com/settings/developers](https://github.com/settings/developers)
   - Or: Click your profile → Settings → Developer settings (bottom left)

2. **Create a New OAuth App**
   - Click **"OAuth Apps"** in the left sidebar
   - Click **"New OAuth App"** (or "Register a new application")

3. **Fill in Application Details**
   - **Application name:** Prep CP
   - **Homepage URL:** `http://localhost:3000` (or your production URL)
   - **Application description:** Gamified coding practice platform (optional)
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
     - ⚠️ This URL must be **exact**
     - For production, add: `https://yourdomain.com/api/auth/callback/github`
   - Click **"Register application"**

4. **Generate Client Secret**
   - You'll see your **Client ID** immediately
   - Click **"Generate a new client secret"**
   - Copy the secret **immediately** (you won't see it again)

5. **Copy Your Credentials**
   
   ```env
   GITHUB_CLIENT_ID=Iv1.a1b2c3d4e5f6g7h8
   GITHUB_CLIENT_SECRET=abcd1234efgh5678ijkl9012mnop3456qrst7890
   ```
   
   Add both to your `.env` file

6. **Update for Production**
   - When deploying, come back to this page
   - Update **Homepage URL** and **Authorization callback URL** to your production domain

---

## 5. AI & LLM Services

The platform supports three AI services with automatic fallback:

### 5.1 Ollama (Self-Hosted) - **RECOMMENDED**

**What it provides:** Completely free, unlimited AI models running locally

**Cost:** FREE forever (self-hosted)

**Benefits:**
- ✅ Unlimited requests (no rate limits)
- ✅ No API costs
- ✅ Works offline
- ✅ Faster response times (runs on your hardware)
- ✅ Privacy-friendly (data never leaves your server)

#### Step-by-Step Setup:

1. **Install Ollama**
   
   **On Linux/WSL/macOS:**
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```
   
   **On Windows:**
   - Download from [https://ollama.com/download](https://ollama.com/download)
   - Run the installer
   
   **On Docker:**
   ```bash
   docker pull ollama/ollama
   docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
   ```

2. **Start Ollama Service**
   
   ```bash
   # Start in background
   ollama serve
   
   # Or on Linux with systemd (automatic)
   sudo systemctl start ollama
   sudo systemctl enable ollama
   ```

3. **Download AI Models**
   
   ```bash
   # For general chat (recommended)
   ollama pull llama3
   
   # For code assistance (recommended)
   ollama pull codellama
   
   # Alternative smaller model
   ollama pull mistral
   
   # Check installed models
   ollama list
   ```

4. **Add to .env**
   
   ```env
   OLLAMA_HOST=http://localhost:11434
   OLLAMA_DEFAULT_MODEL=llama3
   ```
   
   For production (if hosting Ollama on a separate server):
   ```env
   OLLAMA_HOST=http://your-ollama-server:11434
   ```

5. **Test Ollama**
   
   ```bash
   # Test in terminal
   ollama run llama3 "Hello, how are you?"
   
   # Test API
   curl http://localhost:11434/api/generate -d '{
     "model": "llama3",
     "prompt": "Why is the sky blue?"
   }'
   ```

---

### 5.2 Hugging Face

**What it provides:** Cloud-based AI/LLM API with 30,000 free requests/month

**Free Tier:** 30,000 requests/month

#### Step-by-Step Setup:

1. **Sign Up for Hugging Face**
   - Go to [https://huggingface.co](https://huggingface.co)
   - Click **"Sign Up"**
   - Sign up with email or GitHub

2. **Create an Access Token**
   - Click your profile picture (top right)
   - Go to **Settings** → **Access Tokens**
   - Click **"New token"**
   - **Name:** Prep CP
   - **Role:** Select **"Read"** (sufficient for API usage)
   - Click **"Generate a token"**

3. **Copy Your Token**
   
   ```env
   HUGGINGFACE_API_KEY=hf_abcdefghijklmnopqrstuvwxyz1234567890
   ```
   
   Add to your `.env` file

4. **Test Your Token**
   
   ```bash
   curl https://api-inference.huggingface.co/models/gpt2 \
     -X POST \
     -H "Authorization: Bearer hf_your_token" \
     -d '{"inputs": "The answer to the universe is"}'
   ```

---

### 5.3 Google Gemini

**What it provides:** Google's AI model with generous free tier

**Free Tier:** 60 requests/minute, extensive daily quota

#### Step-by-Step Setup:

1. **Get Gemini API Key**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Or: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click **"Create API Key"**
   - Select or create a Google Cloud Project
   - Click **"Create API key in existing project"** (or create new)
   - Copy the generated key

3. **Add to .env**
   
   ```env
   GOOGLE_GEMINI_API_KEY=AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q
   ```

4. **Test Your Key**
   
   ```bash
   curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY" \
     -H 'Content-Type: application/json' \
     -d '{"contents":[{"parts":[{"text":"Explain quantum computing"}]}]}'
   ```

---

## 6. Piston API (Code Execution)

**What it provides:** Secure code execution in 50+ programming languages

**Free Options:**
1. Public API (free with rate limits)
2. Self-hosted (unlimited, recommended for production)

### Option A: Public API (Quick Setup)

1. **No Sign-Up Required**
   
   Simply add to `.env`:
   
   ```env
   PISTON_API_URL=https://emkc.org/api/v2/piston
   ```

2. **Test the API**
   
   ```bash
   curl -X POST https://emkc.org/api/v2/piston/execute \
     -H "Content-Type: application/json" \
     -d '{
       "language": "python",
       "version": "3.10",
       "files": [{
         "name": "main.py",
         "content": "print(\"Hello from Piston!\")"
       }]
     }'
   ```

### Option B: Self-Hosted (Recommended for Production)

1. **Clone Piston Repository**
   
   ```bash
   git clone https://github.com/engineer-man/piston.git
   cd piston
   ```

2. **Install and Start Piston**
   
   ```bash
   # Using Docker Compose (easiest)
   docker-compose up -d
   
   # Or using Docker directly
   docker run -d \
     -v piston_packages:/piston/packages \
     -p 2000:2000 \
     --name piston_api \
     ghcr.io/engineer-man/piston
   ```

3. **Install Language Runtimes**
   
   ```bash
   # Install specific languages
   docker exec piston_api piston ppman install python 3.10
   docker exec piston_api piston ppman install javascript 18.15
   docker exec piston_api piston ppman install java 15.0
   docker exec piston_api piston ppman install cpp 10.2
   
   # Or install all languages
   docker exec piston_api piston ppman install-all
   ```

4. **Update .env**
   
   ```env
   PISTON_API_URL=http://localhost:2000
   ```
   
   For production (separate server):
   ```env
   PISTON_API_URL=https://piston.yourdomain.com
   ```

5. **Test Self-Hosted Instance**
   
   ```bash
   curl http://localhost:2000/api/v2/runtimes
   ```

---

## 7. Upstash Redis (Caching)

**What it provides:** Serverless Redis for rate limiting, session management, and caching

**Free Tier:** 10,000 commands/day, 256MB storage

### Step-by-Step Setup:

1. **Sign Up for Upstash**
   - Go to [https://upstash.com](https://upstash.com)
   - Click **"Get Started for Free"**
   - Sign in with Google, GitHub, or email

2. **Create a Redis Database**
   - Click **"Create Database"**
   - **Name:** `prep-cp-cache`
   - **Type:** Choose **"Regional"** (faster) or **"Global"** (redundancy)
   - **Region:** Choose closest to your users (e.g., `us-east-1`)
   - **Eviction:** Select **"noeviction"** (recommended)
   - Click **"Create"**

3. **Get Your Credentials**
   
   - Once created, click on your database
   - Go to the **"Details"** tab
   - Copy the credentials:
   
   ```env
   UPSTASH_REDIS_REST_URL=https://your-redis-name.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AX12abYZ34cdEF56ghIJ78klMN90opQR12stUV34wxYZ56
   ```

4. **Test Your Redis Connection**
   
   ```bash
   curl https://your-redis-name.upstash.io/set/test/hello \
     -H "Authorization: Bearer YOUR_TOKEN"
   
   curl https://your-redis-name.upstash.io/get/test \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

---

## 8. Cloudinary (File Storage)

**What it provides:** Cloud storage for images, videos, and files with automatic optimization

**Free Tier:** 25GB storage, 25GB bandwidth/month, 25,000 transformations

### Step-by-Step Setup:

1. **Sign Up for Cloudinary**
   - Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
   - Click **"Sign Up for Free"**
   - Fill in your details or sign up with Google/GitHub

2. **Access Your Dashboard**
   - After signing up, you'll be redirected to the Dashboard
   - The dashboard shows your usage and credentials

3. **Get Your Credentials**
   
   On the Dashboard page, you'll see:
   
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwx
   ```
   
   - **Cloud Name:** Displayed prominently at the top
   - **API Key:** Found in "Account Details" section
   - **API Secret:** Click "reveal" to see it (keep it secret!)

4. **Create Upload Preset (Optional but Recommended)**
   
   For allowing unsigned uploads from the browser:
   
   - Go to **Settings** → **Upload**
   - Scroll to **Upload presets**
   - Click **"Add upload preset"**
   - **Preset name:** `prep_cp_uploads`
   - **Signing Mode:** Select **"Unsigned"**
   - **Folder:** `prep-cp/` (organizes uploads)
   - Configure other settings as needed
   - Click **"Save"**
   
   Then add to `.env`:
   ```env
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=prep_cp_uploads
   ```

5. **Test Upload**
   
   ```bash
   curl -X POST https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload \
     -F "file=@/path/to/image.jpg" \
     -F "upload_preset=prep_cp_uploads"
   ```

---

## 9. Resend (Email Service)

**What it provides:** Modern email API for transactional emails

**Free Tier:** 3,000 emails/month, 100 emails/day

### Step-by-Step Setup:

1. **Sign Up for Resend**
   - Go to [https://resend.com](https://resend.com)
   - Click **"Start Building"** or **"Sign Up"**
   - Sign in with Google, GitHub, or email

2. **Create API Key**
   - Go to **API Keys** in the left sidebar
   - Click **"Create API Key"**
   - **Name:** Prep CP
   - **Permission:** Select **"Sending access"**
   - **Domain:** Select your domain (or use test domain for now)
   - Click **"Add"**

3. **Copy Your API Key**
   
   ```env
   RESEND_API_KEY=re_123456789abcdefghijklmnopqrstuvw
   ```
   
   ⚠️ **Important:** Save this immediately, you won't see it again!

4. **Configure Sender Email**
   
   **Option A: Use Test Domain (For Development)**
   
   Resend provides a test domain for development:
   
   ```env
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```
   
   **Option B: Add Your Own Domain (For Production)**
   
   - Go to **Domains** in the left sidebar
   - Click **"Add Domain"**
   - Enter your domain (e.g., `yourdomain.com`)
   - Add the DNS records to your domain registrar:
     - **SPF Record** (TXT)
     - **DKIM Record** (TXT)
   - Wait for verification (usually 5-15 minutes)
   - Once verified, set:
   
   ```env
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

5. **Test Email Sending**
   
   ```bash
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer re_YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "your-email@example.com",
       "subject": "Test Email from Prep CP",
       "html": "<p>Hello from Prep CP!</p>"
     }'
   ```

---

## 10. Razorpay (Payment Processing)

**What it provides:** Payment gateway for Pro subscription (primarily for Indian users)

**Cost:** Free to integrate, transaction fees only when you earn revenue

**Alternatives:** For international users, consider Stripe (similar setup process)

### Step-by-Step Setup:

1. **Sign Up for Razorpay**
   - Go to [https://dashboard.razorpay.com/signup](https://dashboard.razorpay.com/signup)
   - Fill in business details:
     - Business name
     - Email
     - Phone number
   - Verify email and phone
   - Complete KYC (for production account activation)

2. **Access Dashboard**
   - After signup, go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
   - You'll start in **Test Mode** (perfect for development)

3. **Get Test API Keys**
   
   - Go to **Settings** → **API Keys**
   - You'll see Test Keys (or click "Generate Test Keys")
   
   ```env
   RAZORPAY_KEY_ID=rzp_test_AbCdEfGhIjKlMnOp
   RAZORPAY_KEY_SECRET=QrStUvWxYzAbCdEfGhIjKlMn
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_AbCdEfGhIjKlMnOp
   ```
   
   ⚠️ **Note:** Test keys start with `rzp_test_`, live keys with `rzp_live_`

4. **Configure Webhooks (Important for Payment Verification)**
   
   - Go to **Settings** → **Webhooks**
   - Click **"Create Webhook"**
   - **Webhook URL:** `https://yourdomain.com/api/webhooks/razorpay`
     - For local testing, use [ngrok](https://ngrok.com): `https://your-id.ngrok.io/api/webhooks/razorpay`
   - **Secret:** Generate a random string (will be used to verify webhook authenticity)
   - **Alert Email:** Your email
   - **Active Events:** Select:
     - `payment.authorized`
     - `payment.captured`
     - `payment.failed`
     - `subscription.activated`
     - `subscription.cancelled`
   - Click **"Create Webhook"**
   
   Add webhook secret to `.env`:
   ```env
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
   ```

5. **Test Payment Flow (Test Mode)**
   
   - Use test card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - OTP: `123456`

6. **Activate Live Mode (For Production)**
   
   - Complete KYC verification
   - Submit business documents
   - Wait for approval (1-3 business days)
   - Generate live API keys
   - Switch from `rzp_test_*` to `rzp_live_*` keys

---

## 11. Monitoring & Analytics

### 11.1 Sentry (Error Monitoring)

**What it provides:** Real-time error tracking and performance monitoring

**Free Tier:** 5,000 errors/month

#### Step-by-Step Setup:

1. **Sign Up for Sentry**
   - Go to [https://sentry.io/signup/](https://sentry.io/signup/)
   - Sign up with Google, GitHub, or email

2. **Create a New Project**
   - After signup, click **"Create Project"**
   - **Platform:** Select **"Next.js"**
   - **Project name:** `prep-cp`
   - Click **"Create Project"**

3. **Get Your DSN**
   
   - After creating the project, you'll see a DSN:
   
   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/789012
   ```

4. **Get Auth Token (Optional - for source maps)**
   
   - Go to **Settings** → **Account** → **API** → **Auth Tokens**
   - Click **"Create New Token"**
   - **Scopes:** Select:
     - `project:releases`
     - `org:read`
   - Copy the token:
   
   ```env
   SENTRY_AUTH_TOKEN=sntrys_abc123def456ghi789jkl012mno345pqr678
   ```

5. **Get Organization and Project Slugs**
   
   From your project URL: `https://sentry.io/organizations/your-org/projects/prep-cp/`
   
   ```env
   SENTRY_ORG=your-org
   SENTRY_PROJECT=prep-cp
   ```

6. **Install Sentry in Your Project**
   
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```
   
   This will automatically configure Sentry in your Next.js project.

---

### 11.2 PostHog (Analytics)

**What it provides:** Product analytics, feature flags, session recording, A/B testing

**Free Tier:** 1M events/month, unlimited feature flags

#### Step-by-Step Setup:

1. **Sign Up for PostHog**
   - Go to [https://posthog.com/signup](https://posthog.com/signup)
   - Click **"Get started - free"**
   - Sign up with Google, GitHub, or email

2. **Create a New Project**
   - After signup, create your first project
   - **Project name:** Prep CP
   - **Industry:** Education / Developer Tools

3. **Get Your API Key**
   
   - After project creation, you'll see the API key
   - Or go to **Project Settings** → **Project API Key**
   
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=phc_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```
   
   **For self-hosted PostHog:**
   ```env
   NEXT_PUBLIC_POSTHOG_HOST=https://your-posthog-instance.com
   ```

4. **Install PostHog in Your Project**
   
   ```bash
   npm install posthog-js
   ```
   
   The project already includes PostHog integration in `src/lib/analytics.ts`

5. **Configure Features (Optional)**
   
   - **Session Recording:** Enable in Project Settings
   - **Feature Flags:** Create flags in the Feature Flags tab
   - **Funnels:** Set up conversion funnels
   - **Dashboards:** Create custom analytics dashboards

---

## 12. Final Setup & Testing

### 12.1 Create Your .env.local File

1. **Copy the example file:**
   
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in all the credentials** you collected from the steps above

3. **Verify all required variables are set:**
   
   ```bash
   # Check for missing values
   grep "your_" .env.local
   ```
   
   If you see any `your_*` placeholders, go back and fill them in.

### 12.2 Install Dependencies

```bash
npm install
# or
yarn install
```

### 12.3 Test Database Connection

```bash
# If using Prisma
npx prisma generate
npx prisma db push

# Test connection
npx prisma studio
```

### 12.4 Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and test:

- ✅ Authentication (Google, GitHub, Email)
- ✅ Code execution (try running a simple program)
- ✅ AI chatbot (ask a question)
- ✅ File upload (change avatar)
- ✅ Check browser console and Sentry for errors

### 12.5 Production Deployment Checklist

When deploying to production:

- [ ] Update all URLs from `localhost:3000` to your production domain
- [ ] Switch from test API keys to production keys (especially Razorpay)
- [ ] Set `NODE_ENV=production`
- [ ] Configure OAuth callback URLs for production domain
- [ ] Set up proper domain for email sending (Resend)
- [ ] Enable HTTPS (Vercel does this automatically)
- [ ] Add environment variables to your hosting platform (Vercel/Netlify/etc.)
- [ ] Test all features in production
- [ ] Monitor Sentry for errors
- [ ] Check PostHog for analytics

---

## 13. Troubleshooting

### Common Issues and Solutions

#### 1. **Supabase Connection Error**

**Error:** `Error: Invalid API key`

**Solution:**
- Verify your API keys are correct (no extra spaces)
- Ensure you're using the correct project URL
- Check that environment variables are loaded (restart dev server)

---

#### 2. **OAuth Redirect Error**

**Error:** `redirect_uri_mismatch`

**Solution:**
- Verify redirect URI in OAuth provider settings matches exactly:
  - Google: `http://localhost:3000/api/auth/callback/google`
  - GitHub: `http://localhost:3000/api/auth/callback/github`
- Check for trailing slashes (shouldn't have any)
- Ensure `NEXTAUTH_URL` is set correctly

---

#### 3. **Ollama Not Working**

**Error:** `ECONNREFUSED` or `Cannot connect to Ollama`

**Solution:**
- Check if Ollama is running: `curl http://localhost:11434/api/version`
- Start Ollama: `ollama serve`
- Verify `OLLAMA_HOST` is set correctly
- On Linux, check service: `sudo systemctl status ollama`

---

#### 4. **Code Execution Timeout**

**Error:** Piston API timeout or 504 error

**Solution:**
- If using public API, you may have hit rate limits
- Consider self-hosting Piston
- Check if Piston service is running: `curl http://localhost:2000/api/v2/runtimes`
- Increase timeout in code execution service

---

#### 5. **Redis Connection Error**

**Error:** `WRONGPASS` or `Authentication required`

**Solution:**
- Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are correct
- Check if URLs have trailing slashes (remove them)
- Test connection with curl (see step 7.4)

---

#### 6. **Email Not Sending**

**Error:** `Invalid API key` or emails not received

**Solution:**
- Verify `RESEND_API_KEY` is correct
- Check sender email is from verified domain
- For testing, use `onboarding@resend.dev`
- Check Resend dashboard for delivery logs
- Verify email isn't in spam folder

---

#### 7. **Payment Webhook Not Working**

**Error:** Payments succeed but not recorded in database

**Solution:**
- Verify webhook URL is accessible from internet
- Use ngrok for local testing: `ngrok http 3000`
- Check `RAZORPAY_WEBHOOK_SECRET` matches webhook configuration
- Look for webhook delivery logs in Razorpay dashboard
- Verify webhook signature validation in code

---

#### 8. **Environment Variables Not Loading**

**Error:** `undefined` when accessing `process.env.*`

**Solution:**
- Restart development server after changing `.env.local`
- Ensure file is named `.env.local` (not `.env`)
- For `NEXT_PUBLIC_*` variables, rebuild: `npm run build`
- Check file permissions: `chmod 600 .env.local`

---

#### 9. **AI Models Give Poor Responses**

**Solution:**
- For Ollama: Try different models (llama3, mistral, codellama)
- Increase AI_SERVICE_PRIORITY to try different providers
- Check if model is downloaded: `ollama list`
- Fine-tune prompts in `src/lib/ai.ts`

---

#### 10. **High Costs on Free Tier**

**Solution:**
- Monitor usage dashboards for each service
- Implement rate limiting properly
- Cache AI responses where possible
- Use Ollama for most requests (unlimited)
- Set up alerts for approaching limits

---

## 🎉 You're All Set!

Congratulations! You've successfully configured all services for the Prep CP platform. 

### Next Steps:

1. **Test all features** thoroughly in development
2. **Read the main README.md** for feature documentation
3. **Check DATABASE_SCHEMA.md** for database structure
4. **Review DEPLOYMENT.md** for production deployment guide
5. **Join our community** (if available) for support

### Useful Resources:

- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 🔐 [NextAuth.js Guide](https://next-auth.js.org/getting-started/introduction)
- 🗄️ [Supabase Documentation](https://supabase.com/docs)
- 🤖 [Ollama Documentation](https://github.com/ollama/ollama)
- 💳 [Razorpay Documentation](https://razorpay.com/docs/)

### Need Help?

- Check GitHub Issues for common problems
- Create a new issue with detailed error information
- Include relevant logs from Sentry
- Share (sanitized) environment configuration

---

**Happy Coding! 🚀**
