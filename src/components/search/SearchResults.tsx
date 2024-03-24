"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { fetchESV, fetchKJV, fetchNLT } from "@/utils/server";
import { formatKJV, formatNLT } from "@/utils/client";
import { PlayIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Verse } from "@/src/types";
import { useCurrentUser } from "../UserContext";
import { addUserVerse, quickPlay } from "../actions";
import SearchForm from "../forms/SearchForm";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useCurrentUser();

  const clearResult = useCallback(() => {
    setResult(null);
  }, [setResult]);

  const submitForm = useCallback(
    async (requestString: string, versionAbbrev: string) => {
      setIsLoading(true);
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

      if (response != null && response != undefined) {
        clearResult();
        setResult({
          reference: requestString,
          text: response,
          version: versionAbbrev,
        });
      }
      setIsLoading(false);
    },
    [clearResult]
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
      addUserVerse(edited, result.reference, result.text, result.version);
    }
  }, [edited, result]);

  const handleQuickPlay = useCallback(() => {
    if (result) {
      quickPlay(edited, result.reference, result.text, result.version);
    }
  }, [edited, result]);

  console.log(result);

  return (
    <div className="flex flex-col gap-2">
      <SearchForm
        submitForm={submitForm}
        refParam={text}
        versionParam={version}
      />
      <span>
        {isLoading ? (
          <p className="w-full text-center my-2">Loading...</p>
        ) : result ? (
          <div>
            <div className="flex justify-end">
              <button
                onClick={handleEdit}
                className="text-foreground underline mb-2"
              >
                edit
              </button>
            </div>
            <textarea
              className="w-full text-black text-2xl rounded-md px-3 py-1.5 mb-3 disabled:bg-gray-200"
              rows={4}
              disabled={!canEdit}
              onChange={(e) => handleUpdate(e)}
              defaultValue={result.text}
            />
            <div className="flex w-full justify-center gap-3">
              <button
                className="flex gap-1 items-center bg-red-600 rounded-md px-3 py-1.5 text-white hover:bg-red-700"
                onClick={clearResult}
              >
                <XMarkIcon className="h-5 w-5 stroke-2 stroke-current" />
                Cancel
              </button>
              {user ? (
                <button
                  className="flex gap-1 items-center bg-teal-600 rounded-md px-3 py-1.5 text-white hover:bg-teal-700"
                  onClick={handleSubmit}
                >
                  <PlusIcon className="h-5 w-5 stroke-2 stroke-current" />
                  Add Verse
                </button>
              ) : null}
              <button
                className="flex gap-1 items-center bg-indigo-900 rounded-md px-3 py-1.5 text-white hover:bg-indigo-950"
                onClick={handleQuickPlay}
              >
                <PlayIcon className="h-5 w-5 stroke-2 stroke-current" />
                Quick Play
              </button>
            </div>
            {!user ? (
              <p className="w-full text-center mt-2">
                <Link className="underline font-bold" href="/login">
                  Sign in
                </Link>{" "}
                to save verses
              </p>
            ) : null}
          </div>
        ) : null}
      </span>
    </div>
  );
}
