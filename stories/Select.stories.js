import {Select} from '~'

// More on how to set up src at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Data/Select',
	component: Select,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info:
		// https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	
};

// More on writing src with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
	args: {
		source: "https://jsonplaceholder.typicode.com/users",
		
	},
};
export const DataFromLOV = {
	args: {
		source: {
			type:"lov",
			parameter:"LOV_NOTE_STATUS"
		},
		map:{
			key:"Id",
			value:"Name"
		}
	},
};
