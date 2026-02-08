import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ProPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Upgrade to Pro</h1>
          <p className="text-xl text-white/70">Unlock unlimited potential</p>
        </div>

        {/* Feature Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Free Tier */}
          <Card className="glassmorphism border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Free</CardTitle>
              <CardDescription className="text-white/70">
                <span className="text-3xl font-bold">₹0</span>/month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-white/80">
              <p>✓ 20 problems per day</p>
              <p>✓ Basic topics</p>
              <p>✓ 20 AI queries per day</p>
              <p>✓ 20 friends limit</p>
              <p>✓ Community access</p>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="glassmorphism border-accent-500/50 border-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent-600 text-white px-4 py-1 text-sm font-semibold">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                Pro
                <Badge className="bg-accent-600">✓</Badge>
              </CardTitle>
              <CardDescription className="text-white/70">
                <span className="text-3xl font-bold">₹199</span>/month
                <br />
                <span className="text-sm">or ₹1999/year (save ₹389)</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-white/80">
              <p>✓ <strong>Unlimited</strong> problems per day</p>
              <p>✓ <strong>All topics + Interview Prep</strong></p>
              <p>✓ <strong>100</strong> AI queries per day</p>
              <p>✓ <strong>100</strong> friends limit</p>
              <p>✓ <strong>Exclusive animated banners</strong></p>
              <p>✓ <strong>Custom avatar upload</strong></p>
              <p>✓ <strong>Ad-free experience</strong></p>
              <p>✓ <strong>Priority matchmaking</strong></p>
              <p>✓ <strong>Advanced analytics</strong></p>
            </CardContent>
            <div className="p-6">
              <Button className="w-full bg-accent-600 hover:bg-accent-700 text-white font-bold py-6 text-lg">
                Upgrade Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">What Pro Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glassmorphism border-white/20">
              <CardContent className="pt-6">
                <p className="text-white/80 italic mb-4">"Pro subscription is worth every penny!"</p>
                <p className="text-white/60">- CodeMaster</p>
              </CardContent>
            </Card>
            <Card className="glassmorphism border-white/20">
              <CardContent className="pt-6">
                <p className="text-white/80 italic mb-4">"Unlimited problems helped me ace my interview"</p>
                <p className="text-white/60">- DevGuru</p>
              </CardContent>
            </Card>
            <Card className="glassmorphism border-white/20">
              <CardContent className="pt-6">
                <p className="text-white/80 italic mb-4">"The AI assistant is incredibly helpful"</p>
                <p className="text-white/60">- AlgoExpert</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
