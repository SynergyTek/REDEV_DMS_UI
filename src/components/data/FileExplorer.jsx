import axios from "axios";
import React, {useEffect, useRef, useState, useMemo, forwardRef} from "react";
import {Breadcrumb, Button, Icon, Loader, Separator, Slider, Text, Toolbar} from "~";
import {useRouter} from "next/router";

const iconMap = {
	"folder": "folder",
	"GENERAL_FOLDER": "folder",
	"file": "file",
	"GENERAL_DOCUMENT": "file",
	"workspace": "folders",
	"WORKSPACE_GENERAL": "folders",
}
const userId = "45bba746-3309-49b7-9c03-b5793369d73c"

const Item = forwardRef(({scale, id, type, title, onClick, onDoubleClick, ...props}, ref) => {
	ref = ref || useRef()
	return <div role={"button"}
	            onClick={onClick}
	            onDoubleClick={onDoubleClick}
	            title={title}
	            ref={ref}
	            className={`text-primary-800 dark:text-primary-200 transition-all hover:bg-primary-200 bg-opacity-80 dark:hover:bg-primary-950 dark:bg-opacity-80 p-4 rounded flex flex-col gap-2`}>
		<Icon icon={iconMap[type] || "file-exclamation"}
		      variant={"fal"}
		      hover={
			      {variant: "fad", container: ref}
		      }
		      size={`${scale}x`}
		/>
		<Text
			wrap={scale * 2}
			className={"break-words"}
		>
			{title}
		
		
		</Text>
	</div>
	
	
})

function FileExplorer(props) {
	const router = useRouter()
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [level, setLevel] = useState(0);
	const [scale, setScale] = useState(4);
	const [structure, setStructure] = useState(null);
	const [path, setPath] = useState([{href: "/", title: "Home", icon: "home"}]);
	const [currentFolder, setCurrentFolder] = useState(null);
	const [source, setSource] = useState(`/dmsapi/dms/workspace/GetParentWorkspace?userId=${userId}&portalName=DMS`)
	const {currentDirectory} = router.query;
	const sliderRef = useRef();
	
	const handlePathClick = (props) => {
		setCurrentFolder(props.id)
		setPath([props])
	}
	useEffect(() => {
		console.log(currentDirectory || "/")
		
		setCurrentFolder(currentDirectory || "/")
		// setPath([...path, {href: currentDirectory, title: currentDirectory, icon: "folder"}])
		
	}, [currentDirectory]);
	useEffect(() => {
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
			
		}
	}, [source]);
	useMemo(() => {
		if (!data) return;
		let temp = []
		data.sort((a, b) => (a.Name || a.title).localeCompare((b.Name || b.title)))
		data.forEach((item, index) => {
			if (level === 0) item["TemplateCode"] = "WORKSPACE_GENERAL"
			temp.push(<Item title={item["Name"] || item['title']}
			                type={item["TemplateCode"]}
			                scale={scale}
			                onDoubleClick={() => {
				                router.push({
					                pathname: "/files",
					                query: {currentDirectory: item["id"] || item["key"]},
				                }).then(() => {
									setLevel(level + 1)
				                })
			                }}
			/>)
			
			
		})
		setStructure(temp)
		setLoading(false)
	}, [data, scale]);
	
	return (
		
		<div className={"rounded overflow-clip"}>
			<div className={"min-h-96 flex flex-col bg-primary-50 bg-opacity-60 border-primary-200 border-b-0 shadow dark:bg-secondary-900 dark:bg-opacity-20 border-2 dark:border-secondary-900 dark:shadow-xl"}>
				<div className={"flex gap-2 bg-primary-100 shadow dark:bg-secondary-900 p-2 items-center justify-between"}>
					<div className={"flex"}>
						<Button icon={"arrow-left"}
						        mode={"tertiary"}
						        size={"sm"}
						        onClick={() => {
							        if (level > 0) {
								        
								        router.back()
							        }
						        }}></Button>
						<Button icon={"arrow-right"}
						        mode={"tertiary"}
						        size={"sm"}></Button>
						<Button icon={"arrows-rotate"}
						        mode={"tertiary"}
						        size={"sm"}></Button>
					</div>
					<Separator vertical={true} />
					{/*<Breadcrumb path={path}*/}
					{/*            onClick={handlePathClick} />*/}
					<Separator vertical={true}
					           className={"ml-auto"} />
					<Button icon={"plus"}
					        mode={"tertiary"}
					        size={"sm"}
					        ratio={1} />
				</div>
				{loading ? <div><Loader /></div> : <div className={"flex flex-wrap gap-4 p-4 h-full justify-evenly"}>
					{structure ? structure.map((item, index) => {
						return <div key={index}
						            className={"flex-2 last:me-auto"}>
							{item}
						</div>;
					}) : "Empty"}
				</div>
					
				}
			</div>
			<div className={"flex gap-2 bg-primary-200 dark:bg-secondary-900 border-primary-200 dark:border-secondary-900 border-2 p-4 items-center justify-between"}>
				<Slider
					setValue={setScale}
					min={1}
					max={10}
					value={5}
				/>
			</div>
		</div>
	
	);
}

export default FileExplorer;