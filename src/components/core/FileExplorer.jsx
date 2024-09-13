import axios from "axios";
import React, {useEffect, useRef, useState, useMemo, forwardRef} from "react";
import {Breadcrumb, Dropdown, Icon, Separator, Slider, Text} from "~";
import {useRouter} from "next/router";
import {cn, toTitle} from "@/lib/utils";
import {Button} from "~/ui/button";
import {toast} from "sonner";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "~/ui/resizable";
import NtsPreview from "~/core/NtsPreview";
import {ContextMenuTrigger} from "~/core/ContextMenu";

const sourceMap = {
	default: "/dmsapi/dms/workspace/GetParentWorkspace?userId=45bba746-3309-49b7-9c03-b5793369d73c&portalName=DMS",
	archive: "/dmsapi/dms/query/GetArchivedDocumentData?userId=45bba746-3309-49b7-9c03-b5793369d73c",
	bin: "/dmsapi/dms/query/GetBinDocumentData?userId=45bba746-3309-49b7-9c03-b5793369d73c"
}
const rootSource = "/dmsapi/dms/workspace/GetParentWorkspace?userId=45bba746-3309-49b7-9c03-b5793369d73c&portalName=DMS"
const iconMap = {
	"folder": "folder",
	"GENERAL_FOLDER": "folder",
	"file": "file",
	"GENERAL_DOCUMENT": "file",
	"workspace": "folders",
	"WORKSPACE_GENERAL": "folders",
	".pdf": "file-pdf",
	".doc": "file-word",
	".docx": "file-word",
	".xls": "file-excel",
	".xlsx": "file-excel",
	".ppt": "file-powerpoint",
	".pptx": "file-powerpoint",
	".zip": "file-archive",
	".rar": "file-archive",
	".7z": "file-archive",
	".jpg": "file-image",
}
const userId = "45bba746-3309-49b7-9c03-b5793369d73c"
const textScale = {
	1: "text-xs",
	2: "text-xs",
	3: "text-sm",
	4: "text-sm",
	5: "text-base",
	6: "text-base",
	7: "text-md",
	8: "text-md",
	9: "text-xl",
	10: "text-xl",
}
const widthScale = {
	1: "w-[7ch]",
	2: "w-[8ch]",
	3: "w-[8ch]",
	4: "w-[9ch]",
	5: "w-[9ch]",
	6: "w-[10ch]",
	7: "w-[12ch]",
	8: "w-[13ch]",
	9: "w-[14ch]",
	10: "w-[15ch]",
}
const Item = forwardRef(({scale, id, type, title, onClick, onDoubleClick, ...props}, ref) => {
	ref = ref || useRef()
	return <ContextMenuTrigger options={
		[{
			label: "Delete",
			icon: "trash",
			onClick: () => toast.promise(() => new Promise((resolve) => setTimeout(() => resolve({name: 'Sonner'}), 2000)), {loading: "Deleting"})
		},]
	}>
		<div role={"button"}
		     onClick={onClick}
		     onDoubleClick={onDoubleClick}
		     title={title}
		     ref={ref}
		     className={`transition-all text-secondary-600 hover:text-primary-800 dark:text-secondary-300 dark:hover:text-primary-300  flex flex-col justify-center items-center hover:bg-primary-200 bg-opacity-80 dark:hover:bg-primary-950 dark:bg-opacity-80 p-4 rounded gap-2`}>
			<Icon icon={props.skeleton ? "folder" : iconMap[props.extension] || iconMap[type] || "file-exclamation"}
			      variant={"fal"}
			      hover={
				      {
					      variant: "fad",
					      container: ref
				      }
			      }
			      size={`${scale == 1 ? "" : scale}xl`}
			      skeleton={props.skeleton}
			/>
			{
				props.rename ?
					<input value={title}
					       className={"border-1 radius text-center"}
					       autoFocus={true} />
					: <Text
						wrap={"break"}
						className={cn(textScale[scale], widthScale[scale])}
						skeleton={props.skeleton}
					
					>
						{title}
					</Text>
				
			}
		
		</div>
	</ContextMenuTrigger>
	
	
})


