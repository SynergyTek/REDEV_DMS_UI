import { create } from '@storybook/theming/create';
const config = require('../../config');
const colors = config.theme.extend.colors;
export const light =  create({
	base: 'light',
	// Typography
	fontBase: '"Open Sans", sans-serif',
	fontCode: 'monospace',
	
	brandTitle: config.app.name,
	brandUrl: config.app.url,
	brandTarget: '_self',
	
	//
	colorPrimary: colors.primary[950],
	colorSecondary: colors.secondary[500],
	
	// UI
	appBg: colors.primary[50],
	appContentBg: colors.primary[50],
	appPreviewBg: colors.primary[50],
	appBorderColor: colors.primary[100],
	appBorderRadius: 4,
	
	// Text colors
	textColor: colors.primary[950],
	textInverseColor: colors.primary[50],
	
	// Toolbar default and active colors
	barTextColor: colors.primary[950],
	barSelectedColor: colors.primary[950],
	barHoverColor: colors.primary[500],
	barBg: colors.primary[100],
	
	// Form colors
	inputBg: colors.primary[50],
	inputBorder: colors.primary[100],
	inputTextColor: colors.primary[950],
	inputBorderRadius: 2,
});

export const dark = create({
	base: 'dark',
	// Typography
	fontBase: '"Open Sans", sans-serif',
	fontCode: 'monospace',
	
	brandTitle: 'My custom Storybook',
	brandUrl: 'https://example.com',
	brandTarget: '_self',
	
	//
	colorPrimary: '#3A10E5',
	colorSecondary: '#585C6D',
	
	// UI
	appContentBg: '#ffffff',
	appPreviewBg: '#ffffff',
	appBorderColor: '#585C6D',
	appBorderRadius: 4,
	
	// Text colors
	textColor: '#10162F',
	textInverseColor: '#ffffff',
	
	// Toolbar default and active colors
	barTextColor: '#9E9E9E',
	barSelectedColor: '#585C6D',
	barHoverColor: '#585C6D',
	barBg: '#ffffff',
	
	// Form colors
	inputBg: '#ffffff',
	inputBorder: '#10162F',
	inputTextColor: '#10162F',
	inputBorderRadius: 2,
})
