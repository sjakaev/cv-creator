/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // https://github.com/diegomura/react-pdf/issues/1029
    config.resolve.alias.canvas = false;

    return config;
  },
  // При необходимости, если возникнут проблемы с компиляцией
  // swcMinify: false,
};

module.exports = nextConfig;
