"use client";
import { VerseCard } from "@/src/components/verses";
import { getUserVerses } from "@/src/components/verses/actions";
import { useCallback, useEffect, useState } from "react";
import { NullableUserVerse } from "@/src/components/sets/types";
import {
  getUserSetNames,
  getUserSetWithVerses,
} from "@/src/components/sets/actions";
import { Dropdown } from "@/src/components/ui";
import { KVP } from "@/src/types/kvp";

export default function Verses() {
  const [verses, setVerses] = useState<NullableUserVerse[] | null>(null);
  const [selectedSet, setSelectedSet] = useState<KVP | null>(null);
  const [sets, setSets] = useState<KVP[]>([]);

  const getSetNames = useCallback(async () => {
    const sets = await getUserSetNames();
    const setsKVP = sets.map((set) => ({
      key: set.id,
      value: set.title,
    }));
    setsKVP.unshift({ key: "all", value: "All" });
    setSets(setsKVP);
    setSelectedSet(setsKVP[0]);
  }, []);

  const getVerses = useCallback(async () => {
    const verses = await getUserVerses();
    setVerses(verses);
  }, []);

  useEffect(() => {
    getSetNames();
    getVerses();
  }, [getSetNames, getVerses]);

  const getVersesBySet = useCallback(async () => {
    if (selectedSet?.key) {
      const userSet = await getUserSetWithVerses(selectedSet.key);
      const newVerses = userSet.user_verses_sets.map(
        (item) => item.user_verses
      );

      setVerses(newVerses);
    }
  }, [selectedSet]);

  useEffect(() => {
    if (selectedSet?.key !== "all") {
      getVersesBySet();
    } else {
      getVerses();
    }
  }, [selectedSet]);

  return (
    <>
      <Dropdown
        options={sets}
        selected={selectedSet}
        setSelected={setSelectedSet}
      />
      <div className="grid md:grid-cols-3 gap-4">
        {verses ? (
          verses.map((verse) => (
            <VerseCard key={verse?.id} verse={verse?.verses} />
          ))
        ) : (
          <p>{"No verses"}</p>
        )}
      </div>
    </>
  );
}
