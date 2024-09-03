import { Inter } from "next/font/google";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <>
            <Head>
                <title>Document Management System</title>
                <link rel={'icon'} href={'/favicon.ico'} />
            </Head>
            <Sidebar />
            <Navbar />
            <div className={"ml-72 pt-24 px-7"}>
                {children}
            </div>
        </>
    );
}
