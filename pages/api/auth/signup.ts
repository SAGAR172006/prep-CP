import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // TODO: Connect to backend API to create user
    // For now, returning success
    // const response = await fetch('http://localhost:3001/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password }),
    // });

    // const data = await response.json();

    // Mock successful response
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        name,
        email,
      },
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create account',
    });
  }
}
