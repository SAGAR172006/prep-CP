'use client';

import Link from 'next/link';
import { ArrowRight, Code2, Trophy, Users, Zap, Star, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Header / Top Bar */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text font-[family-name:var(--font-poppins)]">PrepCP</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/auth" 
              className="px-6 py-2 text-white hover:text-white/80 transition-colors font-medium"
            >
              Login
            </Link>
            <Link 
              href="/auth?mode=signup" 
              className="px-6 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg btn-hover font-medium"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
              <span className="gradient-text">Master Coding</span>
              <br />
              <span className="text-white">Through Gamification</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Level up your coding skills with our interactive platform featuring competitive leagues, 
              real-time challenges, AI-powered assistance, and a thriving community of developers.
            </p>
            <Link 
              href="/auth?mode=signup" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg text-lg font-semibold btn-hover animate-pulse-glow"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20 animate-slide-up">
            {[
              { icon: Users, label: 'Active Users', value: '10K+' },
              { icon: Code2, label: 'Problems', value: '500+' },
              { icon: Trophy, label: 'Challenges', value: '1M+' },
              { icon: Star, label: 'Success Rate', value: '95%' },
            ].map((stat, index) => (
              <div key={index} className="glass p-6 rounded-xl card-hover">
                <stat.icon className="w-12 h-12 text-[#3B82F6] mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 gradient-text font-[family-name:var(--font-poppins)]">
            Why Choose PrepCP?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'League System',
                description: 'Compete in Bronze to Conqueror leagues. Climb ranks, earn badges, and prove your skills.',
                gradient: 'from-[#3B82F6] to-[#6366F1]',
              },
              {
                icon: Zap,
                title: 'Real-time Challenges',
                description: '1v1 coding battles with friends. Live progress tracking and instant feedback.',
                gradient: 'from-[#8B5CF6] to-[#6366F1]',
              },
              {
                icon: TrendingUp,
                title: 'AI-Powered Help',
                description: 'Get hints, debug assistance, and concept explanations from our smart AI bot.',
                gradient: 'from-[#F59E0B] to-[#EF4444]',
              },
              {
                icon: Code2,
                title: '500+ Problems',
                description: 'From beginner to advanced. Master DSA, algorithms, and interview questions.',
                gradient: 'from-[#10B981] to-[#3B82F6]',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Join discussions, share solutions, and learn from thousands of developers.',
                gradient: 'from-[#EF4444] to-[#8B5CF6]',
              },
              {
                icon: Star,
                title: 'Gamification',
                description: 'Earn points, maintain streaks, unlock badges, and collect exclusive media.',
                gradient: 'from-[#F59E0B] to-[#10B981]',
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass p-8 rounded-2xl card-hover animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-poppins)]">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="glass p-12 rounded-3xl text-center animate-scale-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-poppins)]">
              Ready to Level Up Your Coding Skills?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers mastering coding interviews through gamification.
              Start your journey today - completely free!
            </p>
            <Link 
              href="/auth?mode=signup" 
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-xl text-xl font-semibold btn-hover animate-pulse-glow"
            >
              Start Practicing Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text font-[family-name:var(--font-poppins)]">PrepCP</span>
          </div>
          <p className="text-gray-400 mb-4">
            The ultimate gamified coding practice platform for interview preparation.
          </p>
          <p className="text-gray-500 text-sm">
            © 2026 PrepCP. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
