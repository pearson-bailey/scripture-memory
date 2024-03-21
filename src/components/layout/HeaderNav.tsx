"use client";
import { useState, Fragment, useEffect, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  Square3Stack3DIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const defaultIconStyles = "h-6 w-6 fill-teal-500";
const pages = [
  {
    id: 1,
    href: "/verses",
    icon: <BookOpenIcon className={defaultIconStyles} />,
    name: "Verses",
  },
  {
    id: 2,
    href: "/sets",
    icon: <Square3Stack3DIcon className={defaultIconStyles} />,
    name: "Sets",
  },
  {
    id: 3,
    href: "/stats",
    icon: <ChartBarIcon className={defaultIconStyles} />,
    name: "Stats",
  },
  {
    id: 4,
    href: "/groups",
    icon: <UserGroupIcon className={defaultIconStyles} />,
    name: "Groups",
  },
  {
    id: 5,
    href: "/account",
    icon: <UserIcon className={defaultIconStyles} />,
    name: "Account",
  },
];

export default function HeaderNav({
  handleSearch,
}: {
  handleSearch: () => void;
}) {
  const currentPath = usePathname();
  const [selected, setSelected] = useState<string>(currentPath);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const getUserAsync = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
      }
    };

    getUserAsync();
  }, []);

  useEffect(() => {
    setSelected(currentPath);
  }, [currentPath]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative flex items-center justify-end w-36">
        <button onClick={handleSearch}>
          <MagnifyingGlassIcon className="w-7 h-7" />
        </button>
        <Listbox.Button className="relative flex cursor-pointer rounded-md py-2 px-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <Bars3Icon
            className="h-7 w-7 text-gray-300 hover:text-gray-200"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {user != null ? (
            <Listbox.Options className="absolute z-10 top-12 mt-1 max-h-64 w-full text-indigo-900 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {pages.map((page, pageIdx) => (
                <Listbox.Option
                  key={pageIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active || selected.includes(page.href)
                        ? "bg-indigo-100"
                        : null
                    }`
                  }
                  disabled={selected.includes(page.href)}
                  value={page}
                >
                  <Link href={page.href}>
                    <span
                      className={`flex gap-2 truncate ${
                        selected.includes(page.href)
                          ? "font-bold cursor-default"
                          : "font-semibold"
                      }`}
                    >
                      {page.icon}
                      {page.name}
                    </span>
                  </Link>
                </Listbox.Option>
              ))}
              <hr className="mx-2 border-indigo-900" />
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active ? "bg-indigo-100" : null
                  }`
                }
                value="signOut"
              >
                <form action="/logout" method="post">
                  <button className="flex gap-2 truncate font-semibold">
                    <ArrowRightStartOnRectangleIcon
                      className={defaultIconStyles}
                    />
                    Log Out
                  </button>
                </form>
              </Listbox.Option>
            </Listbox.Options>
          ) : (
            <Listbox.Options className="absolute z-10 top-12 mt-1 max-h-64 w-full text-indigo-900 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active || selected.includes("/register")
                      ? "bg-indigo-100"
                      : null
                  }`
                }
                disabled={selected.includes("/register")}
                value="register"
              >
                <Link href="/register">
                  <span
                    className={`flex gap-2 truncate ${
                      selected.includes("/register")
                        ? "font-bold cursor-default"
                        : "font-semibold"
                    }`}
                  >
                    <UserPlusIcon className={defaultIconStyles} />
                    Sign Up
                  </span>
                </Link>
              </Listbox.Option>
              <hr className="mx-2 border-indigo-900" />
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active || selected.includes("/login")
                      ? "bg-indigo-100"
                      : null
                  }`
                }
                disabled={selected.includes("/login")}
                value="login"
              >
                <Link href="/login">
                  <span
                    className={`flex gap-2 truncate ${
                      selected.includes("/login")
                        ? "font-bold cursor-default"
                        : "font-semibold"
                    }`}
                  >
                    <ArrowRightEndOnRectangleIcon
                      className={defaultIconStyles}
                    />
                    Sign In
                  </span>
                </Link>
              </Listbox.Option>
            </Listbox.Options>
          )}
        </Transition>
      </div>
    </Listbox>
  );
}
