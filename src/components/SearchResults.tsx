"use client";
import { ReactNode, useCallback, useState } from "react";
import { fetchESV, fetchKJV, fetchNLT } from "@/utils/server";
import { formatKJV, formatNLT } from "@/utils/client";
import SearchForm from "./forms/SearchForm";

export default function SearchResults({
  text,
  version,
}: {
  text: string;
  version: string;
}) {
  const [result, setResult] = useState<string | ReactNode | null>(null);

  const submitForm = useCallback(
    async (requestString: string, versionAbbrev: string) => {
      let response: string | undefined | null = null;
      switch (versionAbbrev) {
        case "ESV":
          response = await fetchESV(requestString);
          break;
        case "KJV":
          const kjvResult = await fetchKJV(requestString);
          response = formatKJV(kjvResult);
          break;
        case "NLT":
          const nltResult = await fetchNLT(requestString);
          response = formatNLT(nltResult);
          break;
        default:
          console.error("Unsupported version:", versionAbbrev);
      }

      if (response !== null) setResult(response);
    },
    []
  );

  return (
    <div className="flex flex-col gap-2">
      <SearchForm
        submitForm={submitForm}
        textParam={text}
        versionParam={version}
      />
      <span className="font-bold text-2xl text-teal-500">
        {result ? <span>{result}</span> : null}
      </span>
    </div>
  );
}
