const redirects = require('./redirects');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  productionBrowserSourceMaps: true,

  // Environment variables
  env: {
    SERVICE_ACCOUNT_TOKEN: process.env.SERVICE_ACCOUNT_TOKEN,
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'markdown-loader',
    });

    if (!isServer) {
      // Client-side optimizations
      config.optimization.splitChunks = {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    // Analyze the bundle when analyzing mode is on
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)());
    }

    return config;
  },

  // SASS options
  sassOptions: {
    prependData: `
      @use 'styles/vars' as *;
      @use 'styles/breakpoints' as bp;
      @use 'styles/typography' as type;
      @use 'styles/colours' as col;
      @use 'styles/utilities' as util;
      @use 'styles/animations' as animate;
    `,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        // Sanity
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        // Brandfolder
        protocol: 'https',
        hostname: 'cdn.bfldr.com',
        port: '',
        pathname: '/**',
      },
      {
        // AWS S3
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        // Google profile photos (Places reviews)
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Serve modern formats
  },

  // HTTP headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          

          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return redirects;
  }
};

module.exports = withBundleAnalyzer(nextConfig);
