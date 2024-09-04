import {Button, InputField, Table} from "~";
import {faFileSearch, faFilterList} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";


export default function Index() {
	return <div className={"flex flex-col justify-center items-center  gap-4 p-4"}>
		<div className={"flex w-1/2 gap-4"}>
			<InputField placeholder={"Search for any file ..."} />
			
			<Button icon={faFileSearch}
			        text={"Search"}
			        primary={true}></Button>
			<Button icon={faFilterList}
			        text={"Filter"}></Button>
		</div>
		<div className={"w-full"}>
			<Table data={{source: "https://jsonplaceholder.org/posts"}}
			       columns={[{header: "Id", field: "id"}, {header: "Url", field: "url"}, {
				       header: "Title",
				       field: "title"
			       },]}
			       pageLimit={10}
			
			/>
		</div>
	</div>
}