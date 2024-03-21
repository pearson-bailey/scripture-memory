"use server";
export default async function fetchNLT(reference: string | undefined) {
  try {
    const url = `https://api.nlt.to/api/passages?version=nlt&ref=${reference}&key=${process.env.NLT_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
