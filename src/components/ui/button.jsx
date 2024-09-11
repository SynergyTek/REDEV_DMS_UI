import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva} from "class-variance-authority";

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
					"border border-primary-950 hover:text-primary-600 hover:border-primary-500 dark:text-secondary-100 dark:border-secondary-800 dark:hover:border-primary-950  bg-transparent hover:bg-primary-100 dark:hover:bg-primary-950",
				primary:
					"bg-primary-600 text-gray-50 hover:bg-primary-700",
				secondary:
					"bg-secondary-600/90 text-gray-50 hover:bg-secondary-600",
				tertiary: "hover:bg-secondary-100 dark:text-gray-100 dark:hover:bg-secondary-800",
				link: "text-primary-700 underline-offset-4 hover:underline",
			},
			size: {
				xs: "h-6 rounded px-2",
				sm: "h-9 rounded-md px-3",
				default: "h-10 px-4 py-2",
				lg: "h-11 rounded-md px-8",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	}
)

const Button = forwardRef(({className, icon, variant, size, asChild = false, ...props}, ref) => {
	if (!ref) {
		ref = useRef()
	}
	const handleClick = () => {}
	return (
		(<button
			className={cn(buttonVariants({variant, size, className}))}
			ref={ref}
		
			{...props}
		
		>
			{icon && <Icon size={size} icon={icon} hover={{container: ref}}></Icon> }
			{props.children}
		</button>)
	);
})
Button.displayName = "Button"

export {Button, buttonVariants}
