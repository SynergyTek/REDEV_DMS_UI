// import { InputField, Select, Button } from "~";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// export default function manage_email() {
// 	const router = useRouter();
// 	const { id = null, name = null } = router.query;
// 	if (id) {
// 		console.log(id);
// 		const [data, setData] = useState();

// 		// axios.get("/dmsapi/cms/query/TableData?tableName=cms.F_DMS_DMSEmailIntegration?filterKey={id}")
// 		// .then( (response) => {
// 		//   console.log(response);
// 		// })
// 	}

// 	return (
// 		<div className="mx-auto my-10 w-96 ">
// 			<div className="text-white text-2xl">Manage Email</div>
// 			<div>
// 				<div key="emailAddress" className="mt-3">
// 					<InputField
// 						id="emailAddress"
// 						label="Email Address"
// 						onClick={() => {}}
// 						placeholder="Email Address"
// 						primary
// 						required
// 					/>
// 				</div>
// 				<div key="senderName" className="mt-3">
// 					<InputField
// 						id="senderName"
// 						label="Sender Name"
// 						onClick={() => {}}
// 						placeholder="Sender Name"
// 						primary
// 					/>
// 				</div>
// 				<div key="host" className="mt-3">
// 					<InputField
// 						id="host"
// 						label="Host"
// 						onClick={() => {}}
// 						placeholder="Host"
// 						primary
// 						required
// 					/>
// 				</div>
// 				<div key="port" className="mt-3">
// 					<InputField
// 						id="port"
// 						label="Port"
// 						onClick={() => {}}
// 						placeholder="Port"
// 						primary
// 						required
// 					/>
// 				</div>
// 				<div key="password" className="mt-3">
// 					<div className="text-red-500 text-sm">
// 						Note: Use App password for Gmail
// 					</div>
// 					<InputField
// 						id="password"
// 						label="Password"
// 						onClick={() => {}}
// 						placeholder="Password"
// 						primary
// 						required
// 					/>
// 				</div>
// 				<div key="dropdown" className="mt-3">
// 					<Select
// 						className="w-full"
// 						options={{
// 							data: [
// 								{ name: "Smtp", value: "Smtp" },
// 								{ name: "SendGrid", value: "SendGrid" },
// 								{ name: "Api", value: "Api" },
// 							],
// 							display: "name",
// 							value: "value",
// 						}}
// 						primary
// 						text="Button"
// 						variant="outline"
// 					/>
// 				</div>
// 				<div key="apiUrl" className="mt-3">
// 					<InputField
// 						id="apiUrl"
// 						label="Api Url"
// 						onClick={() => {}}
// 						placeholder="Api Url"
// 						primary
// 					/>
// 				</div>
// 				<div key="apiKey" className="mt-3">
// 					<InputField
// 						id="apiKey"
// 						label="Api Key"
// 						onClick={() => {}}
// 						placeholder="Api Key"
// 						primary
// 					/>
// 				</div>
// 			</div>
// 			<div className="flex mt-3 gap-4 justify-end">
// 				<Button className="mb-3" primary text="Test Connection" />
// 				<Button className="mb-3" primary text="Save" />
// 			</div>
// 		</div>
// 	);
// }

import { Select, Text } from "~";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/ui/form";
import { Input } from "~/ui/input";
import { toast } from "sonner";
import { useRef, useState } from "react";

export default function manage_email() {
	const [emailServerType, setEmailServerType] = useState();

	const emailServerTypeReference = useRef();

	const formSchema = z.object({
		emailAddress: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
			message: "Please enter valid email address.",
		}),
		senderName: z.string().optional(),
		host: z.string().regex(/^.+$/, { message: "Please enter valid Host" }),
		port: z
			.string()
			.regex(/^-?\d+$/, { message: "Please enter valid Port Number" }),
		password: z.string(),
		// select: z.string(),
		apiUrl: z.string().optional(),
		apiKey: z.string().optional(),
	});
	const form = useForm({
		resolver: zodResolver(formSchema),
	});
	const onSubmit = (data) => {
		toast.info("You submitted the following values:", {
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	};
	return (
		<div className="p-4 w-96 mx-auto">
			<div className="my-5">
				<Text variant="h1" className="text-xl font-bold">
					Manage Email
				</Text>
			</div>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<FormField
							name="emailAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input placeholder="Email Address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="senderName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sender Name</FormLabel>
									<FormControl>
										<Input placeholder="Sender Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="host"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Host</FormLabel>
									<FormControl>
										<Input placeholder="Host" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="port"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Port</FormLabel>
									<FormControl>
										<Input placeholder="Port" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="Password" {...field} />
									</FormControl>
									<FormDescription className="text-red-600">
										Note: Use App password for Gmail
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Select
							className="w-full"
							variant="outline"
							source={{
								type: "enum",
								parameter: "EmailServerTypeEnum",
							}}
							map={{
								key: "Id",
								value: "Name",
							}}
							ref={emailServerTypeReference}
							onSelect={() =>
								setEmailServerType(
									emailServerTypeReference.current?.getAttribute("value")
								)
							}
							defaultValue="Smtp"
						/>
						{/* <FormField
							name="select"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Select
											className="w-full"
											variant="outline"
											source={{
												type: "enum",
												parameter: "EmailServerTypeEnum",
											}}
											map={{
												key: "Id",
												value: "Name",
											}}
											ref={emailServerTypeReference}
											onSelect={() => field.onChange}
											value={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						<FormField
							name="apiUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Api Url</FormLabel>
									<FormControl>
										<Input placeholder="Api Url" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="apiKey"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Api Key</FormLabel>
									<FormControl>
										<Input placeholder="Api Key" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex gap-3">
							<Button variant={"primary"} type="">
								Test Connection
							</Button>
							<Button variant={"primary"} type="submit">
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
