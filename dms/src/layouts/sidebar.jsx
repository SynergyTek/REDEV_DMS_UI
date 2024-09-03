import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook,
    faChevronDown,
    faFile, faFileAlt, faFolderOpen,
    faGears, faHome, faListCheck, faQuestionCircle,
    faTable, faUpload,
    faUser, faUserTie,
    faWindowMaximize,
    faWindowRestore
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image"

const Sidebar = () => {
    var router = useRouter();
    const currentRoute = router.pathname;

    return (
        <aside
            className="fixed left-0 z-30 w-72 p-2 h-screen transition-transform -translate-x-full border-opacity-50 border-gray-200 bg-gray-50 bg-opacity-95 sm:translate-x-0">
            <div className={"h-20 p-2 flex items-center gap-2"}>
                <Image src="/images/dms.png" alt="Description of image" width={50} height={50}/>
                <p className="text-l font-bold text-gray-900 sm:text-l sm:tracking-tight">Document Management System</p>
            </div>
            <div className="p-2 mb-4 text-gray-500 overflow-y-auto">
                <ul className="space-y-1">
                    <li>
                        <Link
                            href="/"
                            className={`flex items-center gap-4 rounded px-4 py-2 ${
                                currentRoute === "/"
                                    ? "bg-gray-100 text-black"
                                    : "hover:bg-gray-100 hover:text-black"
                            }
                            `}
                        >
                            <FontAwesomeIcon icon={faHome} className={"w-4"}/>
                            <span className="text-sm font-medium"> Dashboard </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/"
                            className={`flex items-center gap-4 rounded px-4 py-2 ${
                                currentRoute === "/file"
                                    ? "bg-gray-100 text-black"
                                    : "hover:bg-gray-100 hover:text-black"
                            }
                            `}
                        >
                            <FontAwesomeIcon icon={faFile} className={"w-4"}/>
                            <span className="text-sm font-medium"> File Explorer </span>
                        </Link>
                    </li>
                    <div className={'border-b-2 border-gray-200 border-opacity-60'}></div>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="group flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-all hover:bg-gray-100 hover:text-black">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faBook} className={"w-4"}/>
                                    <span className="text-sm font-medium"> Document Management </span>
                                </div>

                                <span className="shrink-0 text-xs transition duration-300 group-open:-rotate-180">
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                  </span>
                            </summary>

                            <ul>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> Document Custom Template </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Role </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Group </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="group flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-all hover:bg-gray-100 hover:text-black">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faUserTie} className={"w-4"}/>
                                    <span className="text-sm font-medium"> Admin </span>
                                </div>

                                <span className="shrink-0 text-xs transition duration-300 group-open:-rotate-180">
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                  </span>
                            </summary>

                            <ul>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> Document Custom Template </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Role </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Group </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="group flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-all hover:bg-gray-100 hover:text-black">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faListCheck} className={"w-4"}/>
                                    <span className="text-sm font-medium"> Work List </span>
                                </div>

                                <span className="shrink-0 text-xs transition duration-300 group-open:-rotate-180">
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                  </span>
                            </summary>

                            <ul>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> Document Custom Template </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Role </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Group </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="group flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-all hover:bg-gray-100 hover:text-black">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faFileAlt} className={"w-4"}/>
                                    <span className="text-sm font-medium"> Report </span>
                                </div>

                                <span className="shrink-0 text-xs transition duration-300 group-open:-rotate-180">
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                  </span>
                            </summary>

                            <ul>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> Document Custom Template </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Role </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Group </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="group flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-all hover:bg-gray-100 hover:text-black">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faUpload} className={"w-4"}/>
                                    <span className="text-sm font-medium"> Upload </span>
                                </div>

                                <span className="shrink-0 text-xs transition duration-300 group-open:-rotate-180">
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                  </span>
                            </summary>

                            <ul>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> Document Custom Template </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Role </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Group </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <div className={'border-b-2 border-gray-200 border-opacity-60'}></div>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="group flex cursor-pointer items-center justify-between rounded px-4 py-2 transition-all hover:bg-gray-100 hover:text-black">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faWindowRestore} className={"w-4"}/>
                                    <span className="text-sm font-medium"> Masters </span>
                                </div>

                                <span className="shrink-0 text-xs transition duration-300 group-open:-rotate-180">
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                  </span>
                            </summary>

                            <ul>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> Document Custom Template </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Role </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className={"flex items-center rounded px-4 pl-12 ml-0.5 py-2 hover:bg-gray-100 hover:text-black"}
                                    >
                                        <span className="text-sm font-medium"> User Group </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="p-2 mb-4 text-gray-500 overflow-y-auto absolute bottom-0">
                <ul className="space-y-1">
                    <li>
                        <Link
                            href="/"
                            className={"flex items-center gap-4 rounded px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black"}
                        >
                            <FontAwesomeIcon icon={faQuestionCircle} className={"w-4"}/>
                            <span className="text-sm font-medium"> Support </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/"
                            className={"flex items-center gap-4 rounded px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black"}
                        >
                            <FontAwesomeIcon icon={faGears} className={"w-4"}/>
                            <span className="text-sm font-medium"> Settings </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>

    );
};

export default Sidebar;
