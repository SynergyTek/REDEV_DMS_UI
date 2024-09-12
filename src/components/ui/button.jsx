import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva} from "class-variance-authority";
import {Text} from "~"
import {cn} from "@/lib/utils"
import {forwardRef, useRef} from "react";
import {Icon} from "~";

const buttonVariants = cva(
	"inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				danger:
					"bg-red-600/90 text-gray-50 hover:bg-red-600",
				outline:
					"border border-primary-100/30 bg-transparent hover:bg-primary-100/70 hover:text-primary-950 hover:border-primary-100/70 dark:text-secondary-100 dark:border-secondary-200/10 dark:hover:border-secondary-200/30  dark:hover:bg-secondary-200/30",
				primary:
					"bg-primary-600 text-gray-50 hover:bg-primary-700",
				secondary:
					"bg-secondary-600/90 text-gray-50 hover:bg-secondary-600",
				tertiary: "hover:bg-secondary-100 text-primary-950 dark:text-primary-50 dark:hover:bg-secondary-800",
				link: "text-primary-700 underline-offset-4 hover:underline",
			},
			size: {
				xs: "h-6 rounded px-2",
				sm: "h-9 rounded-md px-3",
				md: "h-10 px-4 py-2",
				lg: "h-11 rounded-md px-8",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	}
)

const Button = forwardRef(({className, icon, variant, size, asChild = false, ...props}, ref) => {
	if (!ref) {
		ref = useRef()
	}
	const handleClick = () => {
	}
	const childrenWithProps = React.Children.map(props.children, child => {
		// Checking isValidElement is the safe way and avoids a
		// typescript error too.
		if (React.isValidElement(child)) {
			let color;
			if (child.type === Text) {
				 color = "inherit"
			}
			return React.cloneElement(child, {size,color, ...child.props});
		}
		return child;
	});
	return (
		(<button
			className={cn(buttonVariants({variant, size, className}))}
			ref={ref}
			
			{...props}
		
		>
			{icon && <Icon size={size}
			               icon={icon}
			               hover={{container: ref}}></Icon>}
			{childrenWithProps}
		</button>)
	);
})
Button.displayName = "Button"

export {Button, buttonVariants}
