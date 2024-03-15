"use client";

import { start } from "repl";
import React from "react";

import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { signup } from "@/actions/signup";
import { SignUpSchema, SignUpSchemaType } from "@/schemas";
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

export function SignUpForm() {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();
  const signUpForm = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const OnSubmit = (values: SignUpSchemaType) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signup(values)
        .then((result) => {
          if (result?.error) {
            setError(result.error);
          } else {
            setSuccess("Success!");
          }
        })
        .catch((error) => {
          console.error(error);
          setError("kk!");
        });
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <Form {...signUpForm}>
        <form onSubmit={signUpForm.handleSubmit(OnSubmit)} id="sign-up-form">
          <>
            <FormField
              control={signUpForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="khalil"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
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
            ></FormField>
            <FormField
              control={signUpForm.control}
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
                </FormItem>
              )}
            ></FormField>
          </>
          <Button
            type="submit"
            className="w-full"
            onClick={signUpForm.handleSubmit(OnSubmit)}
            disabled={isPending}
          >
            Sign Up
          </Button>
        </form>
      </Form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}
