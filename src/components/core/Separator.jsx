function Separator({vertical = false,className, ...props}) {
	
	return (
		
		vertical ? <span className={`separator bg-primary-100 dark:bg-primary-300 dark:bg-opacity-30 w-0.5 h-5 ${className}`}></span>
			:
			<hr />
	
	);
}

export default Separator;