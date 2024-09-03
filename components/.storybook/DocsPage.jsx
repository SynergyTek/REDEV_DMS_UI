import {useEffect, useState} from "react";
import Loader from "../src/components/Loader";
import {Stories, Story, Title} from "@storybook/blocks"
export default ({context}) => {
	console.log(context)
	const [data, setData] = useState(null);
	useEffect(() => {
		if (!context){
			return
		}
		let _data = {};
		for (const item of context.attachedCSFFiles) {
			_data.meta = item.meta;
			_data.stories = item.stories;
			_data.title = item.meta.title.split("/").pop();
		}
		if (_data) {
			setData(_data);
		}
	}, [context]);
	return (
		<>
			{data ? <div>
				<h3>{data.title}</h3>
				{Object.entries(data.stories).map((story, index)=>{
					console.log(story[1])
				return <Story meta={context}></Story>	
				})}
			</div> : <Loader />
			}
		</>
	
	);
}