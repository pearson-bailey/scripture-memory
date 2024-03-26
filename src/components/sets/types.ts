import { Tables } from "@/src/database.types";

export type UserVerse = Tables<"user_verses"> & {
  verses: Tables<"verses"> | null;
};

export type UserVersesSet = Tables<"user_verses_sets"> & {
  user_verses: UserVerse | null;
};

export type Set = Tables<"sets"> & {
  user_verses_sets: UserVersesSet[] | null;
};
