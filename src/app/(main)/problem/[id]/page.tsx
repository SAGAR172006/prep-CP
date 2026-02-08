import { ProblemPageClient } from './ProblemPageClient';

// Server component to handle params
export default async function ProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params as required by Next.js 15
  const { id } = await params;
  
  return <ProblemPageClient problemId={id} />;
}
