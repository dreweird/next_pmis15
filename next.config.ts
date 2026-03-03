import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
    serverExternalPackages: ['@prisma/client', 'pg'],
    turbopack: {
      resolveAlias: {
        // This helps Turbopack find the generated client files 
        // that your Better-Auth and Prisma lib are looking for.
        '@prisma/client': './generated/prisma',
      },
    },
  
};

export default nextConfig; 
