/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // Use true if this is a permanent redirect (301)
      },
    ];
  },
};

export default nextConfig;
