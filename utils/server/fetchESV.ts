"use server";
export default async function fetchESV(
  passage: string | undefined
): Promise<string> {
  const params = new URLSearchParams({
    q: passage ?? "",
    "include-headings": "false",
    "include-footnotes": "false",
    "include-verse-numbers": "false",
    "include-short-copyright": "false",
    "include-passage-references": "false",
  });

  const headers = {
    Authorization: `Token ${process.env.ESV_API_KEY}`,
  };

  const url = `https://api.esv.org/v3/passage/text/?${params}`;

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    const passages: string[] = data.passages;
    return passages[0].trim();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return "Error: Passage not found";
}
