'use client';

import { useState } from 'react';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// This is a placeholder - in real app, fetch from API based on [id]
const problemData = {
  title: 'Two Sum',
  difficulty: 'Easy',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.',
  ],
  tags: ['Array', 'Hash Table'],
};

export default function ProblemPage({ params }: { params: { id: string } }) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Start coding here...');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/code/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          problemId: params.id,
        }),
      });
      const data = await response.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      setOutput('Error executing code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/code/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          problemId: params.id,
        }),
      });
      const data = await response.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      setOutput('Error submitting code');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="flex h-screen">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 overflow-y-auto border-r border-white/10">
          <div className="p-6">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="bots">Bots</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="glassmorphism border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-2xl">{problemData.title}</CardTitle>
                      <Badge variant={problemData.difficulty === 'Easy' ? 'default' : 'secondary'}>
                        {problemData.difficulty}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {problemData.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-white/70">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="text-white/90 space-y-4">
                    <p>{problemData.description}</p>

                    <div>
                      <h3 className="font-semibold mb-2">Examples:</h3>
                      {problemData.examples.map((example, idx) => (
                        <div key={idx} className="bg-black/20 p-4 rounded-lg mb-2">
                          <p className="font-mono text-sm">
                            <span className="text-primary-400">Input:</span> {example.input}
                          </p>
                          <p className="font-mono text-sm">
                            <span className="text-green-400">Output:</span> {example.output}
                          </p>
                          {example.explanation && (
                            <p className="text-sm mt-2 text-white/70">{example.explanation}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Constraints:</h3>
                      <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                        {problemData.constraints.map((constraint, idx) => (
                          <li key={idx}>{constraint}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community">
                <Card className="glassmorphism border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Community Discussions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">No discussions yet. Be the first to post!</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bots">
                <Card className="glassmorphism border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">AI Assistant</CardTitle>
                    <CardDescription className="text-white/70">15/20 queries left today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      💡 Explain this problem in simple terms
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      🧠 What concept should I use?
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      🐛 Help me debug my code
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      💭 Give me a hint
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 flex flex-col">
            <CodeEditor
              language={language}
              value={code}
              onChange={setCode}
              onLanguageChange={setLanguage}
            />
            
            {/* Action Buttons */}
            <div className="p-4 border-t border-white/10 bg-gray-900/50 flex gap-4">
              <Button
                onClick={handleRun}
                disabled={isRunning}
                variant="outline"
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isRunning}
              >
                {isRunning ? 'Submitting...' : 'Submit'}
              </Button>
              <Button variant="ghost">Report Bug</Button>
              <Button variant="destructive">Abort (-3 pts)</Button>
            </div>

            {/* Output */}
            {output && (
              <div className="p-4 bg-black/40 border-t border-white/10 max-h-48 overflow-y-auto">
                <pre className="text-white text-sm font-mono">{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
