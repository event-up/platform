/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/firebase"],
  images:{
    unoptimized:true
  }
}

export default nextConfig
