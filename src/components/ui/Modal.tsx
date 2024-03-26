import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export default function MyModal({
  children,
  closeModal,
  isOpen,
  title,
}: {
  children: React.ReactNode | string;
  closeModal: () => void;
  isOpen: boolean;
  title: string;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/35" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 text-left align-middle shadow-xl transition-all">
                <div className="flex w-full justify-between bg-teal-600 p-3">
                  <span className="w-6" />
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <button onClick={closeModal}>
                    <XMarkIcon className="w-6 h-6 stroke-2" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
