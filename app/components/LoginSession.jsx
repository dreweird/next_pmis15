"use client";
import React from "react";
import { signOut, useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { 
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
 } from "@material-tailwind/react";
  import { PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import { logout } from "../actions/auth";

export default function LoginSession() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
         <Menu>
          <MenuHandler>
            <div className={`bg-blue-500 cursor-pointer px-6 text-white font-bold text-center hover:shadow-lg shadow-blue-500 hover:ring-blue-500 hover:ring-offset-2 hover:ring-2 rounded-full p-2 animateBtn`}>
              Hi {session.user.name}!
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem>
              <Link href="/profile">
                <span className=" focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 text-center inline-flex items-center mr-2">
                <UserIcon
                className="w-5 mr-2 -ml-1 items-left"
                />
                  Profile
                </span>
              </Link>
            </MenuItem>
            <MenuItem>
              <div onClick={() => logout()}>
                  <span className=" focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 text-center inline-flex items-center mr-2">
                  <PowerIcon
                  className="w-5 mr-2 -ml-1 items-left"
                  />
                  Logout
                </span>
              </div>
            </MenuItem>
      
          </MenuList>
       </Menu>
      ) : (
        <div onClick={() => signIn()}
          className={`bg-blue-500 cursor-pointer px-6 text-white font-bold text-center hover:shadow-lg shadow-blue-500 hover:ring-blue-500 hover:ring-offset-2 hover:ring-2 rounded-full p-2 animateBtn`}>
            Login
          </div>
      )}
    </div>
  );
}
