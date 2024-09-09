import {forwardRef, useEffect, useMemo, useState} from "react";
import {type} from "@/lib/utils";
import {toast} from "sonner";
import axios from "axios";
import {useMediaQuery} from "usehooks-ts"

import {Popover, PopoverContent, PopoverTrigger} from "~/ui/popover";
import {Button} from "~/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "~/ui/command";
import {Drawer, DrawerContent, DrawerTrigger} from "~/ui/drawer";
import {Icon, Loader, Text} from "~";
import PropTypes from "prop-types";

const Select = forwardRef((
	{className, source, map = {key: "id", value: "name"}, ...props},
	ref) => {
	const [data, setData] = useState([]);
	const isDesktop = useMediaQuery("(min-width: 768px)")
	const [loading, isLoading] = useState(true);
	const [selected, setSelected] = useState(null)
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState("")
	
	useMemo(() => {
		console.log(source)
		switch (type(source)) {
			
			case "array":
				setData(source)
				break
			case "object":
				if (!source.type) toast("Source type not defined");
				switch (source.type.toLowerCase()) {
					case "lov":
						axios
							.get(`/forms/GetLOVIdNameList?lovType=${source.parameter}`)
							.then((res) => {
								console.log(res);
								setData(res.data)
								
							});
						break;
					case "enum":
						axios
							.get(`/forms/GetEnumIdNameList?enumType=${source.parameter}`)
							.then((res) => {
								console.log(res);
								setData(res.data)
							});
						break;
					case "table":
						axios
							.get(`/dmsapi/cms/query/TableData?tableName=${source.parameter}`)
							.then((res) => {
								console.log(res);
								setData(res.data)
							});
				}
				break;
			case "string":
				
				axios.get(source)
					.then((res) => {
						if (!res.data) {
							console.error("No data found")
							setData([])
						}
						let sortedData = res.data.sort((a, b) => {
							return a[map.id] > b[map.id];
						})
						setData(sortedData);
					})
					.catch((e) => {
						console.log(e);
						isLoading(false);
					});
			
		}
	}, [source]);
	useMemo(() => {
		isLoading(false)
	}, [data])
	if (isDesktop) {
		return (
			<Popover open={open}
			         onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline"
					        className="w-[200px] justify-between gap-2">
						
						<Text truncate={10}
						      className={"opacity-80"}>{selected?.[map.value] || "Select"}</Text>
						<Icon icon="chevron-down"
						      className={`ml-4 shrink-0 ${open ? "rotate-180" : "rotate-0"}`} />
					
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0"
				                align="start">
					{loading ? <Loader /> : <ContentList data={data}
					                                     map={map}
					                                     setOpen={setOpen}
					                                     setSelected={setSelected} />}
				</PopoverContent>
			</Popover>
		)
	}
	
	return (
		<Drawer open={open}
		        onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline"
				        className="w-[150px] justify-start">
					{selected ? <>{selected[map.value]}</> : <>Select</>}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				{loading ? <Loader /> : <div className="mt-4 border-t">
					<ContentList data={data}
					             map={map}
					             setOpen={setOpen}
					             setSelected={setSelected} />
				</div>
				}
			</DrawerContent>
		</Drawer>
	)
})

function ContentList({
	                     setOpen,
	                     setSelected,
	                     data,
	                     map,
                     }) {
	console.log(data)
	return (
		<Command>
			<CommandInput placeholder="Search ..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{data.map((item) => (
						<CommandItem
							key={item[map.key]}
							value={item[map.value]}
							onSelect={(value) => {
								setSelected(data.find((d) => d[map.value] === value))
								
								setOpen(false)
							}}
						>
							{item[map.value]}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}

Select.propTypes = {
	/**
	 * The source of the data. Can be an array, object or a string
	 */
	source: PropTypes.oneOf(["array", "object","string"]),
	/**
	 * Which fields should be mapped to your data?
	 * */
	map: PropTypes.shape({
		key: PropTypes.string,
		value: PropTypes.string,
	}),
}

export default Select