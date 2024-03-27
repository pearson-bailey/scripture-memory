"use server";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

export async function getUserSetNames() {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }

  const userSetNamesQuery = supabase
    .from("sets")
    .select("id, title")
    .eq("created_by", userData?.user?.id ?? "");
  type UserSetNames = QueryData<typeof userSetNamesQuery>;
  const { data, error } = await userSetNamesQuery;

  if (error) {
    throw error;
  }

  return data as UserSetNames;
}

export async function getUserSets() {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }

  const userSetsQuery = supabase
    .from("sets")
    .select("*, user_verses_sets(*, user_verses(*, verses(*)))")
    .eq("created_by", userData?.user?.id ?? "");
  type UserSets = QueryData<typeof userSetsQuery>;
  const { data, error } = await userSetsQuery;

  if (error) {
    throw error;
  }

  return data as UserSets;
}

export async function getUserSetWithVerses(id: string) {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw userError;
  }

  const userSetsQuery = supabase
    .from("sets")
    .select("*, user_verses_sets(*, user_verses(*, verses(*)))")
    .eq("id", id)
    .single();
  type UserSets = QueryData<typeof userSetsQuery>;
  const { data, error } = await userSetsQuery;

  if (error) {
    throw error;
  }

  return data as UserSets;
}
