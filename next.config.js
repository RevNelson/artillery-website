/** @type {import('next').NextConfig} */

const { i18n } = require("./lib/i18n/config")

const nextConfig = {
  i18n,
  reactStrictMode: false, // Must be false for headlessui until React 18 support
  images: {
    domains: ["cdn.nelson.tech"],
  },
  experimental: {
    outputStandalone: true,
    runtime: "nodejs",
  },
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
