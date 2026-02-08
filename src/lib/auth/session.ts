import { NextRequest } from 'next/server';
import { getTokenFromHeader, verifyToken } from './jwt';

export async function getUserFromRequest(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader);
  
  if (!token) {
    return null;
  }
  
  const payload = verifyToken(token);
  return payload?.userId || null;
}

export function createUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: 'Unauthorized' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
}
