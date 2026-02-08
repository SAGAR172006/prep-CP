'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code2, Trophy, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Code2 className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                CodeMaster
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex space-x-4"
            >
              <Link href="/auth/login">
                <button className="px-4 py-2 text-white hover:text-blue-400 transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                  Sign Up
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Master Coding Through
              <br />
              Gamification & Competition
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Level up your programming skills with our innovative platform featuring leagues, 
              competitive programming, AI assistance, and a thriving community.
            </p>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all inline-flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard
              icon={<Trophy className="w-12 h-12 text-yellow-500" />}
              title="League System"
              description="Climb from Bronze to Conqueror. Compete in seasonal leagues with real-time rankings."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-blue-500" />}
              title="Competitive Programming"
              description="Real-time PvP matches. Challenge friends or get matched with opponents at your level."
            />
            <FeatureCard
              icon={<Code2 className="w-12 h-12 text-purple-500" />}
              title="AI Assistant"
              description="Get hints, explanations, and debugging help from our intelligent chatbot."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-pink-500" />}
              title="Social Features"
              description="Connect with friends, join communities, and participate in daily challenges."
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="1000+" label="Practice Problems" />
            <StatCard number="50K+" label="Active Users" />
            <StatCard number="100K+" label="Solutions Submitted" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-heading mb-6 text-white">
              Ready to Level Up Your Coding Skills?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers improving their skills through gamification
            </p>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                Start Your Journey
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 CodeMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold font-heading mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-5xl font-bold font-heading bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-gray-400 text-lg">{label}</div>
    </motion.div>
  );
}
