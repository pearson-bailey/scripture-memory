"use server";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

export async function getVerse(id: string) {
  const supabase = createClient();

  const verseQuery = supabase.from("verses").select("*").single();
  type Verse = QueryData<typeof verseQuery>;
  const { data, error } = await supabase
    .from("verses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as Verse;
}
