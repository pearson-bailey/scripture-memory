"use client";

import { booksOfBible } from "@/src/constants";

export default function selectAbbrev({
  book,
  version,
}: {
  book: string;
  version: string;
}): string | undefined {
  if (version === "KJV") return book;

  if (version === "ESV" && book === "JOL") return "JOEL";

  if (version === "ESV" && book === "NAM") return "NAHUM";

  const bookObject = booksOfBible.find((bk) => bk.abbrev === book);

  if (!bookObject) return book;

  return bookObject.nlt || bookObject.abbrev;
}
