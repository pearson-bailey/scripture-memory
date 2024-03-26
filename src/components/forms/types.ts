import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export const createSetForm = z.object({
  title: z.string().max(50),
  public: z.preprocess((value) => value === "on", z.boolean()),
});
export type CreateSetForm = z.infer<typeof createSetForm>;
export const createSetFormResolver = zodResolver(createSetForm);

export const registerForm = z
  .object({
    full_name: z.string(),
    email: z.string().email(),
    password: z.string().regex(passwordRegex),
    confirm_password: z.string(),
  })
  .refine((value) => value.password === value.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export type RegisterForm = z.infer<typeof registerForm>;

export const registerFormResolver = zodResolver(registerForm);

export const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInForm = z.infer<typeof signInForm>;
export const signInFormResolver = zodResolver(signInForm);

interface SuccessResponse {
  message?: string | null;
  success: true;
}

interface FailureResponse {
  message: string;
  success: false;
}

export type FormSubmissionResponse = SuccessResponse | FailureResponse;
