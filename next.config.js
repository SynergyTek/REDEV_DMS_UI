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
				destination: 'https://demodms.aitalkx.com/webapi/:path*',
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
	webpack: (config, { isServer }) => {
		config.resolve.alias['#outline'] = path.resolve(__dirname, 'node_modules/@awesome.me/kit-9b926a9ec0/icons/modules/classic/thin');
		config.resolve.alias['#duotone'] = path.resolve(__dirname, 'node_modules/@awesome.me/kit-9b926a9ec0/icons/modules/duotone/solid');
		config.resolve.alias['#solid'] = path.resolve(__dirname, 'node_modules/@awesome.me/kit-9b926a9ec0/icons/modules/classic/solid');
		return config;
	},
};
