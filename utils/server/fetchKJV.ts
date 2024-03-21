"use server";
export default async function fetchKJV(
  passage: string | undefined
): Promise<string> {
  const myHeaders = new Headers();
  myHeaders.append("api-key", process.env.KJV_API_KEY || "");

  const url = `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${passage}`;

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    if (result === null || result?.data?.content === undefined) {
      throw new Error("Network response was not ok", result);
    }
    return result?.data?.content;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return "Error: Passage not found";
}
