"use server";
import CreateSetForm from "@/src/components/forms/CreateSetForm";
import SetsSlider from "@/src/components/sets/SetsSlider";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col mt-4 gap-2">
      <CreateSetForm />
      <h2 className="w-full text-center text-5xl text-teal-500 mb-4">Sets</h2>
      {user ? (
        <>
          <h3 className="w-fit font-bold text-2xl my-4 border-b border-teal-600">
            My Sets
          </h3>
          <SetsSlider />
        </>
      ) : null}
    </div>
  );
}
