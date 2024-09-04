import RootLayout from '/src/layouts/layout';
import '/public/styles/global.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';


function DMS({Component, pageProps}) {
	return (
		<RootLayout>
			<Component {...pageProps} />
		</RootLayout>
	);
}

export default DMS;
