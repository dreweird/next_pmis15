"use client";
import { logout } from "../actions/auth";

const Logout = () => {
  return (
    <div onClick={() => logout()}>
      <div className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">
        logout
      </div>
    </div>
  );
};

export default Logout;