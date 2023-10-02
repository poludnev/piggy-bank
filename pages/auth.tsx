import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AuthForm } from '@/components';
import styles from '@/styles/Auth.module.scss';
export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      console.log(session);
      if (!!session) {
        router.replace('/');
        return;
      }
      setIsLoading(false);
    });
  }, [router]);

  return (
    <div className={styles.container}>
      {isLoading ? <div className={styles.loading}>Loading...</div> : <AuthForm />}
    </div>
  );
}
