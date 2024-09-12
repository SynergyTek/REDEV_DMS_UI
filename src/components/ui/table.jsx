import {CheckBox, ContextMenu, InputField, Loader, Pagination, Select, Template, Text} from "~";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "~/ui/resizable";
import {Button} from "~/ui/button";
import {Input} from "~/ui/input";

const columnWidthMap = {
	1: "w-1/12",
	2: "w-2/12",
	3: "w-3/12",
	4: "w-4/12",
	5: "w-5/12",
	
	
}

function ColumnHeader({context, onClick, onContextMenu, ...props}) {
	return <div
		className={`min-h-12  pl-4 items-center flex bg-primary-900 text-primary-50 dark:bg-secondary-900 dark:border-gray-700 hover:bg-primary-800/80 dark:hover:bg-gray-600 transition-all
	 ease-linear cursor-pointer`}
		onClick={onClick}
		onContextMenu={onContextMenu}
	><Text style={["bold"]}
	       className={"text-inherit w-full border-r-2 border-r-primary-400 dark:border-r-primary-950"}>{context.header}</Text>
	
	</div>
}

function Cell({data, context, onClick, onContextMenu, ...props}) {
	return <div
		className={`h-12 border-b  px-4 p-2 dark:border-secondary-800 [&.hover]:bg-primary-200 dark:[&.hover]:bg-primary-800/50 [data-row-hover]:bg-primary-200 dark:[data-row-hover]:bg-primary-800/50 transition-all
	 ease-linear cursor-pointer overflow-clip`}
		onClick={onClick}
		onMouseEnter={props.onHover}
		onMouseLeave={props.onHover}
		onContextMenu={onContextMenu}
	>
		{data &&
		context.template ? (<Template context={data[context.field]}>{context.template}</Template>) : (
			<Text truncate={true}
			      wrap={false}>{data[context.field]}</Text>)}
	
	
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
	const contextMenu = useRef();
	useEffect(() => {
		document.addEventListener("click", (event) => {
			hideContextMenu();
		});
		document.addEventListener("blur", (event) => {
			hideContextMenu();
		});
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
	
	function hideContextMenu() {
		const menu = contextMenu.current;
		if (menu) {
			menu.classList.add("hidden");
		}
	}
	
	function showContextMenu() {
		const menu = contextMenu.current;
		if (menu) {
			menu.classList.remove("hidden");
		}
	}
	
	
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
	const handleContextMenu = (event) => {
		event.preventDefault();
		hideContextMenu();
		const menu = contextMenu.current;
		event.currentTarget.classList.add("active");
		const offsetBox = event.currentTarget.offsetParent;
		
		menu.style.display = "block";
		const menuWidth = menu.offsetWidth;
		const menuHeight = menu.offsetHeight;
		menu.style.display = "";
		// Determine position for the menu
		let posX = event.pageX;
		let posY = event.pageY;
		// Check if the menu goes beyond the right edge of the window
		if (posX + menuWidth > offsetBox.offsetLeft + offsetBox.clientWidth) {
			posX = offsetBox.offsetLeft + offsetBox.clientWidth - menuWidth;
		}
		
		// Check if the menu goes beyond the bottom edge of the window
		if (posY + menuHeight > offsetBox.offsetTop + offsetBox.clientHeight) {
			posY = offsetBox.offsetTop + offsetBox.clientHeight - menuHeight;
		}
		
		menu.style.left = posX + "px";
		menu.style.top = posY + "px";
		menu.contextData = {
			id: event.currentTarget.id,
			name: event.currentTarget.dataset.name,
		};
		showContextMenu();
	};
	const handleRowHover = (event) => {
		switch (event.type) {
			case "mouseleave":
				event.currentTarget.classList.remove("hover");
				break;
			case "mouseenter":
				event.currentTarget.classList.add("hover");
				break;
		}
		
	}
	return (
		<div
			id={"table-wrapper"}
			className={
				"rounded-md overflow-clip w-full flex flex-col border border-primary-900/30 dark:border-secondary-800"
			}
		>
			{actions && (
				<ContextMenu innerRef={contextMenu}
				             options={actions}></ContextMenu>
			)}
			<div className="overflow-x-auto shadow-md ">
				<div
					className={"flex gap-2 p-4 items-center bg-primary-900/90 shadow-md text-primary-100 dark:bg-secondary-800 dark:text-primary-300"}
				>
					{selection ? (
						
						<Button
							icon={"close"}
							onClick={() => {
								setSelection(false);
							}}
						></Button>) : null}
					{columns.length > 0 ? < >
						<Input
							type="text"
							placeholder="Search Here"
							required={false}
							id="Search-filter"
							className={"w-48 bg-secondary-900 text-sm h-8 p-2 px-2"}
							onChange={onChange}
						/>
						
						<Select
							source={[{
								"id": "1",
								"name": "All",
							}]}
							size={"sm"}
							// onSelect={onSelect}
						/>
					</> : null}
				</div>
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
						<ResizablePanelGroup direction={"horizontal"}>
							
							
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
											<ColumnHeader context={column} />
											{pageData ? pageData.map((r, rIndex) => {
												return <Cell data={r}
												             key={rIndex}
												             context={column}
												             onClick={selectRow}
												             onContextMenu={handleContextMenu}
												             onHover={handleRowHover}
												             {...props}></Cell>
											}) : <Loader />}
										
										</ResizablePanel>
										{colIndex !== columns.length - 1 &&
											<ResizableHandle className={"bg-transparent w-0"} />}
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
			{/*{pagination && (data || pageData) && (*/}
			{/*	<nav*/}
			{/*		className={*/}
			{/*			"w-full flex items-center justify-between p-4 dark:bg-primary-950 dark:bg-opacity-50 text-primary-50"*/}
			{/*		}*/}
			{/*	>*/}
			{/*		<p className={"text-sm"}>*/}
			{/*			Showing{" "}*/}
			{/*			<span className={"font-bold"}>*/}
			{/*				{pageLimit * (currentPage - 1)}*/}
			{/*				{" - "}*/}
			{/*				{pageLimit + pageLimit * (currentPage - 1)}*/}
			{/*			</span>{" "}*/}
			{/*			out of <span className={"font-bold"}>{data.length}</span>*/}
			{/*		</p>*/}
			{/*		{data.length ? (*/}
			{/*			<Pagination*/}
			{/*				pages={Math.ceil(data.length / pageLimit)}*/}
			{/*				onChange={setCurrentPage}*/}
			{/*			/>*/}
			{/*		) : (*/}
			{/*			<Loader />*/}
			{/*		)}*/}
			{/*	</nav>*/}
			{/*)}*/}
		</div>
	);
}

export default Table;
