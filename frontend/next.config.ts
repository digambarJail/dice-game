/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Ensure Next.js generates static HTML
  trailingSlash: true, // Helps avoid 404s on subpaths
};

module.exports = nextConfig;
