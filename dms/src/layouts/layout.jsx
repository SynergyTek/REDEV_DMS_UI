import { Inter } from "next/font/google";
import Sidebar from "./sidebar";
import "@/styles/global.css"
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <>
            <Sidebar />
            <Navbar />
            <div className={"ml-72 pt-24 px-7"}>
                {children}
            </div>
        </>
    );
}
