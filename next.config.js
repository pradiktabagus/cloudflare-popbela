// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const CopyPlugin = require('copy-webpack-plugin');
const partyTown = require('@builder.io/partytown/utils');
const path = require('path');

const moduleExports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  images: {
    domains: process.env.CDN_URL.split(', '),
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1600],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.popbela.com',
        port: '',
        pathname: '/content-images/post/**',
      },
      {
        protocol: 'https',
        hostname: 'image.sotogubeng.com',
        port: '',
        pathname: '/content-images/post/**',
      },
    ],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    apiBaseUrl: process.env.API_BASE_URL,
    apiKey: process.env.X_API_KEY,
    glanceKey: process.env.GLANCE_API_USER_KEY,
    kaikaiKey: process.env.KAIKAI_API_KEY,
    apiUniversal: process.env.API_UNIVERSAL,
    universalKey: process.env.UNIVERSAL_KEY,
    ramadanMicrositeLink: process.env.RAMADAN_MICROSITE_URL,
    facebook_client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
    facebook_app_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    nextPublicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    nextBaseUrl: process.env.BASE_URL,
    dfp_network_id: process.env.NEXT_PUBLIC_DFP_NETWORK_ID,
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
    COGNITO_WEB_CLIENT_ID: process.env.COGNITO_WEB_CLIENT_ID,
    COGNITO_DASHBOARD_URI: process.env.COGNITO_DASHBOARD_URI,
    COGNITO_EDIT_PROFILE_URI: process.env.COGNITO_EDIT_PROFILE_URI,
    OAUTH_DOMAIN: process.env.OAUTH_DOMAIN,
    COGNITO_FLOW_TYPE: process.env.COGNITO_FLOW_TYPE,
    OAUTH_CALLBACK_LOGIN: process.env.OAUTH_CALLBACK_LOGIN,
    OAUTH_CALLBACK_LOGOUT: process.env.OAUTH_CALLBACK_LOGOUT,
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        source: '/api/pub',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/api/pub-amp',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/api/pages/default',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        source: '/api/categories',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/components/horoscopes',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'origins', value: '*' },
          { key: 'Bypass-Tunnel-Reminder', value: '*' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Request-Methods',
            value: 'POST, GET, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Authorization, Content-Type',
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: partyTown.libDirPath(),
            to: path.join(__dirname, 'public', '~partytown'),
          },
        ],
      })
    );
    return config;
  },
});
module.exports = moduleExports;
