import {Canvas, Stories, useOf} from "@storybook/blocks";
import {Table, Text} from "~";
import {useState} from "react";
import PropTypes from "prop-types";
import {Badge} from "~/ui/badge";
import {Toaster} from "~/ui/toaster";

function DocsPage() {
	
	const resolvedOf = useOf('meta', ['meta']);
	const component = resolvedOf.preparedMeta.moduleExport.component
	console.log(component)
	const props = Object.entries(resolvedOf.preparedMeta.argTypes).map((type, index) => {
		console.log(type[1])
		return {
			Name: type[0],
			Type: type[1]
		}
	})
	return <div>
		<Text variant={"h1"}>{resolvedOf.preparedMeta.title.split("/").pop()}</Text>
		<h4>
			{resolvedOf.preparedMeta.parameters?.docs?.description}
		</h4>
		<Canvas />
		<div className={"sb-unstyled"}>
			<Table data={props}
			       columns={[
				       {header: "Name", field: "Name"},
				       {
					       header: "Description", field: "Type", template:
						       <span className={"flex flex-col gap-2 justify-start align-start w-fit"}> 
							       <Text variant={"span"}>_description_</Text>
							   <Badge variant={"secondary"}>_type.name_</Badge>
							   </span>
				       },]}
			       pagination={false} />
		</div>
		<Stories />
		<Toaster />
	</div>;
}

export default DocsPage