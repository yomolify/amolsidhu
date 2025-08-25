import createMDX from "@next/mdx";
/** @type {import('next').NextConfig} */
const withMDX = createMDX({ extension: /\.mdx?$/ });

const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};
export default withMDX(nextConfig);
