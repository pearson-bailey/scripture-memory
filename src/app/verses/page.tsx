"use server";
import { VerseCard } from "@/src/components/verses";
import { getUserVerses } from "../../components/verses/actions";

export default async function Verses() {
  const verses = await getUserVerses();

  return (
    <div className="flex flex-col mt-4 gap-2">
      <h1 className="w-full text-center text-4xl text-teal-500 mb-4">
        My Verses
      </h1>
      <div className="grid md:grid-cols-3 gap-4">
        {verses ? (
          verses.map((verse) => (
            <VerseCard key={verse.id} verse={verse.verses} />
          ))
        ) : (
          <p>{"No verses"}</p>
        )}
      </div>
    </div>
  );
}
