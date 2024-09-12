import {Separator, Text} from "~";
import {Button} from "~/ui/button";
import React, {forwardRef, useEffect, useState} from "react";

const NtsPreview = forwardRef(({noteId, templateCode, onClick, ...props}, ref) => {
	const [currentFile, setCurrentFile] = useState(null)
	const [currentFileData, setCurrentFileData] = useState(null)
	useEffect(() => {
		if (noteId) {
			fetch(`/api/note/${noteId}/file`).then(res => res.json()).then(data => {
				setCurrentFile(data)
			})
		}
		
	}, [noteId,templateCode]);
	useEffect(() => {
		if (currentFile) {
			fetch(`/api/note/${noteId}/file/${currentFile["FileId"]}`).then(res => res.json()).then(data => {
				setCurrentFileData(data)
			})
		}
	}, [currentFile]);
	
	return <div className={"min-h-[70vh] flex flex-col bg-secondary-50 bg-opacity-60 border-primary-200 border-b-0  dark:bg-secondary-900 dark:bg-opacity-20 border-2 dark:border-secondary-900 dark:shadow-xl"}>
		<div className={"flex gap-2 bg-primary-100 dark:bg-secondary-900 p-2 items-center justify-between"}>
			
			<div className={"px-3 p-2 rounded bg-primary-50 dark:bg-secondary-800 shadow"}>
				<Text size={"xs"}>
					{currentFile ? currentFile["FileName"] || currentFile["title"] : "No file selected"}
				</Text>
			</div>
			{/*<Separator vertical={true}*/}
			{/*           className={"ml-auto"} />*/}
			{/*<div>*/}
			
			{/*</div>*/}
			<Separator vertical={true}
			           className={"ml-auto"} />
			
			<Button variant={"tertiary"}
			        icon={"close"}
			        onClick={() => {
				        props.onClose && props.onClose()
			        }}
			></Button>
		</div>
		<div className={"p-4"}>
			{currentFile ? <div>
				{currentFileData ? <div className={"h-[60vh] overflow-scroll"}>
						{JSON.parse(currentFileData.Json || "{}")?.components?.map(comp => {
							return <div>
												<span className={"block mb-4  "}>
													<Text size={"xs"}
													      className={"font-bold mt-4 mb-2 mx-2"}>{comp.label}</Text>
													<Text className={"p-2 px-4 rounded bg-secondary-100 dark:bg-secondary-900 "}>{comp.udfValue}</Text>
												</span>
							</div>
						})}
					</div> :
					<div className="flex flex-col items-start space-y-4">
						<Text skeleton={true}
						      className={"w-56 h-20"} />
						<Text skeleton={true}
						      className={"w-56"} />
						<Text skeleton={true}
						      className={"w-52"} />
						<Text skeleton={true}
						      className={"w-52"} />
						<Separator />
						<Text skeleton={true}
						      className={"w-48"} />
						<Text skeleton={true}
						      className={"w-36"} />
						<Separator />
						<Text skeleton={true}
						      className={"w-36"} />
						<Text skeleton={true}
						      className={"w-36"} />
					
					</div>}
			</div> : <Text>No file selected</Text>}
		</div>
	</div>
})

export default NtsPreview