import { InputField, Table, Select, Text } from "~";
import { useRef, useState } from "react";

export default function index() {
	const [user, setUser] = useState("");
	const [documentType, setDocumentType] = useState("");
	const [documentName, setDocumentName] = useState("");

	const userReference = useRef();
	const documentTypeReference = useRef();

	return (
		<div className="p-4">
			<div>
				<Text variant="h1" className="text-xl font-bold">
					Audit Report
				</Text>
			</div>
			<div className="flex items-end gap-4 mt-4">
				<div className="lg:flex-1 min-w-0">
					<Text variant="span" className="ms-1 text-xs">
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
				<div className="lg:flex-1 min-w-0">
					<Text variant="span" className="ms-1 text-xs">
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
				<div className="lg:flex-1 min-w-0">
					<InputField
						id="documentNo"
						label="Document Name"
						placeholder="Document Name"
						primary
						value={documentName}
						onChange={(value) => setDocumentName(value)}
					/>
				</div>
			</div>
		</div>
	);
}
