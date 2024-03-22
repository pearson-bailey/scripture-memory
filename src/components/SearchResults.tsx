"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { fetchESV, fetchKJV, fetchNLT } from "@/utils/server";
import { formatKJV, formatNLT } from "@/utils/client";
import SearchForm from "./forms/SearchForm";
import { Verse } from "../types";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { addVerse } from "./actions";

export default function SearchResults({
  text,
  version,
}: {
  text: string;
  version: string;
}) {
  const [result, setResult] = useState<Verse | null>(null);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);

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

  const handleEdit = useCallback(() => {
    setCanEdit(!canEdit);
  }, [canEdit, setCanEdit]);

  const handleUpdate = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (result && result.text !== e.target.value) {
        setResult({
          ...result,
          text: e.target.value,
        });

        setEdited(true);
      }
    },
    [edited, result]
  );

  const handleSubmit = useCallback(() => {
    if (result) {
      addVerse(edited, result.reference, result.text, result.version);
    }
  }, [edited, result]);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <SearchForm submitForm={submitForm} />
      <span>
        {result ? (
          <div className="flex flex-col items-end">
            <button
              onClick={handleEdit}
              className="text-foreground underline mb-2"
            >
              edit
            </button>
            <textarea
              className="w-full text-black text-2xl rounded-md px-3 py-1.5 mb-3 disabled:bg-gray-200"
              rows={4}
              disabled={!canEdit}
              onChange={(e) => handleUpdate(e)}
              defaultValue={result.text}
            />
            <div className="flex w-full justify-center gap-3">
              <button
                className="flex gap-1 items-center bg-red-600 rounded-md px-3 py-1.5 text-white"
                onClick={clearResult}
              >
                <XMarkIcon className="h-5 w-5 stroke-2 stroke-current" />
                Cancel
              </button>
              <button
                className="flex gap-1 items-center bg-teal-600 rounded-md px-3 py-1.5 text-white"
                onClick={handleSubmit}
              >
                <PlusIcon className="h-5 w-5 stroke-2 stroke-current" />
                Add Verse
              </button>
            </div>
          </div>
        ) : null}
      </span>
    </div>
  );
}
