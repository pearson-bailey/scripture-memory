import SearchResults from "@/src/components/SearchResults";

export default async function Search({
  searchParams,
}: {
  searchParams: { text: string; version: string };
}) {
  return (
    <>
      <h2 className="font-bold text-4xl mb-4">Search Page</h2>
      <SearchResults text={searchParams.text} version={searchParams.version} />
    </>
  );
}
