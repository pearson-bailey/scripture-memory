"use client";
import Link from "next/link";
import { SignInForm } from "./types";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useCallback, useEffect } from "react";
import { ErrorMessage } from "@/src/components/ui";
import { useRouter } from "next/navigation";
import { signIn } from "./actions";
import { useCurrentUser } from "../UserContext";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();
  const [state, formAction] = useFormState(signIn, null);
  const { push } = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (state?.success === true || user !== null) {
      push("/verses");
    }
  }, [push, state, user]);

  const onSignIn = useCallback(
    (values: SignInForm) => {
      formAction(values);
    },
    [formAction]
  );

  return (
    <div className="flex flex-1 flex-col w-full px-8 sm:max-w-md items-center justify-center gap-2">
      <form
        className="animate-in flex flex-col w-full justify-center gap-2"
        onSubmit={handleSubmit(onSignIn)}
      >
        <fieldset className="flex-1 flex flex-col w-full justify-center gap-2">
          <legend className="text-center text-lg font-bold mb-2">
            Sign In
          </legend>
          <label className="text-md" htmlFor="email">
            Email
          </label>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <input
            className="rounded-md px-4 py-2 border mb-6 text-black"
            type="email"
            {...register("email")}
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          <input
            className="rounded-md px-4 py-2 border mb-6 text-black"
            type="password"
            {...register("password")}
            placeholder="••••••••"
          />
        </fieldset>
        {state?.success === false && (
          <ErrorMessage>{state.message}</ErrorMessage>
        )}
        <button className="bg-teal-500 rounded-md px-4 py-2 text-black font-bold mb-2 hover:bg-teal-600">
          Sign In
        </button>
        <Link
          className="bg-indigo-950 rounded-md px-4 py-2 mb-2 text-center text-white hover:bg-indigo-900"
          href="/register"
        >
          Create an Account
        </Link>
        <a
          className="cursor-pointer text-center text-primary-800 underline"
          href="/password-reset"
        >
          Forgot password?
        </a>
      </form>
    </div>
  );
}
