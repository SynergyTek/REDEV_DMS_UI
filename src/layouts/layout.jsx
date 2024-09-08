import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Head from "next/head";
import React, {useState} from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "~/ui/resizable";
import {useMediaQuery} from "usehooks-ts";

export default function RootLayout({ children }) {
    const [theme, setTheme] = useState(null);
    const [isDesktop, setDesktop] = useState(useMediaQuery('(min-width: 700px)'));
    return (
        <>
            <Head>
                <title>Document Management System</title>
                <link rel={'icon'} href={'/public/favicon.ico'}/>
            </Head>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className={'max-w-16 min-w-16 md:min-w-72'} defaultSize={19}>
                <Sidebar/>
                </ResizablePanel>
                {/*<ResizableHandle withHandle />*/}
                <ResizablePanel>
                    <div className={'h-screen overflow-auto'}>
                        <Navbar setTheme={setTheme}/>
                        <div className={'md:px-4'}>
                            {React.createElement(children.type, {theme})}
                        </div>
                    </div>

                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
