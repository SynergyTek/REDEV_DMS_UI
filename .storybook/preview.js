import "../public/styles/storybook.scss";
import {dark, light} from "./theme";
import {addons} from "@storybook/preview-api";
import {ensure} from "@storybook/theming"
import {DARK_MODE_EVENT_NAME} from "storybook-dark-mode";
import React from "react";
import {DocsContainer} from "@storybook/blocks";

export default {
	controls: {
		matchers: {
			color: /(background|color)$/i, date: /Date$/,
		},
	}, tags: ["autodocs"]
};
let isDark = false;
const channel = addons.getChannel();
channel.on(DARK_MODE_EVENT_NAME, (e) => {
	isDark = ensure(e);
});
export const parameters = {
	darkMode: {
		dark, light, stylePreview: true, classTarget: 'html'
	}, docs: {
		toc: {
			contentsSelector: '.sbdocs-content',
			headingSelector: 'h1, h2, h3',
			ignoreSelector: '#primary',
			title: 'Table of Contents',
			disable: false,
			unsafeTocbotOptions: {
				orderedList: false,
			},
		}, container: ({context, children}) => {
			return <div className={"bg-indigo-50 dark:bg-secondary-950 "}>
				<DocsContainer context={context}>
					
					{children}
				
				</DocsContainer>
			</div>
		}
	},
}
