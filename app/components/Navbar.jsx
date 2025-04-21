import { auth } from "../auth";
import Link from "next/link";
import Logout from "./Logout";
const Navbar = async () => {
  const session = await auth();
  console.log(session?.user?.email);
  return (
    <nav className="flex items-center flex-wrap text-white bg-blue-700">
      <div className="flex w-full items-center justify-between my-2">
        <Link className="font-bold px-4 bg-blue-700 text-white text-sm  py-2 rounded-md cursor-pointer hover:bg-blue-600" href="/">
          Home
        </Link>
        {session?.user && session?.user.email != 7 && session?.user.email != 0 && session?.user.email != 8 &&   <div className="flex items-center gap-x-5 ">
          <Link href="/encoder/targets" className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">Targets</Link>
          <Link href="/encoder/accomplishment" className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">Accomplishment</Link>
          <Link href="/powerbi" className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">Power BI</Link>
        </div>}

        {session?.user && session?.user.email === 7 &&   <div className="flex items-center gap-x-5 hover:bg-blue-600 bg-blue-700">
          <Link href="/budget">Budget</Link>
        </div>}

        {session?.user && session?.user.email === 8 &&   <div className="flex items-center gap-x-5 hover:bg-blue-600 bg-blue-700">
          <Link href="/disburse">Disburse</Link>
        </div>}

        {session?.user && session?.user.email === 0 &&   <div className="flex items-center gap-x-5 hover:bg-blue-600 bg-blue-700">
          <Link href="/reviewer">BEDs123</Link>
          <Link href="/powerbi" className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">Power BI</Link>
        </div>}
     

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