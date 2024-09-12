const path = require("path");

module.exports = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
	/** Expose public folder to storybook as static */
	staticDirs: ["../public"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials", {
		name: "@storybook/addon-postcss",
		options: {
			postcssLoaderOptions: {
				implementation: require("postcss"),
			},
		},
	}, "@storybook/addon-webpack5-compiler-babel", "@storybook/addon-themes", "@storybook/addon-styling-webpack", "storybook-dark-mode", "@chromatic-com/storybook"],
	framework: {
		name: "@storybook/nextjs",
		options: {
			builder: {
				useSwcCss: true
			}
		}
	},
	docs: {
		toc: true,
	},
	webpackFinal: async (config) => {
		// Add path aliases
		config.resolve.alias["@"] = path.resolve(__dirname, "../src");
		config.resolve.alias["~"] = path.resolve(
			__dirname,
			"../src/components"
		);
		
		return config;
	},
};
