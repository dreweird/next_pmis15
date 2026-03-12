import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client'

const prismaClientSingleton = () => {
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

  return new PrismaClient({adapter});
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | any;
}

export const db =
  global.prisma ||
  prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
  console.warn("⚠️ Not running in production mode!");
} else {
  console.log("✅ Running in production mode");
}
