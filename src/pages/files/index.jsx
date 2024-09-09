import {FileExplorer, Icon, InputField, Select, Table} from "~";
import {faFileSearch, faFilterList} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";
import {Button} from "~/ui/button";

const files = require("/public/files.json");

export default function Index() {
	return <div className={"flex flex-col justify-center items-start  gap-4 p-4"}>
		<div className={"flex gap-2 align-start"}>
			<InputField placeholder={"Search for any file ..."} />
			
			<Button>
				<Icon icon={"file-magnifying-glass"} />
			</Button>
			<Button variant={"secondary"}>
				<Icon icon={"filter-list"} />
			</Button>
			<Select source={"/dmsapi/dms/query/GetBulkUploadTemplateCodeNameList"}
			        map={{
				        key: "Id",
				        value: "Name",
			        }} 
			defaultValue={{"Name":"Engineering Subcontract"}}
			/>
		
		</div>
		<div className={"w-full"}>
			<FileExplorer source={"/dmsapi/dms/workspace/GetParentWorkspace?userId=45bba746-3309-49b7-9c03-b5793369d73c&portalName=DMS"} />
		</div>
	</div>
}