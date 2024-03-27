"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { KVP } from "@/src/types/kvp";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Dropdown({
  button,
  options,
  selected,
  setSelected,
}: {
  button?: JSX.Element | string;
  options: KVP[];
  selected: KVP | null;
  setSelected: (value: KVP) => void;
}) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative flex items-center justify-end w-fit">
        <Listbox.Button className="flex w-full justify-center cursor-pointer rounded-md py-2 px-4 text-left border sm:text-sm bg-indigo-900 text-white">
          {button ?? (
            <div className="flex items-center gap-2">
              {selected?.value}
              <ChevronDownIcon className="w-5 h-5" />
            </div>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {options !== null ? (
            <Listbox.Options className="absolute z-10 left-0 top-9 mt-1 max-h-64 w-fit text-indigo-900 overflow-auto rounded-md bg-white py-1 text-base sm:text-sm">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active || selected === option ? "bg-indigo-100" : null
                    }`
                  }
                  disabled={selected === option}
                  value={option}
                >
                  <span
                    className={`flex gap-2 truncate ${
                      selected === option
                        ? "font-bold cursor-default"
                        : "font-semibold"
                    }`}
                  >
                    {option.value}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          ) : null}
        </Transition>
      </div>
    </Listbox>
  );
}
