/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "png.pngtree.com",
      "hospitable.com",
      "lh3.googleusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
