import Head from 'next/head';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Layout } from '@/components';
import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps: { sesssion, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={sesssion}>
      <Layout>
        <Head>
          <title>Piggy Bank</title>
          <meta name="description" content="Piggy bank" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
