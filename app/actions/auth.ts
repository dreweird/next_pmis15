import { signIn, signOut } from "../auth";
import { AuthError } from "next-auth";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const loginWithCreds = async (prevState: any, formData: FormData)  => {
  const rawFormData = {
    username: formData.get("username"),
    password: formData.get("password"),
   // role: "ADMIN",
    redirectTo: "/",
  };
  try {
    await signIn("credentials", rawFormData);
    
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return { message: "Invalid credentials!" };
        default:
          return { message: "Something went wrong!" };
      }
    }

    throw error;
  }
  return { message: "Login successful" };
};

