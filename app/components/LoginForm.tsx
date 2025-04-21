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
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action={formAction} className="space-y-6">
        <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <input
            type="string"
            placeholder="Username"
            id="username"
            name="username"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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