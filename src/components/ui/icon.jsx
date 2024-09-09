import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {forwardRef, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {library} from '@fortawesome/fontawesome-svg-core'
import {all} from "@awesome.me/kit-9b926a9ec0/icons";

library.add(...all)
const Icon = forwardRef((
	{
		icon,
		className,
		variant = "far",
		hover = false,
		size, ...props
	},
	ref) => {
	const [hovered, setHovered] = useState(false)
	const [renderedIcon, setRenderedIcon] = useState([variant, icon])
	useEffect(() => {
		if (hover) {
			if (hover.container && hover.container.current) {
				hover.container.current.addEventListener("mouseenter", () => {
					setHovered(true)
				})
				hover.container.current.addEventListener("mouseleave", () => {
					setHovered(false)
				})
			}
		}
	}, [hover]);
	useEffect(() => {
		if (hovered) {
			setRenderedIcon([hover.variant || "fas", icon])
		} else {
			setRenderedIcon([variant, icon])
		}
	}, [hovered]);
	return (
		<FontAwesomeIcon icon={renderedIcon}
		                 className={`transition-all text-inherit ${className}`}
		                 size={size}
		                 // The following line is a ternary operator that checks if the hover prop contains reference to a container object. 
		                 onMouseEnter={!hover?.container?.current ? () => setHovered(true) : null}
		                 onMouseLeave={!hover?.container?.current ? () => setHovered(false) : null}
		
		></FontAwesomeIcon>
	
	)
})
Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	variant: PropTypes.string,
	size: PropTypes.string,
	className: PropTypes.string,
	hover: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
export default Icon