/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "malin-recipe-aws-bucket.s3.eu-west-3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
