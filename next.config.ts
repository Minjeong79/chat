import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["rzlzhvlftiqiqovonrwd.supabase.co"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
