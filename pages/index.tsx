import Head from 'next/head';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps } from 'next';

import styles from '@/styles/Home.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const getStaticProps = (async (contex) => {
  const { locale } = contex as { locale: string };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}) satisfies GetStaticProps;

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  const signIn = () => {};
  const signOut = () => {};

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
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            {isAuth && (
              <div className={styles.authMenu}>
                <div className={styles.authMenuElement}>
                  <button className={styles.button} onClick={() => router.replace('/transaction')}>
                    Add New Transaction
                  </button>
                </div>
                <div className={styles.authMenuElement}>
                  <button className={styles.button} onClick={() => router.replace('/summary')}>
                    See the summary
                  </button>
                </div>
                <div className={styles.authMenuElement} onClick={() => router.replace('/reports')}>
                  <button className={styles.button}>Check reports</button>
                </div>
                <div className={styles.authMenuElement}>
                  <button className={styles.button} onClick={() => router.replace('/preferences')}>
                    Preferences
                  </button>
                </div>
                <div className={styles.authMenuElement}>
                  <button className={styles.button} onClick={() => signOut()}>
                    Sign out
                  </button>
                </div>
              </div>
            )}
            {!isAuth && (
              <div className={styles.notAuthMenu}>
                <div className={styles.notAuthMenuElement}>
                  <button className={styles.button} onClick={() => signIn()}>
                    Log In To Proceed
                  </button>
                </div>
                <div className={styles.notAuthMenuElement}>
                  <button className={styles.button} disabled>
                    Learn More About
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
