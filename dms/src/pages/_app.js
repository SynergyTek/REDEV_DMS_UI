import RootLayout from '@/layouts/layout';
import '@/styles/global.css';

function DMS({ Component, pageProps }) {
    return (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    );
}

export default DMS;
