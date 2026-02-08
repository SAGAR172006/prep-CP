import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="text-2xl font-bold text-white">
            Prep<span className="text-blue-400">CP</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-white hover:text-blue-400 transition-colors">
              My Courses
            </Link>
            <Link href="/rankings" className="text-white hover:text-blue-400 transition-colors">
              Rankings
            </Link>
            <Link href="/bugs" className="text-white hover:text-blue-400 transition-colors">
              Bugs
            </Link>
            <Link href="/community" className="text-white hover:text-blue-400 transition-colors">
              Community
            </Link>
            <Link href="/puzzle" className="text-white hover:text-blue-400 transition-colors">
              Puzzle
            </Link>
            <Link
              href="/pro"
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-semibold hover:from-yellow-300 hover:to-yellow-500 transition-all"
            >
              Pro ✨
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Season Badge */}
            <div className="hidden md:block px-3 py-1 bg-blue-600/30 border border-blue-400/50 rounded-full text-blue-300 text-sm font-semibold">
              Season 1
            </div>

            {/* League Badge */}
            <div className="hidden md:block px-3 py-1 bg-amber-600/30 border border-amber-400/50 rounded-full text-amber-300 text-sm font-semibold">
              🥉 Bronze
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-white hover:text-blue-400 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-white/10 rounded-xl shadow-xl animate-slide-down">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 text-gray-400 text-center">No new notifications</div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {session?.user?.name?.[0] || 'U'}
                </div>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Account Dropdown */}
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-white/10 rounded-xl shadow-xl animate-slide-down">
                  <div className="p-2">
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Account Settings
                    </Link>
                    <Link
                      href="/friends"
                      className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Friends
                    </Link>
                    <Link
                      href="/streak"
                      className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      🔥 Streak
                    </Link>
                    <Link
                      href="/history"
                      className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      History
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Settings
                    </Link>
                    <hr className="my-2 border-white/10" />
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
