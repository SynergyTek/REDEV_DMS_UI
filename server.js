const express = require('express');
const next = require('next');
const {createProxyMiddleware} = require('http-proxy-middleware');
const packageJson = require('./package.json')

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();
	const proxyConfig = packageJson.proxy || {}
	for (let domain in proxyConfig) {
		if (typeof proxyConfig[domain] === 'string') {
			server.use(domain, createProxyMiddleware({
				target: proxyConfig[domain],
				changeOrigin: true,
				secure: false,
			}))
		} else {
			server.use(domain, createProxyMiddleware(proxyConfig[domain]))
		}
	}
	
	server.all('*', (req, res) => {
		return handle(req, res);
	});
	
	server.listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});
