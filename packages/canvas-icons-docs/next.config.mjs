import nextra from 'nextra';

const withNextra = nextra({});

// The site is published to https://workday.github.io/canvas-icons/, so all
// emitted asset URLs must be prefixed with the repo name. Only apply the
// prefix in production builds so `yarn docs:dev` still works at `/`.
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/canvas-icons' : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // mandatory, otherwise won't export
  },
  distDir: 'docs',
  basePath,
  assetPrefix: basePath,
};

export default withNextra(nextConfig);
