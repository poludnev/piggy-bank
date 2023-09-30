import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
