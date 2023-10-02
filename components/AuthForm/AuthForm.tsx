import cn from 'classnames';
import styles from './AuthForm.module.scss';
import { FormEventHandler, useEffect, useId, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
export const AuthForm = (): JSX.Element => {
  const [isLogin, setISLogin] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const usermailInputID = useId();
  const passwordInputID = useId();

  const submitFormHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    if (isLogin) {
      signIn('credentials', {
        redirect: true,
        email,
        password,
        callbackUrl: '/',
      });

      return;
    }
    if (!isLogin) {
      console.log('proceed signing up');
      //TODO: implement sign up
      setIsRegistered(true);
      return;
    }
  };

  useEffect(() => {
    const { error } = router.query;
    if (!!error) setError(Array.isArray(error) ? error[0] : error);
  }, [router.query]);
  return (
    <section className={styles.section}>
      {error && <div className={styles.error}>{error}</div>}
      {isRegistered && (
        <div className={styles.relogin}>
          <h3 className={styles.h3}>Log In Right now?</h3>
          <div className={styles.afterSignUp}>
            <button className={styles.button} onClick={() => router.reload()}>
              Yes
            </button>
            <button className={styles.button} onClick={() => router.replace('/')}>
              Back to Front
            </button>
          </div>
        </div>
      )}
      {!isRegistered && (
        <div className={styles.switchIsLogIn}>
          <button
            className={cn(styles.button, isLogin ? styles.selected : null)}
            onClick={() => setISLogin(true)}
          >
            Log In
          </button>
          <button
            className={cn(styles.button, !isLogin ? styles.selected : null)}
            onClick={() => setISLogin(false)}
            disabled
          >
            Sign Up
          </button>
        </div>
      )}
      {!isRegistered && (
        <>
          {isLogin && <h3 className={styles.h3}>Log In</h3>}
          {!isLogin && <h3 className={styles.h3}>Add New User</h3>}
          <form className={styles.form} onSubmit={submitFormHandler}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor={usermailInputID}>
                User email
              </label>
              <input
                id={usermailInputID}
                className={styles.input}
                name={'email'}
                type="email"
                placeholder="email"
                required
              ></input>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor={passwordInputID}>
                Password
              </label>
              <input
                id={passwordInputID}
                className={styles.input}
                name={'password'}
                type="password"
                placeholder="password"
                required
              ></input>
            </div>
            <div className={styles.controls}>
              <button className={styles.submitButton} type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};
