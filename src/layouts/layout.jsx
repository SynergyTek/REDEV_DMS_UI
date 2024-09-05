import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Head from "next/head";
import React, {useState} from "react";

import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
export default function RootLayout({children}) {
	const [theme, setTheme] = useState(null);
	return (
		<>
			<Head>
				<title>Document Management System</title>
				<link rel={'icon'}
				      href={'@../public/favicon.ico'} />
			</Head>
			<Sidebar />
			<Navbar setTheme={setTheme} />
			<div className={"ml-72 pt-24 px-7"}>
				{React.createElement(children.type, {theme})}
			</div>
		</>
	);
}
