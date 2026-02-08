'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Code2, Search, Filter, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Difficulty } from '@/types'

interface ProblemItem {
  id: string
  title: string
  difficulty: Difficulty
  category: string[]
  acceptanceRate: number
  solved: boolean
}

const mockProblems: ProblemItem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: Difficulty.EASY,
    category: ['Array', 'Hash Table'],
    acceptanceRate: 49.2,
    solved: true,
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: Difficulty.MEDIUM,
    category: ['Linked List', 'Math'],
    acceptanceRate: 41.5,
    solved: false,
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: Difficulty.MEDIUM,
    category: ['String', 'Sliding Window'],
    acceptanceRate: 35.8,
    solved: false,
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    difficulty: Difficulty.HARD,
    category: ['Array', 'Binary Search'],
    acceptanceRate: 38.9,
    solved: false,
  },
  {
    id: '5',
    title: 'Longest Palindromic Substring',
    difficulty: Difficulty.MEDIUM,
    category: ['String', 'Dynamic Programming'],
    acceptanceRate: 33.7,
    solved: false,
  },
]

export default function ProblemsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const filteredProblems = mockProblems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 'text-green-500'
      case Difficulty.MEDIUM:
        return 'text-yellow-500'
      case Difficulty.HARD:
        return 'text-red-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-background-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                PrepCP
              </span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/problems" className="text-foreground font-medium">
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
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-all"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Problem Set</h1>
            <p className="text-foreground/60">
              Practice problems from top companies and improve your coding skills
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Code2, label: 'Total Problems', value: '1,247' },
              { icon: CheckCircle, label: 'Solved', value: '342' },
              { icon: TrendingUp, label: 'Success Rate', value: '87%' },
              { icon: Clock, label: 'Avg. Time', value: '25m' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 bg-background-secondary rounded-lg border border-background-tertiary"
              >
                <div className="flex items-center space-x-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-foreground/60">{stat.label}</div>
                    <div className="text-xl font-bold">{stat.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-background-secondary rounded-lg border border-background-tertiary p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border border-background-tertiary focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-foreground/40" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 bg-background rounded-lg border border-background-tertiary focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="all">All Difficulties</option>
                  <option value={Difficulty.EASY}>Easy</option>
                  <option value={Difficulty.MEDIUM}>Medium</option>
                  <option value={Difficulty.HARD}>Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Problems Table */}
          <div className="bg-background-secondary rounded-lg border border-background-tertiary overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background-tertiary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-foreground/80">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-foreground/80">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-foreground/80">Difficulty</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-foreground/80">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-foreground/80">Acceptance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-background-tertiary">
                  {filteredProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-background-tertiary/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        {problem.solved ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-foreground/20" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${getDifficultyColor(problem.difficulty)} font-medium`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {problem.category.slice(0, 2).map((cat, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-background rounded border border-background-tertiary"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground/60">
                        {problem.acceptanceRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
