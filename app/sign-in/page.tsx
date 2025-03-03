import LoginForm from "../components/LoginForm";
import React from "react";

const SignIn = () => {
  return (

    <div className="w-full max-w-md m-auto bg-slate-100 rounded-lg border border-primaryBorder shadow-default py-10 px-16 mt-10">
      <section className="flex flex-col w-[400px]">
        <h1 className='text-2xl text-primary font-bold mt-4 mb-12 text-center text-blue-800'>Sign in to your account 🔐</h1>
        <LoginForm />
      </section>
    </div>

  );
};

export default SignIn;