/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: { loader: 'file-loader' },
    });
    return config;
  },
};

module.exports = nextConfig;
