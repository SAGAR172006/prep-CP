import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Prep-CP</h1>
          <p className="text-gray-300">Gamified Coding Practice Platform</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
