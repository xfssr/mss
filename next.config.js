/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

module.exports = nextConfig;
