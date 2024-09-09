import { Button, Table } from "~";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	faPencil,
	faTrash,
} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";

export default function index() {
	const router = useRouter();

	const editEmail = (id, name) => {
		router.push(
			{
				pathname: "/masters/email-integration/manage-email",
				query: { id, name },
			},
			"/masters/email-integration/manage-email"
		);
	};
	return (
		<div>
			<div className="text-white text-2xl mb-6">Email Integration</div>
			<div>
				<Link href="/masters/email-integration/manage_email">
					<Button className="mb-3" primary text="Create" />
				</Link>

				<Table
					rowId={"Id"}
					rowName={"Email"}
					actions={[
						{
							icon: faPencil,
							label: "Edit",
							onClick: ({ id, name }) => editEmail(id, name),
						},
						{
							icon: faTrash,
							label: "Delete",
							onClick: () => {},
						},
					]}
					columns={[
						{
							field: "Email",
							header: "Email",
						},
					]}
					data={{
						source:
							"/dmsapi/cms/query/TableData?tableName=cms.F_DMS_DMSEmailIntegration",
					}}
					primary
					text="Button"
				/>
			</div>
		</div>
	);
}
