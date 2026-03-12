/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': [
          {
            resourceQuery: /url/,
            type: 'asset',
          },
          {
            loaders: ['@svgr/webpack'],
            as: '*.js',
          },
        ],
      },
    },
  },
};

module.exports = nextConfig;
