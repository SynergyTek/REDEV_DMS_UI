import {Icon, Separator, Text} from "~";
import {Button} from "~/ui/button";
import React, {forwardRef, useEffect, useState} from "react";
import axios from "axios";
import {Badge} from "~/ui/badge";
import {Popover, PopoverTrigger, PopoverContent} from "~/ui/popover";

const NtsPreview = forwardRef(({source, onClick, title, ...props}, ref) => {
	const {NtsType, Id, TemplateCode} = source
	const [data, setData] = useState(null)
	const [json, setJson] = useState(null)
	const [dataJson, setDataJson] = useState(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		switch (NtsType) {
			case "Note":
				setLoading(true)
				axios.get(`/dmsapi/nts/query/GetNoteDetails?userId=45bba746-3309-49b7-9c03-b5793369d73&noteId=${Id}${TemplateCode && "&templateCode=" + TemplateCode}&dataAction=2`).then(res => {
					setData(res.data)
				})
				break;
			case "Service":
				break;
			case "Task":
				break;
		}
		
	}, [source]);
	useEffect(() => {
		if (!data) return
		if (data.Json) {
			let j_ = JSON.parse(data.Json)
			setJson(j_)
		} else {
			setJson(null)
		}
		if (data.DataJson) {
			let dj_ = JSON.parse(data.DataJson)
			setDataJson(dj_)
		} else {
			setDataJson(null)
		}
		setLoading(false)
	}, [data]);
	useEffect(() => {
		setLoading(false)
	}, []);
	return loading ? <div>
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
		
		</div> :
		<div className={"min-h-[70vh] flex flex-col bg-secondary-50 bg-opacity-60 border-primary-200 border-b-0  dark:bg-secondary-900 dark:bg-opacity-20 border-2 dark:border-secondary-900 dark:shadow-xl"}>
			<div className={"flex gap-2 bg-primary-100 dark:bg-secondary-900 p-2 items-center justify-between"}>
				{dataJson ?
					
					<>
						
						<div className={"px-2"}>
							<Text size={"xs"}>
								{dataJson["NoteNo"]}
							</Text>
							<Text className={"font-bold"}>
								{dataJson["TemplateDisplayName"]}
							</Text>
						</div>
						<Separator vertical={true}
						           className={"my-2"} />
						<div className={"px-3 p-2 mx-auto w-full rounded bg-primary-50 dark:bg-secondary-800 shadow"}>
							<Text size={"xs"}
							      align={"center"}>
								{(title ? dataJson[title] : dataJson["NoteNo"])}
							</Text>
						</div>
						<Popover>
							<PopoverTrigger>
								<Button size={"sm"}
								        variant={"tertiary"}
								        icon={"clock"} />
							</PopoverTrigger>
							<PopoverContent>
								<div>
									<Text size={"sm"}
									      className={"font-bold mb-2"}>Created On</Text>
									<Text size={"xs"}
									      variant={"span"}
									      className={"font-bold"}>{new Date(dataJson["StartDate"]).toDateString()} </Text>
									<Text variant={"span"}
									      size={"xs"}> {new Date(dataJson["StartDate"]).toLocaleTimeString()} </Text>
									<Separator />
									<span className={"flex items-center gap-4"}>
										<Icon icon={"user-circle"}
										      hover={false} />
										<span>
											<Text size={"xs"}
											      className={"font-bold"}>{dataJson["CreatedByUser_Name"]}</Text>
									<Text size={"xs"}>{dataJson["CreatedByUser_Email"]}</Text>
										</span>
									</span>
								
								</div>
							</PopoverContent>
						
						</Popover>
						<span className={"flex gap-1 items-center"}>
							<Text size={"xs"}
							      color={"secondary"}>v{dataJson.VersionNo}</Text>
							<Badge size={"xs"}
							       variant={"outline"}>{data.NoteStatusName}</Badge></span>
						
						
						<Separator vertical={true} />
						
						<Button variant={"tertiary"}
						        icon={"close"}
						        onClick={() => {
							        props.onClose && props.onClose()
						        }}
						></Button>
					</>
					: <></>
				}
			</div>
			<div className={"p-4"}>
				{data ? <div>
					{json ? <div className={"h-[60vh] overflow-scroll"}>
							{json.components?.map(comp => {
								return <div>
												<span className={"block mb-4  "}>
													<Text size={"xs"}
													      wrap={true}
													      className={"font-bold mt-4 mb-2 mx-2"}>{comp.label}</Text>
													<Text
														wrap={true}
														className={"p-2 px-4 rounded bg-secondary-200/80 dark:bg-secondary-900 "}>{comp.udfValue ? comp.udfValue : "NA"}</Text>
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

export class cmHandler {
}