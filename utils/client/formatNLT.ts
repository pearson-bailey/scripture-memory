"use client";
export default function formatNLT(
  verse: string | undefined | null
): string | undefined {
  if (verse === null || verse === undefined) return "Error: Passage not found";
  const parser = new DOMParser();
  const nltDoc = parser.parseFromString(verse, "text/html");
  if (nltDoc.body.textContent === null) return "Error: Passage not found";

  let parts = nltDoc.body.textContent.split(/\s+/);
  parts.splice(0, 2);
  let remainingString = parts?.join(" ");
  let modifiedString = remainingString.replace(/^.*?(\d)([A-Za-z].*)$/, "$2");
  modifiedString = modifiedString.replace(
    /([A-Za-z])\d+|\d+([A-Za-z])/g,
    function (_, p1, p2) {
      return p1 || p2;
    }
  );

  return modifiedString;
}
