const dotenv = require('dotenv').config();
const nextComposePlugins = require('next-compose-plugins');

const headers = require('./config/headers');
const plugins = require('./config/plugins');

/**
 * https://github.com/cyrilwanner/next-compose-plugins/issues/59
 */
const { withPlugins } = nextComposePlugins.extend(() => ({}));

/**
 * Next config
 * documentation: https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
module.exports = withPlugins(plugins, {
  /**
   * add the environment variables you would like exposed to the client here
   * documentation: https://nextjs.org/docs/api-reference/next.config.js/environment-variables
   */
  env: {
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
  },

  /**
   * The experimental option allows you to enable future/experimental options
   * like React 18 concurrent features.
   */
  experimental: {
    // urlImports: true,
    // concurrentFeatures: true,
    // serverComponents: true,
  },

  /**
   * SWC minification opt-in
   * Please note that while not in experimental, the swcMinification may cause issues in your build.
   * example: https://github.com/vercel/next.js/issues/30429 (Yup email validation causes an exception)
   */
  // swcMinify: true,

  poweredByHeader: false,
  compress: true,

  /**
   * add the headers you would like your next server to use
   * documentation: https://nextjs.org/docs/api-reference/next.config.js/headers
   *                https://nextjs.org/docs/advanced-features/security-headers
   */
  headers,

  /**
   * https://nextjs.org/docs/basic-features/image-optimization
   * Settings are the defaults
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'images.eu.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'news.airbnb.com',
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
