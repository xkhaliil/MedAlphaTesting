"use client";

import React from "react";

import Link from "next/link";
import { login } from "@/actions/login";
import { SignInSchema, SignInSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function SignInForm() {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();
  const signInForm = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: SignInSchemaType) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((result) => {
          if (result?.error) {
            setError(result.error);
          } else {
            setSuccess("Success!");
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Something went wrong!");
        });
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <Form {...signInForm}>
        <form
          onSubmit={signInForm.handleSubmit(onSubmit)}
          className="space-y-4"
          id="sign-in-form"
        >
          <>
            <FormField
              control={signInForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="•••••••••"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                  <Button asChild variant="link" size="sm" className="px-0">
                    <Link href="/auth/forgot-password">Forgot password?</Link>
                  </Button>
                </FormItem>
              )}
            />
          </>

          <Button
            type="submit"
            className="w-full"
            onClick={signInForm.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            Sign In
          </Button>
        </form>
      </Form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}
