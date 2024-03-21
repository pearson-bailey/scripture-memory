"use client";
export default function formatKJV(
  verse: string | undefined | null
): string | undefined {
  if (verse === null || verse === undefined) return "Error: Passage not found";
  const parser = new DOMParser();
  const kjvDoc = parser.parseFromString(verse, "text/html");
  return kjvDoc.body.textContent?.slice(1).replace(/¶/g, "");
}
