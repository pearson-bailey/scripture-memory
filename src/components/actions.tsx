"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function addUserVerse(
  edited: boolean,
  reference: string,
  text: string,
  version: string
) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getSession();

  const userId = userData?.session?.user?.id;

  if (!userId) throw new Error("User id not found");

  let verseId = null;

  if (!edited) {
    const { data: verseData, error: verseError } = await getVerse(
      reference,
      version
    );

    verseId = verseData?.id;
  }

  if (verseId == null) {
    const { data: verseData, error: verseError } = await addVerse(
      edited,
      reference,
      text,
      version,
      userId
    );

    if (verseError != null) {
      throw new Error(`Error creating verse: ${verseError.message}`);
    }

    verseId = verseData?.id;
  }

  const { error: userVerseError } = await supabase
    .from("user_verses")
    .insert({ verse_id: verseId, user_id: userId });

  if (userVerseError != null) {
    throw new Error(`Error creating user verse: ${userVerseError.message}`);
  }

  redirect("/verses");
}

export async function addVerse(
  edited: boolean,
  reference: string,
  text: string,
  version: string,
  userId?: string
) {
  const supabase = createClient();

  const query = supabase
    .from("verses")
    .insert({
      edited,
      reference,
      version,
      text,
      edited_by: edited && userId != undefined ? userId : null,
    })
    .select("*")
    .single();

  return query;
}

export async function getVerse(reference: string, version: string) {
  const supabase = createClient();

  const query = supabase
    .from("verses")
    .select("*")
    .eq("reference", reference)
    .eq("version", version)
    .filter("edited", "eq", false)
    .single();

  return query;
}

export async function quickPlay(
  edited: boolean,
  reference: string,
  text: string,
  version: string
) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getSession();

  const userId = userData?.session?.user?.id;

  let verseId = null;

  if (!edited) {
    const { data: verseData } = await getVerse(reference, version);

    verseId = verseData?.id;
  }

  if (verseId == null) {
    const { data: verseData, error: verseError } = await addVerse(
      edited,
      reference,
      text,
      version,
      userId
    );

    if (verseError != null) {
      throw new Error(`Error creating verse: ${verseError.message}`);
    }

    verseId = verseData?.id;
  }

  redirect(`/practice?id=${verseId}`);
}
