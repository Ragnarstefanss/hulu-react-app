/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {domains: ["links.papareact.com", "image.tmdb.org"]},
  distDir: 'build',
}

module.exports = nextConfig

// /**
//    * @type {import('next').NextConfig}
//    */
// const nextConfig   = {
//   images: {
//     loader: 'akamai',
//     path: '',
//   },
//   assetPrefix: './',
// };

// export default   nextConfig;