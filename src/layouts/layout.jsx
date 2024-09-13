import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Head from "next/head";
import React, {useState} from "react";
import {ResizablePanel, ResizablePanelGroup} from "~/ui/resizable";
import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {ContextMenu, Toaster} from "~";
import {useSidebar} from "@/layouts/SidebarContext";

config.autoAddCss = false
export default function RootLayout({ children }) {
    const [theme, setTheme] = useState(null);

    const { sidebar } = useSidebar();
    return (
        <>
            <Head>
                <title>Document Management System</title>
            </Head>
            <ResizablePanelGroup direction="horizontal">
                {sidebar && (
                    <ResizablePanel className={'max-w-16 min-w-16 md:min-w-72'} defaultSize={19}>
                        <Sidebar/>
                    </ResizablePanel>
                    )
                }

                {/*<ResizableHandle withHandle />*/}
                <ResizablePanel>
                    <div className={'h-screen overflow-auto'}>
                        {sidebar && <Navbar setTheme={setTheme}/>}
                        <div className={'md:px-4'}>
                            {React.createElement(children.type, {theme})}
                            <Toaster richColors theme={theme}/>   
                            <ContextMenu/>   
                        </div>
                    </div>

                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    )
}

