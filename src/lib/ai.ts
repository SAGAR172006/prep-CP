/**
 * AI Service with Free Tier Fallback Chain
 * 
 * Priority Order:
 * 1. Ollama (self-hosted, unlimited, FREE) - Best for local development
 * 2. Hugging Face (30,000 requests/month, FREE)
 * 3. Google Gemini (generous free tier, FREE)
 * 
 * This ensures we always have a working AI service with zero cost
 */

import { HfInference } from '@huggingface/inference'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize clients
const hf = process.env.HUGGINGFACE_API_KEY 
  ? new HfInference(process.env.HUGGINGFACE_API_KEY)
  : null

const genAI = process.env.GOOGLE_GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)
  : null

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface AIResponse {
  content: string
  provider: 'ollama' | 'huggingface' | 'gemini'
}

/**
 * Try Ollama first (self-hosted, free, unlimited)
 */
async function tryOllama(messages: ChatMessage[]): Promise<string | null> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'codellama', // Use codellama for code-related tasks
        messages: messages,
        stream: false,
      }),
    })

    if (!response.ok) throw new Error('Ollama not available')

    const data = await response.json()
    return data.message?.content || null
  } catch (error) {
    console.log('Ollama not available, trying next provider...')
    return null
  }
}

/**
 * Try Hugging Face (30K requests/month free)
 */
async function tryHuggingFace(messages: ChatMessage[]): Promise<string | null> {
  if (!hf) return null

  try {
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n')
    
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
      },
    })

    return response.generated_text || null
  } catch (error) {
    console.log('Hugging Face failed, trying next provider...')
    return null
  }
}

/**
 * Try Google Gemini (generous free tier)
 */
async function tryGemini(messages: ChatMessage[]): Promise<string | null> {
  if (!genAI) return null

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n')
    const result = await model.generateContent(prompt)
    const response = await result.response
    
    return response.text() || null
  } catch (error) {
    console.log('Google Gemini failed')
    return null
  }
}

/**
 * Main chat function with automatic fallback
 */
export async function chat(messages: ChatMessage[]): Promise<AIResponse> {
  // Try Ollama first (best for local dev)
  let content = await tryOllama(messages)
  if (content) {
    return { content, provider: 'ollama' }
  }

  // Try Hugging Face second (good free tier)
  content = await tryHuggingFace(messages)
  if (content) {
    return { content, provider: 'huggingface' }
  }

  // Try Gemini last (backup)
  content = await tryGemini(messages)
  if (content) {
    return { content, provider: 'gemini' }
  }

  throw new Error('All AI providers failed. Please check your configuration.')
}

/**
 * Pre-defined chatbot actions (as per requirements)
 */
export async function chatbotAction(action: string, code?: string): Promise<AIResponse> {
  const actionPrompts: Record<string, ChatMessage[]> = {
    'explain': [
      {
        role: 'system',
        content: 'You are a helpful coding assistant. Explain code clearly and concisely.',
      },
      {
        role: 'user',
        content: `Explain this code:\n\n${code}`,
      },
    ],
    'debug': [
      {
        role: 'system',
        content: 'You are a debugging expert. Find bugs and suggest fixes.',
      },
      {
        role: 'user',
        content: `Find bugs in this code and suggest fixes:\n\n${code}`,
      },
    ],
    'optimize': [
      {
        role: 'system',
        content: 'You are a code optimization expert. Suggest performance improvements.',
      },
      {
        role: 'user',
        content: `Optimize this code for better performance:\n\n${code}`,
      },
    ],
    'generate': [
      {
        role: 'system',
        content: 'You are a coding problem generator. Create challenging problems.',
      },
      {
        role: 'user',
        content: 'Generate a coding problem with test cases for interview preparation.',
      },
    ],
  }

  const messages = actionPrompts[action]
  if (!messages) {
    throw new Error(`Unknown action: ${action}`)
  }

  return chat(messages)
}

/**
 * Generate coding problem with AI
 */
export async function generateProblem(difficulty: 'easy' | 'medium' | 'hard'): Promise<AIResponse> {
  return chat([
    {
      role: 'system',
      content: 'You are a coding problem generator. Create realistic interview problems.',
    },
    {
      role: 'user',
      content: `Generate a ${difficulty} coding problem with:
1. Problem title
2. Problem description
3. Examples (at least 2)
4. Constraints
5. Test cases (at least 5)

Format the response as JSON.`,
    },
  ])
}
