"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import SearchForm from "../forms/SearchForm";
import { useRouter } from "next/navigation";

export default function SearchBar({
  setShowSearch,
}: {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}) {
  const { push } = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSearch]);

  return (
    <div
      ref={searchBarRef}
      className="absolute z-20 flex w-full top-16 bg-foreground gap-2"
    >
      <div className="flex w-full justify-center bg-background/90 py-4">
        <SearchForm submitForm={submitForm} />
      </div>
    </div>
  );
}
