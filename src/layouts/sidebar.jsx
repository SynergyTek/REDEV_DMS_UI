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
	faAngleRight,
	faChartPie,
} from "@awesome.me/kit-9b926a9ec0/icons/duotone/solid";
import {
	Sidebar_menu,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "~/ui/sidebar_menu";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { far } from "@awesome.me/kit-9b926a9ec0/icons";
import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "~/ui/tooltip";

const Sidebar = () => {
	const router = useRouter();
	const currentRoute = router.pathname;

	return (
		<aside className="left-0 z-30 p-2 h-screen">
			<div
				className={
					"relative min-w-full overflow-hidden border-opacity-50 border-secondary-200 rounded-lg h-full bg-secondary-50 dark:bg-secondary-900 dark:text-primary-900 "
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
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className={"w-full"}>
									<Link
										href="/"
										className={`flex items-center gap-4 rounded-md px-3 py-2 ${
											currentRoute === "/"
												? "bg-secondary-200 bg-opacity-60 text-black dark:bg-secondary-700 dark:text-white dark:bg-opacity-35"
												: "hover:bg-secondary-100 hover:text-black dark:hover:bg-secondary-700 dark:hover:bg-opacity-35 dark:hover:text-white"
										}
											`}
									>
										<FontAwesomeIcon icon={faHome} className={"w-4"} />
										<span className="text-sm font-medium onDesktop">
											{" "}
											Dashboard{" "}
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side={"right"} className={"onMoblie"}>
									Dashboard
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</li>
					<li>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className={"w-full"}>
									<Link
										href="/files"
										className={`flex items-center gap-4 rounded-md px-3 py-2 ${
											currentRoute === "/analytics"
												? "bg-secondary-200 bg-opacity-60 text-black dark:bg-secondary-700 dark:text-white dark:bg-opacity-35"
												: "hover:bg-secondary-200 hover:bg-opacity-60 hover:text-black dark:hover:bg-secondary-700  dark:hover:bg-opacity-35 dark:hover:text-white"
										}
												`}
									>
										<FontAwesomeIcon icon={faChartPie} className={"w-4"} />
										<span className="text-sm font-medium onDesktop">
											{" "}
											Analytics{" "}
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side={"right"} className={"onMoblie"}>
									Analytics
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</li>
					<li>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className={"w-full"}>
									<Link
										href="/files"
										className={`flex items-center gap-4 rounded-md px-3 py-2 ${
											currentRoute === "/files"
												? "bg-secondary-200 bg-opacity-60 text-black dark:bg-secondary-700 dark:text-white dark:bg-opacity-35"
												: "hover:bg-secondary-200 hover:bg-opacity-60 hover:text-black dark:hover:bg-secondary-700  dark:hover:bg-opacity-35 dark:hover:text-white"
										}
											`}
									>
										<FontAwesomeIcon icon={far.faFiles} className={"w-4"} />
										<span className="text-sm font-medium onDesktop">
											{" "}
											Files{" "}
										</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent side={"right"} className={"onMoblie"}>
									File Explorer
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</li>
				</ul>
				<Sidebar_menu>
					<MenubarSeparator />
					<MenubarMenu>
						<MenubarTrigger className={"flex justify-between items-center"}>
							<div className={"py-2 flex items-center"}>
								<FontAwesomeIcon icon={faBook} className={"w-4 mr-5"} />
								<span className={"hidden md:block"}>Document Management</span>
							</div>
							<span className={"hidden md:block"}>
								<FontAwesomeIcon icon={faAngleRight} />
							</span>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem className={"font-bold pointer-events-none onMoblie"}>
								Document Management
							</MenubarItem>
							<MenubarSeparator className={"onMoblie"} />
							<Link href={"/admin/dashboard"}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>Document Custom Template</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User Role</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User Group</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className={"flex justify-between items-center"}>
							<div className={"py-2 flex items-center"}>
								<FontAwesomeIcon icon={faUserTie} className={"w-4 mr-5"} />
								<span className={"hidden md:block"}>Admin</span>
							</div>
							<span className={"hidden md:block"}>
								<FontAwesomeIcon icon={faAngleRight} />
							</span>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem className={"font-bold pointer-events-none onMoblie"}>
								Admin
							</MenubarItem>
							<MenubarSeparator className={"onMoblie"} />
							<Link href={"/admin/dashboard"}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>Document Custom Template</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User Role</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User Group</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className={"flex justify-between items-center"}>
							<div className={"py-2 flex items-center"}>
								<FontAwesomeIcon icon={faListCheck} className={"w-4 mr-5"} />
								<span className={"hidden md:block"}>Work List</span>
							</div>
							<span className={"hidden md:block"}>
								<FontAwesomeIcon icon={faAngleRight} />
							</span>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem className={"font-bold pointer-events-none onMoblie"}>
								Work List
							</MenubarItem>
							<MenubarSeparator className={"onMoblie"} />
							<Link href={"/worklist/servicelist/"}>
								<MenubarItem>Service List</MenubarItem>
							</Link>
							<Link href={"/worklist/tasklist/"}>
								<MenubarItem>Task List</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className={"flex justify-between items-center"}>
							<div className={"py-2 flex items-center"}>
								<FontAwesomeIcon icon={faFileAlt} className={"w-4 mr-5"} />
								<span className={"hidden md:block"}>Report</span>
							</div>
							<span className={"hidden md:block"}>
								<FontAwesomeIcon icon={faAngleRight} />
							</span>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem className={"font-bold pointer-events-none onMoblie"}>
								Report
							</MenubarItem>
							<MenubarSeparator className={"onMoblie"} />
							<Link href={"/report/search-documents"}>
								<MenubarItem>Search Documents</MenubarItem>
							</Link>
							<Link href={"/report/user-audit-report"}>
								<MenubarItem>User Audit Report</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className={"flex justify-between items-center"}>
							<div className={"py-2 flex items-center"}>
								<FontAwesomeIcon icon={faUpload} className={"w-4 mr-5"} />
								<span className={"hidden md:block"}>Upload</span>
							</div>
							<span className={"hidden md:block"}>
								<FontAwesomeIcon icon={faAngleRight} />
							</span>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem className={"font-bold pointer-events-none onMoblie"}>
								Upload
							</MenubarItem>
							<MenubarSeparator className={"onMoblie"} />
							<Link href={"/admin/dashboard"}>
								<MenubarItem>Admin Dashboard</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>Document Custom Template</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User Role</MenubarItem>
							</Link>
							<Link href={"/"}>
								<MenubarItem>User Group</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
					<MenubarSeparator />
					<MenubarMenu>
						<MenubarTrigger className={"flex justify-between items-center"}>
							<div className={"py-2 flex items-center"}>
								<FontAwesomeIcon
									icon={faWindowRestore}
									className={"w-4 mr-5"}
								/>
								<span className={"hidden md:block"}>Masters</span>
							</div>
							<span className={"hidden md:block"}>
								<FontAwesomeIcon icon={faAngleRight} />
							</span>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem className={"font-bold pointer-events-none onMoblie"}>
								Masters
							</MenubarItem>
							<MenubarSeparator className={"onMoblie"} />
							<Link href={"/masters/email-integration"}>
								<MenubarItem>Email Integration</MenubarItem>
							</Link>
							<Link href={"/masters/workspace"}>
								<MenubarItem>Workspace</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
				</Sidebar_menu>
				<div className="p-2 mb-4 text-secondary-500 overflow-y-auto absolute bottom-0">
					<ul className="space-y-1 w-full">
						<li>
							<Link
								href="/public"
								className={
									"flex items-center gap-4 rounded-md px-2 py-2 md:w-full text-secondary-700 hover:bg-secondary-200 hover:bg-opacity-60 hover:text-black dark:text-secondary-200 dark:hover:bg-secondary-700 dark:hover:bg-opacity-35 dark:hover:text-white"
								}
							>
								<FontAwesomeIcon
									icon={faQuestionCircle}
									className={"w-4 mr-1"}
								/>
								<span className="text-sm font-medium hidden md:block">
									Support
								</span>
							</Link>
						</li>
						<li>
							<Link
								href="/public"
								className={
									"flex items-center gap-4 rounded-md px-2 py-2 text-secondary-700 hover:bg-secondary-200 hover:bg-opacity-60 hover:text-black dark:text-secondary-200 dark:hover:bg-secondary-700 dark:hover:bg-opacity-35 dark:hover:text-white"
								}
							>
								<FontAwesomeIcon icon={faGears} className={"w-4 mr-1"} />
								<span className="text-sm font-medium hidden md:block">
									Settings
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
