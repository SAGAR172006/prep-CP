import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const codeExecutionSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  language: z.string().min(1, 'Language is required'),
  problemId: z.string().optional(),
  testCases: z.array(z.object({
    input: z.string(),
    expectedOutput: z.string(),
  })).optional(),
});

export const chatbotSchema = z.object({
  action: z.enum(['explain', 'concept', 'debug', 'hint']),
  problemId: z.string().optional(),
  problemDescription: z.string().min(1, 'Problem description is required'),
  userCode: z.string().optional(),
});

export const bugReportSchema = z.object({
  problemId: z.string().optional(),
  type: z.string().min(1, 'Bug type is required'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  stepsToReproduce: z.string().optional(),
  code: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
});

export const pointsSchema = z.object({
  points: z.number().int(),
  reason: z.string().optional(),
});
