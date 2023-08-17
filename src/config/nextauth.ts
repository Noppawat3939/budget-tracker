import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const {
  NEXT_GITHUB_CLIENT_ID,
  NEXT_GITHUB_CLIENT_SECRET,
  NEXT_GOOGLE_CLIENT_SECRET,
  NEXT_GOOGLE_CLIENT_ID,
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
};
