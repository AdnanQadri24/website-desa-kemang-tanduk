import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**', // Mengizinkan semua path di bawah domain tersebut
      },
    ],
  },
};

export default nextConfig;
