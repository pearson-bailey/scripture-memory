"use client";
import { CreateSetForm } from "./types";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { ErrorMessage, SuccessMessage } from "@/src/components/ui";
import { createSet } from "./actions";
import { useCurrentUser } from "../UserContext";
import Modal from "../ui/Modal";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function CreateSetForm() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSetForm>({
    mode: "onChange",
  });
  const [state, formAction] = useFormState(createSet, null);
  const user = useCurrentUser();

  const onCreateSet = useCallback(
    (values: CreateSetForm) => {
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
          {user ? (
            <button
              type="button"
              onClick={openModal}
              className="flex items-center gap-1 rounded-md bg-teal-600 px-4 py-2 text-md text-white hover:bg-teal-700"
            >
              <PlusIcon className="h-4 w-4" />
              Create Set
            </button>
          ) : (
            <div>Please sign in to create a set</div>
          )}
        </div>
      </div>
      <Modal closeModal={closeModal} isOpen={isOpen} title={"Create Set"}>
        <form
          className="animate-in flex flex-col w-full justify-center gap-2 px-3 py-1.5 text-black"
          onSubmit={handleSubmit(onCreateSet)}
        >
          <label className="text-md" htmlFor="email">
            Title
          </label>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <input
            className="rounded-md px-4 py-2 border border-black text-black"
            type="text"
            {...register("title")}
          />
          <div className="flex items-center gap-2">
            <label className="text-md" htmlFor="password">
              Public
            </label>
            {errors.public && (
              <ErrorMessage>{errors.public.message}</ErrorMessage>
            )}
            <input
              className="px-4 py-2 text-black"
              type="checkbox"
              {...register("public")}
            />
          </div>
          {state?.success === false ? (
            <ErrorMessage>{state.message}</ErrorMessage>
          ) : state?.success === true ? (
            <SuccessMessage>{"Successfully created!"}</SuccessMessage>
          ) : null}
          <div className="flex justify-center gap-2">
            <a
              onClick={closeModal}
              className="flex items-center gap-1 bg-red-600 text-white rounded-md px-4 py-2 font-bold mb-2 hover:bg-red-700"
            >
              <XMarkIcon className="h-5 w-5" />
              Cancel
            </a>
            <button
              type="submit"
              className="flex items-center gap-1 bg-teal-500 text-white rounded-md px-4 py-2 font-bold mb-2 hover:bg-teal-600"
            >
              <PlusIcon className="h-5 w-5" />
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
