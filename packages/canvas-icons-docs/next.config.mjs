import nextra from 'nextra';

const withNextra = nextra({});

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // mandatory, otherwise won't export
  },
  distDir: 'docs',
};

export default withNextra(nextConfig);
