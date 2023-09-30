import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { AuthOptions } from 'next-auth';
import { requestUserByEmail } from '@/utils/mongo';

export const nextAuthOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) throw new Error('empty email or password');

        const user = await requestUserByEmail(email);

        if (!user) throw new Error('unknown user email');

        const isValidPassord = user.password === password;

        if (!isValidPassord) throw new Error('wrong user password');

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt: (data) => {
      return data.token;
    },
    session: (data) => {
      return data.session;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
};

export default NextAuth(nextAuthOptions);
