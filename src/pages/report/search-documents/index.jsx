import { InputField, Table, Select, Text } from "~";
import { Button } from "~/ui/button";
import { faPencil, faTrash } from "@awesome.me/kit-9b926a9ec0";

export default function search_report() {
	return (
		<div>
			<div>
				<div className="flex space-x-4 items-end">
					<div className="flex-1 min-w-0 flex">
						<span className="text-white text-xs">Project No</span>
						<Select
							source="/dmsapi/dms/query/GetBulkUploadTemplateCodeNameList"
							map={{
								key: "Id",
								value: "Name",
							}}
						/>
					</div>
					<div className="flex-1 min-w-0 flex">
						<span className="text-white text-xs">Document No</span>
						<Select
							source={{
								type: "lov",
								parameter: "DPFU_ProjectNo",
							}}
							map={{
								key: "Id",
								value: "Name",
							}}
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
				<div className="">
					<Button variant="outline">Apply Filter</Button>
					<Button variant="outline">Reset</Button>
				</div>
			</div>
			<div className="mt-8">
				<Button variant="outline" className="flex items-center">
					{/* <Text variant="span">Export To Excel</Text> */}
					{/* Export To Excel */}
				</Button>
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
