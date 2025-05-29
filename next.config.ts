import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'utfs.io',
				port: '',
			},
		],
	},
};

export default nextConfig;
