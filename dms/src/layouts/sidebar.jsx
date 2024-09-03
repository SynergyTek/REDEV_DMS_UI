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
            className="fixed left-0 z-30 w-72 p-2 h-screen transition-transform -translate-x-full sm:translate-x-0">
            <div className={'border-opacity-50 border-gray-200 rounded-lg h-full bg-gray-50 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white bg-opacity-95'}>
                <div className={"h-20 px-2 pb-2 flex items-center gap-3"}>
                    <Image src="/images/dms.png" alt="Description of image" width={40} height={40}/>
                    <h1 className={'text-2xl font-semibold text-gray-950 dark:text-gray-200 sm:text-2xl sm:tracking-tight'}>Synergy</h1>
                </div>
                <div className="p-2 mb-4 text-gray-500 dark:text-gray-300 overflow-y-auto">
                <ul className="space-y-1">
                        <li>
                            <Link
                                href="/"
                                className={`flex items-center gap-4 rounded-lg px-4 py-2 ${
                                    currentRoute === "/"
                                        ? "bg-gray-200 bg-opacity-60 text-black dark:bg-gray-700 dark:text-white dark:bg-opacity-35"
                                        : "hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"
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
                                className={`flex items-center gap-4 rounded-lg px-4 py-2 ${
                                    currentRoute === "/file"
                                        ? "bg-gray-200 bg-opacity-60 text-black dark:bg-gray-700 dark:text-white dark:bg-opacity-35"
                                        : "hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700  dark:hover:bg-opacity-35 dark:hover:text-white"
                                }
                                `}
                            >
                                <FontAwesomeIcon icon={faFile} className={"w-4"}/>
                                <span className="text-sm font-medium"> File Explorer </span>
                            </Link>
                        </li>
                        <div className={'border-b-2 border-gray-200 border-opacity-60 dark:border-gray-800'}></div>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-all hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white">
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
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> Document Custom Template </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User Role </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
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
                                    className="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-all hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white">
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
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> Document Custom Template </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User Role </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
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
                                    className="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-all hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white">
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
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> Document Custom Template </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User Role </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
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
                                    className="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-all hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white">
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
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> Document Custom Template </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User Role </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
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
                                    className="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-all hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white">
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
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> Document Custom Template </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User Role </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User Group </span>
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <div className={'border-b-2 border-gray-200 border-opacity-60 dark:border-gray-800'}></div>
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-all hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white">
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
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> Document Custom Template </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                                        >
                                            <span className="text-sm font-medium"> User Role </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/"
                                            className={"flex items-center rounded-lg px-4 pl-12 ml-0.5 py-2 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
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
                                className={"flex items-center gap-4 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                            >
                                <FontAwesomeIcon icon={faQuestionCircle} className={"w-4"}/>
                                <span className="text-sm font-medium"> Support </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                className={"flex items-center gap-4 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-200 bg-opacity-60 hover:text-black dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:bg-opacity-35 dark:hover:text-white"}
                            >
                                <FontAwesomeIcon icon={faGears} className={"w-4"}/>
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
