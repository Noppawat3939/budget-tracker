import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";
import { ENDPOINT } from "@/constants";

const {
  NEXT_GITHUB_CLIENT_ID,
  NEXT_GITHUB_CLIENT_SECRET,
  NEXT_GOOGLE_CLIENT_SECRET,
  NEXT_GOOGLE_CLIENT_ID,
  NEXT_AUTH_SECRET,
  NEXT_BASE_URL,
} = process.env;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: NEXT_GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: NEXT_GITHUB_CLIENT_ID!,
      clientSecret: NEXT_GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        const userId = `${token?.email?.at(0)}${token?.name?.at(0)}${user.id}`;

        token = Object.assign(
          {},
          {
            userInfo: {
              name: token.name,
              imageProfile: token.picture,
              email: token.email,
              userId,
            },
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            loginProvider: account.provider,
            idToken: account.id_token,
          }
        );
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token;

      return session;
    },

    async signIn({ user, account, profile }) {
      if (account && profile) {
        const resp = await axios.post(
          `${NEXT_BASE_URL}${ENDPOINT.AUTH.SOCIAL_LOGIN}`,
          {
            provider: account?.provider,
            email: user.email,
            name: profile?.name,
            profile: profile?.image,
          }
        );

        if (resp) return true;
      }

      return true;
    },
  },
};
