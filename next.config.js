const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // output: "standalone",
  // trailingSlash: true,
  images: {
    // domains: [
    //   "plus.unsplash.com",
    //   "avatars.githubusercontent.com",
    //   "images.unsplash.com",
    //   "booksroundabout.s3.amazonaws.com",
    //   "ibb.co",
    // ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "avatars.githubusercontent.com",
    //     port: "",
    //     pathname: "/u/**",
    //   },
    // ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
