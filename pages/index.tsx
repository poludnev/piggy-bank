import Head from 'next/head';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SSRConfig, UseTranslation, UserConfig, useTranslation } from 'next-i18next';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

import styles from '@/styles/Home.module.css';
import { useEffect } from 'react';

export const getStaticProps = (async (contex) => {
  const { locale } = contex as { locale: string };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}) satisfies GetStaticProps;

export default function Home() {
  const { t } = useTranslation(['common']);

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  });

  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy bank" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>Piggy bank</main>
    </>
  );
}
