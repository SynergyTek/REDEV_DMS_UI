import axios from "axios";
import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Loader, Toolbar} from "~";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faFolder} from "@awesome.me/kit-9b926a9ec0/icons/duotone/solid";
import {faPlus} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";

const iconMap = {
	"folder": faFolder,
	"file": faFile,
}

function Item({size, type, title, onClick, ...props}) {
	
	return <div onClick={() => {
		if (typeof onClick === "function") {
			onClick({title, type})
		}
	}}
	            role={"button"}
	            className={"transition-all hover:bg-primary-200 bg-opacity-80 dark:hover:bg-primary-950 dark:bg-opacity-80 p-4 rounded flex flex-col gap-2"}>
		<FontAwesomeIcon icon={iconMap[type]}
		                 size={size}
		                 className={"text-primary-900 dark:text-primary-50"}
		/>
		<h3 className={"ml-1.5 text-md font-semibold text-primary-950 dark:text-primary-200"}>{title}</h3>
	</div>
	
	
}

function FileExplorer({source, ...props}) {
	const [data, setData] = useState(null);
	const [scale, setScale] = useState(4);
	const [structure, setStructure] = useState(null);
	const [path, setPath] = useState([]);
	const handleClick = (event) => {
		console.log(event)
	}
	useEffect(() => {
		if (typeof source === "string") {
			axios.get(source).then((res) => {
				setData(res.data);
			}).catch((e) => {
				console.log(e);
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
		let temp = [];
		if (data.content) {
			data.content.forEach((item) => {
				temp.push(<Item title={item.title}
				                type={item.type}
				                onClick={handleClick}
				                size={`${scale}x`} />);
			});
		}
		setStructure(temp);
	}, [data]);
	
	return (
		
		data ?
			<div className={"min-h-96 rounded bg-primary-50 bg-opacity-60 border-primary-200 shadow dark:bg-secondary-900 dark:bg-opacity-20 border-2 dark:border-secondary-900 dark:shadow-xl"}>
				<div className={"flex gap-2 bg-primary-200 dark:bg-secondary-900 p-2 items-center"}>
					<Breadcrumb path={path} />
					<Button icon={faPlus}
					        mode={"tertiary"}
					        size={"sm"}
					        ratio={1} />
				</div>
				<div className={"flex flex-wrap gap-4 p-4"}>
					{structure ? structure.map((item, index) => {
						return <div key={index}
						            className={"flex-2"}>
							{item}
						</div>;
					}) : "Empty"}
				</div>
			
			</div> : <div><Loader /></div>
	
	);
}

export default FileExplorer;