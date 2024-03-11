/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
