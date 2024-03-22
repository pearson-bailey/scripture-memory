"use client";
import { useCallback, useEffect, useState } from "react";
import { fetchESV, fetchKJV, fetchNLT } from "@/utils/server";
import { formatKJV, formatNLT } from "@/utils/client";
import SearchForm from "./forms/SearchForm";
import { Verse } from "../types";

export default function SearchResults({
  text,
  version,
}: {
  text: string;
  version: string;
}) {
  const [result, setResult] = useState<Verse | null>(null);

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

      if (response !== null && response !== undefined)
        setResult({
          reference: requestString,
          text: response,
          version: versionAbbrev,
        });
    },
    []
  );

  useEffect(() => {
    if (text && version) {
      submitForm(text, version);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <SearchForm submitForm={submitForm} />
      <span className="font-bold text-2xl text-teal-500">
        {result ? <span>{result.text}</span> : null}
      </span>
    </div>
  );
}
