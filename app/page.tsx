import Link from 'next/link'
import { Code2, Trophy, Zap, Users, Target, Sparkles, ChevronRight, Star, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-background-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                PrepCP
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/problems" className="text-foreground/80 hover:text-foreground transition-colors">
                Problems
              </Link>
              <Link href="/challenges" className="text-foreground/80 hover:text-foreground transition-colors">
                Daily Challenges
              </Link>
              <Link href="/contests" className="text-foreground/80 hover:text-foreground transition-colors">
                Contests
              </Link>
              <Link href="/leaderboard" className="text-foreground/80 hover:text-foreground transition-colors">
                Leaderboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-primary hover:bg-primary-dark rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 animate-slide-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">AI-Powered Coding Practice</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-primary-light to-primary bg-clip-text text-transparent">
              Master Coding Interviews
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Level up your skills with gamified challenges, compete in leagues, and ace your next interview with AI-powered guidance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="group px-8 py-4 bg-primary hover:bg-primary-dark rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Practicing</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/problems"
                className="px-8 py-4 bg-background-secondary hover:bg-background-tertiary rounded-lg font-medium transition-all border border-background-tertiary"
              >
                Browse Problems
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Code2, label: 'Problems', value: '1000+' },
              { icon: Users, label: 'Active Users', value: '50K+' },
              { icon: Trophy, label: 'Contests', value: '100+' },
              { icon: Star, label: 'Success Rate', value: '95%' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-background-secondary rounded-xl border border-background-tertiary hover:border-primary/50 transition-all transform hover:scale-105"
              >
                <stat.icon className="w-8 h-8 text-primary mb-3" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-foreground/60">
              Comprehensive features designed for interview preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'League System',
                description: 'Climb through Bronze to Grandmaster leagues. Compete with peers and track your progress.',
                color: 'text-yellow-500',
              },
              {
                icon: Zap,
                title: 'Daily Challenges',
                description: 'Maintain your streak with fresh problems every day. Earn points and unlock achievements.',
                color: 'text-primary',
              },
              {
                icon: Target,
                title: 'Interview Focused',
                description: 'Problems curated from top companies. Practice what matters for your next interview.',
                color: 'text-green-500',
              },
              {
                icon: Sparkles,
                title: 'AI Assistant',
                description: 'Get intelligent hints and code optimization suggestions powered by advanced AI.',
                color: 'text-purple-500',
              },
              {
                icon: Users,
                title: 'Social Features',
                description: 'Connect with friends, share solutions, and learn from the community.',
                color: 'text-blue-500',
              },
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Detailed analytics and insights to monitor your improvement over time.',
                color: 'text-pink-500',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-background-secondary rounded-xl border border-background-tertiary hover:border-primary/50 transition-all group"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-2xl border border-primary/30">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-foreground/60 mb-8">
              Join thousands of developers preparing for their dream jobs
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark rounded-lg font-medium transition-all transform hover:scale-105"
            >
              <span>Create Free Account</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-background-tertiary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">PrepCP</span>
            </div>
            <div className="flex space-x-8 text-foreground/60">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-foreground/40 text-sm">
            © 2024 PrepCP. Built for competitive programmers, by competitive programmers.
          </div>
        </div>
      </footer>
    </div>
  )
}
