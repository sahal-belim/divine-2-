/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Don't bundle Prisma client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ".prisma/client/default": false,
      };
    }
    return config;
  },
}

export default nextConfig
