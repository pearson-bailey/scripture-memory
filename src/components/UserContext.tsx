"use client";
import { User } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext } from "react";

const userContext = createContext<User | null>(null);

export const useCurrentUser = () => useContext(userContext);

export default function UserProvider({
  children,
  value,
}: {
  children?: ReactNode;
  value: User | null;
}) {
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
