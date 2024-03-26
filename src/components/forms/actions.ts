"use server";
import { revalidatePath } from "next/cache";
import {
  FormSubmissionResponse,
  createSetForm,
  registerForm,
  signInForm,
} from "./types";
import { createClient } from "@/utils/supabase/server";

export async function createSet(
  _: FormSubmissionResponse | null,
  formData: unknown
): Promise<FormSubmissionResponse> {
  const supabase = createClient();

  const parsed = createSetForm.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message,
    };
  }

  const form = parsed.data;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }

  const { error } = await supabase.from("sets").upsert({
    title: form.title,
    created_by: userData?.user?.id,
    public: form.public,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signIn(
  _: FormSubmissionResponse | null,
  formData: unknown
): Promise<FormSubmissionResponse> {
  const supabase = createClient();

  const parsed = signInForm.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message,
    };
  }

  const form = parsed.data;

  const { error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signUp(
  _: FormSubmissionResponse | null,
  formData: unknown
): Promise<FormSubmissionResponse> {
  const supabase = createClient();

  const parsed = registerForm.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message,
    };
  }

  const form = parsed.data;

  const { error: signUpError } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        full_name: form.full_name,
      },
    },
  });

  if (signUpError) {
    return {
      success: false,
      message: signUpError.message,
    };
  }

  return { success: true };
}
