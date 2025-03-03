import { auth } from "../auth";
import Link from "next/link";
import Logout from "./Logout";
const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center flex-wrap text-white bg-blue-700">
      <div className="flex w-full items-center justify-between my-2">
        <Link className="font-bold px-4 " href="/">
          Home
        </Link>
        {session?.user && session?.user.email !== 7 &&   <div className="flex items-center gap-x-5">
          <Link href="/encoder/targets">Targets</Link>
          <Link href="/encoder/accomplishment">Accomplishment</Link>
        </div>}

        {session?.user && session?.user.email === 7 &&   <div className="flex items-center gap-x-5">
          <Link href="/budget">Budget</Link>
        </div>}
     

        <div className="flex items-center gap-x-5">
          {!session?.user ? (
            <Link href="/sign-in">
              <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                Welcome {session?.user?.name}         
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