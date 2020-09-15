import { AppProps } from 'next/app';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return <Component {...pageProps} />;
}

export default MyApp;
