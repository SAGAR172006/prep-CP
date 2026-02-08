import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Prep<span className="text-blue-400">CP</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 text-white hover:text-blue-400 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
            Master Coding Interviews with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Gamified Learning
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 animate-slide-up">
            Practice coding problems, compete in leagues, challenge friends, and prepare for your
            dream job with AI-powered assistance.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:scale-105 transition-transform shadow-lg hover:shadow-blue-500/50"
          >
            Get Started
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const features = [
  {
    icon: '🎮',
    title: 'Gamified Learning',
    description: 'Earn points, climb leagues, maintain streaks, and unlock achievements as you solve problems.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Help',
    description: 'Get hints, explanations, and debugging assistance from our intelligent chatbot.',
  },
  {
    icon: '⚔️',
    title: 'Competitive Mode',
    description: 'Challenge friends or match with random opponents in real-time coding battles.',
  },
];
