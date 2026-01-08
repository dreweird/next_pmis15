import { PrismaClient } from "@prisma/client";

declare global {
  // Allow attaching Prisma to the global object in dev to avoid multiple clients during HMR
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

if (process.env.NODE_ENV !== "production") { console.warn("⚠️ Not running in production mode!"); } else { console.log("✅ Running in production mode"); }

