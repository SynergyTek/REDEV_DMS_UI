import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@awesome.me/kit-9b926a9ec0/icons/duotone/solid";
import {faBars} from "@awesome.me/kit-9b926a9ec0/icons/classic/solid";
import ThemeToggle from '/src/components/theme';

const Navbar = ({setTheme}) => {
    return (
        <div className="sticky top-0 w-full z-20 bg-white dark:bg-secondary-950 dark:text-gray-200 transition-colors duration-500 ease-out">
            <div className={"px-2 md:px-7 h-20 flex items-center justify-between"}>
                <h1 className={'text-2xl font-semibold text-gray-900 dark:text-white opacity-90 sm:text-2xl sm:tracking-tight'}>
                    <span className={'hidden xl:block'}>Document Management System</span><span
                    className={'block xl:hidden'}>DMS</span></h1>
                <button
                    data-collapse-toggle="navbar-solid-bg"
                    type="button"
                    id={"menu"}
                    className="py-2 px-3 text-indigo-900 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 onMoblie"
                    aria-controls="navbar-solid-bg"
                    aria-expanded="false"
                >
                    <FontAwesomeIcon className={"size-4"} icon={faBars}/>
                </button>
                <div className={'hidden md:flex items-center gap-4'}>
                    <div className="relative none hidden xl:block w-80 mr-5">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-200 mt-0.5" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            {/*<FontAwesomeIcon className="w-4 h-4 text-gray-500" icon={faMagnifyingGlass}/>*/}
                        </div>
                        <input type="search" id="default-search"
                               className="block w-full p-4 ps-10 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white text-gray-900 dark:border-opacity-0 border border-gray-300 rounded-xl h-10"
                               placeholder="Search" required/>
                    </div>
                    <button type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 w-9 h-9 overflow-hidden"
                            id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <Image src="/images/user.jpeg" alt="Description of image" width={50} height={30}/>
                    </button>
                    <p className={'font-semibold text-gray-700 dark:text-gray-200'}>Arnav Kumar</p>
                    <Link href='/public'
                          className={'text-gray-700 dark:text-gray-300 ml-7'}><FontAwesomeIcon
                        icon={faBell}/></Link>
                    <ThemeToggle setGlobalTheme={setTheme}/>
                </div>
            </div>
            <div>
                <div className={'border-b-2 border-gray-200 dark:border-gray-800 border-opacity-60 mx-2 md:mx-7'}></div>
            </div>
        </div>
    );
};

export default Navbar;
