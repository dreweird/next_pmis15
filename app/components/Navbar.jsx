"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Logout from "./Logout";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center flex-wrap text-white bg-blue-700">
      <div className="flex w-full items-center justify-between my-2">
        <Link
          className="font-bold px-4 bg-blue-700 text-white text-sm py-2 rounded-md cursor-pointer hover:bg-blue-600"
          href="/"
        >
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          {session?.user &&
            session.user.email !== "7" &&
            session.user.email !== "0" &&
            session.user.email !== "8" && (
              <>
                <Link href="/encoder/targets">Targets</Link>
                <Link href="/encoder/accomplishment">Accomplishment</Link>
                <Link href="/proposal">ICT Proposal for 2027</Link>
              </>
            )}

          {session?.user?.email === "0" && <Link href="/reviewer">BEDs123</Link>}
          {session?.user?.email === "7" && <Link href="/budget">Budget</Link>}
          {session?.user?.email === "8" && <Link href="/disburse">Disburse</Link>}

          <Link href="/powerbi">Power BI</Link>
        </div>

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
                Welcome {session.user.name}!
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