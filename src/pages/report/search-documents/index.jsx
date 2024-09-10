import { InputField, Table, Select, Text } from "~";
import { Button } from "~/ui/button";
import { useRef, useState } from "react";
import {
	faArrowTurnRight,
	faCircleInfo,
	faEye,
} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";

export default function SearchReport() {
	const [projectNo, setProjectNo] = useState("");
	const [documentType, setDocumentType] = useState("");
	const [documentNo, setDocumentNo] = useState("");
	const [documentDescription, setDocumentDescription] = useState("");

	const [tableDataUrl, setTableDataUrl] = useState(
		"/dmsapi/dms/query/GetDPFUDocumentDataGrid"
	);

	const projectNoReference = useRef();
	const documentTypeReference = useRef();

	const OnApplyFilter = () => {
		setTableDataUrl(
			`/dmsapi/dms/query/GetDPFUDocumentDataGrid?projectNo=${projectNo}&documentNo=${documentNo}&documentType=${documentType}&documentdescription=${documentDescription}`
		);
		console.log(tableDataUrl);
	};

	const OnReset = () => {
		setTableDataUrl("/dmsapi/dms/query/GetDPFUDocumentDataGrid");
		console.log(tableDataUrl);
	};

	return (
		<div className="mt-5">
			<div>
				<div className="flex space-x-4 items-end flex-wrap">
					<div className="lg:flex-1 min-w-0 flex-col">
						<Text variant="span" className="ms-1">
							Project No
						</Text>
						<Select
							source={{
								type: "lov",
								parameter: "DPFU_ProjectNo",
							}}
							map={{
								key: "Id",
								value: "Name",
							}}
							ref={projectNoReference}
							onSelect={() =>
								setProjectNo(projectNoReference.current?.getAttribute("value"))
							}
						/>
					</div>
					<div className="lg:flex-1 min-w-0 flex-col">
						<Text variant="span" className="ms-1">
							Document Type
						</Text>
						<Select
							source={"/dmsapi/dms/query/GetBulkUploadTemplateCodeNameList"}
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
					<div className="lg:flex-1 min-w-0">
						<InputField
							id="documentNo"
							label="Document No"
							placeholder="Document No"
							primary
							value={documentNo}
							onChange={(value) => setDocumentNo(value)}
						/>
					</div>
					<div className="lg:flex-1 min-w-0">
						<InputField
							id="documentDescription"
							label="Document Description"
							placeholder="Document Description"
							primary
							value={documentDescription}
							onChange={(value) => setDocumentDescription(value)}
						/>
					</div>
				</div>
				<div className="mt-2 flex gap-2">
					<Button variant="outline" onClick={OnApplyFilter}>
						Apply Filter
					</Button>
					<Button variant="outline" onClick={OnReset}>
						Reset
					</Button>
				</div>
			</div>
			<div className="mt-8">
				<Button variant="outline" className="flex items-center">
					<Text variant="span">Export To Excel</Text>
				</Button>
			</div>
			<div className="mt-1">
				<Table
					rowId={"TemplateId"}
					rowName={"TemplateOwner"}
					actions={[
						{
							icon: faCircleInfo,
							label: "Grid Details",
							onClick: ({ id, name }) => editEmail(id, name),
						},
						{
							icon: faArrowTurnRight,
							label: "Go To Location",
							onClick: () => {},
						},
						{
							icon: faEye,
							label: "View Metadata",
							onClick: () => {},
						},
					]}
					columns={[
						{
							field: "ProjectNo",
							header: "Project No",
						},
						{
							field: "DocumentNo",
							header: "Document No",
						},
						{
							field: "DocumentDescription",
							header: "Document Description",
						},
						{
							field: "Revision",
							header: "Revision",
						},
						{
							field: "Descipline",
							header: "Descipline",
						},
						{
							field: "IssueCode",
							header: "Issue Code",
						},
						{
							field: "StageStatus",
							header: "Stage Status",
						},
						{
							field: "DocumentOwner",
							header: "Document Owner",
						},
					]}
					data={{
						source: tableDataUrl,
					}}
				/>
			</div>
		</div>
	);
}
