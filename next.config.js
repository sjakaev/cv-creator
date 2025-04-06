/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Отключаем проверку ESLint при сборке, чтобы избежать ошибок с кавычками
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // https://github.com/diegomura/react-pdf/issues/1029
    config.resolve.alias.canvas = false;

    return config;
  },
  // If needed, in case of compilation problems
  // swcMinify: false,
};

module.exports = nextConfig;
