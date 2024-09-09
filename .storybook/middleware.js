const { createProxyMiddleware } = require('http-proxy-middleware')
const packageJson = require('../package.json')

module.exports = function expressMiddleware(router) {
	const proxyConfig = packageJson.proxy || {}
	
	for (let domain in proxyConfig) {
		if (typeof proxyConfig[domain] === 'string') {
			router.use(domain, createProxyMiddleware({
				target: proxyConfig[domain],
				changeOrigin: true,
				secure: false,
			}))
		} else {
			router.use(domain, createProxyMiddleware(proxyConfig[domain]))
		}
	}
}