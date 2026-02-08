# Free Tier Optimization Guide

This guide helps you maximize the value of free tiers and stay within limits while serving 1000+ users.

## 🎯 Optimization Strategies

### 1. AI API Usage Optimization

**Problem:** AI APIs have request limits (30K/month for Hugging Face)

**Solutions:**

#### A. Aggressive Caching (80% reduction)
```typescript
// Before calling AI, check cache
const cacheKey = `ai:${action}:${hashCode(code)}`
const cached = await getCachedAIResponse(cacheKey)
if (cached) {
  return cached // Skip API call
}

// Make API call
const response = await chat(messages)

// Cache for 24 hours
await cacheAIResponse(cacheKey, response.content, 86400)
```

**Impact:** 30,000 requests → 150,000 effective requests

#### B. Use Ollama Locally
- Install Ollama on your development machine
- Run models locally (unlimited, free)
- Use in development, fallback to cloud in production

```bash
ollama pull codellama
ollama pull mistral
```

**Impact:** Zero API costs in development

#### C. Prompt Optimization
- Use shorter, more efficient prompts
- Batch similar requests
- Reduce max_tokens parameter

**Impact:** 20-30% reduction in token usage

---

### 2. Database Optimization (500MB Limit)

**Problem:** Supabase free tier has 500MB storage limit

**Solutions:**

#### A. Data Cleanup
```sql
-- Delete old submissions (keep last 30 days)
DELETE FROM submissions 
WHERE created_at < NOW() - INTERVAL '30 days';

-- Archive old AI chat history
DELETE FROM ai_chat_history 
WHERE created_at < NOW() - INTERVAL '7 days';
```

#### B. Efficient Indexing
- Only index frequently queried columns
- Use partial indexes for common filters

```sql
-- Instead of full index
CREATE INDEX idx_submissions_all ON submissions(user_id, problem_id, status);

-- Use partial index
CREATE INDEX idx_submissions_accepted 
ON submissions(user_id, problem_id) 
WHERE status = 'Accepted';
```

**Impact:** 30-40% storage reduction

#### C. JSON Compression
- Store large JSON fields compressed
- Decompress on client side

```typescript
// Before storing
const compressed = compress(JSON.stringify(testResults))
await supabase.from('submissions').insert({ test_results: compressed })
```

**Impact:** 50-60% reduction in JSON storage

---

### 3. Redis Optimization (10K Commands/Day)

**Problem:** Upstash free tier has 10,000 commands/day limit

**Solutions:**

#### A. Batch Operations
```typescript
// Bad: Multiple GET calls
for (const id of problemIds) {
  await redis.get(`problem:${id}`)
}

// Good: Single MGET call
await redis.mget(...problemIds.map(id => `problem:${id}`))
```

**Impact:** 10x reduction in commands

#### B. Longer TTL
- Cache frequently accessed data longer
- Use 24-hour TTL instead of 1-hour

```typescript
// Problems change rarely - cache for 24 hours
await redis.set('problem:123', data, { ex: 86400 })

// User sessions - cache for 1 hour
await redis.set('session:user123', data, { ex: 3600 })
```

**Impact:** 80% reduction in SET operations

#### C. Lazy Loading
- Only cache what's actually accessed
- Don't pre-populate cache

---

### 4. Code Execution Optimization

**Problem:** Public Piston API has rate limits

**Solutions:**

#### A. Queue System
```typescript
// Queue code executions
const queue = []
const MAX_CONCURRENT = 3

async function executeWithQueue(code, language) {
  await waitForSlot()
  return executeCode({ code, language })
}
```

**Impact:** Stay within rate limits

#### B. Test Case Batching
```typescript
// Run multiple test cases in one execution
const batchedInput = testCases.map(tc => tc.input).join('\n')
const result = await executeCode({
  code: wrapCodeWithBatching(code),
  stdin: batchedInput
})
```

**Impact:** 5-10x reduction in API calls

#### C. Self-Host on Oracle Cloud (Free!)
Oracle Cloud free tier includes:
- 4 ARM CPUs
- 24GB RAM
- Unlimited bandwidth

Perfect for running Piston!

```bash
# On Oracle Cloud VM
git clone https://github.com/engineer-man/piston.git
cd piston
docker-compose up -d
```

**Impact:** Unlimited executions, zero cost

---

### 5. File Storage Optimization (25GB Limit)

**Problem:** Cloudinary free tier has 25GB storage + 25GB bandwidth

**Solutions:**

#### A. Image Compression
```typescript
// Compress on upload
const compressed = await compressImage(file, {
  quality: 80,
  maxWidth: 1920,
  format: 'webp'
})

await uploadImage(compressed, 'avatars')
```

**Impact:** 70-80% storage reduction

#### B. Lazy Loading
- Use Cloudinary's transformation URLs
- Generate thumbnails on-the-fly
- Don't store multiple sizes

```typescript
// Don't store: small.jpg, medium.jpg, large.jpg
// Just store: original.jpg

// Get different sizes via URL
const thumbnail = getOptimizedImageUrl(publicId, { width: 150 })
const medium = getOptimizedImageUrl(publicId, { width: 500 })
```

