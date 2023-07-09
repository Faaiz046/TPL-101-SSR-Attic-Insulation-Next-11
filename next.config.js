/** @type {import('next').NextConfig} */
const withPwa = require('next-pwa')({
  dest: '/',
});

const nextConfig = withPwa({
  output: 'standalone',
  reactStrictMode: true,
  images: 
  // {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**',
  //     },
  //   ],
  // },
  { domains: ["avico-global-domain-images.s3.amazonaws.com", "avico-global-template-images.s3.ap-northeast-1.amazonaws.com"] },
  swcMinify: true,
  productionBrowserSourceMaps: true,
  env: {
    GA_TRACKING_CODE: 'G-X51H7PBJ40',
    IMAGE_PATH: 'https://avico-global-domain-images.s3.amazonaws.com/images/',
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/robots.txt',
  //       destination: '/api/robots'
  //     }
  //   ];
  // }
});

module.exports = nextConfig;
