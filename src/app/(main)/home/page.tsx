'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 1, name: 'Beginner', description: 'Start your coding journey', topics: 120, badge: 'Free' },
  { id: 2, name: 'Intermediate', description: 'Level up your skills', topics: 150, badge: 'Free' },
  { id: 3, name: 'Advanced', description: 'Master complex problems', topics: 100, badge: 'Free' },
  { id: 4, name: 'Interview Prep', description: 'Get interview ready', topics: 200, badge: 'Pro', isPro: true },
];

const topics = [
  'Java', 'DSA', 'Python', 'C', 'C++', 'Cloud', 'DevOps', 'JavaScript',
];

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-white">Prep-CP</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/home" className="text-white hover:text-primary-400 transition">My Courses</a>
                <a href="/rankings" className="text-white/80 hover:text-white transition">Rankings</a>
                <a href="/bugs" className="text-white/80 hover:text-white transition">Bugs</a>
                <a href="/community" className="text-white/80 hover:text-white transition">Community</a>
                <a href="/puzzle" className="text-white/80 hover:text-white transition">Puzzle</a>
                <a href="/pro" className="text-accent-500 hover:text-accent-400 transition font-semibold">Pro</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                🔔
              </Button>
              <Button variant="ghost" size="sm">
                {session.user?.name || 'Account'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search problems... (Ctrl+K)"
            className="w-full max-w-2xl px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Courses */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Courses We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="glassmorphism border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer card-hover"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{category.name}</CardTitle>
                    <Badge variant={category.isPro ? 'default' : 'secondary'}>
                      {category.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-white/70">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 text-sm">{category.topics} problems</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Topics */}
          <h3 className="text-2xl font-bold text-white mb-4">Popular Topics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {topics.map((topic) => (
              <Button
                key={topic}
                variant="outline"
                className="glassmorphism border-white/20 text-white hover:bg-white/20"
              >
                {topic}
              </Button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
