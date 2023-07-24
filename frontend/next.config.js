/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  i18n: {
    locales: ['en-US', 'ru'],
    defaultLocale: 'en-US',
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false };
    return config;
  },
};
