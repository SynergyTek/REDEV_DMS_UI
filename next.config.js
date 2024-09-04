const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

module.exports = {
	compiler: {
		styledComponents: true,
	},
	async rewrites() {
		return [
			{
				source: '/dmsapi/:path*',
				destination: 'https://localhost:44325/:path*',
			}
		];
	},
	async headers() {
		return [
			{
				source: '/dmsapi/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
				],
			},
		];
	},
};
