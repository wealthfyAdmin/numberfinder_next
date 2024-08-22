module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  
    async rewrites() {
      return [
        {
          source: '/app/api/:path*',
          destination: 'https://api.anycomplete.com/api20/:path*',
        },
      ];
    },
  };
  