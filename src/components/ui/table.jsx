import {CheckBox, ContextMenu, Dropdown, InputField, Loader, Pagination, Select, Template, Text} from "~";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "~/ui/resizable";
import {Button} from "~/ui/button";
import {Input} from "~/ui/input";
import {flattenObject} from "@/lib/utils";
import {cmHandler} from "~/core/ContextMenu";
const columnWidthMap = {
	1: "w-1/12",
	2: "w-2/12",
	3: "w-3/12",
	4: "w-4/12",
	5: "w-5/12",
	
	
}

function Toolbar({
	                 onSearch,
	                 columns,
	                 onFilter,
	                 onRefresh,
	                 onExport,
	                 onPrint,
	                 onAdd,
	                 onEdit,
	                 onDelete,
	                 onSettings,
	                 ...props
                 }) {
	const [selection, setSelection] = useState(false);
	const handleExport = (selected) => {
		console.log(selected, " selected");
		onExport(selected);
	}
	return (
		<div
			className={"flex gap-2 p-4 items-center bg-primary-900 shadow-md text-primary-100 dark:bg-secondary-800 dark:text-primary-300"}
		>
			{selection ? (
				
				<Button
					icon={"close"}
					onClick={() => {
						setSelection(false);
					}}
				></Button>) : null}
			{columns?.length > 0 ? < >
				<Select
					source={columns}
					map={{"key": "field", "value": "header"}}
					size={"sm"}
					defaultValue={"1"}
					reset={false}
					// onSelect={onSelect}
				/>
				<Input
					type="text"
					placeholder="Search Here"
					required={false}
					id="Search-filter"
					className={"w-48 rounded bg-transparent text-sm h-8 p-2 px-2"}
					// onChange={onChange}
				/>
				
				
				<Dropdown source={[
					{id: "excel", name: "Excel", icon: "file-excel"},
					{id: "word", name: "Word", icon: "file-word"},
					{id: "pdf", name: "PDF", icon: "file-pdf"},
				
				]}
				          onSelect={handleExport}
				>
					<Button size={"sm"}
					        icon={"download"}
					        variant={"outline"}></Button>
				</Dropdown>
			</> : null}
		</div>
	)
}

function Header({context, index, onClick, onContextMenu, ...props}) {
	return <div
		className={`min-h-12  items-center flex bg-primary-300/70 text-primary-950 dark:text-primary-50 dark:bg-secondary-900 dark:border-gray-700 hover:text-primary-50 hover:bg-primary-500/80 dark:hover:bg-gray-600 transition-all
	 ease-linear cursor-pointer`}
		onClick={onClick}
		onContextMenu={onContextMenu}
	><Text  
		color={"inherit"}
		size={"xs"}
	       className={`font-bold uppercase pl-4 w-full ${!props.isFirst && "border-l"} ${!props.isLast && "border-r"} border-primary-400 dark:border-primary-300/30`}>{context.header}</Text>
	
	</div>
}

function Cell({data, context, onClick, onContextMenu, ...props}) {
	return <div
		className={`h-12 border-b text-primary-950 dark:text-primary-100 px-4 p-2 dark:border-secondary-800 [&.hover]:text-primary-50 [&.hover]:bg-primary-500 dark:[&.hover]:bg-primary-800/60 data-[row-hover]:bg-primary-400/50 dark:data-[row-hover]:bg-primary-800/40 transition-all
	 ease-linear cursor-pointer overflow-clip`}
		onClick={onClick}
		onMouseEnter={props.onHover}
		onMouseLeave={props.onHover}
		onContextMenu={onContextMenu}
		data-index={props.index}
	>
		{data &&
		context.template ? (<Template context={data[context.field]}>{context.template}</Template>) : (
			<Text truncate={true}
			      color={"inherit"}
			      wrap={false}>{data[context.field]}</Text>
		
		)}
	
	
	</div>
}


