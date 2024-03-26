alter table "public"."user_verses" drop constraint "public_user_verses_set_id_fkey";

create table "public"."user_verses_sets" (
    "id" uuid not null default gen_random_uuid(),
    "set_id" uuid,
    "user_verse_id" uuid,
    "user_id" uuid
);


alter table "public"."user_verses_sets" enable row level security;

alter table "public"."user_verses" drop column "set_id";

CREATE UNIQUE INDEX user_verses_sets_pkey ON public.user_verses_sets USING btree (id);

alter table "public"."user_verses_sets" add constraint "user_verses_sets_pkey" PRIMARY KEY using index "user_verses_sets_pkey";

alter table "public"."user_verses_sets" add constraint "public_user_verses_sets_set_id_fkey" FOREIGN KEY (set_id) REFERENCES sets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_verses_sets" validate constraint "public_user_verses_sets_set_id_fkey";

alter table "public"."user_verses_sets" add constraint "public_user_verses_sets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_verses_sets" validate constraint "public_user_verses_sets_user_id_fkey";

alter table "public"."user_verses_sets" add constraint "public_user_verses_sets_user_verse_id_fkey" FOREIGN KEY (user_verse_id) REFERENCES user_verses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_verses_sets" validate constraint "public_user_verses_sets_user_verse_id_fkey";

grant delete on table "public"."user_verses_sets" to "anon";

grant insert on table "public"."user_verses_sets" to "anon";

grant references on table "public"."user_verses_sets" to "anon";

grant select on table "public"."user_verses_sets" to "anon";

grant trigger on table "public"."user_verses_sets" to "anon";

grant truncate on table "public"."user_verses_sets" to "anon";

grant update on table "public"."user_verses_sets" to "anon";

grant delete on table "public"."user_verses_sets" to "authenticated";

grant insert on table "public"."user_verses_sets" to "authenticated";

grant references on table "public"."user_verses_sets" to "authenticated";

grant select on table "public"."user_verses_sets" to "authenticated";

grant trigger on table "public"."user_verses_sets" to "authenticated";

grant truncate on table "public"."user_verses_sets" to "authenticated";

grant update on table "public"."user_verses_sets" to "authenticated";

grant delete on table "public"."user_verses_sets" to "service_role";

grant insert on table "public"."user_verses_sets" to "service_role";

grant references on table "public"."user_verses_sets" to "service_role";

grant select on table "public"."user_verses_sets" to "service_role";

grant trigger on table "public"."user_verses_sets" to "service_role";

grant truncate on table "public"."user_verses_sets" to "service_role";

grant update on table "public"."user_verses_sets" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."user_verses_sets"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."user_verses_sets"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."user_verses_sets"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."user_verses_sets"
as permissive
for update
to public
using ((auth.uid() = user_id));



