import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createRef, forwardRef, useEffect, useRef, useState} from "react";
import {Popover, PopoverContent} from "~/ui/popover";
import {Icon, Text} from "~";
import PropTypes from "prop-types";
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList} from "~/ui/command";

let cmHandler = function (node) {
	console.log(node)
}
cmHandler.current = null
cmHandler.show = (event) => {
	
};
cmHandler.hide = (event) => {
	
};

const ContextMenuTrigger = ({options, ...props}) => {
	const handleContextMenu = (event) => {
		event.preventDefault();
		cmHandler.show(event, options)
		
	};
	return (
		<div onContextMenu={handleContextMenu} {...props}>
			{props.children}
		</div>
	)
}
ContextMenuTrigger.propTypes = {
	options: PropTypes.array,
}
const ContextMenu = ((props) => {
		const [data, setData] = useState()
		const [open, setOpen] = useState(false);
		const [x, setX] = useState(0);
		const [y, setY] = useState(0);
		
		const menuRef = useRef();
		useEffect(() => {
			
			document.addEventListener("click", cmHandler.hide);
			document.addEventListener("blur", cmHandler.hide);
			return () => {
				document.removeEventListener("click", cmHandler.hide);
				document.removeEventListener("blur", cmHandler.hide);
			};
		}, []);
		cmHandler.show = (event, eventOptions) => {
			if (open) {
				setOpen(false)
				return
			}
			setData(eventOptions)
			
			const offsetBox = event.currentTarget.offsetParent;
			
			setOpen(true)
			const menuWidth = menuRef.current.offsetWidth;
			const menuHeight = menuRef.current.offsetHeight;
			setOpen(false)
			
			// Determine position for the menu
			let posX = event.clientX;
			let posY = event.clientY;
			
			// Check if the menu goes beyond the right edge of the window
			if (posX + menuWidth > offsetBox.offsetLeft + offsetBox.clientWidth) {
				posX = offsetBox.offsetLeft + offsetBox.clientWidth - menuWidth;
			}
			
			// Check if the menu goes beyond the bottom edge of the window
			if (posY + menuHeight > offsetBox.offsetTop + offsetBox.clientHeight) {
				posY = offsetBox.offsetTop + offsetBox.clientHeight - menuHeight;
			}
			
			setX(posX)
			setY(posY)
			setOpen(true)
		}
		cmHandler.hide = (event) => {
			setOpen(false)
		}
		useEffect(() => {
			if (!open) {
				setData(null)
			}
		}, [open]);
		useEffect(() => {
			if (!menuRef.current) return;
			if (open) {
				
				menuRef.current.style.top = `${y}px`;
				menuRef.current.style.left = `${x}px`;
				menuRef.current.classList.remove("hidden");
			} else {
				menuRef.current.classList.add("hidden");
			}
		}, [open, x, y]);
		return (
			<div className="hidden absolute"
			     ref={menuRef}>
				<Command>
					<CommandList>
						{data ?
							<CommandGroup>
								{data.map((item, index) => {
									const ref = createRef();
									return <CommandItem key={index}
									                    onSelect={item.onClick}
									                    className={"flex gap-2"}
									                    ref={ref}>
										{item.icon ? <Icon size={"sm"}
										                   icon={item.icon}
										                   hover={{container: ref}} /> : null}<Text size={"sm"}>{item.label}</Text>
									</CommandItem>
								})}
							</CommandGroup>
							:
							<CommandEmpty>No options configured</CommandEmpty>
						}
					</CommandList>
				</Command>
			</div>
		);
	}
)

export {
	ContextMenu, cmHandler, ContextMenuTrigger
}


