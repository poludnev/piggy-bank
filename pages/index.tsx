import Head from 'next/head';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps } from 'next';

import styles from '@/styles/Home.module.scss';
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
      .then((res) => res.text())
      .then((data) => {
        console.log('fetch data:'), console.log(data);
      })
      .catch((error) => {
        console.log('fecth error:', error);
      });
  }, []);

  return (
    <>
      <main className={`${styles.main}`}>
        <h1>{t('title')}</h1>
      </main>
    </>
  );
}
