import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@awesome.me/kit-9b926a9ec0/icons/duotone/solid";

/**
 * Primary UI component for user interaction
 */
const sizeMap = {
	xs: {btnPadding: "px-2.5 py-1.5", text: "text-xs", icon: "xs"},
	sm: {btnPadding: "px-2.5 py-1.5", text: "text-sm", icon: "sm"},
	regular: {btnPadding: "px-3.5 py-2.5", text: "", icon: ""},
	md: {btnPadding: "px-4 py-3", text: "text-md", icon: "md"},
	lg: {btnPadding: "px-4 py-3", text: "text-lg", icon: "lg"},
	
}
const ratioMap = {
	0: "",
	1: "aspect-square h-fit",
}
const modeMap = {
	primary:
		"bg-primary-800 dark:bg-primary-800 hover:bg-primary-600 hover:text-primary-100 text-primary-100 dark:text-primary-100 dark:hover:bg-primary-700",
	secondary:
		"bg-secondary-500 dark:bg-secondary-800 hover:bg-primary-600 hover:text-primary-50 text-primary-100 dark:text-primary-100 dark:hover:bg-primary-700",
	tertiary: "bg-transparent text-primary-950 dark:text-primary-100 hover:bg-primary-400 hover:text-primary-50 dark:hover:bg-primary-700",
};

function Button({
	                mode = "primary",
	                size = "regular",
	                onClick,
	                type = "button",
	                ratio = 0,
	                ...props
                }) {
	if (!Object.keys(sizeMap).includes(size)) {
		size = "regular"
	}
	if (!props.text && props.icon) {
		ratio = 1
	}
	
	const handleOnClick = (event) => {
		if (typeof onClick === "function") {
			onClick(event);
		}
	}
	return (
		<button
			className={`${sizeMap[size].btnPadding} ${modeMap[mode]} ${ratio && ratioMap[ratio]}  flex rounded items-center text-sm font-semibold gap-2 transition-all ${props.type === "dropdown" ? "bg-primary-600 bg-opacity-50 group-hover:bg-opacity-65 text-primary-100 justify-between" : null} ${props.className} `}
			id={props.id}
			onClick={handleOnClick}
			type={type}
		>
			{props.type === "dropdown" ? (
				<>
					{props.text ? <span>{props.text}</span> : "Select"}
					
					<FontAwesomeIcon
						icon={faChevronDown}
						className={"aspect-square"}
						size={sizeMap[size].icon}
					></FontAwesomeIcon>
				</>
			) : (
				<>
					{props.icon ? (
						<FontAwesomeIcon
							icon={props.icon}
							className={`${ratio && ratioMap[ratio]} p-auto`}
							size={sizeMap[size].icon}
						></FontAwesomeIcon>
					) : null}
					{props.text ? <span className={sizeMap[size].text}>{props.text}</span> : null}
				</>
			)}
		</button>
	);
}


Button.propTypes = {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary: PropTypes.bool,
	/**
	 * How large should the button be?
	 */
	size: PropTypes.oneOf(Object.keys(sizeMap)),
	/**
	 * Button contents
	 */
	text: PropTypes.string,
	/**
	 * Optional click handler
	 */
	onClick: PropTypes.func,
}

export default Button