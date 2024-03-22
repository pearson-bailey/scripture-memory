"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function addVerse(
  edited: boolean,
  reference: string,
  text: string,
  version: string
) {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getSession();
  if (userError) {
    throw new Error(`Error getting user session: ${userError.message}`);
  }
  const userId = userData?.session?.user?.id;

  if (!userId) throw new Error("User not found");

  const { data: verseData, error: verseError } = await supabase
    .from("verses")
    .insert({
      edited,
      reference,
      version,
      text,
      edited_by: edited ? userId : null,
    })
    .select("*")
    .single();

  if (verseError != null) {
    throw new Error(`Error deleting promotion: ${verseError.message}`);
  }

  const { error: userVerseError } = await supabase
    .from("user_verses")
    .insert({ verse_id: verseData?.id, user_id: userId });

  redirect("/verses");
}
