"use client";
import UpdateSetForm from "../forms/UpdateSetForm";
import { Set } from "./types";

export default function SetCard({ set }: { set: Set | null }) {
  return (
    <div className="flex bg-foreground rounded-md mx-3">
      <div className="flex w-full flex-col gap-3 p-4 bg-background/90">
        <div className="flex flex-col flex-1">
          <div className="w-full text-center text-xl mb-3 border-b border-teal-600">
            {set?.title}
          </div>
          <div className="flex flex-col gap-1 mb-4">
            {set?.user_verses_sets?.length ? (
              set.user_verses_sets.map((verse) => {
                return (
                  <p key={verse.id}>{verse.user_verses?.verses?.reference}</p>
                );
              })
            ) : (
              <p>No verses added</p>
            )}
          </div>
          <UpdateSetForm id={set?.id ?? ""} />
        </div>
      </div>
    </div>
  );
}
