'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const posts = [
  {
    id: 1,
    title: 'Best approach for Two Sum problem?',
    author: 'CodeNewbie',
    category: 'Problem Discussions',
    upvotes: 12,
    comments: 5,
    time: '2h ago',
  },
  {
    id: 2,
    title: 'How to prepare for FAANG interviews?',
    author: 'InterviewPrep',
    category: 'Career Advice',
    upvotes: 45,
    comments: 23,
    time: '5h ago',
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Community</h1>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="discussions">Problem Discussions</TabsTrigger>
            <TabsTrigger value="advice">Career Advice</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="glassmorphism border-white/20 cursor-pointer hover:scale-[1.01] transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white mb-2">{post.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        by {post.author} • {post.category} • {post.time}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-white/70">
                    <span>👍 {post.upvotes}</span>
                    <span>💬 {post.comments} comments</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
