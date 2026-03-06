/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/codex',
        permanent: true,
      },
      {
        source: '/work/:slug',
        destination: '/codex/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
