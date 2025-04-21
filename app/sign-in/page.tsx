import LoginForm from "../components/LoginForm";
import React from "react";
import Image from "next/image";
import dalogo from "../../public/dalogo.png"; // Adjust the path to the actual location of your image

const SignIn = () => {
  return (

<div className="my-14 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image className="mx-auto w-auto" width={70} height={70} src={dalogo} alt="image description" priority={true} loading="eager"/>
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
        <LoginForm />
      </div>
    </div>


  );
};

export default SignIn;