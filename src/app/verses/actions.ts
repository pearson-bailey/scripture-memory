"use server";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

const supabase = createClient();

const userVersesQuery = supabase.from("user_verses").select("*, verses(*)");
export type UserVerses = QueryData<typeof userVersesQuery>;

export async function getUserVerses(): Promise<UserVerses> {
  const { data, error } = await userVersesQuery;

  if (error) {
    throw error;
  }

  return data;
}

const userVerseQuery = supabase
  .from("user_verses")
  .select("*, verses(*)")
  .single();

export type UserVerse = QueryData<typeof userVerseQuery>;
