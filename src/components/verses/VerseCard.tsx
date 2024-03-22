import { Verse } from "@/src/app/practice/actions";
import { PlayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function VerseCard({ verse }: { verse: Verse | null }) {
  return (
    <div className="flex bg-foreground rounded-md">
      <div className="flex w-full flex-col gap-3 p-4 bg-background/90">
        <div className="text-xl">
          {verse?.reference}, {verse?.version}
        </div>
        <p className="text-lg">"{verse?.text}"</p>
        <div className="flex w-full">
          <Link
            className="flex gap-1 items-center px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-black rounded-md"
            href={`/practice?id=${verse?.id}`}
          >
            <PlayIcon className="w-4 h-4 text-indigo-900 fill-current" />
            Practice
          </Link>
        </div>
      </div>
    </div>
  );
}
