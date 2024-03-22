"use server";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

export async function getUserVerses() {
  const supabase = createClient();
  const userVersesQuery = supabase.from("user_verses").select("*, verses(*)");
  type UserVerses = QueryData<typeof userVersesQuery>;
  const { data, error } = await userVersesQuery;

  if (error) {
    throw error;
  }

  return data as UserVerses;
}
