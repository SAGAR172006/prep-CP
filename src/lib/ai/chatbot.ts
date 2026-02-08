import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

interface ChatbotAction {
  action: 'explain' | 'concept' | 'debug' | 'hint';
  problemDescription?: string;
  userCode?: string;
}

export async function callChatbot(
  action: ChatbotAction['action'],
  problemDescription: string,
  userCode?: string
): Promise<string> {
  const prompts = {
    explain: `Explain this coding problem in simple, beginner-friendly terms. Use analogies and examples. Keep it under 150 words.\n\nProblem:\n${problemDescription}`,
    
    concept: `Given this coding problem, suggest 2-3 relevant concepts/algorithms. Provide concept names only with 1-sentence explanation each. Do not give solution.\n\nProblem:\n${problemDescription}`,
    
    debug: `You are a code reviewer. Analyze this code for bugs and issues. Provide line numbers, describe the issue, and suggest fixes. Do not rewrite the entire code.\n\nProblem:\n${problemDescription}\n\nUser Code:\n${userCode}`,
    
    hint: `Provide a pseudocode/algorithmic approach for this problem. Use step-by-step format. Do not write actual code. Be clear but not too obvious.\n\nProblem:\n${problemDescription}`,
  };

  const systemPrompts = {
    explain: 'You are a coding tutor who explains problems in simple terms.',
    concept: 'You are an algorithm expert who suggests relevant concepts.',
    debug: 'You are a code reviewer who finds bugs and suggests fixes.',
    hint: 'You are a mentor who provides helpful hints without giving full solutions.',
  };

  try {
    // Try OpenAI first
    if (OPENAI_API_KEY) {
      return await callOpenAI(systemPrompts[action], prompts[action]);
    }
    
    // Fallback to Hugging Face
    if (HUGGINGFACE_API_KEY) {
      return await callHuggingFace(prompts[action]);
    }
    
    throw new Error('No AI API configured');
  } catch (error) {
    console.error('Chatbot error:', error);
    return getFallbackResponse(action);
  }
}

async function callOpenAI(system: string, prompt: string): Promise<string> {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
}

async function callHuggingFace(prompt: string): Promise<string> {
  const response = await axios.post(
    'https://api-inference.huggingface.co/models/gpt2',
    { inputs: prompt },
    {
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data[0].generated_text;
}

function getFallbackResponse(action: ChatbotAction['action']): string {
  const fallbacks = {
    explain: 'This problem requires you to analyze the input and produce the expected output. Break down the problem into smaller steps and think about what data structures or algorithms might help.',
    concept: '1. Arrays/Strings - For iterating and manipulating data\n2. Hash Maps - For quick lookups\n3. Two Pointers - For efficient searching',
    debug: 'Please review your code for:\n1. Syntax errors\n2. Logic errors in loops\n3. Edge cases (empty input, single element)\n4. Variable initialization',
    hint: 'Algorithm approach:\n1. Read and parse the input\n2. Identify the core operation needed\n3. Implement the logic step by step\n4. Return or print the result',
  };

  return fallbacks[action] || 'Unable to process request. Please try again.';
}

export async function analyzeBugReport(description: string): Promise<{
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isDuplicate: boolean;
}> {
  // Simple keyword-based analysis
  const bugCategories = {
    'test case': 'Incorrect Test Case',
    'expected output': 'Wrong Expected Output',
    'problem statement': 'Unclear Problem Statement',
    'ui': 'UI/UX Issue',
    'performance': 'Performance Issue',
    'api': 'API Error',
  };

  let category = 'Other';
  for (const [keyword, cat] of Object.entries(bugCategories)) {
    if (description.toLowerCase().includes(keyword)) {
      category = cat;
      break;
    }
  }

  // Simple severity detection
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
  if (description.toLowerCase().includes('critical') || description.toLowerCase().includes('crash')) {
    severity = 'critical';
  } else if (description.toLowerCase().includes('major')) {
    severity = 'high';
  } else if (description.toLowerCase().includes('minor') || description.toLowerCase().includes('typo')) {
    severity = 'low';
  }

  return {
    category,
    severity,
    isDuplicate: false, // Would need vector similarity for real duplicate detection
  };
}
