import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', //当环境变量ANALYZE为true时开启
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
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
  // 确保基础路径从根开始
  basePath: '',
  // 确保资产（如CSS文件）从根路径加载
  assetPrefix: '',
  // 防止URL末尾添加斜杠
  trailingSlash: false,
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
