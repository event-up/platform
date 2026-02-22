/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/firebase"],
  output: "export",
  images:{
    unoptimized:true
  }
}

export default nextConfig
