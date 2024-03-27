"use client";
import { UpdateSetForm } from "./types";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { ErrorMessage, SuccessMessage } from "@/src/components/ui";
import { getSet, updateSet } from "./actions";
import { useCurrentUser } from "../UserContext";
import Modal from "../ui/Modal";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Tables } from "@/src/database.types";
import { getUserVersesWithSet } from "../verses/actions";
import { UserVerseWithSet } from "../verses/types";

export default function UpdateSetForm({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [set, setSet] = useState<Tables<"sets">>();
  const [userVerses, setUserVerses] = useState<UserVerseWithSet[] | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateSetForm>({
    mode: "onChange",
    defaultValues: {
      id,
    },
  });
  const [state, formAction] = useFormState(updateSet, null);
  const user = useCurrentUser();

  useEffect(() => {
    if (id != null) {
      const getSetAsync = async () => {
        const setData = await getSet(id);
        setSet(setData);
      };

      getSetAsync();
    }

    if (user) {
      const getUserVersesAsync = async () => {
        const userVersesData = await getUserVersesWithSet();
        setUserVerses(userVersesData);
      };

      getUserVersesAsync();
    }
  }, [id, user]);

  const onUpdateSet = useCallback(
    (values: UpdateSetForm) => {
      formAction(values);
    },
    [formAction]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [closeModal, state]);

  return (
    <>
      <div className="flex flex-1 flex-col w-full px-8 sm:max-w-md items-start justify-center gap-2">
        <div className="flex items-start justify-center">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            Update Set
          </button>
        </div>
      </div>
      <Modal closeModal={closeModal} isOpen={isOpen} title={"Update Set"}>
        <form
          className="animate-in flex flex-col w-full justify-center gap-2 px-3 py-1.5 text-black"
          onSubmit={handleSubmit(onUpdateSet)}
        >
          <label className="text-md font-bold" htmlFor="email">
            Title
          </label>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <input
            className="rounded-md px-4 py-2 border border-black text-black"
            type="text"
            {...register("title")}
            defaultValue={set?.title}
          />
          <div className="flex items-center gap-2">
            <label className="text-md font-bold" htmlFor="password">
              Public
            </label>
            {errors.public && (
              <ErrorMessage>{errors.public.message}</ErrorMessage>
            )}
            <input
              className="px-4 py-2 text-black"
              type="checkbox"
              {...register("public")}
              defaultValue={set?.public.toString()}
            />
          </div>
          <label className="text-md font-bold" htmlFor="verses">
            Select Verses
          </label>
          <select
            multiple
            className="rounded-md px-4 py-2 border border-black text-black"
            {...register("verses")}
          >
            {userVerses?.map((verse) => (
              <option
                key={verse.id}
                value={verse.id}
                selected={verse.user_verses_sets?.some(
                  (uvs) => uvs.set_id === set?.id
                )}
              >
                {verse.verses?.reference}
              </option>
            ))}
          </select>
          {state?.success === false ? (
            <ErrorMessage>{state.message}</ErrorMessage>
          ) : state?.success === true ? (
            <SuccessMessage>{"Successfully updated!"}</SuccessMessage>
          ) : null}
          <div className="flex justify-center gap-2">
            <a
              onClick={closeModal}
              className="flex items-center gap-1 bg-red-600 text-white rounded-md px-4 py-2 font-bold mb-2 hover:bg-red-700 cursor-pointer"
            >
              <XMarkIcon className="h-5 w-5" />
              Cancel
            </a>
            <button
              type="submit"
              className="flex items-center gap-1 bg-teal-500 text-white rounded-md px-4 py-2 font-bold mb-2 hover:bg-teal-600"
            >
              <PlusIcon className="h-5 w-5" />
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
