/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { version } = require('./package.json')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
})

const nextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig: {
		version,
	},
}

module.exports = withPWA(withBundleAnalyzer(nextConfig))
