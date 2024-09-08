import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBook,
	faChevronDown,
	faFileAlt,
	faGears,
	faHome,
	faListCheck,
	faQuestionCircle,
	faUpload,
	faUserTie,
	faWindowRestore,
	faAngleRight, faChartPie
} from "@awesome.me/kit-9b926a9ec0/icons/duotone/solid";
import {
	Sidebar_menu, MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu, MenubarRadioGroup, MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger,
	MenubarTrigger,
} from "~/ui/sidebar_menu"
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { far } from "@awesome.me/kit-9b926a9ec0/icons";
import React from "react";

const Sidebar = () => {
	const router = useRouter();
	const currentRoute = router.pathname;

	return (
		<aside className="left-0 z-30 p-2 h-screen">
			<div
				className={
					"relative min-w-14 overflow-hidden border-opacity-50 border-secondary-200 rounded-lg h-full bg-secondary-50 dark:bg-secondary-900 dark:text-primary-900 "
				}
			>
				<div className={"h-20 px-2 pb-2 flex items-center gap-3"}>
					<Image
						src="/images/dms.png"
						alt="Description of image"
						width={40}
						height={40}
					/>
					<h1
						className={
							"text-2xl font-semibold text-secondary-950 dark:text-secondary-200 sm:text-2xl sm:tracking-tight"
						}
					>
						Synergy
					</h1>
				</div>
				<ul className="space-y-1 mx-1 dark:text-gray-100">
					<li>
						<Link
							href="/"
							className={`flex items-center gap-4 rounded-md px-4 py-2 ${
								currentRoute === "/"
									? "bg-secondary-200 bg-opacity-60 text-black dark:bg-secondary-700 dark:text-white dark:bg-opacity-35"
									: "hover:bg-secondary-100 hover:text-black dark:hover:bg-secondary-700 dark:hover:bg-opacity-35 dark:hover:text-white"
							}
                                `}
						>
							<FontAwesomeIcon icon={faHome} className={"w-4"}/>
							<span className="text-sm font-medium"> Dashboard </span>
						</Link>
					</li>
					<li>
						<Link
							href="/files"
							className={`flex items-center gap-4 rounded-md px-4 py-2 ${
								currentRoute === "/analytics"
									? "bg-secondary-200 bg-opacity-60 text-black dark:bg-secondary-700 dark:text-white dark:bg-opacity-35"
									: "hover:bg-secondary-200 hover:bg-opacity-60 hover:text-black dark:hover:bg-secondary-700  dark:hover:bg-opacity-35 dark:hover:text-white"
							}
                                `}
						>
							<FontAwesomeIcon icon={faChartPie} className={"w-4"}/>
							<span className="text-sm font-medium"> Analytics </span>
						</Link>
					</li>
					<li>
						<Link
							href="/files"
							className={`flex items-center gap-4 rounded-md px-4 py-2 ${
								currentRoute === "/files"
									? "bg-secondary-200 bg-opacity-60 text-black dark:bg-secondary-700 dark:text-white dark:bg-opacity-35"
									: "hover:bg-secondary-200 hover:bg-opacity-60 hover:text-black dark:hover:bg-secondary-700  dark:hover:bg-opacity-35 dark:hover:text-white"
							}
                                `}
						>
							<FontAwesomeIcon icon={far.faFiles} className={"w-4"}/>
							<span className="text-sm font-medium"> Files </span>
						</Link>
					</li>
				</ul>
				<Sidebar_menu>
					<MenubarSeparator/>
					<MenubarMenu>
						<MenubarTrigger className={'flex justify-between items-center'}>
							<div className={'py-2'}>
								<FontAwesomeIcon icon={faBook} className={"w-4 mr-5"}/>
								Document Management
							</div>
							<FontAwesomeIcon icon={faAngleRight}/>
						</MenubarTrigger>
						<MenubarContent>
							<Link href={'/admin/dashboard'}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
								<Link href={'/'}>
									<MenubarItem>Document Custom Template</MenubarItem>
								</Link>
								<Link href={'/'}>
									<MenubarItem>User</MenubarItem>
								</Link>
								<Link href={'/'}>
									<MenubarItem>User Role</MenubarItem>
								</Link>
								<Link href={'/'}>
									<MenubarItem>User Group</MenubarItem>
								</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className={'flex justify-between items-center'}>
							<div className={'py-2'}>
								<FontAwesomeIcon icon={faUserTie} className={"w-4 mr-5"}/>
								Admin
							</div>
							<FontAwesomeIcon icon={faAngleRight}/>
						</MenubarTrigger>
						<MenubarContent>
							<Link href={'/admin/dashboard'}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>Document Custom Template</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Role</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Group</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className={'flex justify-between items-center'}>
							<div className={'py-2'}>
								<FontAwesomeIcon icon={faListCheck} className={"w-4 mr-5"}/>
								Work List
							</div>
							<FontAwesomeIcon icon={faAngleRight}/>
						</MenubarTrigger>
						<MenubarContent>
							<Link href={'/admin/dashboard'}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>Document Custom Template</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Role</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Group</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className={'flex justify-between items-center'}>
							<div className={'py-2'}>
								<FontAwesomeIcon icon={faFileAlt} className={"w-4 mr-5"}/>
								Report
							</div>
							<FontAwesomeIcon icon={faAngleRight}/>
						</MenubarTrigger>
						<MenubarContent>
							<Link href={'/admin/dashboard'}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>Document Custom Template</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Role</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Group</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className={'flex justify-between items-center'}>
							<div className={'py-2'}>
								<FontAwesomeIcon icon={faUpload} className={"w-4 mr-5"}/>
								Upload
							</div>
							<FontAwesomeIcon icon={faAngleRight}/>
						</MenubarTrigger>
						<MenubarContent>
							<Link href={'/admin/dashboard'}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>Document Custom Template</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Role</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Group</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarSeparator/>
					<MenubarMenu>
						<MenubarTrigger className={'flex justify-between items-center'}>
							<div className={'py-2'}>
								<FontAwesomeIcon icon={faWindowRestore} className={"w-4 mr-5"}/>
								Masters
							</div>
							<FontAwesomeIcon icon={faAngleRight}/>
						</MenubarTrigger>
						<MenubarContent>
							<Link href={'/admin/dashboard'}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>Document Custom Template</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Role</MenubarItem>
							</Link>
							<Link href={'/'}>
								<MenubarItem>User Group</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
				</Sidebar_menu>
				<div className="p-2 mb-4 text-secondary-500 overflow-y-auto absolute bottom-0">
							<ul className="space-y-1">
								<li>
									<Link
										href="/public"
										className={
											"flex items-center gap-4 rounded-lg px-4 py-2 text-secondary-700 hover:bg-secondary-200 hover:bg-opacity-60 hover:text-black dark:text-secondary-200 dark:hover:bg-secondary-700 dark:hover:bg-opacity-35 dark:hover:text-white"
										}
									>
										<FontAwesomeIcon icon={faQuestionCircle} className={"w-4 mr-1"}/>
										<span className="text-sm font-medium"> Support </span>
									</Link>
								</li>
								<li>
									<Link
										href="/public"
										className={
											"flex items-center gap-4 rounded-lg px-4 py-2 text-secondary-700 hover:bg-secondary-200 hover:bg-opacity-60 hover:text-black dark:text-secondary-200 dark:hover:bg-secondary-700 dark:hover:bg-opacity-35 dark:hover:text-white"
										}
									>
										<FontAwesomeIcon icon={faGears} className={"w-4 mr-1"}/>
										<span className="text-sm font-medium"> Settings </span>
									</Link>
								</li>
							</ul>
						</div>
			</div>
		</aside>
);
};

export default Sidebar;
