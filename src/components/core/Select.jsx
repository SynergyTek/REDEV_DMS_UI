import {forwardRef, useEffect, useMemo, useState} from "react";
import {type} from "@/lib/utils";
import {toast} from "sonner";
import axios from "axios";
import {useMediaQuery} from "usehooks-ts";

import {Popover, PopoverContent, PopoverTrigger} from "~/ui/popover";
import {Button} from "~/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/ui/command";
import {Drawer, DrawerContent, DrawerTrigger} from "~/ui/drawer";
import {Icon, Loader, Text} from "~";
import PropTypes from "prop-types";

const sizeMap = {
	"xs": {trigger: "w[100pt]", popover: "w[100pt]"},
	"sm": {trigger: "w-[125pt]", popover: "w-[125pt]"},
	"md": {trigger: "w-[150pt]", popover: "w-[150pt]"},
	"lg": {trigger: "w-[175pt]", popover: "w-[175pt]"},
	"xl": {trigger: "", popover: ""},
	"2xl": {trigger: "", popover: ""},
	"3xl": {trigger: "", popover: ""},
	
}
const Select = forwardRef(
	(
		{
			className,
			size = "md", source, map = {key: "id", value: "name"}, defaultValue, onSelect,
			...props
		},
		ref
	) => {
		const [data, setData] = useState([]);
		const isDesktop = useMediaQuery("(min-width: 768px)");
		const [loading, isLoading] = useState(true);
		const [selected, setSelected] = useState(null);
		const [open, setOpen] = useState(false);
		const [value, setValue] = useState("");
		
		useMemo(() => {
			switch (type(source)) {
				case "array":
					setData(source);
					break;
				case "object":
					if (!source.type) toast("Source type not defined");
					switch (source.type.toLowerCase()) {
						case "lov":
							axios
								.get(
									`/dmsapi/cms/query/GetLOVIdNameList?lovType=${source.parameter}`
								)
								.then((res) => {
									console.log(res);
									setData(res.data);
								});
							break;
						case "enum":
							axios
								.get(
									`/dmsapi/cms/query/GetEnumIdNameList?enumType=${source.parameter}`
								)
								.then((res) => {
									console.log(res);
									setData(res.data);
								});
							break;
						case "table":
							axios
								.get(
									`/dmsapi/cms/query/cms/query/TableData?tableName=${source.parameter}`
								)
								.then((res) => {
									console.log(res);
									setData(res.data);
								});
					}
					break;
				case "string":
					axios
						.get(source)
						.then((res) => {
							if (!res.data) {
								console.error("No data found");
								setData([]);
							}
							let sortedData = res.data.sort((a, b) => {
								return a[map.id] > b[map.id];
							});
							setData(sortedData);
						})
						.catch((e) => {
							console.log(e);
							isLoading(false);
						});
			}
		}, [source]);
		useMemo(() => {
			if (defaultValue) {
				let defaultKey = defaultValue;
				if (type(defaultValue) === "object") {
					defaultKey = data.find(
						(d) => d[map.value] === defaultValue[map.value]
					);
				}
				setSelected(defaultKey);
			}
		}, [data]);
		useEffect(() => {
			isLoading(false);
		}, []);
		
		useEffect(() => {
			onSelect && onSelect(selected);
		}, [selected]);
		
		return loading ? (
			<Loader />
		) : isDesktop ? (
			<Popover open={open}
			         onOpenChange={setOpen}>
				<PopoverTrigger asChild
				                className={selected && "pr-2"}>
					<Button variant="outline"
					        className="w-full justify-between gap-2"
					        value={selected?.[map.value]}
					        ref={ref}>
						<Text truncate={10}
						      className={"opacity-80"}>
							{selected?.[map.value] || "Select"}
						</Text>
						<Icon
							icon="chevron-down"
							className={`ml-auto shrink-0 hover:translate-y-0.5 ${open ? "rotate-180" : "rotate-0"}`}
						/>
						<Icon
							className={`ml-2 ${selected ? "block" : "hidden"} hover:text-danger-400`}
							icon={"close"}
							onClick={(e) => {
								e.preventDefault()
								setSelected(null)
							}} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0"
				                align="start">
					{loading ? (
						<Loader />
					) : (
						<ContentList
							data={data}
							map={map}
							setOpen={setOpen}
							setSelected={setSelected}
							// onSelect={onSelect}
						/>
					)}
				</PopoverContent>
			</Popover>
		) : (
			<Drawer open={open}
			        onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button variant="outline"
					        className="w-[150px] justify-start">
						{selected ? <>{selected[map.value]}</> : <>Select</>}
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					{loading ? (
						<Loader />
					) : (
						<div className="mt-4 border-t">
							<ContentList
								data={data}
								map={map}
								setOpen={setOpen}
								setSelected={setSelected}
								// onSelect={onSelect}
							/>
						</div>
					)}
				</DrawerContent>
			</Drawer>
		);
	}
);

function ContentList({setOpen, setSelected, data, map}) {
	console.log(data);
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
								const selectedVal = data.find((d) => d[map.value] === value);
								setSelected(selectedVal);
								setOpen(false);
							}}
						>
							{item[map.value]}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

Select.propTypes = {
	/**
	 * The source of the data. Can be an array, object or a string
	 */
	source: PropTypes.oneOf(["array", "object", "string"]),
	/**
	 * Which fields should be mapped to your data?
	 * */
	map: PropTypes.shape({
		key: PropTypes.string,
		value: PropTypes.string,
	}),
};

export default Select;
