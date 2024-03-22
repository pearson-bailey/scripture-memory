"use server";
import { VerseCard } from "@/src/components/verses";
import { Verse, getVerse } from "./actions";

export default async function Verses({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const verse: Verse = await getVerse(searchParams.id);

  return (
    <div className="flex flex-col mt-4 gap-2">
      <h1 className="w-full text-center text-4xl text-teal-500 mb-4">
        Practice
      </h1>
      <div className="flex flex-col gap-4">
        {verse ? (
          <VerseCard verse={verse} />
        ) : (
          <p>{"Verse could not be found"}</p>
        )}
      </div>
    </div>
  );
}
