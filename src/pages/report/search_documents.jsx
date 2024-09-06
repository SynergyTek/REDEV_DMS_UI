import { InputField, Table, Select, Button } from "~";
import { faPencil, faTrash } from "@awesome.me/kit-9b926a9ec0";

export default function search_report() {
	return (
		<div>
			<div>
				<div className="flex space-x-4">
					<div className="flex-1 min-w-0">
						<Select
							options={{
								data: [
									{ name: "All", value: "all" },
									{ name: "4460", value: "4460" },
								],
								display: "name",
								value: "value",
							}}
							primary
							text="Button"
							label="button"
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
					<div className="flex-1 min-w-0">
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
						/>
					</div>
				</div>
				<div className="flex gap-4 mt-4">
					<Button onClick={() => {}} primary text="Apply Filter" />
					<Button onClick={() => {}} text="Reset" />
				</div>
			</div>
			<div className="mt-6">
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
							field: "projectNo",
							header: "Project No",
						},
						{
							field: "documentNo",
							header: "Document No",
						},
						{
							field: "documentDescription",
							header: "Document Description",
						},
						{
							field: "revision",
							header: "Revision",
						},
						{
							field: "descipline",
							header: "Descipline",
						},
						{
							field: "issueCode",
							header: "Issue Code",
						},
						{
							field: "stageStatus",
							header: "Stage Status",
						},
						{
							field: "documentOwner",
							header: "Document Owner",
						},
					]}
					// data={{
					// 	source:
					// 		"/dmsapi/cms/query/TableData?tableName=cms.F_DMS_DMSEmailIntegration",
					// }}
					primary
					text="Button"
				/>
			</div>
		</div>
	);
}
