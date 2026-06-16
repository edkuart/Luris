import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/notarial', destination: '/escrituras', permanent: true },
      { source: '/notarial/:path*', destination: '/escrituras/:path*', permanent: true },
      { source: '/expedientes', destination: '/juicios', permanent: true },
      { source: '/expedientes/:path*', destination: '/juicios/:path*', permanent: true },
    ]
  },
}

export default nextConfig
