import { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next/types';
import { TransactionsList } from '@/components';
import { ITransaction } from '@/types/transactions';
import { hasToken } from '@/utils/auth';
import { fetchTransactions } from '@/utils/fetchers';

import styles from '@/styles/Summary.module.scss';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function SummaryPage() {
  const [transactions, setTranscations] = useState<ITransaction[]>([]);

  useEffect(() => {
    fetchTransactions().then((data) => {
      if (!(data instanceof Error)) setTranscations(data);
    });
  }, []);

  return (
    <main className={styles.main}>
      <TransactionsList transactions={transactions} />
    </main>
  );
}
