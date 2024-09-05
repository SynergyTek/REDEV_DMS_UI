const sizeMap={
	1:"w-[1ch]",
	2:"w-[2ch]",
	3:"w-[3ch]",
	4:"w-[4ch]",
	5:"w-[5ch]",
	6:"w-[6ch]",
	7:"w-[7ch]",
	8:"w-[8ch]",
	9:"w-[9ch]",
	10:"w-[10ch]",
}
function Text({text, truncate}) {
	return <p title={text} className={`${typeof truncate==="number"&&sizeMap[truncate]} text-primary-950 dark:text-primary-100 ${truncate && "truncate ..."}`}>{text}</p>
}

export default Text;