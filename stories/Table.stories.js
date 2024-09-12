import Table from "~/ui/table";

// More on how to set up src at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Data/Table', component: Table,
	
};

// More on writing src with args: https://storybook.js.org/docs/writing-stories/args
export const Data = {
	args: {
		source: "https://jsonplaceholder.org/users",
		columns: [
			{header: "User Id", field: "id"},
			{header: "First Name", field: "firstname"},
			{header: "Last Name", field: "lastname"},
			{header: "Email", field: "email"},
			{header: "DOB", field: "birthDate"},
			{header: "Username", field: "login.username"},
		]
	},
};
