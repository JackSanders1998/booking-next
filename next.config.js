/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  experimental: {
    transpilePackages: ['swagger-client', 'swagger-ui-react', 'next-swagger-doc'],
  },
};

module.exports = nextConfig;
