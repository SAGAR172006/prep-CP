'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Code2, Bell, Settings, Users, Flame, History, LogOut, 
  Search, Trophy, Shield, Star, Zap, Crown 
} from 'lucide-react';

const COURSES = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Start your coding journey',
    topics: ['Java', 'Python', 'C', 'C++'],
    problemCount: 150,
    level: 'Free',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Level up your skills',
    topics: ['DSA', 'Algorithms', 'Java', 'Python'],
    problemCount: 200,
    level: 'Free',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Master complex concepts',
    topics: ['Advanced DSA', 'System Design', 'Cloud', 'DevOps'],
    problemCount: 180,
    level: 'Free',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep',
    description: 'Ace your tech interviews',
    topics: ['FAANG Problems', 'Mock Interviews', 'System Design'],
    problemCount: 250,
    level: 'Pro',
    color: 'from-yellow-500 to-orange-600',
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const notifications = [
    { id: 1, type: 'friend', message: 'John Doe sent you a friend request', time: '2m ago' },
    { id: 2, type: 'points', message: 'You earned 10 points!', time: '1h ago' },
    { id: 3, type: 'league', message: 'Promoted to Silver League!', time: '3h ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 glass">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/home" className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                CodeMaster
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/home" className="text-white hover:text-blue-400 transition-colors font-semibold">
                My Courses
              </Link>
              <Link href="/rankings" className="text-gray-400 hover:text-white transition-colors">
                Rankings
              </Link>
              <Link href="/bugs" className="text-gray-400 hover:text-white transition-colors">
                Bugs
              </Link>
              <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
                Community
              </Link>
              <Link href="/puzzle" className="text-gray-400 hover:text-white transition-colors">
                Puzzle
              </Link>
              <Link 
                href="/pro" 
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-bold hover:from-yellow-300 hover:to-orange-400 transition-colors flex items-center space-x-1"
              >
                <Crown className="w-4 h-4 text-yellow-400" />
                <span>Pro</span>
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Season & League Badge */}
              <div className="hidden lg:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                  <Trophy className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400 font-semibold">Season 1</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400 font-semibold">Bronze III</span>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-80 glass rounded-lg border border-white/10 shadow-xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/10">
                      <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-4 hover:bg-white/5 transition-colors border-b border-white/5">
                          <p className="text-sm text-white">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Account Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                </button>

                {showAccountMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-56 glass rounded-lg border border-white/10 shadow-xl overflow-hidden"
                  >
                    <Link href="/settings" className="flex items-center space-x-3 p-4 hover:bg-white/5 transition-colors">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="text-white">Settings</span>
                    </Link>
                    <Link href="/friends" className="flex items-center space-x-3 p-4 hover:bg-white/5 transition-colors">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-white">Friends</span>
                    </Link>
                    <Link href="/streak" className="flex items-center space-x-3 p-4 hover:bg-white/5 transition-colors">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-white">Streak</span>
                    </Link>
                    <Link href="/history" className="flex items-center space-x-3 p-4 hover:bg-white/5 transition-colors">
                      <History className="w-4 h-4 text-gray-400" />
                      <span className="text-white">History</span>
                    </Link>
                    <button className="flex items-center space-x-3 p-4 hover:bg-white/5 transition-colors w-full border-t border-white/10">
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span className="text-red-400">Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search problems, topics, or courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Courses Section */}
        <div>
          <h2 className="text-3xl font-bold font-heading text-white mb-8">
            Courses We Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative"
              >
                <Link href={`/courses/${course.id}`}>
                  <div className={`glass rounded-2xl p-6 border border-white/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer overflow-hidden`}>
                    {/* Pro Badge */}
                    {course.level === 'Pro' && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                          <Crown className="w-3 h-3 text-white" />
                          <span className="text-xs text-white font-bold">PRO</span>
                        </div>
                      </div>
                    )}

                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-10`}></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                      
                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.topics.slice(0, 2).map((topic) => (
                          <span key={topic} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                            {topic}
                          </span>
                        ))}
                        {course.topics.length > 2 && (
                          <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                            +{course.topics.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-blue-400">
                          <Star className="w-4 h-4" />
                          <span>{course.problemCount} problems</span>
                        </div>
                        <Zap className="w-5 h-5 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Challenge Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Link href="/puzzle">
            <div className="glass rounded-2xl p-8 border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 hover:shadow-xl hover:shadow-yellow-500/20 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">Daily Puzzle</h3>
                  <p className="text-gray-300">Solve today's unique challenge for 30 bonus points!</p>
                </div>
                <div className="text-6xl">🧩</div>
              </div>
            </div>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
