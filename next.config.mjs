/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  // Allow dev access from your phone's LAN IP so cross-origin dev requests
  // to /_next/* won't be blocked in development. Add any other local IPs
  // you use (e.g. 192.168.1.x) as needed.
  allowedDevOrigins: [
    "http://localhost:3000",
    // Replace or add your device IP(s) below. Example from your message:
    "http://192.168.31.21:3000",
    // Allow access without port (some tools use origin without port)
    "http://192.168.31.21",
  ],
};

export default nextConfig;
