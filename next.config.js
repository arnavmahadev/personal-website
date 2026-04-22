const { execSync } = require('child_process')

const lastUpdated = (() => {
  try {
    return execSync('git log -1 --format=%cd --date=format:"%B %e, %Y"').toString().trim()
  } catch {
    return ''
  }
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_LAST_UPDATED: lastUpdated,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'media.valorant-api.com',
      },
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
      },
    ],
  },
}

module.exports = nextConfig
