import { getToken } from 'next-auth/jwt';
import type { GetServerSidePropsContext } from 'next/types';

const secret = process.env.NEXTAUTH_SECRET;
export const hasToken = async (req: GetServerSidePropsContext['req']) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return false;
  }
  return true;
};
