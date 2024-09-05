import { InputField, Select, Button } from "~";

function manage_email() {
	return (
		<div className="mx-auto my-auto w-96">
			<div className="text-white text-2xl">Manage Email</div>
			<div>
				<div className="mt-3">
					<InputField
						id="emailAddress"
						label="Email Address"
						onClick={() => {}}
						placeholder="Email Address"
						primary
						required
					/>
				</div>
				<div className="mt-3">
					<InputField
						id="senderName"
						label="Sender Name"
						onClick={() => {}}
						placeholder="Sender Name"
						primary
					/>
				</div>
				<div className="mt-3">
					<InputField
						id="host"
						label="Host"
						onClick={() => {}}
						placeholder="Host"
						primary
						required
					/>
				</div>
				<div className="mt-3">
					<InputField
						id="port"
						label="Port"
						onClick={() => {}}
						placeholder="Port"
						primary
						required
					/>
				</div>
				<div className="mt-3">
					<div className="text-red-500 text-sm">
						Note: Use App password for Gmail
					</div>
					<InputField
						id="password"
						label="Password"
						onClick={() => {}}
						placeholder="Password"
						primary
						required
					/>
				</div>
				<div className="mt-3">
					<Select
						options={{
							data: [
								{ name: "Smtp", value: "Smtp" },
								{ name: "SendGrid", value: "SendGrid" },
								{ name: "Api", value: "Api" },
							],
							display: "name",
							value: "value",
						}}
						primary
						text="Button"
					/>
				</div>
				<div className="mt-3">
					<InputField
						id="apiUrl"
						label="Api Url"
						onClick={() => {}}
						placeholder="Api Url"
						primary
					/>
				</div>
				<div className="mt-3">
					<InputField
						id="apiKey"
						label="Api Key"
						onClick={() => {}}
						placeholder="Api Key"
						primary
					/>
				</div>
			</div>
			<div className="flex mt-3 gap-4 justify-end">
				<Button className="mb-3" primary text="Test Connection" />
				<Button className="mb-3" primary text="Save" />
			</div>
		</div>
	);
}

export default manage_email;
