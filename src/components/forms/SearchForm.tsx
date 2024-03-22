"use client";
import { Combobox } from "@/src/components/ui";
import { RegisterForm } from "./types";
import { bibleVersions, booksOfBible } from "@/src/constants";
import { useCallback, useState } from "react";
import { BotB, Version } from "@/src/types";
import { selectAbbrev } from "@/utils/client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function RegisterForm({
  submitForm,
}: {
  submitForm: (requestString: string, version: string) => void;
}) {
  const [version, setVersion] = useState<Version>(bibleVersions[0]);
  const [book, setBook] = useState<BotB>(booksOfBible[0]);
  const [chapter, setChapter] = useState<number>(1);
  const [verseStart, setVerseStart] = useState<number>(1);
  const [verseEnd, setVerseEnd] = useState<number | null>(null);

  const handleChapter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChapter(parseInt(e.target.value));
    },
    [setChapter]
  );

  const handleVerseStart = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVerseStart(parseInt(e.target.value));
    },
    [setVerseStart]
  );

  const handleVerseEnd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVerseEnd(parseInt(e.target.value));
    },
    [setVerseEnd]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const abbrev = selectAbbrev({
        book: book?.abbrev,
        version: version?.abbrev,
      });

      const requestString = `${abbrev}.${chapter}.${verseStart}${verseEnd ? `-${verseEnd}` : ""}`;

      submitForm(requestString, version.abbrev);
    },
    [book, chapter, verseEnd, verseStart, version]
  );

  return (
    <form className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center gap-2">
        <Combobox
          options={booksOfBible}
          selected={book}
          setSelected={setBook}
        />
        <input
          type="number"
          className="w-16 text-black rounded-md px-2 py-1"
          min="1"
          max="150"
          onChange={handleChapter}
          defaultValue="1"
        />
        <strong>:</strong>
        <input
          type="number"
          className="w-16 text-black rounded-md px-2 py-1"
          min="1"
          max="176"
          onChange={handleVerseStart}
          defaultValue="1"
        />
        <strong>{" - "}</strong>
        <input
          type="number"
          className="w-16 text-black rounded-md px-2 py-1"
          min="1"
          max="176"
          onChange={handleVerseEnd}
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Combobox
          options={bibleVersions}
          selected={version}
          setSelected={setVersion}
        />
        <button
          type="submit"
          className="flex items-center gap-1 bg-teal-500 rounded-md px-3 py-1.5 text-white hover:bg-teal-600"
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  );
}
