/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disables React strict mode
    eslint: {
      ignoreDuringBuilds: true, // Ignores ESLint errors during build
    },
    typescript: {
      ignoreBuildErrors: true, // Ignores TypeScript errors during build
    },
  };
  
  export default nextConfig;
  