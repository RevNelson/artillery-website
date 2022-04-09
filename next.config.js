/** @type {import('next').NextConfig} */

const { i18n } = require("./lib/i18n/config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["cdn.nelson.tech"],
  },
  experimental: {
    outputStandalone: true,
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
