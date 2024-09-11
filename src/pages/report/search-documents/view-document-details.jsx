import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function () {
	const router = useRouter();
	const { TemplateId = null, DocumentNo = null } = router.query;
	console.log("I am running " + TemplateId, DocumentNo);
	if (TemplateId) {
		console.log(TemplateId);
		const [data, setData] = useState();

		axios
			.get(
				`/dmsapi/dms/query/GetDPFUChildDocument?TemplateId=${TemplateId || ""}&DocumentNo=${DocumentNo || ""}`
			)
			.then((response) => {
				console.log("hii");
				console.log(response);
			});
	}

	return (
		<div>
			<h1>hii</h1>
			<h1>hii</h1>
		</div>
	);
}
