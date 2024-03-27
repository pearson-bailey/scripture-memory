"use client";
import { VerseCard } from "@/src/components/verses";
import { getUserVerses } from "@/src/components/verses/actions";
import { useCallback, useEffect, useState } from "react";
import { NullableUserVerse } from "@/src/components/sets/types";
import {
  getUserSetNames,
  getUserSetWithVerses,
} from "@/src/components/sets/actions";
import { Dropdown, Loading } from "@/src/components/ui";
import { KVP } from "@/src/types/kvp";

export default function Verses() {
  const [verses, setVerses] = useState<NullableUserVerse[] | null>(null);
  const [selectedSet, setSelectedSet] = useState<KVP | null>(null);
  const [sets, setSets] = useState<KVP[]>([]);
  const [setIsLoading, setSetIsLoading] = useState<boolean>(false);
  const [verseIsLoading, setVerseIsLoading] = useState<boolean>(false);

  const getSetNames = useCallback(async () => {
    setSetIsLoading(true);
    const sets = await getUserSetNames();
    const setsKVP = sets.map((set) => ({
      key: set.id,
      value: set.title,
    }));
    setsKVP.unshift({ key: "all", value: "All" });
    setSets(setsKVP);
    setSelectedSet(setsKVP[0]);
    setSetIsLoading(false);
  }, []);

  const getVerses = useCallback(async () => {
    setVerseIsLoading(true);
    const verses = await getUserVerses();
    setVerses(verses);
    setVerseIsLoading(false);
  }, []);

  useEffect(() => {
    getSetNames();
    getVerses();
  }, [getSetNames, getVerses]);

  const getVersesBySet = useCallback(async () => {
    if (selectedSet?.key) {
      setVerseIsLoading(true);
      const userSet = await getUserSetWithVerses(selectedSet.key);
      const newVerses = userSet.user_verses_sets.map(
        (item) => item.user_verses
      );

      setVerses(newVerses);
      setVerseIsLoading(false);
    }
  }, [selectedSet]);

  useEffect(() => {
    if (selectedSet?.key !== "all") {
      getVersesBySet();
    } else {
      getVerses();
    }
  }, [getVerses, getVersesBySet, selectedSet]);

  return (
    <>
      {setIsLoading ? (
        <Loading />
      ) : (
        <Dropdown
          options={sets}
          selected={selectedSet}
          setSelected={setSelectedSet}
        />
      )}
      {verseIsLoading && !setIsLoading ? (
        <Loading />
      ) : !verseIsLoading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {verses ? (
            verses.map((verse) => (
              <VerseCard key={verse?.id} verse={verse?.verses} />
            ))
          ) : (
            <p>{"No verses"}</p>
          )}
        </div>
      ) : null}
    </>
  );
}
