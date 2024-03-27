"use client";
import { Tables } from "@/src/database.types";
import { formatRef } from "@/utils/client/parseRef";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

interface Feedback {
  message: string;
  success: boolean;
}

interface UserInput {
  value: string;
  isCorrect?: boolean;
}

export default function PracticeCard({
  verse,
}: {
  verse: Tables<"verses"> | null;
}) {
  const { push } = useRouter();
  const [formattedRef, setFormattedRef] = useState<string | null>(null);
  const [randomIndexes, setRandomIndexes] = useState<number[]>([]);
  const [userInputs, setUserInputs] = useState<{ [key: number]: UserInput }>(
    {}
  );
  const [modifiedVerse, setModifiedVerse] = useState<
    Array<JSX.Element | string>
  >([]);
  const [feedback, setFeedback] = useState<Feedback>();

  useEffect(() => {
    if (verse?.reference && verse?.version) {
      const refString = formatRef(verse?.reference, verse?.version);
      setFormattedRef(refString);
    }
  }, [setFormattedRef, verse]);

  const generateRandomIndexes = useCallback((length: number): number[] => {
    const half = Math.ceil(length / 2);
    const randomIndexes = new Set<number>();
    while (randomIndexes.size < half) {
      const r = Math.floor(Math.random() * length);
      randomIndexes.add(r);
    }
    return Array.from(randomIndexes);
  }, []);

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      setUserInputs((prevUserInputs) => ({
        ...prevUserInputs,
        [index]: { ...prevUserInputs[index], value },
      }));
    },
    [setUserInputs]
  );

  const generateVerseWithInputs = useCallback(
    (words: string[], randomIndexes: number[]) => {
      const newVerse = words.map((word, index) => {
        if (randomIndexes?.includes(index)) {
          return (
            <input
              key={index}
              type="text"
              defaultValue={userInputs[index]?.value || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className={`border w-36 text-black px-2 rounded-md ${userInputs[index]?.hasOwnProperty("isCorrect") ? (userInputs[index]?.isCorrect ? "border-foreground" : "border-2 border-red-500") : "border-foreground"}`}
            />
          );
        }
        return word + " ";
      });

      setModifiedVerse(newVerse);
    },
    [handleInputChange, setModifiedVerse, userInputs]
  );

  useEffect(() => {
    if (!verse?.text) return;
    const words = verse.text.trim().split(" ");
    const randomIndexes = generateRandomIndexes(words.length);
    setRandomIndexes(randomIndexes);
    generateVerseWithInputs(words, randomIndexes);
  }, [generateRandomIndexes, generateVerseWithInputs, verse]);

  const normalizeText = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .trim();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!verse) return;
    const words = verse.text.trim().split(" ");
    let incorrectCount = 0;

    words.forEach((word, index) => {
      if (userInputs.hasOwnProperty(index)) {
        const normalizedInput = normalizeText(userInputs[index].value);
        const normalizedWord = normalizeText(word);
        if (normalizedInput !== normalizedWord) {
          setUserInputs((prev) => ({
            ...prev,
            [index]: { ...prev[index], isCorrect: false },
          }));
          incorrectCount++;
        } else {
          setUserInputs((prev) => ({
            ...prev,
            [index]: { ...prev[index], isCorrect: true },
          }));
        }
      }
    });

    if (incorrectCount > 0) {
      setFeedback({
        message: `${incorrectCount} incorrect words. Please try again`,
        success: false,
      });
    } else {
      setFeedback({ message: "Correct. Great job!", success: true });
      setTimeout(() => {
        push("/verses");
      }, 3000);
    }
  }, [normalizeText, push, userInputs, verse]);

  useEffect(() => {
    if (!verse?.text) return;
    const words = verse.text.trim().split(" ");

    if (Object.values(userInputs).some((input) => input.isCorrect === false)) {
      generateVerseWithInputs(words, randomIndexes);
    }
  }, [userInputs, generateVerseWithInputs, randomIndexes, verse]);

  return (
    <div className="flex bg-foreground rounded-md">
      <div className="flex w-full flex-col gap-3 p-4 bg-background/90">
        <div className="text-xl">
          {formattedRef ?? verse?.reference}, {verse?.version}
        </div>
        <div className="flex flex-wrap gap-1 text-lg">
          &quot;{modifiedVerse}&quot;
        </div>
        {feedback?.message && (
          <div className={feedback.success ? "text-green-600" : "text-red-600"}>
            {feedback.message}
          </div>
        )}
        <div className="flex w-full">
          <button
            onClick={handleSubmit}
            className="flex gap-1 items-center px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-black rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
