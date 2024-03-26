"use server";
import { revalidatePath } from "next/cache";
import {
  FormSubmissionResponse,
  createSetForm,
  registerForm,
  signInForm,
  updateSetForm,
} from "./types";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/src/database.types";

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

export async function getSet(id: string): Promise<Tables<"sets">> {
  const supabase = createClient();

  const { data: setData, error: setError } = await supabase
    .from("sets")
    .select("*")
    .eq("id", id)
    .single();

  if (setError) {
    throw setError;
  }

  return setData;
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

export async function updateSet(
  _: FormSubmissionResponse | null,
  formData: unknown
): Promise<FormSubmissionResponse> {
  const supabase = createClient();

  const parsed = updateSetForm.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message,
    };
  }

  const form = parsed.data;

  const { error } = await supabase
    .from("sets")
    .update({
      title: form.title,
      public: form.public,
    })
    .eq("id", form.id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const { data: setVerses, error: setVersesError } = await supabase
    .from("user_verses_sets")
    .select("id, user_verse_id")
    .eq("set_id", form.id);

  if (setVersesError) {
    return {
      success: false,
      message: setVersesError.message,
    };
  }

  const versesToRemove = setVerses?.filter(
    (uv) => !form.verses?.includes(uv.user_verse_id ?? "")
  );

  for (const verse of versesToRemove) {
    const { error } = await supabase
      .from("user_verses_sets")
      .delete()
      .eq("id", verse.id);

    if (error) return { success: false, message: error.message };
  }

  const versesToAdd = form.verses?.filter(
    (fv) => !setVerses?.some((uv) => uv.user_verse_id === fv)
  );

  if (versesToAdd) {
    for (const verse of versesToAdd) {
      const { error } = await supabase
        .from("user_verses_sets")
        .upsert({
          set_id: form.id,
          user_verse_id: verse,
        })
        .eq("id", verse);

      if (error) return { success: false, message: error.message };
    }
  }

  revalidatePath("/", "layout");
  return { success: true };
}
