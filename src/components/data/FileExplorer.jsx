import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Breadcrumb, Button, Loader, Separator, Slider, Text, Toolbar} from "~";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faFileExclamation, faFolder} from "@awesome.me/kit-9b926a9ec0/icons/duotone/solid";
import {
	faArrowLeft,
	faArrowRight,
	faHome,
	faLeft,
	faPlus,
	faRefresh
} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";

const iconMap = {
	"folder": faFolder,
	"file": faFile,
}

function Item({scale, type, title, onClick, ...props}) {
	return <div onClick={() => {
		if (typeof onClick === "function") {
			onClick({title, type})
		}
	}}
	            title={title}
	            className={`transition-all hover:bg-primary-200 bg-opacity-80 dark:hover:bg-primary-950 dark:bg-opacity-80 p-4 rounded flex flex-col gap-2`}>
		<FontAwesomeIcon icon={iconMap[type] || faFileExclamation}
		                 size={`${scale}x`}
		                 className={"text-primary-900 dark:text-primary-50"}
		/>
		<Text text={title}
		      truncate={scale*2} />
	</div>
	
	
}

function FileExplorer({source, ...props}) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [scale, setScale] = useState(4);
	const [structure, setStructure] = useState(null);
	const [path, setPath] = useState([{href: "/", title: "Home", icon: faHome}]);
	const [currentFolder, setCurrentFolder] = useState(null);
	const sliderRef = useRef();
	const handleClick = (props) => {
		setPath([...path, {href: props.title, title: props.title}]);
		setData(props)
	}
	const handlePathClick = (props) => {
		setPath([props])
	}
	useEffect(() => {
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
	useEffect(() => {
		if (!data) return;
		let temp = []
		data.forEach((item, index) => {
			if (item["ParentId"] === currentFolder) {
				temp.push(<Item title={item["Name"]}
				                type={item["Type"]}
				                scale={scale}
				                onClick={handleClick}
				/>)
			}
		})
		setStructure(temp)
		setLoading(false)
	}, [data, scale]);
	
	return (
		
		<div className={"rounded overflow-clip"}>
			<div className={"min-h-96 flex flex-col bg-primary-50 bg-opacity-60 border-primary-200 border-b-0 shadow dark:bg-secondary-900 dark:bg-opacity-20 border-2 dark:border-secondary-900 dark:shadow-xl"}>
				<div className={"flex gap-2 bg-primary-100 shadow dark:bg-secondary-900 p-2 items-center justify-between"}>
					<div className={"flex"}>
						<Button icon={faArrowLeft}
						        mode={"tertiary"}
						        size={"sm"}></Button>
						<Button icon={faArrowRight}
						        mode={"tertiary"}
						        size={"sm"}></Button>
						<Button icon={faRefresh}
						        mode={"tertiary"}
						        size={"sm"}></Button>
					</div>
					<Separator vertical={true} />
					<Breadcrumb path={path}
					            onClick={handlePathClick} />
					<Separator vertical={true}
					           className={"ml-auto"} />
					<Button icon={faPlus}
					        mode={"tertiary"}
					        size={"sm"}
					        ratio={1} />
				</div>
				{loading ? <div><Loader /></div> : <div className={"flex flex-wrap gap-4 p-4 h-full"}>
					{structure ? structure.map((item, index) => {
						return <div key={index}
						            className={"flex-2"}>
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