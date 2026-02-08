import { useRouter } from 'next/router';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function ProblemPage() {
  const router = useRouter();
  const { id } = router.query;

  const [code, setCode] = useState('# Write your solution here\n\ndef solution():\n    pass');
  const [language, setLanguage] = useState('python');
  const [activeTab, setActiveTab] = useState('overview');
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async (isDummy: boolean) => {
    setIsRunning(true);
    // TODO: Implement code execution
    setTimeout(() => {
      setTestResults({
        passed: 2,
        total: 5,
        cases: [
          { input: '[1, 2, 3]', expected: '6', actual: '6', passed: true },
          { input: '[1, 2, 3, 4]', expected: '10', actual: '10', passed: true },
          { input: '[]', expected: '0', actual: 'null', passed: false },
        ],
      });
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    // TODO: Implement submission with anti-cheat
    alert('Submission feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="pt-16 h-screen flex">
        {/* Left Sidebar - Vertical Tabs */}
        <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
            title="Overview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'community' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
            title="Community"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </button>
          <button
            onClick={() => setActiveTab('bots')}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'bots' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
            title="AI Bots"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Problem Description (Left Half) */}
          <div className="w-1/2 bg-gray-900 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="text-white">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold">Two Sum</h1>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-sm font-semibold">
                    Easy
                  </span>
                </div>

                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Arrays</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">Hash Table</span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-3">Problem Description</h2>
                  <p className="text-gray-300 mb-4">
                    Given an array of integers <code className="px-2 py-1 bg-gray-800 rounded">nums</code> and an integer{' '}
                    <code className="px-2 py-1 bg-gray-800 rounded">target</code>, return indices of the two numbers such that they add up to target.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">Example 1:</h3>
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <p className="text-gray-400">Input:</p>
                    <code className="text-blue-400">nums = [2,7,11,15], target = 9</code>
                    <p className="text-gray-400 mt-2">Output:</p>
                    <code className="text-green-400">[0,1]</code>
                    <p className="text-gray-400 mt-2">Explanation:</p>
                    <p className="text-gray-300">Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
                  <ul className="text-gray-300 list-disc list-inside">
                    <li>2 ≤ nums.length ≤ 10⁴</li>
                    <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>-10⁹ ≤ target ≤ 10⁹</li>
                    <li>Only one valid answer exists.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'community' && (
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-4">Community Discussion</h2>
                <p className="text-gray-400">Community features coming soon...</p>
              </div>
            )}

            {activeTab === 'bots' && (
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
                <p className="text-gray-400">AI bot features coming soon...</p>
              </div>
            )}
          </div>

          {/* Code Editor (Right Half) */}
          <div className="w-1/2 bg-gray-800 flex flex-col">
            {/* Language Selector */}
            <div className="bg-gray-900 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="javascript">JavaScript</option>
              </select>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Reset Code
              </button>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
              <MonacoEditor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Test Results */}
            {testResults && (
              <div className="bg-gray-900 px-6 py-4 border-t border-gray-700 max-h-48 overflow-y-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-lg font-semibold ${testResults.passed === testResults.total ? 'text-green-400' : 'text-red-400'}`}>
                    {testResults.passed}/{testResults.total} tests passed
                  </span>
                </div>
                {testResults.cases.map((tc: any, i: number) => (
                  <div key={i} className={`mb-2 p-2 rounded ${tc.passed ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
                    <div className="flex items-center gap-2">
                      {tc.passed ? '✓' : '✗'}
                      <span className="text-gray-300">Input: {tc.input}</span>
                    </div>
                    {!tc.passed && (
                      <div className="text-sm text-gray-400 ml-6">
                        Expected: {tc.expected}, Got: {tc.actual}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-gray-900 px-6 py-4 border-t border-gray-700 flex gap-3">
              <button
                onClick={() => handleRunCode(true)}
                disabled={isRunning}
                className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run (Dummy)'}
              </button>
              <button
                onClick={() => handleRunCode(false)}
                disabled={isRunning}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
