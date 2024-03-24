import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";
import { getPermissions } from "@/lib/permission";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // FIXME : remove jwt ???
    async jwt({ token }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      const permissions = getPermissions(dbUser);

      token.permissions = permissions;
      token.id = dbUser?.id;

      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.permissions = token.permissions;
        session.user.id = token.id;
      }

      return session;
    },
  },
};
