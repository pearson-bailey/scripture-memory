"use client";
import Link from "next/link";
import { RegisterForm, registerFormResolver } from "./types";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useCallback } from "react";
import { ErrorMessage, SuccessMessage } from "@/src/components/ui";
import { signUp } from "./actions";
import PasswordError from "./PasswordError";

export default function RegisterForm({
  privacyUrl,
  termsUrl,
}: {
  privacyUrl: string;
  termsUrl: string;
}) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<RegisterForm>({
    mode: "onChange",
    resolver: registerFormResolver,
  });
  const passwordValue = watch("password");

  const [state, formAction] = useFormState(signUp, null);

  const onSignUp = useCallback(async (values: RegisterForm) => {
    return formAction(values);
  }, []);

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-3"
      onSubmit={handleSubmit(onSignUp)}
    >
      <fieldset className="flex flex-col w-full justify-center gap-1">
        <legend className="text-center text-lg font-bold mb-4">
          Create an Account
        </legend>
        <label className="text-md" htmlFor="full_name">
          Full Name
          <span className="text-red-700 text-xl leading-3 ml-1">*</span>
        </label>
        {errors.full_name && (
          <ErrorMessage>{errors.full_name.message}</ErrorMessage>
        )}
        <input
          className="rounded-md px-4 py-2 border mb-3 text-black bg-gray-200"
          type="text"
          {...register("full_name")}
          placeholder="Your first and last name"
        />
        <label className="text-md" htmlFor="email">
          Email
          <span className="text-red-700 text-xl leading-3 ml-1">*</span>
        </label>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <input
          className="rounded-md px-4 py-2 border mb-3 text-black bg-gray-200"
          type="email"
          {...register("email")}
          placeholder="email@address.com"
        />
        <label className="text-md" htmlFor="password">
          Password
          <span className="text-red-700 text-xl leading-3 ml-1">*</span>
        </label>
        {errors.password && <PasswordError password={passwordValue} />}
        <input
          className="rounded-md px-4 py-2 border mb-3 text-black bg-gray-200"
          type="password"
          {...register("password")}
          placeholder="••••••••"
        />
        <label className="text-md" htmlFor="confirm_password">
          Confirm Password
          <span className="text-red-700 text-xl leading-3 ml-1">*</span>
        </label>
        <input
          className="rounded-md px-4 py-2 border mb-3 text-black bg-gray-200"
          type="password"
          placeholder="••••••••"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <ErrorMessage>Passwords do not match.</ErrorMessage>
        )}
        {state?.success === false && (
          <ErrorMessage>{state.message}</ErrorMessage>
        )}
        {state?.success === true && (
          <SuccessMessage className="flex flex-col">
            <span>Success! Check your email to complete registration</span>
            <Link className="text-teal-400 underline" href="/">
              Return to homepage
            </Link>
          </SuccessMessage>
        )}
        <div className="flex items-center text-xs my-2">
          <input
            type="checkbox"
            id="optIn"
            name="optIn"
            className="mx-2"
            required
          />
          <label htmlFor="optIn">
            I agree to the{" "}
            <a
              href={termsUrl}
              download
              className="text-indigo-700 font-bold hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href={privacyUrl}
              download
              className="text-indigo-700 font-bold hover:underline"
            >
              Privacy Policy
            </a>
            .<span className="text-red-700 text-xl leading-3 ml-1">*</span>
          </label>
        </div>
      </fieldset>
      <button className="bg-teal-400 rounded-md px-4 py-2 text-black font-bold hover:bg-teal-500">
        Sign Up
      </button>
    </form>
  );
}