function Table({
	               source,
	               columns = ["Id", "Name"],
	               pageLimit = 10,
	               actions,
	               pagination = true,
	               ...props
               }) {
	const [allData, setAllData] = useState([]);
	const [data, setData] = useState(null);
	const [fetchedColumns, setFetchedColumns] = useState(columns);
	const [pageData, setPageData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [selection, setSelection] = useState(false);
	const [colFilter, selColFilter] = useState({
		data: [],
		display: "display",
		value: "value",
	});
	const [fInput, setFInput] = useState("");
	const [fSelect, SetFSelect] = useState({
		display: "",
		value: "",
	});
	useEffect(() => {

		if (!source || !columns) {
			setData(null);
			setFetchedColumns(null);
			setAllData([]);
			setLoading(false);
			return;
		}
		if (typeof source === "function") {
			data().then((res) => {
				setData(res);
				setLoading(false);
			});
		}
		if (typeof columns === "function") {
			columns().then((res) => {
				setFetchedColumns(res);
				setLoading(false);
			});
		}
		if (Array.isArray(source)) {
			source.length ? setData(data) : setData(null);
			setLoading(false);
		}
		if (typeof source === "string") {
			axios
				.get(source)
				.then((res) => {
					if (Array.isArray(res.data)) {
						setData(res.data);
						setLoading(false);
					}
				})
				.catch((e) => {
					setData(null);
					console.log(e);
				});
			
			if (columns.length > 0) {
				const cols = columns.map((item) => {
					const tempObj = {
						display: item.header,
						value: item.field,
					};
					return tempObj;
				});
				const tempData = {...colFilter};
				tempData.data = [...cols];
				selColFilter(tempData);
			}
		}
	}, []);
	
	useEffect(() => {
		if (Array.isArray(data) && data.length) {
			let _data = [],
				lowerLimit = (currentPage - 1) * pageLimit,
				upperLimit = pagination ? Math.min(
					data.length,
					pageLimit + (currentPage - 1) * pageLimit
				) : data.length;
			for (let i = lowerLimit; i < upperLimit; i++) {
				if (data[i]) {
					_data.push(data[i]);
				}
			}
			setPageData(_data);
		}
		
	}, [data, currentPage]);
	
	
	
	const selectRow = (event) => {
		setSelection(true);
	};
	const onSelect = (selectedVal) => {
		SetFSelect(selectedVal);
		handleFilter(fInput, selectedVal);
		// console.log(selectedVal, "value on select");
	};
	const onChange = (inputVal) => {
		setFInput(inputVal);
		handleFilter(inputVal, fSelect);
		// console.log(inputVal, "input from textField")
	};
	const handleFilter = (inputText, selectText) => {
		if (!data || !data.length > 0) {
			return;
		}
		console.log(colFilter, " col data");
		//console.log(allData, " all data", typeof allData)
		const newFilteredData = [];
		allData.forEach((allItem) => {
			console.log(allItem, " my item");
			if (selectText.value) {
				if (
					allItem[selectText.value]
						.toLowerCase()
						.includes(inputText.toString().toLowerCase())
				) {
					newFilteredData.push(allItem);
				}
			} else {
				const tempData = [];
				colFilter.data.forEach((item) => {
					if (
						allItem[item.value]
							.toLowerCase()
							.includes(inputText.toString().toLowerCase())
					) {
						console.log(
							allItem[item.value],
							" inside item ",
							inputText.toString().toLowerCase()
						);
						newFilteredData.push(allItem);
					}
					//console.log(allItem[item.value], " fields" ,  inputText.toString().toLowerCase())
					//return allItem[item.value].toLowerCase().includes(inputText.toString().toLowerCase())
				});
				//console.log(tempData, " dynamic filter");
				//return tempData
			}
		});
		console.log(
			inputText,
			" input",
			selectText,
			" select",
			newFilteredData,
			" new f"
		);
		if (Array.isArray(newFilteredData)) {
			setData(newFilteredData);
		}
	};
	
	const getRowSiblings = (element) => {
		const siblings = [];
		const table = element.parentElement.parentElement
		const elementIndex = element.dataset.index;
		table.querySelectorAll("[data-panel]").forEach((panel) => {
			Array.from(panel.children).forEach((child)=>{
				child.removeAttribute("data-row-hover")
				if (elementIndex===child.dataset.index &&child!==element) siblings.push(child)
			})
		})
		return siblings;
	};
	const handleRowHover = (event) => {
		
		getRowSiblings(event.currentTarget)
		switch (event.type) {
			case "mouseleave":
				event.currentTarget.classList.remove("hover");
				getRowSiblings(event.currentTarget).forEach((sibling)=>{
					sibling.removeAttribute("data-row-hover")
				})
				break;
			case "mouseenter":
				event.currentTarget.classList.add("hover");
				getRowSiblings(event.currentTarget).forEach((sibling)=>{
					sibling.dataset.rowHover = true
				})
				break;
		}
		
	}
	const handleContextMenu = (event) => {
		console.log(event)
		cmHandler.show(event)
	}
	return (
		<div
			id={"table-wrapper"}
			className={
				"rounded-md overflow-clip flex flex-col border border-primary-900/30 dark:border-secondary-800"
			}
		>
			
			<div className="overflow-x-auto shadow-md ">
				<Toolbar columns={columns}
				         setSelection={setSelection}></Toolbar>
			</div>
			<div className={""}>
				{loading ? (
					<div
						className="p-6 text-center select-none cursor-pointer"
					>
						<div className={"w-full flex items-center justify-center"}>
							<Loader></Loader>
						</div>
					</div>
				
				) : pageData ? (
						<ResizablePanelGroup direction={"horizontal"} className={"w-full"}>
							
							
							{columns.map((column, colIndex) => {
								return (
									<>
										<ResizablePanel minSize={8}
										                onResize={(size) => {
											                if (size <= 12) {
												                console.log("small")
											                }
										                }}
										                className={column.width && columnWidthMap[column.width]}
										>
											<Header context={column}
											        index={colIndex}
											        isFirst={colIndex === 0}
											        isLast={colIndex === columns.length - 1} />
											{pageData ? pageData.map((r, rIndex) => {
												return <Cell data={flattenObject(r)}
												             key={rIndex}
												             context={column}
												             onClick={selectRow}
												             onContextMenu={handleContextMenu}
												             onHover={handleRowHover}
												             index={rIndex}
												             {...props}></Cell>
											}) : <Loader />}
										
										</ResizablePanel>
										{colIndex !== columns.length - 1 &&
											<ResizableHandle className={"transition-all w-0 bg-transparent hover:bg-primary-300/20"} />}
									</>
								);
							})}
						
						</ResizablePanelGroup>
					)
					: (
						
						<div
							className="p-6 text-center select-none cursor-pointer"
							onClick={refresh}
						>
							<p className={"text-lg font-bold"}>No data found</p>
						</div>
					
					)}
			</div>
			{pagination && (data || pageData) && (
				<nav
					className={
						"w-full border-t border-primary-200/40 flex items-center justify-between p-4"
					}
				>
					<Text size={"sm"} color={"primary"}> 
						Showing{" "}
						<span className={"font-bold"}>
							{pageLimit * (currentPage - 1)}
							{" - "}
							{pageLimit + pageLimit * (currentPage - 1)}
						</span>{" "}
						out of <span className={"font-bold"}>{data?.length}</span>
					</Text>
					{data && data.length ? (
						<Pagination
							pages={Math.ceil(data.length / pageLimit)}
							onChange={setCurrentPage}
						/>
					) : (
						<Loader />
					)}
				</nav>
			)}
		</div>
	);
}

export default Table;
