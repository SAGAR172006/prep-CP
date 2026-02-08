'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const leaderboardData = [
  { rank: 1, username: 'CodeMaster', points: 2500, league: 'Conqueror', streak: 45 },
  { rank: 2, username: 'AlgoGuru', points: 2350, league: 'Conqueror', streak: 38 },
  { rank: 3, username: 'DevPro', points: 2200, league: 'Conqueror', streak: 30 },
];

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Rankings</h1>

        <Tabs defaultValue="global" className="space-y-4">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="course">Course-wise</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <Card className="glassmorphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Global Leaderboard</CardTitle>
                <CardDescription className="text-white/70">
                  Top performers worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.rank}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                          #{user.rank}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{user.username}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{user.league}</Badge>
                            <span className="text-white/60 text-sm">🔥 {user.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-400">{user.points}</p>
                        <p className="text-white/60 text-sm">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="course">
            <Card className="glassmorphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Course-wise Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">Select a course to view rankings</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="local">
            <Card className="glassmorphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Local Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">Enable location access to see local rankings</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
