import createMDX from "@next/mdx";
/** @type {import('next').NextConfig} */
const withMDX = createMDX({ extension: /\.mdx?$/ });

const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  pageExtensions: ["ts", "tsx", "mdx"]
};
export default withMDX(nextConfig);
