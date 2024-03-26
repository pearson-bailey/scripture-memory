import { Tables } from "@/src/database.types";

export type UserVerseWithSet = Tables<"user_verses"> & {
  verses: Tables<"verses"> | null;
  user_verses_sets: { set_id: string | null }[] | null;
};
