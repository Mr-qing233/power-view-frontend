import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', //当环境变量ANALYZE为true时开启
});

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: '@use "@/styles/globals.scss" as *;',
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https', //图片资源的协议
        hostname: 'www.test.com', //图片资源的域名
      },
    ],
  },
  reactStrictMode: false,
  experimental: {
    turbo: {
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
  },
};

export default withBundleAnalyzer(nextConfig);