function FileExplorer({filter, mode = "default", props}) {
	const router = useRouter()
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [level, setLevel] = useState(0);
	const [scale, setScale] = useState(4);
	const [structure, setStructure] = useState(null);
	const [path, setPath] = useState([{href: "/files", title: "Home", icon: "home"}]);
	const [currentFile, setCurrentFile] = useState(null);
	const [currentFolder, setCurrentFolder] = useState(null);
	const [source, setSource] = useState(sourceMap[mode]);
	const {currentDirectory} = router.query
	const fileExplorerPanelRef = useRef(null)
	const handlePathClick = (props) => {
		setCurrentFolder(props.id)
		setPath([props])
	}
	const createNewItem = (selected) => {
		let itemType = selected?.id
		switch (selected?.id) {
			case "file":
				if (level === 0) {
					return toast.error(`You cannot create a ${selected.id} in the root workspace`)
				}
				itemType = "GENERAL_DOCUMENT"
				break;
			case "folder":
				if (level === 0) {
					return toast.error(`You cannot create a ${selected.id} in the root workspace`)
				}
				itemType = "GENERAL_FOLDER"
				break;
			case "workspace":
				console.log("workspace")
				itemType = "WORKSPACE_GENERAL"
				break;
		}
		let temp = Array.from(data) || []
		temp.push({
			TemplateCode: itemType,
			Name: "New Item",
			id: "new",
			newlyCreated: true,
			
		})
		setData(temp)
	}
	useEffect(() => {
		setSource(filter || rootSource)
	}, [filter]);
	useEffect(() => {
		if (!mode) return;
		setSource(sourceMap[mode])
	}, [mode]);
	useMemo(() => {
		if (!data) return;
		let temp = []
		data.sort((a, b) => {
			const aFileName = (a.Name || a.title || a.FileName || a.DocumentName) || "Untitled"
			const bFileName = (b.Name || b.title || b.FileName || b.DocumentName) || "Untitled"
			if (aFileName === bFileName) return 0
			return aFileName.localeCompare(bFileName)
		})
		data.forEach((item, index) => {
			if (level === 0) item["TemplateCode"] = "WORKSPACE_GENERAL"
			temp.push(<Item title={item["Name"] || item['title'] || item["FileName"] || item["DocumentName"]}
			                type={item["FileName"] ? "file" : item["TemplateCode"]}
			                extension={item["FileExtension"]}
			                scale={scale}
			                rename={item["newlyCreated"]}
			                onDoubleClick={(props) => {
				                if (item["FileName"] || ["GENERAL_DOCUMENT", "file"].includes(item["TemplateCode"])) {
					                setCurrentFile(item)
				                } else {
					                
					                router.push({
						                pathname: "/files",
						                query: {currentDirectory: item["id"] || item["key"] || item["Id"]},
					                }).then(() => {
						                setPath([...path, {
							                href: item["id"] || item["key"] || item["Id"],
							                title: item["Name"] || item["title"],
							                icon: "folder"
						                }])
						                setLevel(level + 1)
					                })
				                }
			                }}
			/>)
			
			
		})
		setStructure(temp)
		setLoading(false)
	}, [data, scale]);
	useMemo(() => {
		if (currentFile) {
			setScale(2)
			// setCurrentFileData(null)
			//
			// axios.get(`dmsapi/nts/query/GetNoteDetails?templateCode=${currentFile.TemplateCode}&userId=45bba746-3309-49b7-9c03-b5793369d73c&noteId=${currentFile["id"]
			// || currentFile["key"] || currentFile["Id"]}&dataAction=1`).then((res) => { console.log(res.data)
			// setCurrentFileData(res.data) })
			fileExplorerPanelRef.current?.setLayout([50, 50])
		}
	}, [currentFile]);
	useMemo(() => {
		console.log(currentDirectory || "/")
		
		setCurrentFolder(currentDirectory || "/")
		// setPath([...path, {href: currentDirectory, title: currentDirectory, icon: "folder"}])
		
	}, [currentDirectory]);
	useMemo(() => {
		console.log(currentFolder)
		if (!currentFolder) return;
		
		if (currentFolder === '/') {
			setLevel(0)
			setSource(`/dmsapi/dms/workspace/GetParentWorkspace?userId=${userId}&portalName=DMS`)
		} else {
			setSource(`/dmsapi/dms/query/GetChildFoldersAndDocuments?key=${currentFolder}&userId=${userId}&portalName=DMS`)
		}
	}, [currentFolder]);
	useMemo(() => {
		setLoading(true)
		if (typeof source === "string") {
			axios.get(source).then((res) => {
				console.log(res.data)
				setData(res.data);
			}).catch((e) => {
				console.log(e);
				setLoading(false)
			});
		} else if (typeof source === "function") {
			if (source.toString().slice(0, 5) === "async") {
				source().then((res) => {
					setData(res);
				});
			} else {
				setData(source());
			}
		} else {
			setData(source);
			console.log(source)
		}
	}, [source]);
	
	return (
		<>
			
			<ResizablePanelGroup direction={"horizontal"}
			                     ref={fileExplorerPanelRef}>
				<ResizablePanel id={"explorer-panel"}
				                defaultSize={100}>
					<div className={"rounded overflow-clip"}>
						
						<div className={"min-h-[70vh] flex flex-col bg-secondary-50 bg-opacity-60 border-primary-200 border-b-0  dark:bg-secondary-900 dark:bg-opacity-20 border-2 dark:border-secondary-900 dark:shadow-xl"}>
							<div className={"flex gap-2 bg-primary-100 dark:bg-secondary-900 p-2 items-center justify-between"}>
								{/*<div className={"flex"}>*/}
								{/*	<Button icon={"arrow-left"}*/}
								{/*	        variant={"tertiary"}*/}
								{/*	        size={"sm"}*/}
								{/*	        {...level === 0 && {disabled: true}}*/}
								{/*	        onClick={() => {*/}
								{/*		        console.log(router)*/}
								{/*		        if (level > 0) {*/}
								{/*			        router.back()*/}
								{/*		        }*/}
								{/*	        }}></Button>*/}
								{/*	<Button icon={"arrow-right"}*/}
								{/*	        variant={"tertiary"}*/}
								{/*	        size={"sm"}*/}
								{/*	        onClick={() => {*/}
								{/*		       window.history.forward()*/}
								{/*		        */}
								{/*	        }}*/}
								{/*	></Button>*/}
								{/*	<Button icon={"arrows-rotate"}*/}
								{/*	        variant={"tertiary"}*/}
								{/*	        size={"sm"}*/}
								{/*	        onClick={() => {*/}
								{/*		        router.reload()*/}
								{/*	        }}*/}
								{/*	></Button>*/}
								{/*</div>*/}
								{/*<Separator vertical={true} />*/}
								<div className={"px-3 p-2 rounded bg-primary-50 dark:bg-secondary-800 shadow"}>
									<Breadcrumb path={filter ?
										[
											{href: "#", icon: "magnifying-glass"},
											{label: "Search Results"},
										]
										: path}
									            onClick={handlePathClick} />
								</div>
								{/*<Separator vertical={true}*/}
								{/*           className={"ml-auto"} />*/}
								{/*<div>*/}
								
								{/*</div>*/}
								<Separator vertical={true}
								           className={"ml-auto"} />
								<Dropdown source={["file", "folder", "workspace"].map(i => {
									return {
										id: i,
										name: toTitle(i),
										icon: iconMap[i]
									}
								})}
								          align={"end"}
								          onSelect={createNewItem}
								>
									<Button variant={"tertiary"}
									        icon={"plus"}></Button>
								</Dropdown>
							</div>
							{loading ? <div className={"p-4 flex flex-wrap gap-4"}>
								{Array.from({length: 10}).map(() => {
									return <Item skeleton={true}
									             scale={scale} />
								})}
							</div> : <div className={"flex flex-wrap gap-4 p-4 h-full justify-evenly"}>
								{structure ? structure.map((item, index) => {
									return <div key={index}
									            className={"flex-2 last:me-auto"}>
										{item}
									</div>;
								}) : "Empty"}
							</div>
								
							}
						</div>
					
					
					</div>
				</ResizablePanel>
				<ResizableHandle disabled={!currentFile}
				                 className={"bg-primary-200 dark:bg-secondary-900"} />
				<ResizablePanel id={"preview-panel"}
				                defaultSize={0}>
					<NtsPreview source={{
						NtsType: "Note",
						Id: currentFile?.id || currentFile?.key || currentFile?.Id,
						TemplateCode: currentFile?.TemplateCode
					}}
					            title={"NoteSubject"}
					            onClose={
						            () => {
							            setCurrentFile(null)
							            fileExplorerPanelRef.current?.setLayout([100, 0])
						            }
					            }></NtsPreview>
				</ResizablePanel>
			</ResizablePanelGroup>
			<div className={"flex gap-2 bg-primary-200 dark:bg-secondary-900 border-primary-200 dark:border-secondary-900 border-2 p-4 items-center justify-between"}>
				<Slider
					setValue={setScale}
					icons={{min: "folder", max: "folder"}}
					min={1}
					max={10}
					value={scale}
				/>
			</div>
		</>
	)
		;
}

export default FileExplorer;