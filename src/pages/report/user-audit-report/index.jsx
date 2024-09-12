import { InputField, Table, Select, Text } from "~";
import { useEffect, useRef, useState } from "react";
import DatePicker from "~/ui/date-picker";
import { Button } from "~/ui/button";

export default function index() {
	const [user, setUser] = useState("");
	const [documentType, setDocumentType] = useState("");
	const [documentName, setDocumentName] = useState("");
	const [fromDate, setFromDate] = useState(new Date().toDateString());
	const [toDate, setToDate] = useState(new Date().toDateString());

	const userReference = useRef();
	const documentTypeReference = useRef();
	const fromDateReference = useRef();
	const toDateReference = useRef();

	const onSearch = () => {
		console.log(
			`user${user}, documentType${documentType}, documentName${documentName}, fromDate${fromDate}, toDate${toDate}`
		);
	};

	const onReset = () => {
		console.log("reseting");
	};

	// const today = new Date().toDateString();
	// console.log("date", today);
	useEffect(() => {
		console.log("hii", fromDate);
	}, [fromDate]);

	return (
		<div className="p-4">
			<div>
				<Text variant="h1" className="text-xl font-bold">
					Audit Report
				</Text>
			</div>
			<div className="grid grid-cols-3 gap-4 mt-4 items-end">
				<div className="">
					<Text variant="span" className="ms-1 text-sm">
						User
					</Text>
					<Select
						className="w-full"
						variant="outline"
						source={"/dmsapi/dms/query/GetUserForAuditReport"}
						map={{
							key: "Id",
							value: "Name",
						}}
						ref={userReference}
						onSelect={() =>
							setUser(userReference.current?.getAttribute("value"))
						}
					/>
				</div>
				<div className="">
					<Text variant="span" className="ms-1 text-sm">
						Document Type
					</Text>
					<Select
						className="w-full"
						variant="outline"
						source={{
							type: "lov",
							parameter: "DPFU_ProjectNo",
						}}
						map={{
							key: "Id",
							value: "Name",
						}}
						ref={documentTypeReference}
						onSelect={() =>
							setDocumentType(
								documentTypeReference.current?.getAttribute("value")
							)
						}
					/>
				</div>
				<div className="">
					<InputField
						id="documentNo"
						label="Document Name"
						placeholder="Document Name"
						primary
						value={documentName}
						onChange={(value) => setDocumentName(value)}
					/>
				</div>
				<div>
					<Text variant="span" className="ms-1 text-sm">
						From Date
					</Text>
					<DatePicker
						value={fromDate}
						ref={fromDateReference}
						onChange={() =>
							setFromDate(fromDateReference.current?.getAttribute("value"))
						}
						text="From Date"
						dateFormat="d/MM/Y"
					/>
				</div>
				<div>
					<Text variant="span" className="ms-1 text-sm">
						To Date
					</Text>
					<DatePicker
						value={toDate}
						ref={toDateReference}
						onChange={() =>
							setToDate(toDateReference.current?.getAttribute("value"))
						}
						text="To Date"
					/>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={onSearch}>
						Search
					</Button>
					<Button variant="outline" onClick={onReset}>
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
}
