import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import CourseCard from '@/components/home/CourseCard';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {session.user?.name || 'Coder'}! 👋
          </h1>
          <p className="text-gray-300">Continue your learning journey</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search problems, topics, or categories... (Ctrl+K)"
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Ctrl+K</kbd>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Courses We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const courses = [
  {
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamentals of DSA',
    difficulty: 'Beginner',
    topics: 32,
    problems: 150,
    progress: 0,
    tier: 'free',
  },
  {
    title: 'Java Programming',
    description: 'Learn Java from scratch',
    difficulty: 'Beginner',
    topics: 24,
    problems: 100,
    progress: 0,
    tier: 'free',
  },
  {
    title: 'Python Basics',
    description: 'Start your Python journey',
    difficulty: 'Beginner',
    topics: 20,
    problems: 80,
    progress: 0,
    tier: 'free',
  },
  {
    title: 'C++ Fundamentals',
    description: 'Master C++ programming',
    difficulty: 'Intermediate',
    topics: 28,
    problems: 120,
    progress: 0,
    tier: 'free',
  },
  {
    title: 'Cloud Computing',
    description: 'Learn cloud technologies',
    difficulty: 'Advanced',
    topics: 15,
    problems: 50,
    progress: 0,
    tier: 'free',
  },
  {
    title: 'Interview Preparation',
    description: 'Ace your technical interviews',
    difficulty: 'Advanced',
    topics: 40,
    problems: 200,
    progress: 0,
    tier: 'pro',
  },
];

const stats = [
  { label: 'Problems Solved', value: '0' },
  { label: 'Current Streak', value: '0 days' },
  { label: 'Total Points', value: '0' },
  { label: 'Current League', value: 'Bronze' },
];
