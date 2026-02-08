// Type Definitions for the Gamified Coding Practice Platform

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  banner?: string;
  bio?: string;
  location?: string;
  
  // Gamification
  points: number;
  league: League;
  subLeague: SubLeague;
  leagueCP: League;
  subLeagueCP: SubLeague;
  
  // Streaks
  loginStreak: number;
  solveStreak: number;
  lastLogin?: Date;
  lastSolve?: Date;
  streakFreezes: number;
  
  // Subscription
  isPro: boolean;
  proType?: 'monthly' | 'annual';
  proStartDate?: Date;
  proEndDate?: Date;
  
  // Stats
  problemsSolved: number;
  totalTime: number;
  accuracy: number;
  
  // Limits
  friendLimit: number;
  aiQueriesUsed: number;
  aiQueryLimit: number;
  problemsToday: number;
  problemLimit: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export type League = 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Master' | 'Conqueror';
export type SubLeague = 'V' | 'IV' | 'III' | 'II' | 'I';

export interface LeagueInfo {
  league: League;
  subLeague: SubLeague;
  minPoints: number;
  maxPoints: number;
  color: string;
  icon: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  
  // Categorization
  category: 'Beginner' | 'Intermediate' | 'Advanced' | 'Interview Prep';
  topic: string;
  subtopic?: string;
  tags: string[];
  
  // Content
  examples: Example[];
  constraints: string[];
  hints: string[];
  
  // Test Cases
  testCases: TestCase[];
  
  // Templates
  templates: Record<Language, string>;
  
  // Solution
  solution?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  
  // Anti-cheat
  minSolveTime: number;
  
  // Pro
  isPro: boolean;
  
  // Stats
  totalSubmissions: number;
  successRate: number;
  avgTime: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  output: string;
  hidden: boolean;
}

export type Language = 'python' | 'java' | 'cpp' | 'c' | 'javascript';

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: Language;
  status: SubmissionStatus;
  passed: boolean;
  testResults: TestResult[];
  executionTime?: number;
  memoryUsed?: number;
  attemptNumber: number;
  pointsEarned: number;
  solveTime: number;
  tooFast: boolean;
  createdAt: Date;
}

export type SubmissionStatus = 
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Runtime Error'
  | 'Compilation Error'
  | 'Memory Limit Exceeded';

export interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual?: string;
  error?: string;
}

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
  friend?: User;
}

export interface Challenge {
  id: string;
  initiatorId: string;
  opponentId: string;
  topic: string;
  difficulty: string;
  timeLimit: number;
  problemCount: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  winnerId?: string;
  initiatorScore: number;
  opponentScore: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  initiator?: User;
  opponent?: User;
}

export interface BugReport {
  id: string;
  userId: string;
  problemId: string;
  bugType: string;
  description: string;
  stepsToReproduce?: string;
  code?: string;
  screenshots: string[];
  status: BugStatus;
  resolution?: string;
  pointsAwarded: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BugStatus = 
  | 'submitted'
  | 'under_review'
  | 'confirmed'
  | 'in_progress'
  | 'resolved'
  | 'rejected';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export type NotificationType =
  | 'friend_request'
  | 'friend_accepted'
  | 'challenge_invite'
  | 'challenge_result'
  | 'bug_status'
  | 'points_earned'
  | 'media_unlocked'
  | 'ranking_badge'
  | 'league_change'
  | 'season_event'
  | 'streak_milestone';

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  parentId?: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  replies?: Comment[];
}

export interface UserMedia {
  id: string;
  userId: string;
  type: 'avatar' | 'banner' | 'badge';
  url: string;
  name: string;
  permanent: boolean;
  expiresAt?: Date;
  equipped: boolean;
  createdAt: Date;
}

export interface Season {
  id: number;
  number: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  createdAt: Date;
}

export interface DailyPuzzle {
  id: string;
  date: Date;
  title: string;
  description: string;
  answer: string;
  hint?: string;
  bonusPoints: number;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CodeExecutionRequest {
  code: string;
  language: Language;
  testCases: TestCase[];
  problemId: string;
}

export interface CodeExecutionResponse {
  results: TestResult[];
  passed: boolean;
  executionTime: number;
  memoryUsed: number;
  errors?: string[];
}

export interface ChatbotRequest {
  userId: string;
  problemId: string;
  action: 'explain' | 'concept' | 'debug' | 'hint';
  userCode?: string;
  queryCount: number;
}

export interface ChatbotResponse {
  response: string;
  remainingQueries: number;
  conversationId: string;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
}

// Zustand Store Types
export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

export interface ProblemStore {
  currentProblem: Problem | null;
  problems: Problem[];
  isLoading: boolean;
  fetchProblem: (id: string) => Promise<void>;
  fetchProblems: (filters?: any) => Promise<void>;
}

export interface EditorStore {
  code: string;
  language: Language;
  theme: 'vs-dark' | 'light';
  setCode: (code: string) => void;
  setLanguage: (language: Language) => void;
  setTheme: (theme: 'vs-dark' | 'light') => void;
}
