"use server";
import { createClient } from "@/utils/supabase/server";

export default async function Verses() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_verses")
    .select("*, verses(*)");
  return (
    <div className="flex flex-col mt-4 gap-4">
      <h1 className="w-full text-center text-4xl text-teal-500 mb-4">
        My Verses
      </h1>
      {data ? (
        data.map((verse) => (
          <div
            key={verse.id}
            className="flex flex-col gap-2 p-4 bg-indigo-950 rounded-md"
          >
            <p className="text-xl">
              {verse.verses?.reference}, {verse.verses?.version}
            </p>
            <p className="text-lg">{verse.verses?.text}</p>
          </div>
        ))
      ) : (
        <p>{error.message ?? "No verses"}</p>
      )}
    </div>
  );
}
