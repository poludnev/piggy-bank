import { hasToken } from '@/utils/auth';
import type { GetServerSideProps } from 'next/types';

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
  return <div>Summary</div>;
}
