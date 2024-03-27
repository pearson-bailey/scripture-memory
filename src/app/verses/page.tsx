"use server";
import VersesGrid from "@/src/components/verses/VersesGrid";

export default async function Verses() {
  return (
    <div className="flex flex-col mt-4 gap-2">
      <h1 className="w-full text-center text-4xl text-teal-500 mb-4">
        My Verses
      </h1>
      <VersesGrid />
    </div>
  );
}
