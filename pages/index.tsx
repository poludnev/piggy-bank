import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import styles from '@/styles/Home.module.scss';

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <>
      <main className={`${styles.main}`}>
        {status === 'loading' ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            {!!data && (
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
            {!data && (
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
