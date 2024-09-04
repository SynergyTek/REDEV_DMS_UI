import { InputField, Select, Button } from "~";

function manage_email() {
	const inputFieldsData = [
		{
			type: "input",
			name: "emailAddress",
			label: "Email Address",
			placeholder: "Email Address",
			isPrimary: true,
			isRequired: true,
			isWarning: false,
		},
		{
			type: "input",
			name: "senderName",
			label: "Sender Name",
			placeholder: "Sender Name",
			isPrimary: true,
			isRequired: false,
			isWarning: false,
		},
		{
			type: "input",
			name: "host",
			label: "Host",
			placeholder: "Host",
			isPrimary: true,
			isRequired: true,
			isWarning: false,
		},
		{
			type: "input",
			name: "port",
			label: "Port",
			placeholder: "Port",
			isPrimary: true,
			isRequired: true,
			isWarning: false,
		},
		{
			type: "input",
			name: "password",
			label: "Password",
			placeholder: "Password",
			isPrimary: true,
			isRequired: true,
			isWarning: true,
			warningMessage: "Note: Use App password for Gmail",
		},
		{
			type: "dropdown",
			name: "dropdown",
			options: [
				{ name: "Smtp", value: "Smtp" },
				{ name: "SendGrid", value: "SendGrid" },
				{ name: "Api", value: "Api" },
			],
		},
		{
			type: "input",
			name: "apiUrl",
			label: "Api Url",
			placeholder: "Api Url",
			isPrimary: true,
			isRequired: false,
			isWarning: false,
		},
		{
			type: "input",
			name: "apiKey",
			label: "Api Key",
			placeholder: "Api Key",
			isPrimary: true,
			isRequired: false,
			isWarning: false,
		},
	];

	return (
		<div className="mx-auto my-auto w-96">
			<div className="text-white text-2xl">Manage Email</div>
			<div>
				{inputFieldsData.map((field) => {
					switch (field.type) {
						case "input":
							return (
								<div key={field.name} className="mt-3">
									{field.isWarning ? (
										<div className="text-red-500 text-sm">
											{field.warningMessage}
										</div>
									) : null}
									<InputField
										id={field.name}
										label={field.label}
										onClick={() => {}}
										placeholder={field.placeholder}
										{...(field.isPrimary ? "primary" : null)}
										{...(field.isRequired ? "required" : null)}
									/>
								</div>
							);
						case "dropdown":
							return (
								<div className="mt-3">
									<Select
										options={{
											data: field.options,
											display: "name",
											value: "value",
										}}
										primary
										text="Button"
									/>
								</div>
							);
					}
				})}
			</div>
            <div className="flex mt-3 gap-4 justify-end">
                <Button className="mb-3" primary text="Test Connection" />
                <Button className="mb-3" primary text="Save" />
            </div>
		</div>
	);
}

export default manage_email;
