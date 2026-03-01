import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  output: 'standalone',
}
export default nextConfig
