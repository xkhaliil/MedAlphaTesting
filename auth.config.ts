import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "./lib/db";
import { SignInSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const ValidatedFields = SignInSchema.safeParse(credentials);
        if (ValidatedFields.success) {
          const { email, password } = ValidatedFields.data;
          const user = await db.user.findFirst({
            where: { email },
          });
          if (!user) {
            return null;
          }
          const IsPasswordValid = await bcrypt.compare(password, user.password);
          if (IsPasswordValid) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
