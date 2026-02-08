'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/editor/CodeEditor';
import { Play, Send, XCircle, Flag, ChevronRight } from 'lucide-react';

const SAMPLE_PROBLEM = {
  id: '1',
  title: 'Two Sum',
  difficulty: 'Easy',
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.',
  ],
};

const CODE_TEMPLATES = {
  python: `def twoSum(nums, target):
    # Write your code here
    pass`,
  javascript: `function twoSum(nums, target) {
    // Write your code here
}`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
    }
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
    }
};`,
};

type Language = keyof typeof CODE_TEMPLATES;

export default function ProblemPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'community' | 'bots'>('overview');
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState<string>(CODE_TEMPLATES[language]);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(CODE_TEMPLATES[newLanguage]);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running against test cases...\n');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput('Test Case 1: ✓ Passed\nTest Case 2: ✓ Passed\nTest Case 3: ✗ Failed\n\nExpected: [0, 1]\nReceived: undefined');
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setOutput('Submitting your solution...\n');
    
    // Simulate submission
    setTimeout(() => {
      setOutput('Submission Accepted!\n\n✓ All test cases passed\nPoints Earned: 10\nTime: 52ms\nMemory: 42.3 MB');
      setIsRunning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 glass">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-blue-400 transition-colors">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <h1 className="text-xl font-bold text-white">{SAMPLE_PROBLEM.title}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              SAMPLE_PROBLEM.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              SAMPLE_PROBLEM.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {SAMPLE_PROBLEM.difficulty}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Points: 10</span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-white/10 overflow-y-auto">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-white/10 glass">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'community'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Community
            </button>
            <button
              onClick={() => setActiveTab('bots')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'bots'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              AI Bots
            </button>
          </div>

          {/* Content */}
          <div className="p-6 text-white">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">Problem Description</h2>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {SAMPLE_PROBLEM.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Examples</h3>
                  {SAMPLE_PROBLEM.examples.map((example, index) => (
                    <div key={index} className="mb-4 bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Example {index + 1}:</p>
                      <p className="font-mono text-sm mb-2">
                        <span className="text-blue-400">Input:</span> {example.input}
                      </p>
                      <p className="font-mono text-sm mb-2">
                        <span className="text-green-400">Output:</span> {example.output}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="text-yellow-400">Explanation:</span> {example.explanation}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {SAMPLE_PROBLEM.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'community' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <p className="text-gray-400">Community discussions coming soon...</p>
              </motion.div>
            )}

            {activeTab === 'bots' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
                <div className="space-y-2">
                  <button className="w-full text-left p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                    <p className="font-semibold text-blue-400">Explain this problem in simple terms</p>
                    <p className="text-sm text-gray-400 mt-1">Get a beginner-friendly explanation</p>
                  </button>
                  <button className="w-full text-left p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                    <p className="font-semibold text-blue-400">What concept should I use?</p>
                    <p className="text-sm text-gray-400 mt-1">Learn the key algorithm or data structure</p>
                  </button>
                  <button className="w-full text-left p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                    <p className="font-semibold text-blue-400">Help me debug my code</p>
                    <p className="text-sm text-gray-400 mt-1">AI will analyze your current code</p>
                  </button>
                  <button className="w-full text-left p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                    <p className="font-semibold text-blue-400">Give me a hint</p>
                    <p className="text-sm text-gray-400 mt-1">Get a subtle nudge in the right direction</p>
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Queries remaining today: 18/20 (Free) | Upgrade to Pro for 100/day
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Language Selector */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 glass">
            <div className="flex space-x-2">
              {(['python', 'javascript', 'java', 'cpp'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    language === lang
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <CodeEditor
              language={language}
              value={code}
              onChange={setCode}
            />
          </div>

          {/* Output Panel */}
          {output && (
            <div className="h-48 border-t border-white/10 bg-black/50 p-4 overflow-y-auto">
              <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">{output}</pre>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 glass">
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                <span>Run</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </motion.button>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                <XCircle className="w-4 h-4" />
                <span>Abort (-3 pts)</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors">
                <Flag className="w-4 h-4" />
                <span>Report Bug</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
