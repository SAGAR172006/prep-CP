export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-6xl font-bold text-white">
              Prep <span className="gradient-text">CP</span>
            </h1>
            <p className="text-2xl text-gray-300">
              Gamified Coding Practice Platform
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Built entirely on <span className="text-green-400 font-semibold">FREE TIER</span> services
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
            <FeatureCard
              icon="🤖"
              title="AI-Powered Assistance"
              description="Get help with debugging, code explanation, and optimization using Ollama + Hugging Face"
              tech="Free: Ollama, HuggingFace, Gemini"
            />
            <FeatureCard
              icon="⚡"
              title="Code Execution"
              description="Run code in 50+ languages with Piston API"
              tech="Free: Piston API"
            />
            <FeatureCard
              icon="🏆"
              title="Gamification"
              description="Compete in leagues, earn badges, and maintain streaks"
              tech="Free: Supabase + Redis"
            />
            <FeatureCard
              icon="💾"
              title="Cloud Storage"
              description="Store avatars, banners, and problem images"
              tech="Free: Cloudinary (25GB)"
            />
            <FeatureCard
              icon="📧"
              title="Email Notifications"
              description="Transactional emails and notifications"
              tech="Free: Resend (3K/month)"
            />
            <FeatureCard
              icon="💳"
              title="Payment Processing"
              description="Pro subscriptions with Razorpay"
              tech="Free: Razorpay (pay per transaction)"
            />
          </div>

          {/* Tech Stack */}
          <div className="mt-16 glass rounded-xl p-8 text-left">
            <h2 className="text-3xl font-bold text-white mb-6">
              100% Free Tech Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300">
              <TechItem service="Supabase" description="Database + Auth + Storage + Realtime" />
              <TechItem service="Upstash Redis" description="Caching (10K commands/day)" />
              <TechItem service="Hugging Face" description="AI/LLM (30K requests/month)" />
              <TechItem service="Piston API" description="Code Execution (50+ languages)" />
              <TechItem service="Cloudinary" description="File Storage (25GB + 25GB bandwidth)" />
              <TechItem service="Resend" description="Email Service (3K emails/month)" />
              <TechItem service="Razorpay" description="Payment Processing (pay per transaction)" />
              <TechItem service="Vercel" description="Hosting (Unlimited projects)" />
              <TechItem service="Cloudflare" description="CDN (Unlimited bandwidth)" />
              <TechItem service="PostHog" description="Analytics (1M events/month)" />
              <TechItem service="Sentry" description="Error Monitoring (5K events/month)" />
              <TechItem service="NextAuth.js" description="Authentication (100% free)" />
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mt-16 bg-green-500/10 border-2 border-green-500 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              💰 Total Monthly Cost: $0
            </h2>
            <p className="text-xl text-gray-300">
              Can handle <span className="text-green-400 font-bold">1000+ users</span> on free tiers
            </p>
            <p className="text-lg text-gray-400 mt-4">
              Compare to traditional stack: <span className="line-through">$205-305/month</span>
            </p>
            <p className="text-2xl text-green-400 font-bold mt-2">
              Save $2,460-3,660/year! 🎉
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 space-y-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:scale-105 transition-transform">
              Get Started - 100% Free
            </button>
            <p className="text-gray-400">
              No credit card required. All features unlocked.
            </p>
          </div>

          {/* GitHub Link */}
          <div className="mt-8">
            <a
              href="https://github.com/SAGAR172006/prep-CP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              View Source on GitHub →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ icon, title, description, tech }: {
  icon: string
  title: string
  description: string
  tech: string
}) {
  return (
    <div className="glass rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <p className="text-sm text-green-400">{tech}</p>
    </div>
  )
}

function TechItem({ service, description }: {
  service: string
  description: string
}) {
  return (
    <div className="flex items-start space-x-2">
      <span className="text-green-400">✓</span>
      <div>
        <span className="font-semibold text-white">{service}:</span>{' '}
        <span className="text-gray-400">{description}</span>
      </div>
    </div>
  )
}
