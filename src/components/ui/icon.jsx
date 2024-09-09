import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {library} from '@fortawesome/fontawesome-svg-core'
import {all} from "@awesome.me/kit-9b926a9ec0/icons";

library.add(...all)
const Icon = React.forwardRef((
	{
		icon,
		className,
		variant = "far",
		hover = false,
		size, ...props
	},
	ref) => {
	const [hovered, setHovered] = useState(false)
	return (
		<FontAwesomeIcon icon={[hovered?(hover.variant||"fas"):variant, icon]}
		                 className={`transition-all text-primary-50 ${className}`}
		                 size={size}
		                 onMouseEnter={hover ? () => setHovered(true) : null}
		                 onMouseLeave={hover ? () => setHovered(false) : null}
		
		></FontAwesomeIcon>
	
	)
})
Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	variant: PropTypes.string,
	size: PropTypes.string,
	className: PropTypes.string,
}
export default Icon