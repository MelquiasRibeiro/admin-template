const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = async _phase => {
	/** @type {import('next').NextConfig} */
	const nextConfig = {
		reactStrictMode: true,
		swcMinify: true,
		images: {
			path: '/assets',
			domains: ['i.ytimg.com'],
			remotePatterns: [
				{
					protocol: 'https',
					hostname: '**',
					port: '3000',
					pathname: '**',
				},
			],
		},
	};

	return withPlugins(
		[
			[
				withImages({
					webpack(config) {
						config.module.rules.push({
							test: /\.svg$/,
							use: ['@svgr/webpack'],
						});

						return config;
					},
				}),
			],
		],
		nextConfig
	)(_phase, { defaultConfig: {} });
};
