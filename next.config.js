/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["siaczrmgpovlpruiitkw.supabase.co"],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
