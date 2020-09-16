import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import 'antd/dist/antd.css';
import request from '../utils/request';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => request.get(url).then((res) => res.data),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
