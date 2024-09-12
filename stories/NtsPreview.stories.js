import Table from "~/ui/table";
import NtsPreview from "~/core/NtsPreview";

// More on how to set up src at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Data/NtsPreview', component: NtsPreview,
	
};

// More on writing src with args: https://storybook.js.org/docs/writing-stories/args
export const Data = {
	args: {
		source:{
			type: "data",
		}
	},
};
