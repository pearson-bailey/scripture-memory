create table "public"."sets" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "public" boolean not null default false,
    "likes" bigint not null default '0'::bigint
);


alter table "public"."sets" enable row level security;

CREATE UNIQUE INDEX sets_pkey ON public.sets USING btree (id);

alter table "public"."sets" add constraint "sets_pkey" PRIMARY KEY using index "sets_pkey";

alter table "public"."sets" add constraint "public_sets_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."sets" validate constraint "public_sets_created_by_fkey";

alter table "public"."user_verses" add constraint "public_user_verses_set_id_fkey" FOREIGN KEY (set_id) REFERENCES sets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_verses" validate constraint "public_user_verses_set_id_fkey";

grant delete on table "public"."sets" to "anon";

grant insert on table "public"."sets" to "anon";

grant references on table "public"."sets" to "anon";

grant select on table "public"."sets" to "anon";

grant trigger on table "public"."sets" to "anon";

grant truncate on table "public"."sets" to "anon";

grant update on table "public"."sets" to "anon";

grant delete on table "public"."sets" to "authenticated";

grant insert on table "public"."sets" to "authenticated";

grant references on table "public"."sets" to "authenticated";

grant select on table "public"."sets" to "authenticated";

grant trigger on table "public"."sets" to "authenticated";

grant truncate on table "public"."sets" to "authenticated";

grant update on table "public"."sets" to "authenticated";

grant delete on table "public"."sets" to "service_role";

grant insert on table "public"."sets" to "service_role";

grant references on table "public"."sets" to "service_role";

grant select on table "public"."sets" to "service_role";

grant trigger on table "public"."sets" to "service_role";

grant truncate on table "public"."sets" to "service_role";

grant update on table "public"."sets" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."sets"
as permissive
for delete
to authenticated
using ((auth.uid() = created_by));


create policy "Enable insert for authenticated users only"
on "public"."sets"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."sets"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."sets"
as permissive
for update
to authenticated
using ((auth.uid() = created_by));



