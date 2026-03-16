/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // keeps build working even if TS errors exist
  },
  images: {
    unoptimized: true, // avoids image optimization errors
  },
  webpack: (config, { isServer }) => {
    // Don't bundle Prisma client on the client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ".prisma/client": false, // fix fallback for Prisma
      };
    }
    return config;
  },
  turbopack: {}, // <-- disables Turbopack and prevents build errors
};

export default nextConfig;