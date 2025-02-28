"use server";

import { signIn, signOut } from "../auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";


export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData): Promise<any> => {
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
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  revalidatePath("/");
};