import { FavouritesResponse } from 'lib/types/keystone.types';
import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface UserData {
  favouriteProperties: string[];
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    customToken?: string;
    userData?: UserData;
  }
}

declare module 'next-auth' {
  interface User {
    error?: string;
    customToken?: string;
  }
}

export default NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const response = await fetch(
            `${process.env.KEYSTONE_API_URL}/User/Login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Token: `${process.env.SERVICE_ACCOUNT_TOKEN}`
              },
              body: JSON.stringify({
                Password: password,
                Username: email
              })
            }
          );

          if (!response.ok) {
            throw new Error('Authentication failed');
          }

          const userData = await response.json();

          if (userData.display_message) {
            // This is so that we can pass the custom error message
            return { id: 'error', error: userData.display_message };
          }

          return {
            id: userData.id,
            name: userData.name || email,
            tel: userData.telephone || '',
            email: email,
            customToken: userData.token
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (user?.id === 'error') {
        throw new Error(user?.error);
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      const refreshInterval = 60 * 60 * 1000; // Refresh the user's data if it's older than 1 hour

      if (user) {
        token.customToken = user.customToken;
      }

      if (
        !token.userData ||
        trigger === 'update' ||
        Date.now() - Number(token.lastFetchTime) > refreshInterval
      ) {
        const response = await fetch(
          `${process.env.KEYSTONE_API_URL}/User/GetFavourites?PageSize=999999&PageNumber=1&OrderBy=date_added&OrderAscending=false`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Token: `${token.customToken}`
            }
          }
        );
        if (!response.ok) throw new Error('Failed to fetch favourites');
        const favouritesData: FavouritesResponse = await response.json();

        token.userData = {
          favouriteProperties: favouritesData?.rental_space_model_list
            ? favouritesData?.rental_space_model_list.map(
                (rentalSpace) => rentalSpace.reference
              )
            : []
        };

        token.lastFetchTime = Date.now();
      }

      return token;
    },
    async session({ session, token }) {
      session.customToken = token.customToken as string;
      session.userData = token.userData as UserData;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow relative callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Allow callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 6 // 6 hours
  },
  secret: process.env.NEXTAUTH_SECRET
});
