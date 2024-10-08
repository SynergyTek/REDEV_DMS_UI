import {CheckBox, ContextMenu, Loader, Pagination, Template, Text} from "~";
import React, {useEffect, useMemo, useRef, useState} from "react";
import axios from "axios";

function TableRow({row, data, onClick, onContextMenu, ...props}) {
	return (
		<tr
			className={`border-b h-10 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-linear cursor-pointer`}
			onClick={onClick}
			onContextMenu={onContextMenu}
			id={row[props.rowId]}
			data-name={row[props.rowName]}
		>
			{props.selection ? (
				<td className={"p-4 "}>
					<CheckBox />
				</td>
			) : null}
			{data
				? data.map((column, index) => {
					return (
						<td className="px-6 py-4"
						    key={index}>
							{column.template ? (
								<Template context={row[column.field]}>
									{column.template}
								</Template>
							) : (
								<Text>{row[column.field]}</Text>
							)}
						</td>
					);
				})
				: null}
		</tr>
	);
}

function Table({
	               data = {
		               source: "https://jsonplaceholder.org/users",
	               },
	               columns = [
		               {
			               header: "First Name",
			               field: "firstname",
		               },
		               {
			               header: "Last Name",
			               field: "lastname",
		               },
	               ],
	               pageLimit = 10,
	               actions,
	               pagination = true,
	               ...props
               }) {
	const [fetchedData, setFetchedData] = useState(data);
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
	const handleClick = () => {
		hideContextMenu();
	};
	const handleBlur = () => {
		hideContextMenu();
	};
	const contextMenu = useRef();
	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("blur", handleBlur);
		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("blur", handleBlur);
		}
	}, []);
	useEffect(() => {
		setLoading(true);
		if (!data || !columns) {
			setFetchedData(null);
			setFetchedColumns(null);
			setLoading(false);
			return;
		}
		if (typeof data === "function") {
			data().then((res) => {
				setFetchedData(res);
				setLoading(false);
			});
		}
		if (typeof columns === "function") {
			columns().then((res) => {
				setFetchedColumns(res);
			});
		}
		if (Array.isArray(data)) {
			data.length ? setFetchedData(data) : setFetchedData(null);
		}
		if (typeof data.source === "string") {
			axios
				.get(data.source)
				.then((res) => {
					console.log(res.data)
					if (Array.isArray(res.data)) {
						setFetchedData(res.data);
						setCurrentPage(1)
					} else {
						setFetchedData(null);
					}
				})
				.catch((e) => {
					setFetchedData(null);
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
				
				//console.log(tempData, "my cols")
				selColFilter(tempData);
			}
		}
	}, [data]);
	
	useEffect(() => {
		setLoading(false)
		if (Array.isArray(fetchedData)) {
			if (fetchedData.length) {
				let _data = [],
					lowerLimit = (currentPage - 1) * pageLimit,
					upperLimit = Math.min(
						fetchedData.length,
						pageLimit + (currentPage - 1) * pageLimit
					);
				for (let i = lowerLimit; i < upperLimit; i++) {
					if (fetchedData[i]) {
						_data.push(fetchedData[i]);
					}
				}
				
				setPageData(_data);
			} else {
				
				setPageData(null)
			}
		}
	}, [fetchedData, currentPage]);
	
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
	return (
		<div
			id={"table-wrapper"}
			className={
				"rounded-md overflow-clip flex flex-col border dark:border-secondary-800"
			}
		>
			{actions && (
				<ContextMenu innerRef={contextMenu}
				             options={actions}></ContextMenu>
			)}
			<div className="overflow-x-auto shadow-md ">
				{/*<div*/}
				{/*	className={"p-4 bg-primary-300 shadow-md border-l-4 text-primary-100 dark:bg-primary-950 dark:text-primary-300"}*/}
				{/*>*/}
				{/*	{selection ? (*/}
				{/*		*/}
				{/*		<Button*/}
				{/*			icon={faClose}*/}
				{/*			onClick={() => {*/}
				{/*				setSelection(false);*/}
				{/*			}}*/}
				{/*		></Button>) : null}*/}
				{/*	{columns.length > 0 ? < >*/}
				{/*		<InputField*/}
				{/*			type="text"*/}
				{/*			placeholder="Search Here"*/}
				{/*			required={false}*/}
				{/*			id="Search-filter"*/}
				{/*			onChange={onChange}*/}
				{/*		/>*/}
				{/*		<Select*/}
				{/*			options={colFilter}*/}
				{/*			onSelect={onSelect}*/}
				{/*		/>*/}
				{/*	</> : null}*/}
				{/*</div>*/}
			</div>
			<table className="w-full text-sm text-left rtl:text-right">
				<thead className="text-xs text-primary-50 uppercase bg-primary-900 bg-opacity-90 dark:bg-secondary-900 dark:text-primary-50">
				<tr>
					{selection ? (
						<td className={"p-4"}>
							<CheckBox />
						</td>
					) : null}
					{fetchedColumns
						? fetchedColumns.map((column, index) => {
							return (
								<th scope="col"
								    className="px-6 py-5"
								    key={index}>
									{column.header}
								</th>
							);
						})
						: null}
				</tr>
				</thead>
				<tbody>
				{loading ? (
					<tr>
						<td
							className="p-6 text-center select-none cursor-pointer"
							colSpan={columns.length}
						>
							<div className={"w-full flex items-center justify-center"}>
								<Loader></Loader>
							</div>
						</td>
					</tr>
				) : pageData ? (
					pageData.map((row, index) => {
						return (
							<TableRow
								rowId={props.rowId}
								rowName={props.rowName}
								row={row}
								onContextMenu={actions && handleContextMenu}
								data={fetchedColumns}
							/>
						);
					})
				) : (
					<tr>
						<td
							className="p-6 text-center select-none cursor-pointer"
							colSpan={columns.length}
						>
							<p className={"text-lg font-bold"}>No data found</p>
						</td>
					</tr>
				)}
				</tbody>
			</table>
			
			{pagination && pageData && (
				<nav
					className={
						"w-full flex items-center justify-between p-4 dark:bg-primary-950 dark:bg-opacity-50 text-primary-50"
					}
				>
					<p className={"text-sm"}>
						Showing{" "}
						<span className={"font-bold"}>
							{pageLimit * (currentPage - 1)}
							{" - "}
							{pageLimit + pageLimit * (currentPage - 1)}
						</span>{" "}
						out of <span className={"font-bold"}>{fetchedData.length}</span>
					</p>
					{fetchedData.length ? (
						<Pagination
							pages={Math.ceil(fetchedData.length / pageLimit)}
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
