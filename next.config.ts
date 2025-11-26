import type {NextConfig} from 'next';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, {isServer}) => {
    // Copy the pdf.worker.min.mjs file to the static directory
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.join(
                __dirname,
                'node_modules/pdfjs-dist/build/pdf.worker.min.mjs'
              ),
              to: path.join(__dirname, 'public'),
            },
          ],
        })
      );
    }

    config.externals.push('canvas');

    return config;
  },
  experimental: {
    // This is to allow the Next.js dev server to be accessed from the
    // Firebase Studio preview URL.
    allowedDevOrigins: [
      '*.cluster-ulqnojp5endvgve6krhe7klaws.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
