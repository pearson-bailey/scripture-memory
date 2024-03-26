"use server";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

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
