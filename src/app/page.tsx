import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to landing page or home based on auth status
  // For now, redirect to main home
  redirect('/home');
}
