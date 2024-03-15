"use server";

import { SignUpSchema, SignUpSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

export async function signup(values: SignUpSchemaType) {
  const ValidatedFields = SignUpSchema.safeParse(values);
  if (!ValidatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, name } = ValidatedFields.data;
  const existingUser = await db.user.findFirst({
    where: { email },
  });
  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return {
    success: "User created successfully",
  };
}
