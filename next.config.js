const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  output: "export",
  images: {
    domains: [
      "plus.unsplash.com",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

module.exports = nextConfig;
