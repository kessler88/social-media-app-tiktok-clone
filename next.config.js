/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  
  
  reactStrictMode: true,
  images: {
    domains: ["media-exp1.licdn.com", "lh3.googleusercontent.com"], 
  },
  swcMinify: true,
}

module.exports = nextConfig
