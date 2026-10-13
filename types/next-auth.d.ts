import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    type: number | null;
    budget: number | null;
    verified: number;
    role: number;
    canEdit: number;
    status: number;
    status_a: number;
  }

  interface Session {
    user: {
      id: string;
      type: number | null;
      budget: number | null;
      verified: number;
      role: number;
      canEdit: number;
      status: number;
      status_a: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    type?: number | null;
    budget?: number | null;
    verified?: number;
    role?: number;
    canEdit?: number;
    status?: number;
    status_a?: number;
  }
}
