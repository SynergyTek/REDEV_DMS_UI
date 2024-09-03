import "../public/styles/main.scss";
import {dark, light} from "./theme";
import {addons} from "@storybook/preview-api";
import {themes, ensure} from "@storybook/theming"
import {useDarkMode} from "storybook-dark-mode";
import {
	DARK_MODE_EVENT_NAME, UPDATE_DARK_MODE_EVENT_NAME
} from 'storybook-dark-mode';
import React from "react";
import {Controls, DocsContainer, Primary, Stories, Title} from "@storybook/blocks";
import DocsPage from "./DocsPage";

export default {
	actions: {argTypesRegex: "^on[A-Z].*"}, controls: {
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
		dark, light, stylePreview: true,
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
