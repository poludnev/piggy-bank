import { TransactionForm, TransactionsList } from '@/components';
import { useTransactionsContext } from '@/contexts/TransactionsContext/TransactionsContext';
import { hasToken } from '@/utils/auth';
import { GetServerSideProps } from 'next';

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
export default function TransactionPage() {
  const { transactions } = useTransactionsContext();

  return (
    <main>
      <TransactionForm />
      <TransactionsList transactions={transactions} />
    </main>
  );
}
