import {Button, InputField, Loader} from "~";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {faClose, faFilter} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";

function Select({
	                load,
	                parameter,
	                onSelect,
	                source = null,
	                id = "id",
	                value = "value",
	                primary = false,
                }) {
	const [data, setData] = useState(null);
	const [selected, setSelected] = useState(null);
	const [selectedValue, setSelectedValue] = useState(null);
	const [loading, isLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef();
	useEffect(() => {
		window.addEventListener("click", (event) => {
			const func = (event) => {
				if (selectRef.current && !selectRef.current.contains(event.target)) {
					setIsOpen(false);
				}
			}
			window.addEventListener("click", func);
			return () => {
				window.removeEventListener("click", func);
			}
		});
	}, []);
	useEffect(() => {
		const func = (event) => {
			setIsOpen(false);
		}
		window.addEventListener("blur", func);
		return () => {
			window.removeEventListener("blur", func);
		}
	}, []);
	useEffect(() => {
		switch (load) {
			case "LOV":
				axios
					.get(`/dmsapi/cms/query/GetLOVIdNameList?lovType=${parameter}`)
					.then((res) => {
						console.log(res);
						options.data = res.data;
					});
				break;
			case "Enum":
				axios
					.get(`/dmsapi/cms/query/GetEnumIdNameList?enumType=${parameter}`)
					.then((res) => {
						console.log(res);
						options.data = res.data;
					});
				break;
			case "Table":
				axios.get(`/dmsapi/cms/query/TableData?tableName=cms.${parameter}`).then((res) => {
					console.log(res);
					options.data = res.data;
				});
				break;
		}
		if (!source) return
		if (Array.isArray(source)) {
			console.log(source)
			setData(source);
			isLoading(false);
		}
	}, [source]);
	useEffect(() => {
		if (!data) return
		let v = data.find((d) => d[id] == selected);
		if (!v) return
		setSelectedValue(v[value]);
	}, [selected]);
	const filterData = async (value) => {
		isLoading(true);
		let filteredData = source.filter((d) => {
			return Object.values(d).join().toLowerCase().includes(value.toLowerCase());
		});
		setData(filteredData);
		isLoading(false);
	};
	return (
		<div
			className={`relative group min-w-36 ${isOpen ? "active" : null}`}
			ref={selectRef}
		>
			<div className={"w-54"}>
				<InputField placeholder={"Search"}
				            onChange={filterData}
				            className={`w-full  ${!isOpen && "hidden"}`}
				></InputField>
				<Button
					type={"dropdown"}
					text={selected ? selectedValue : "Select"}
					className={`w-full  ${isOpen && "hidden"}`}
					onClick={() => setIsOpen(true)}
				/>
			</div>
			<div
				className={`${isOpen ? "flex" : "hidden"}  border-2 border-primary-950 top-full my-2 animate-slide z-[9999] absolute flex-col text-primary-100 bg-secondary-950 group-hover:shadow-primary-800 shadow-md shadow-primary-950 w-full rounded-md p-4 bg-clip-border transition-all`}
			>
				<ul
					className={
						"flex  max-h-64 overflow-y-auto flex-col text-base font-normal text-blue-gray-700"
					}
				>
					{loading ? (
						<div className={"w-full flex items-center justify-center p-2 mt-4"}>
							<Loader></Loader>
						</div>
					) : data ? (
						data.map((option) => {
							return (
								<li
									id={option[id]}
									role={"button"}
									className={
										"flex items-center w-full p-2 leading-tight transition-all rounded outline-none text-start hover:bg-primary-500 hover:bg-opacity-40 hover:text-primary-100 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
									}
									onClick={(event) => {
										setSelected(event.target.id);
										setIsOpen(false);
									}}
								>
									{option[value]}
								</li>
							);
						})
					) : (
						<p>No data to select</p>
					)}
				</ul>
			</div>
		</div>
	);
}

Select.propTypes = {
	load: PropTypes.oneOf(["LOV", "Enum", "Data"]),
	parameter: PropTypes.string,
	search: PropTypes.bool,
	onSelect: PropTypes.func,
	options: PropTypes.object,
	primary: PropTypes.bool,
};
export default Select;
