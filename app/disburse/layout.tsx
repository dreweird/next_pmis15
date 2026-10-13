import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ReactNode } from "react";
import { auth } from "../auth";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  const isAdmin = session?.user.type === 0;
  const isBudget = session?.user.type === 7;
  const isDisburse = session?.user.type === 8;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-full max-w-52 min-h-screen bg-gray-600">
        {isBudget && (
          <Link
            href={"/budget"}
            className="w-full flex items-center gap-2 p-4 hover:bg-gray-700 cursor-pointer text-white"
          >
            <HomeIcon className="w-5" />
            <span>BED 1</span>
          </Link>
        )}

        {isDisburse && (
          <Link
            href={"/disburse"}
            className="w-full flex items-center gap-2 p-4 hover:bg-gray-700 cursor-pointer text-white"
          >
            <HomeIcon className="w-5" />
            <span>BED 3</span>
          </Link>
        )}

        {(isAdmin || isBudget || isDisburse) && (
          <Link
            href={"/reviewer/bed123"}
            className="w-full flex items-center gap-2 p-4 hover:bg-gray-700 cursor-pointer text-white"
          >
            <HomeIcon className="w-5" />
            <span>Review BED</span>
          </Link>
        )}

        {isAdmin && (
          <>
            <Link
              href={"/reviewer/byDistrict_target_review"}
              className="w-full flex items-center gap-2 p-4 hover:bg-gray-700 cursor-pointer text-white"
            >
              <HomeIcon className="w-5" />
              <span>Review By District</span>
            </Link>
            <Link
              href={"/reviewer/bed1"}
              className="w-full flex items-center gap-2 p-4 hover:bg-gray-700 cursor-pointer text-white"
            >
              <HomeIcon className="w-5" />
              <span>BED 1</span>
            </Link>
            <Link
              href={"/reviewer/bed2"}
              className="w-full flex items-center gap-2 p-4 hover:bg-gray-700 cursor-pointer text-white"
            >
              <HomeIcon className="w-5" />
              <span>BED 2</span>
            </Link>
            <Link
              href={"/reviewer/bed3"}
              className="w-full flex items-center gap-2 p-4 hover:bg-gray-700 cursor-pointer text-white"
            >
              <HomeIcon className="w-5" />
              <span>BED 3</span>
            </Link>
            <Link
              href={"/reviewer/bydistrict_report"}
              className="w-full flex items-center gap-2 p-4 hover:bg-gray-700 cursor-pointer text-white"
            >
              <HomeIcon className="w-5" />
              <span>By District</span>
            </Link>
          </>
        )}
      </div>
      <div className="w-full p-4">{children}</div>
    </div>
  );
}
