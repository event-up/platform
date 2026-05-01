/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/firebase", "@workspace/page-builder"],
  images:{
    unoptimized:true
  }
}

export default nextConfig
