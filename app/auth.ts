import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "string",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }
        const username = credentials.username as string;
        const user = await db.users.findUnique({
          where: {
            username,
          },
        });

        if (!user) {
          throw new Error("Incorrect username or password.");
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.password,
          );
          if (!isMatch) {
            throw new Error("Incorrect username or password.");
          }
        }
        return {
          id: String(user.user_id),
          email: user.email,
          name: user.username,
          type: user.type,
          budget: user.budget,
          verified: user.verified,
          role: user.role,
          canEdit: user.canEdit,
          status: user.status,
          status_a: user.status_a,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user_id = user.id;
        token.username = user.name;
        token.email = user.email;
        token.type = user.type;
        token.budget = user.budget;
        token.verified = user.verified;
        token.role = user.role;
        token.canEdit = user.canEdit;
        token.status = user.status;
        token.status_a = user.status_a;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.user_id as string;
        session.user.name = token.username as string;
        session.user.email = token.type as string;
        session.user.type = token.type as number;
        session.user.budget = token.budget as number;
        session.user.verified = token.verified as number;
        session.user.role = token.role as number;
        session.user.canEdit = token.canEdit as number;
        session.user.status = token.status as number;
        session.user.status_a = token.status_a as number;
      }

      return session;
    },
  },
});
