"use server";

import { signIn } from "@/auth";
import { SignInSchema, SignInSchemaType } from "@/schemas";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";

export async function login(values: SignInSchemaType) {
  const ValidatedFields = SignInSchema.safeParse(values);
  if (!ValidatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = ValidatedFields.data;
  const user = await db.user.findFirst({
    where: { email },
  });
  if (!user) {
    return { error: "User not found" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
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
}
