import SearchResults from "@/src/components/SearchResults";

export default async function Search({
  searchParams,
}: {
  searchParams: { text: string; version: string };
}) {
  return (
    <div className="flex flex-col mt-4">
      <SearchResults text={searchParams.text} version={searchParams.version} />
    </div>
  );
}
