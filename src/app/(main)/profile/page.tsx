'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <Card className="glassmorphism border-white/20 mb-8">
          <CardHeader>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                JD
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-white">JohnDoe</h1>
                  <Badge className="bg-accent-600">Pro ✓</Badge>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <span>📧 john@example.com</span>
                  <span>🔥 25 day streak</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glassmorphism border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary-400">1,245</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-white/20">
            <CardHeader>
              <CardTitle className="text-white">League</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="text-lg">Gold III</Badge>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-accent-400">#127</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity */}
        <Card className="glassmorphism border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-white">Solved "Two Sum"</span>
                <Badge variant="outline">+10 pts</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-white">Solved "Binary Search"</span>
                <Badge variant="outline">+9 pts</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-white">League upgraded to Gold III</span>
                <Badge variant="outline">🎉</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
