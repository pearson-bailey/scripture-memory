import CreateSetForm from "@/src/components/forms/CreateSetForm";
import { getUserSets } from "./actions";
import { SetCard } from "@/src/components/sets";

export default async function Index() {
  const sets = await getUserSets();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-center text-4xl my-4">Sets</h2>
      <CreateSetForm />
      <h3 className="w-fit font-bold text-2xl my-4 border-b border-teal-600">
        My Sets
      </h3>
      <div className="grid w-full md:grid-cols-3 gap-4">
        {sets ? (
          sets.map((set) => <SetCard key={set.id} set={set} />)
        ) : (
          <p>{"No verses"}</p>
        )}
      </div>
    </div>
  );
}
