"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
import SearchForm from "../forms/SearchForm";
import { useRouter } from "next/navigation";

export default function SearchBar({
  setShowSearch,
}: {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}) {
  const { push } = useRouter();
  const submitForm = useCallback(
    async (requestString: string, versionAbbrev: string) => {
      let searchParams = new URLSearchParams();
      searchParams.set("text", requestString);
      searchParams.set("version", versionAbbrev);
      setShowSearch(false);
      push(`/search?${searchParams.toString()}`);
    },
    []
  );

  return (
    <div className="absolute z-20 flex w-full top-16 bg-foreground gap-2">
      <div className="flex w-full justify-center bg-background/90 py-4">
        <SearchForm submitForm={submitForm} />
      </div>
    </div>
  );
}
