// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // ✅ Configure Prisma Adapter
  adapter: PrismaAdapter(prisma),

  providers: [
    // ✅ Add Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ✅ Add Facebook Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // Your existing Credentials Provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }
        // Use your custom 'isVerified' field here
        if (!user.isVerified) {
          throw new Error("Please verify your email before signing in.");
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Your sign-in page path
  },
  session: {
    strategy: "jwt",
  },
  // ✅ ENABLE DEBUG MODE
  debug: true,
  callbacks: {
    // ✅ ADD LOGGING TO JWT CALLBACK
    async jwt({ token, user, account }) {
      console.log("--- JWT Callback ---");
      console.log("Token:", token);
      console.log("User:", user);
      console.log("Account:", account);
      console.log("--------------------");
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // ✅ ADD LOGGING TO SESSION CALLBACK
    async session({ session, token, user }) {
      console.log("--- Session Callback ---");
      console.log("Session:", session);
      console.log("Token:", token);
      console.log("User:", user);
      console.log("------------------------");
      if (token && session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };