import "../src/scss/main.scss";
import {themes} from "@storybook/theming";
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
		dark: {...themes.dark},
		light: {...themes.normal},
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
		container: ({context, children}) => {
			return (<DocsContainer context={context}>
				{children}
			</DocsContainer>)
			
		},
	},
}