/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com', // Cloudinary
      'lh3.googleusercontent.com', // Google OAuth
      'avatars.githubusercontent.com', // GitHub OAuth
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Compiler options for better performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
