"use client";
import React from "react";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "../actions/auth";

const LoginForm = () => {
  return (
    <div>
      <form action={loginWithCreds} className="w-full flex flex-col">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Username
          </label>
          <input
            type="string"
            placeholder="Username"
            id="username"
            name="username"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;