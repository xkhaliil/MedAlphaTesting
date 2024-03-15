import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  name: z.string().min(2).max(10),
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
