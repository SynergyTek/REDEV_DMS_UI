"use client"

import * as React from "react"
import Link from "next/link"

import { useMediaQuery } from "usehooks-ts"
import {
	Breadcrumb as BaseBreadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
} from "~/ui/breadcrumb"
import { Button } from "~/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/ui/drawer"

import {Popover, PopoverContent, PopoverTrigger} from "~/ui/popover";
import {Icon} from "~";



function Breadcrumb({path}) {
const ITEMS_TO_DISPLAY = Math.min(2, path.length)
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")
	
	return (
		<BaseBreadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href={path[0].href}>{path[0].icon?<Icon icon={path[0].icon} size={"sm"}/>:path[0].label}</BreadcrumbLink>
				</BreadcrumbItem>
				<Icon icon={"angle-right"} size={"sm"} variant={"fas"}/>
				{path.length > ITEMS_TO_DISPLAY ? (
					<>
						<BreadcrumbItem>
							{isDesktop ? (
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger
										className="flex items-center gap-1"
										aria-label="Toggle menu"
									>
										<BreadcrumbEllipsis className="h-4 w-4" />
									</PopoverTrigger>
									<PopoverContent align="start" className={"p-2"}>
										{path.slice(1, -2).map((item, index) => (
											<Button key={index} variant={"tertiary"} size={"sm"} >
												<Link href={item.href ? item.href : "#"}>
													{item.label}
												</Link>
											</Button>
										))}
									</PopoverContent>
								</Popover>
							) : (
								<Drawer open={open} onOpenChange={setOpen}>
									<DrawerTrigger aria-label="Toggle Menu">
										<BreadcrumbEllipsis className="h-4 w-4" />
									</DrawerTrigger>
									<DrawerContent>
										<DrawerHeader className="text-left">
											<DrawerTitle>Navigate to</DrawerTitle>
											<DrawerDescription>
												Select a page to navigate to.
											</DrawerDescription>
										</DrawerHeader>
										<div className="grid gap-1 px-4">
											{path.slice(1, -2).map((item, index) => (
												<Link
													key={index}
													href={item.href ? item.href : "#"}
													className="py-1 text-sm"
												>
													{item.label}
												</Link>
											))}
										</div>
										<DrawerFooter className="pt-4">
											<DrawerClose asChild>
												<Button variant="outline">Close</Button>
											</DrawerClose>
										</DrawerFooter>
									</DrawerContent>
								</Drawer>
							)}
						</BreadcrumbItem>
						<Icon icon={"angle-right"} size={"sm"} variant={"fas"}/>
					</>
				) : null}
				{path.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
					<BreadcrumbItem key={index}>
						{item.href ? (
							<>
								<BreadcrumbLink
									asChild
									className="max-w-20 truncate md:max-w-none"
								>
									<Link href={item.href}>{item.label}</Link>
								</BreadcrumbLink>
								<Icon icon={"angle-right"} size={"sm"} variant={"fas"}/>
							</>
						) : (
							<BreadcrumbPage className="max-w-20 text-xs truncate md:max-w-none">
								{item.label}
							</BreadcrumbPage>
						)}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</BaseBreadcrumb>
	)
}
export default Breadcrumb