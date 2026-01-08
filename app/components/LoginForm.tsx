"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; 

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
   const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const rawFormData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await signIn("credentials", { ...rawFormData, redirect: false });
      setLoading(false);

      if (!res) {
        setMessage("Something went wrong.");
        return;
      }

      if ((res as any).error) {
        setMessage("Invalid username or password");
        return;
      }

      // On success, redirect to returned url or home
      router.push("/");
    } catch (err) {
      setLoading(false);
      setMessage("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <button
            disabled={loading}
            type="submit"
            className={`${loading ? "bg-gray-600" : "bg-blue-600"} flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
          <p aria-live="polite" className="text-red-700 p-2">{message}</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;