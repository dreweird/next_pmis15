'use client';

import { auth } from "../auth";
import React from "react";
import { useSession, signOut } from 'next-auth/react'

const Middleware =  () => {
 // const session = await auth();
  const { data: session } = useSession()
  console.log(session);
  return (
    <main className="flex h-full items-center justify-center flex-col gap-2">
      <h1 className="text-3xl">Middleware page</h1>
      <p className="text-lg">{session?.user?.name}</p>
    </main>
  );
};

export default Middleware;