**Impact:** 66% storage reduction

#### C. CDN Caching
- Set long cache headers
- Let Cloudinary/Cloudflare cache
- Reduce origin requests

---

### 6. Email Optimization (3K/Month Limit)

**Problem:** Resend free tier has 3,000 emails/month (100/day)

**Solutions:**

#### A. Batch Notifications
```typescript
// Instead of sending 5 separate emails
// Send 1 email with 5 notifications

const notifications = getUserNotifications(userId)
if (notifications.length >= 5) {
  await sendDigestEmail(user, notifications)
}
```

**Impact:** 5x reduction in emails

#### B. In-App Notifications First
- Use in-app notifications for non-critical alerts
- Only email for important events:
  - Account security
  - Password resets
  - Payment confirmations
  - Weekly digests

**Impact:** 80% reduction in emails

#### C. User Preferences
```typescript
// Let users control email frequency
const preferences = {
  instantNotifications: false,
  dailyDigest: true,
  weeklyDigest: false
}
```

---

### 7. Bandwidth Optimization

**Problem:** Vercel free tier has 100GB bandwidth/month

**Solutions:**

#### A. Next.js Image Optimization
```tsx
import Image from 'next/image'

// Automatic optimization
<Image 
  src="/hero.jpg" 
  alt="Hero"
  width={1920}
  height={1080}
  priority
/>
```

**Impact:** 60-70% bandwidth reduction

#### B. Static Generation
```tsx
// Generate pages at build time
export async function generateStaticParams() {
  const problems = await getProblems()
  return problems.map(p => ({ slug: p.slug }))
}
```

**Impact:** 90% reduction in server requests

#### C. Cloudflare CDN
- Enable Cloudflare (100% free)
- Unlimited bandwidth!
- Auto minification
- Brotli compression

**Impact:** Vercel bandwidth usage → 0

---

## 📊 Monitoring Free Tier Usage

### Track Usage with Scripts

```typescript
// scripts/check-usage.ts

async function checkUsage() {
  // Supabase
  const dbSize = await getSupabaseDatabaseSize()
  console.log(`Database: ${dbSize} MB / 500 MB`)
  
  // Redis
  const redisCommands = await getRedisCommandCount()
  console.log(`Redis: ${redisCommands} / 10,000 commands`)
  
  // Cloudinary
  const cloudinaryUsage = await getCloudinaryUsage()
  console.log(`Storage: ${cloudinaryUsage.storage} GB / 25 GB`)
  console.log(`Bandwidth: ${cloudinaryUsage.bandwidth} GB / 25 GB`)
}
```

### Set Up Alerts

```typescript
// Alert when approaching limits
if (dbSize > 450) {
  await sendNotificationEmail(
    'admin@prep-cp.com',
    'Database Usage Warning',
    `Database is at ${dbSize} MB / 500 MB. Consider cleanup.`
  )
}
```

---

## 🎓 Best Practices Summary

1. **Cache Everything**
   - AI responses: 24 hours
   - Problems: 24 hours
   - User data: 1 hour
   - Static content: Forever

2. **Batch Operations**
   - Database queries
   - Code executions
   - Email sending
   - Redis commands

3. **Cleanup Regularly**
   - Delete old submissions
   - Archive chat history
   - Remove unused images
   - Clear expired cache

4. **Use CDN**
   - Cloudflare for everything
   - Reduces bandwidth usage
   - Faster for users
   - 100% free

5. **Monitor Usage**
   - Weekly usage checks
   - Set up alerts
   - Plan upgrades early
   - Optimize proactively

---

## 🚀 Scaling Beyond Free Tier

When you hit limits, upgrade strategically:

**Priority 1: Database ($10-20/month)**
- Upgrade to Supabase Pro or Neon Pro
- Most impactful upgrade

**Priority 2: Self-Host Code Execution ($0)**
- Use Oracle Cloud free tier
- Powerful enough for 10K+ users

**Priority 3: Email ($10/month)**
- Upgrade Resend
- Or switch to SendGrid

**Keep Free:**
- Cloudflare (always free)
- Vercel (enough for most apps)
- AI (cache + Ollama)
- Redis (10K/day is generous)

---

## 💡 Advanced Optimization

### Use Edge Functions
```typescript
// Vercel Edge Functions are free
export const config = {
  runtime: 'edge',
}

// Fast, globally distributed, minimal cost
```

### Implement Request Coalescing
```typescript
// Deduplicate simultaneous requests
const cache = new Map()

async function fetchWithCoalesce(key: string, fn: () => Promise<any>) {
  if (cache.has(key)) {
    return cache.get(key)
  }
  
  const promise = fn()
  cache.set(key, promise)
  
  const result = await promise
  cache.delete(key)
  
  return result
}
```

### Use Incremental Static Regeneration
```tsx
export const revalidate = 3600 // 1 hour

// Regenerate page every hour
// Serves static page in between
```

---

This optimization guide helps you serve **1000+ users on 100% free tiers** while maintaining great performance! 🎉
