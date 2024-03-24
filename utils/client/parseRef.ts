"use client";
import { booksOfBible } from "@/src/constants";
import { BotB } from "@/src/types";

export function formatRef(ref: string, version: string): string {
  const bookName = getBook(ref, version)?.name;
  const chapter = getChapter(ref);
  const startVerse = getStartVerse(ref);
  const endVerse = getEndVerse(ref);
  return `${bookName} ${chapter}:${startVerse}${endVerse ? `-${endVerse}` : ""}`;
}

export function getBook(ref: string, version?: string): BotB | undefined {
  const bookAbbrev = ref?.split(".")[0].trim().toUpperCase();

  return booksOfBible.find((book) => {
    return book.nlt
      ? book.nlt.toUpperCase() === bookAbbrev
      : book.abbrev.toUpperCase() === bookAbbrev;
  });
}

export function getChapter(ref: string): number | undefined {
  const parts = ref?.split(".");

  if (parts?.length >= 3) {
    const chapter = parseInt(parts[1], 10);

    if (!isNaN(chapter)) {
      return chapter;
    }
  }

  return undefined;
}

export function getStartVerse(ref: string): number | undefined {
  const parts = ref?.split(".");

  if (parts?.length >= 3) {
    const versePart = parts[2].split("-")[0];

    const startVerse = parseInt(versePart, 10);

    if (!isNaN(startVerse)) {
      return startVerse;
    }
  }

  return undefined;
}

export function getEndVerse(ref: string): number | undefined {
  const parts = ref?.split(".");

  if (parts?.length >= 3) {
    const verseParts = parts[2].split("-");

    if (verseParts.length > 1) {
      const endVerse = parseInt(verseParts[1], 10);

      if (!isNaN(endVerse)) {
        return endVerse;
      }
    }
  }

  return undefined;
}
