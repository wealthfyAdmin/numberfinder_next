import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface User extends NextAuthUser {
  id: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@lumiverse.com' },
        password: { label: 'Password', type: 'password', placeholder: 'admin' },
      },
      async authorize(credentials) {
        const defaultEmail = 'admin@lumiverse.com';
        const defaultPassword = 'admin';

        if (credentials?.email === defaultEmail && credentials?.password === defaultPassword) {
          const user: User = { id: '1', name: 'Admin', email: defaultEmail };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
