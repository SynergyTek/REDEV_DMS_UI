import { InputField, Table, Select, Text } from "~";
import { Button } from "~/ui/button";
import {
	faArrowTurnRight,
	faCircleInfo,
	faEye,
} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";

export default function SearchReport() {
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
						/>
					</div>
					<div className="lg:flex-1 min-w-0 flex-col">
						<Text variant="span" className="ms-1">
							Document No
						</Text>
						<Select
							source={"/dmsapi/dms/query/GetBulkUploadTemplateCodeNameList"}
							map={{
								key: "Id",
								value: "Name",
							}}
						/>
					</div>
					<div className="lg:flex-1 min-w-0">
						<InputField
							id="documentNo"
							label="Document No"
							onClick={() => {}}
							placeholder="Document No"
							primary
						/>
					</div>
					<div className="lg:flex-1 min-w-0">
						<InputField
							id="documentDescription"
							label="Document Description"
							onClick={() => {}}
							placeholder="Document Description"
							primary
						/>
					</div>
				</div>
				<div className="mt-2">
					<Button variant="outline">Apply Filter</Button>
					<Button variant="outline">Reset</Button>
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
						source: "/dmsapi/dms/query/GetDPFUDocumentDataGrid",
					}}
				/>
			</div>
		</div>
	);
}
