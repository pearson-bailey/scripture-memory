import { Tables } from "@/src/database.types";

export type UserVerse = Tables<"user_verses"> & {
  verses: Tables<"verses"> | null;
};

export type Set = Tables<"sets"> & {
  user_verses: UserVerse[] | null;
};
