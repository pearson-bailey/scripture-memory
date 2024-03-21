import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  return redirect("/");
}
