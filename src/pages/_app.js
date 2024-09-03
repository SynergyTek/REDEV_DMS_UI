import RootLayout from '/src/layouts/layout';
import '/src/styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';


function DMS({Component, pageProps}) {
	return (
		<RootLayout>
			<Component {...pageProps} />
		</RootLayout>
	);
}

export default DMS;
