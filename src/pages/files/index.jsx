import {Button, FileExplorer, InputField, Table} from "~";
import {faFileSearch, faFilterList} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";

const files = require("/public/files.json");

export default function Index() {
	return <div className={"flex flex-col justify-center items-center  gap-4 p-4"}>
		<div className={"flex w-1/2 gap-4"}>
			<InputField placeholder={"Search for any file ..."} />
			
			<Button icon={faFileSearch}
			        text={"Search"}
			        primary={true}></Button>
			<Button icon={faFilterList}
			        text={"Filter"}
			        mode={"secondary"}></Button>
		</div>
		<div className={"w-full"}>
			<FileExplorer source={files}/>
		</div>
	</div>
}