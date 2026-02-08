// User types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  league: League;
  rating: number;
  problemsSolved: number;
  streak: number;
  badges: Badge[];
  createdAt: Date;
}

export enum League {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
  MASTER = 'MASTER',
  GRANDMASTER = 'GRANDMASTER',
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

// Problem types
export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string[];
  tags: string[];
  likes: number;
  dislikes: number;
  submissions: number;
  acceptanceRate: number;
  companies: string[];
  testCases: TestCase[];
  constraints: string[];
  examples: Example[];
  hints: string[];
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

// Submission types
export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  runtime: number;
  memory: number;
  timestamp: Date;
  testResults: TestResult[];
}

export enum SubmissionStatus {
  ACCEPTED = 'ACCEPTED',
  WRONG_ANSWER = 'WRONG_ANSWER',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  COMPILATION_ERROR = 'COMPILATION_ERROR',
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  actualOutput?: string;
  error?: string;
}

// Challenge types
export interface DailyChallenge {
  id: string;
  problemId: string;
  date: Date;
  points: number;
  participants: number;
  completions: number;
}

// Contest types
export interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  problems: Problem[];
  participants: number;
  prizes: string[];
  rules: string[];
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  problemsSolved: number;
  lastSubmission: Date;
}

// AI Assistant types
export interface AIHint {
  id: string;
  problemId: string;
  level: number;
  content: string;
  cost: number;
}

export interface AIFeedback {
  suggestions: string[];
  optimizations: string[];
  complexity: {
    time: string;
    space: string;
  };
}
