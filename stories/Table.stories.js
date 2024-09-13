import Table from "~/ui/table";
import {toast} from "sonner";
import axios from "axios";

// More on how to set up src at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Data/Table', component: Table,
	
};

// More on writing src with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
	args: {
		source: "https://jsonplaceholder.org/users",
		columns: [
			{header: "User Id", field: "id"},
			{header: "First Name", field: "firstname"},
			{header: "Last Name", field: "lastname"},
			{header: "Email", field: "email"},
			{header: "DOB", field: "birthDate"},
			{header: "Username", field: "login.username"},
		],
	},
};

/** You can turn off pagination by setting the pagination prop to false
 * 
 * Also, if you see the code, we have given a function as the source!
 * 
 */

export const WithoutPagination = {
	args: {
		source: async () => {
			return axios.get('https://dummyjson.com/products?limit=10&skip=10&select=title,price').then(res => res.data.products)
		},
		columns: [
			{header: "Id", field: "id"},
			{header: "Title", field: "title"},
			{header: "Price", field: "price"},
		],
		pagination: false,
	},
};
