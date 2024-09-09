import {Button} from "~";
import {fn} from "@storybook/test";
import Icon from "~/ui/icon";

export default {
	title: 'Core/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	
};

export const Hover = {
	description:"You can hover over the icon to see the effect",
	args: {
		icon: "house"
	},
};

export const HoverWithParameters = {
	args: {
		icon: "house",
		hover: {
			variant:"fad"
		}
	},
};


