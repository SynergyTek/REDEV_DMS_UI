import {Slot} from "@radix-ui/react-slot";

const sizeMap = {
	1: "w-[1ch]",
	2: "w-[2ch]",
	3: "w-[3ch]",
	4: "w-[4ch]",
	5: "w-[5ch]",
	6: "w-[6ch]",
	7: "w-[7ch]",
	8: "w-[8ch]",
	9: "w-[9ch]",
	10: "w-[10ch]",
}
const alignMap = {
	center: "text-center",
	left: "text-left",
	right: "text-right",
	justify: "text-justify",
	start: "text-start",
	end: "text-end",
}
const variantMap = {
	p: "text-sm",
	span: "text-sm",
	h1: "text-4xl",
	h2: "text-3xl",
	h3: "text-2xl",
	h4: "text-xl",
	h5: "text-lg",
	h6: "text-base",
}

function Text({variant = "p", truncate =true, wrap , align = "start", ...props}) {
	const Comp = variant
	return <Comp title={props.children}
	             className={`${alignMap[align]} ${variantMap[variant]}  ${typeof wrap === "number" && sizeMap[wrap]}  text-primary-950 dark:text-primary-100 text-ellipsis overflow-hidden ${props.className}`}>{props.children}</Comp>
}

export default Text;