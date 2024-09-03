import "../public/styles/main.scss";
import {dark,light} from "./theme";
import {addons} from "@storybook/preview-api";
import {DocsContainer, Title} from "@storybook/blocks";
import React from "react";


export default {
	actions: {argTypesRegex: "^on[A-Z].*"},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	tags: ["autodocs"],
};
const channel = addons.getChannel();
export const parameters = {
	darkMode: {
		dark: dark,
		light: light,
		stylePreview: true,
	},
	docs: {
		toc: {
			contentsSelector: '.sbdocs-content',
			headingSelector: 'h1, h2, h3',
			ignoreSelector: '#primary',
			title: 'Table of Contents',
			disable: false,
			unsafeTocbotOptions: {
				orderedList: false,
			},
		},
		components:{
			code:<div></div>
		}
	},
}