import {forwardRef, useEffect, useMemo, useRef, useState} from "react";
import {cn, type} from "@/lib/utils";
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
import {cva} from "class-variance-authority";

const sizeMap = {
	"xs": {trigger: "w[100pt]", popover: "w[100pt]"},
	"sm": {trigger: "w-[125pt]", popover: "w-[125pt]"},
	"md": {trigger: "w-[150pt]", popover: "w-[150pt]"},
	"lg": {trigger: "w-[175pt]", popover: "w-[175pt]"},
	"xl": {trigger: "", popover: ""},
	"2xl": {trigger: "", popover: ""},
	"3xl": {trigger: "", popover: ""},
	
}
const selectVariants = cva({})
const Select = forwardRef(
	(
		{
			className,
			size = "md", source, map = {key: "id", value: "name"},
			defaultValue,
			onSelect,
			search = true,
			variant = "tertiary",
			reset = true,
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
		ref = ref ||  useRef()
		if (ref.current)  ref.current.clear = () => {
			setSelected(null);
		}
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
				let defaultKey = data.find(
					(d) => {
						if (type(defaultValue) === "object") {
							return d[defaultKey.key] === defaultValue[defaultKey.key]
						} else {
							return d[map.key] === defaultValue
						}
					}
				);
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
					<Button variant={variant}
					        className={cn("justify-between gap-2", className)}
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
						{reset &&
							<Icon
								className={`ml-2 ${selected ? "block" : "hidden"} hover:text-danger-400`}
								icon={"close"}
								onClick={(e) => {
									e.preventDefault()
									setSelected(null)
								}} />
						}
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
							search={search}
						/>
					)}
				</PopoverContent>
			</Popover>
		) : (
			<Drawer open={open}
			        onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button variant={variant}
					        className={cn("justify-between gap-2", className)}
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
						{reset &&
							<Icon
								className={`ml-2 ${selected ? "block" : "hidden"} hover:text-danger-400`}
								icon={"close"}
								onClick={(e) => {
									e.preventDefault()
									setSelected(null)
								}} />
						}
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
								search={search}
							/>
						</div>
					)}
				</DrawerContent>
			</Drawer>
		);
	}
);

function ContentList({setOpen, search, setSelected, data, map}) {
	console.log(data);
	return (
		<Command>
			{search && <CommandInput placeholder="Search ..." />}
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
