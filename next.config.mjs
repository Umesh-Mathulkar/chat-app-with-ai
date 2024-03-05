/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
        ],
      },
      async rewrites() {
        return [
          {
            source: '/api/chat/:path*',
            destination: 'http://localhost:5000/:path*', // Your Node.js server 
          },
        ];
      },
}

export default nextConfig
