import {Dropdown, FileExplorer, Icon, InputField, Select, Separator, Table} from "~";
import {faFileSearch, faFilterList} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";
import {Button} from "~/ui/button";
import {forwardRef, useRef, useState} from "react";
import axios from "axios";

const Input = forwardRef((
	{type, ...props}, ref) => {
	return <input
		defaultValue={props.value}
		ref={ref}
		type={type}
		className={"transition-all flex h-10 w-full md:w-40 lg:48 2xl:w-56 rounded-md border border-secondary-200 dark:border-secondary-700 bg-transparent dark:text-secondary-300 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"}
		placeholder={"Search for any file ..."}></input>
})
export default function Index() {
	const searchRef = useRef();
	const fromRef = useRef();
	const toRef = useRef();
	const [filter, setFilter] = useState();
	return <div className={"flex flex-col justify-center items-start  gap-4 p-4"}>
		<div className={"flex flex-col md:flex-row gap-2 items-center w-full md:w-fit "}>
			<div className={"flex flex-col lg:flex-row gap-2 w-full "}>
				<Select
					source={[
						{label: "All", value: "all"},
						{label: "Documents", value: "documents"},
						{label: "Images", value: "images"},
						{label: "Videos", value: "videos"},
						{label: "Audio", value: "audio"},
						{label: "Code", value: "code"},
						{label: "Others", value: "others"},
					]}
					map={{
						value: "label",
						key: "value"
					}}
					className={"w-36"}
					variant={"outline"}
					reset={false}
					defaultValue={"all"}
				/>
				
				<Input type={"search"}
				       ref={searchRef}
				       value={"a"} />
			</div>
			<div className={"flex flex-col lg:flex-row gap-2 w-full"}>
				<Input type={"date"}
				       ref={fromRef}
				       value={("2023-01-01")} />
				<Input type={"date"}
				       ref={toRef}
				       value={"2024-09-01"} />
			</div>
			<div className={"flex flex-col lg:flex-row gap-2  w-full"}>
				<Button icon={"magnifying-glass"}
				        onClick={() => {
					        setFilter(`dmsapi/dms/query/ReadGlobalSearchResult?userId=45bba746-3309-49b7-9c03-b5793369d73c&serachStr=${searchRef.current.value}&fromDate=${fromRef.current.value}&toDate=${toRef.current.value}`)
					        
				        }} />
				<Button icon={"filter-list"}
				        variant={"secondary"} />
				{<Button icon={"xmark"}
				         onClick={() => {
					         searchRef.current.value = ""
					         fromRef.current.value = ""
					         toRef.current.value = ""
					         setFilter(null)
				         }}
				         className={`${!filter && "hidden"}`}
				         variant={"secondary"} />}
			</div>
		
		
		</div>
		<div className={"w-full"}>
			<FileExplorer filter={filter} />
		</div>
	</div>
}