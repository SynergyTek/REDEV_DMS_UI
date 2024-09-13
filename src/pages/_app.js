import RootLayout from '/src/layouts/layout';
import '/public/styles/global.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {SidebarProvider} from "@/layouts/SidebarContext";


function DMS({Component, pageProps}) {
	return (
		<SidebarProvider>
		<RootLayout>
			<Component {...pageProps} />
		</RootLayout>
		</SidebarProvider>
	);
}

export default DMS;
