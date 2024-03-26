"use client";
import { Set } from "./types";

export default function SetCard({ set }: { set: Set | null }) {
  console.log(set);
  return (
    <div className="flex bg-foreground rounded-md">
      <div className="flex w-full flex-col gap-3 p-4 bg-background/90">
        <div className="flex flex-col flex-1">
          <div className="w-full text-center text-xl mb-3">{set?.title}</div>
          <div className="flex flex-col gap-1">
            {set?.user_verses?.length ? (
              set.user_verses.map((verse) => {
                return <p>{verse.verses?.reference}</p>;
              })
            ) : (
              <p>No verses added</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
