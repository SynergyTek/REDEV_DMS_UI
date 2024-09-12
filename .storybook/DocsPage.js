import {Canvas, Stories, useOf} from "@storybook/blocks";
import {Table, Text} from "~";
import {useState} from "react";
import PropTypes from "prop-types";
import {Badge} from "~/ui/badge";
import {Toaster} from "~";

function DocsPage() {
	
	const resolvedOf = useOf('meta', ['meta']);
	const component = resolvedOf.preparedMeta.component
	
	const props = component.__docgenInfo.props ? Object.entries(component.__docgenInfo.props).map((type, index) => {
		if (!type[1].type?.name) type[1].type = {name: "unknown"}
		return {
			name: type[0],
			type: type[1],
			default: type[1].defaultValue?.value
		}
	}) : null
	return <div className={"px-4 -mt-4"}>
		<div className={"sb-unstyled"}>
			<Text size={"2xl"}>{component.__docgenInfo.displayName}</Text>
			<Text size={"lg"}>{component.__docgenInfo.description}</Text>
		</div>
		<Canvas className={""} />
		
		{props ?
			<div className={"sb-unstyled"}>
				<Table data={props}
				       columns={[
					       {header: "Name", field: "name"},
					       {
						       header: "Description", field: "type", template:
							       <span className={"flex flex-col gap-1 justify-start align-start w-fit"}> 
							       <Text truncate={10}
							             variant={"span"}>_description_</Text>
							   <Badge variant={"secondary"}>_type.name_</Badge>
							   </span>
					       },
					       {header: "Default", field: "default"},
				       ]}
				       pagination={false} />
			</div> : <Text className={"font-italic"}>
				Could not find any properties
			</Text>
		}
		<Stories />
		<Toaster richcolors />
	</div>;
}

export default DocsPage