import {cn} from "@/lib/utils";
import {cva} from "class-variance-authority";
import Skeleton from "~/ui/skeleton";

const textVariants = cva(
	"text-primary-950 dark:text-primary-100 overflow-hidden",
	{
		variants: {
			size: {
				"sm": "text-sm",
				"xs": "text-xs",
				"4xl": "text-4xl",
				"3xl": "text-3xl",
				"2xl": "text-2xl",
				"xl": "text-xl",
				"lg": "text-lg",
				"md": "text-base",
			},
			align:
				{
					center: "text-center",
					left: "text-left",
					right: "text-right",
					justify: "text-justify",
					start: "text-start",
					end: "text-end",
				},
			wrap: {
				true: "text-wrap",
				break: "text-wrap break-all",
				false: "text-ellipsis text-nowrap"
			},
			
		},
		defaultVariants: {
			size: "md",
			width: "default",
			align: "start",
			wrap: false,
			
		},
	}
)

const variantMap = {
	p: "text-sm",
	span: "text-xs",
	h1: "text-4xl",
	h2: "text-3xl",
	h3: "text-2xl",
	h4: "text-xl",
	h5: "text-lg",
	h6: "text-base",
}

function Text({variant, size, type, truncate = true, className, wrap, align, ...props}) {
	if (props.skeleton) {
		return <Skeleton className={cn(`h-4`, className)} />
	}
	const Comp =  "p"
	return <Comp title={props.children}
	             className={cn(textVariants({align, type, className, wrap, size}))}>{props.children}</Comp>
}

export default Text;