import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFiles} from "@awesome.me/kit-9b926a9ec0/icons/classic/regular";
import {faFolders} from "@awesome.me/kit-9b926a9ec0/icons/classic/solid";

function Slider({min = 0, max = 100, value = 50, setValue, ...props}) {
	const [val, setVal] = useState(value);
	
	const handleChange = (e) => {
		if (typeof setValue === "function") {
			setValue(e.target.value);
		}
		setVal(e.target.value);
	};
	
	return (
		<div className={"flex items-center gap-2 text-primary-900 dark:text-primary-300  dark:text-opacity-60"}>
			<FontAwesomeIcon icon={faFolders} size={"xs"}/>
			<input type={"range"}
			       min={min}
			       max={max}
			       value={val}
			       onChange={handleChange}
			       className={"w-1/2"} />
			<FontAwesomeIcon icon={faFolders} size={"lg"}/>
		</div>
	);
}

export default Slider;