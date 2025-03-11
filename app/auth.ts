import NextAuth, { AuthError } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

export class InvalidLoginError extends AuthError {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({  
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "string"
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }
        const username = credentials.username as string;
        const user: any = await db.users.findUnique({
          where: {
            username,
          },
        });

        if (!user) {
          throw new InvalidLoginError("Invalid Credentials")
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.password
          );
          if (!isMatch) {
            throw new InvalidLoginError("Invalid Credentials")
          }
        }
        return { id: user.user_id, email: user.type, name: user.username }
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
        token.type = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.user_id as string;
        session.user.name = token.username as string;
        session.user.email = token.type as string;
      }

      return session;
    },
  },
});
