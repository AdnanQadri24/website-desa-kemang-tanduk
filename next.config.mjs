/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pengaturan izin gambar dari luar
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**', 
      },
    ],
  },
  
  // Mengabaikan error ESLint saat build di Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Mengabaikan error TypeScript (seperti penggunaan 'any') saat build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;