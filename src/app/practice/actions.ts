"use server";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

const supabase = createClient();

const verseQuery = supabase.from("verses").select("*").single();

export type Verse = QueryData<typeof verseQuery>;

export async function getVerse(id: string): Promise<Verse> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("verses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
