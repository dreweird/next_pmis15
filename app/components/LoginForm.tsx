"use client";
import React from "react";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "../actions/auth";
import { useActionState } from 'react'

const initialState = {
  message: '',
}

const LoginForm = () => {
  const [state, formAction, pending] = useActionState(loginWithCreds, initialState)
  return (
    <div>
      <form action={formAction} className="w-full flex flex-col">
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
          <p aria-live="polite" className="text-red-700 p-2">{state?.message}</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;