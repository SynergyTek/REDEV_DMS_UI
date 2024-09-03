import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faEllipsisVertical, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from '@/components/theme';

const Navbar = () => {
    return (
        <div className="fixed w-full z-20 bg-white dark:bg-black dark:text-gray-200">
            <div className={"md:ml-72 px-7 h-20 flex items-center justify-between"}>
                <h1 className={'text-2xl font-semibold text-gray-900 dark:text-white opacity-90 sm:text-2xl sm:tracking-tight'}>Document Management System</h1>
                <div className={'flex items-center gap-4'}>
                    <div className="relative none hidden md:block w-80 mr-5">
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
                    <Link href='/' className={'text-gray-700 dark:text-gray-300 ml-7 hidden md:block'}><FontAwesomeIcon icon={faBell}/></Link>
                    <ThemeToggle />
                </div>
            </div>
            <div className={'md:ml-72'}>
                <div className={'border-b-2 border-gray-200 dark:border-gray-800 border-opacity-60 mx-7'}></div>
            </div>
        </div>
    );
};

export default Navbar;
