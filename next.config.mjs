// import  { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        "hostname": "res.cloudinary.com",
      }
    ],
    domains: ['avatar.iran.liara.run'], // Add other domains here if needed
  },
};

export default nextConfig;
