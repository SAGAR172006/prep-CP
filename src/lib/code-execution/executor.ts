import axios from 'axios';

const PISTON_API_URL = process.env.PISTON_API_URL || 'https://emkc.org/api/v2/piston';

interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  executionTime?: number;
  memory?: number;
}

const languageMap: Record<string, { language: string; version: string }> = {
  javascript: { language: 'javascript', version: '18.15.0' },
  python: { language: 'python', version: '3.10.0' },
  java: { language: 'java', version: '15.0.2' },
  cpp: { language: 'cpp', version: '10.2.0' },
  c: { language: 'c', version: '10.2.0' },
  go: { language: 'go', version: '1.16.2' },
};

export async function executeCode(
  code: string,
  language: string,
  input?: string
): Promise<ExecutionResult> {
  try {
    const langConfig = languageMap[language.toLowerCase()];
    
    if (!langConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await axios.post(`${PISTON_API_URL}/execute`, {
      language: langConfig.language,
      version: langConfig.version,
      files: [
        {
          name: `main.${getFileExtension(language)}`,
          content: code,
        },
      ],
      stdin: input || '',
      args: [],
      compile_timeout: 10000,
      run_timeout: 5000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    });

    const result = response.data;

    if (result.compile && result.compile.code !== 0) {
      return {
        success: false,
        error: result.compile.stderr || result.compile.output || 'Compilation error',
      };
    }

    if (result.run.code !== 0) {
      return {
        success: false,
        error: result.run.stderr || result.run.output || 'Runtime error',
      };
    }

    return {
      success: true,
      output: result.run.stdout || result.run.output,
      executionTime: result.run.time || 0,
      memory: result.run.memory || 0,
    };
  } catch (error: any) {
    console.error('Code execution error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to execute code',
    };
  }
}

export async function verifyTestCases(
  code: string,
  language: string,
  testCases: Array<{ input: string; expectedOutput: string }>
): Promise<{
  passed: boolean;
  totalTests: number;
  passedTests: number;
  results: Array<{
    passed: boolean;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    error?: string;
  }>;
}> {
  const results = [];
  let passedTests = 0;

  for (const testCase of testCases) {
    const result = await executeCode(code, language, testCase.input);
    
    const normalizedExpected = normalizeOutput(testCase.expectedOutput);
    const normalizedActual = normalizeOutput(result.output || result.error || '');
    
    const passed = result.success && normalizedExpected === normalizedActual;
    
    if (passed) {
      passedTests++;
    }

    results.push({
      passed,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: result.output || result.error || '',
      error: result.error,
    });
  }

  return {
    passed: passedTests === testCases.length,
    totalTests: testCases.length,
    passedTests,
    results,
  };
}

function normalizeOutput(output: string): string {
  return output.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    javascript: 'js',
    python: 'py',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    go: 'go',
  };
  return extensions[language.toLowerCase()] || 'txt';
}

export function getCodeTemplate(language: string, problemTitle: string): string {
  const templates: Record<string, string> = {
    javascript: `// ${problemTitle}
function solution(input) {
  // Your code here
  return output;
}

// Test your solution
const testInput = "";
console.log(solution(testInput));`,

    python: `# ${problemTitle}
def solution(input):
    # Your code here
    return output

# Test your solution
test_input = ""
print(solution(test_input))`,

    java: `// ${problemTitle}
public class Solution {
    public static String solution(String input) {
        // Your code here
        return output;
    }
    
    public static void main(String[] args) {
        String testInput = "";
        System.out.println(solution(testInput));
    }
}`,

    cpp: `// ${problemTitle}
#include <iostream>
#include <string>
using namespace std;

string solution(string input) {
    // Your code here
    return output;
}

int main() {
    string testInput = "";
    cout << solution(testInput) << endl;
    return 0;
}`,

    c: `// ${problemTitle}
#include <stdio.h>
#include <string.h>

void solution(char* input, char* output) {
    // Your code here
}

int main() {
    char testInput[100] = "";
    char output[100];
    solution(testInput, output);
    printf("%s\\n", output);
    return 0;
}`,

    go: `// ${problemTitle}
package main

import "fmt"

func solution(input string) string {
    // Your code here
    return output
}

func main() {
    testInput := ""
    fmt.Println(solution(testInput))
}`,
  };

  return templates[language.toLowerCase()] || '// Start coding here...';
}
