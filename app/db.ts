import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;

if (process.env.NODE_ENV !== "production") { console.warn("⚠️ Not running in production mode!"); } else { console.log("✅ Running in production mode"); }


export function getServerActionsKey() {
  const key = process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY;
  if (!key) {
    throw new Error("NEXT_SERVER_ACTIONS_ENCRYPTION_KEY is missing");
  }
  // Optional sanity checks
  const isBase64 = /^[A-Za-z0-9+/=]+$/.test(key);
  const isHex = /^[a-f0-9]+$/i.test(key);
  if (!isBase64 && !isHex) {
    console.warn("Encryption key format is unusual—ensure it's base64 or hex.");
  }
  console.log("Server Actions Encryption Key loaded.");
  return key;
}

getServerActionsKey
