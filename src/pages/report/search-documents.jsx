import { InputField, Table, Select, Button } from "~";
import { faPencil, faTrash } from "@awesome.me/kit-9b926a9ec0";
// import { useState, useEffect } from "react";
// import axios from "axios";

export default function search_report() {
	// const [projectNoData, setProjectNoData] = useState();
	// const [documentNoData, setDocumentNoData] = useState([]);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"/dmsapi/cms/query/GetLOVIdNameList?lovType=DPFU_ProjectNo"
	// 			);
	// 			debugger;
	// 			console.log(`search_document: ${response.data}`);
	// 			if (Array.isArray(response.data)) {
	// 				setProjectNoData(response.data);
	// 				console.log(projectNoData);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);

	return (
		<div>
			<div>
				<div className="flex space-x-4 items-end">
					<div className="flex-1 min-w-0">
						<span className="text-white text-xs">Project No</span>
						<Select
							options={{
								// data: { projectNoData },
								display: "Name",
								value: "Id",
							}}
							primary
							text="Button"
							label="button"
							search={false}
							// load="LOV"
							// parameter="DPFU_ProjectNo"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<span className="text-white text-xs">Document No</span>
						<Select
							options={{
								data: [
									{
										name: "Engineering Subcontract",
										value: "engineeringSubcontract",
									},
									{ name: "Vendor Documents", value: "vendorDocuments" },
									{ name: "Project Documents", value: "projectDocuments" },
								],
								display: "name",
								value: "value",
							}}
							primary
							text="Button"
							search={false}
						/>
					</div>
					<div className="flex-1 min-w-0">
						<InputField
							id="documentNo"
							label="Document No"
							onClick={() => {}}
							placeholder="Document No"
							primary
						/>
					</div>
					<div className="flex-1 min-w-0">
						<InputField
							id="documentDescription"
							label="Document Description"
							onClick={() => {}}
							placeholder="Document Description"
							primary
						/>
					</div>
				</div>
				<div className="flex gap-4 mt-2">
					<Button onClick={() => {}} primary text="Apply Filter" />
					<Button onClick={() => {}} text="Reset" />
				</div>
			</div>
			<div className="mt-8">
				<Button onClick={() => {}} text="Export To Excel" />
			</div>
			<div className="mt-1">
				<Table
					actions={[
						{
							icon: faPencil,
							label: "Detail Grid",
							onClick: () => {},
						},
						{
							icon: faTrash,
							label: "Go To Location",
							onClick: () => {},
						},
						{
							icon: faTrash,
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
						source: "/dmsapi/dms/query/GetDPFUDocumentDataGrid",
					}}
					primary
					text="Button"
				/>
			</div>
		</div>
	);
}
