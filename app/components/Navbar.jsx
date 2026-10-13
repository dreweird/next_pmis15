"use client";
import { useSession } from "next-auth/react";

import Link from "next/link";
import Logout from "./Logout";
const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center flex-wrap text-white bg-blue-700 px-16">
      <div className="flex w-full items-center justify-between my-2">
        {" "}
        <Link
          className="font-bold px-4 bg-blue-700 text-white text-sm  py-2 rounded-md cursor-pointer hover:bg-blue-600"
          href="/"
        >
          Home
        </Link>
        {session?.user &&
          session?.user.email != 7 &&
          session?.user.email != 0 &&
          session?.user.email != 8 && (
            <div className="flex items-center gap-x-5 ">
              <Link
                href="/encoder/targets"
                className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
              >
                Targets 2026
              </Link>
              <Link
                href="/encoder/accomplishment"
                className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
              >
                Accomplishment
              </Link>
              <Link
                href="/powerbi"
                className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
              >
                Power BI
              </Link>
              <Link
                href="/proposal"
                className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
              >
                ICT Proposal for 2028
              </Link>
            </div>
          )}
        {session?.user && session?.user.email === 7 && (
          <div className="flex items-center gap-x-5 hover:bg-blue-600 bg-blue-700 px-4 py-2 rounded-md">
            <Link href="/budget">Budget</Link>
          </div>
        )}
        {session?.user && session?.user.email === 8 && (
          <div className="flex items-center gap-x-5 hover:bg-blue-600 bg-blue-700 px-4 py-2 rounded-md">
            <Link href="/disburse">Disburse</Link>
          </div>
        )}
        {session?.user && session?.user.email === 0 && (
          <div className="flex items-center gap-x-5 bg-blue-700">
            <Link
              href="/reviewer"
              className="hover:bg-blue-600 px-4 py-2 rounded-md"
            >
              BEDs123
            </Link>
            <Link
              href="/powerbi"
              className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
            >
              Power BI
            </Link>
          </div>
        )}
        <div className="flex items-center gap-x-5">
          {!session?.user ? (
            <Link href="/sign-in">
              <div className="bg-blue-700 text-white text-sm px-4 py-2 rounded-sm hover:bg-blue-600">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                Welcome {session?.user?.name}!
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
