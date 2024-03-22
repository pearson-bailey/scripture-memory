create table "public"."user_verses" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "verse_id" uuid not null,
    "set_id" uuid,
    "user_id" uuid not null
);


alter table "public"."user_verses" enable row level security;

create table "public"."verses" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "reference" text,
    "version" text,
    "edited" boolean not null default false,
    "edited_by" uuid,
    "text" text not null
);


alter table "public"."verses" enable row level security;

CREATE UNIQUE INDEX user_verses_pkey ON public.user_verses USING btree (id);

CREATE UNIQUE INDEX verses_pkey ON public.verses USING btree (id);

alter table "public"."user_verses" add constraint "user_verses_pkey" PRIMARY KEY using index "user_verses_pkey";

alter table "public"."verses" add constraint "verses_pkey" PRIMARY KEY using index "verses_pkey";

alter table "public"."user_verses" add constraint "public_user_verses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_verses" validate constraint "public_user_verses_user_id_fkey";

alter table "public"."user_verses" add constraint "public_user_verses_verse_id_fkey" FOREIGN KEY (verse_id) REFERENCES verses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_verses" validate constraint "public_user_verses_verse_id_fkey";

alter table "public"."verses" add constraint "public_verses_edited_by_fkey" FOREIGN KEY (edited_by) REFERENCES auth.users(id) not valid;

alter table "public"."verses" validate constraint "public_verses_edited_by_fkey";

grant delete on table "public"."user_verses" to "anon";

grant insert on table "public"."user_verses" to "anon";

grant references on table "public"."user_verses" to "anon";

grant select on table "public"."user_verses" to "anon";

grant trigger on table "public"."user_verses" to "anon";

grant truncate on table "public"."user_verses" to "anon";

grant update on table "public"."user_verses" to "anon";

grant delete on table "public"."user_verses" to "authenticated";

grant insert on table "public"."user_verses" to "authenticated";

grant references on table "public"."user_verses" to "authenticated";

grant select on table "public"."user_verses" to "authenticated";

grant trigger on table "public"."user_verses" to "authenticated";

grant truncate on table "public"."user_verses" to "authenticated";

grant update on table "public"."user_verses" to "authenticated";

grant delete on table "public"."user_verses" to "service_role";

grant insert on table "public"."user_verses" to "service_role";

grant references on table "public"."user_verses" to "service_role";

grant select on table "public"."user_verses" to "service_role";

grant trigger on table "public"."user_verses" to "service_role";

grant truncate on table "public"."user_verses" to "service_role";

grant update on table "public"."user_verses" to "service_role";

grant delete on table "public"."verses" to "anon";

grant insert on table "public"."verses" to "anon";

grant references on table "public"."verses" to "anon";

grant select on table "public"."verses" to "anon";

grant trigger on table "public"."verses" to "anon";

grant truncate on table "public"."verses" to "anon";

grant update on table "public"."verses" to "anon";

grant delete on table "public"."verses" to "authenticated";

grant insert on table "public"."verses" to "authenticated";

grant references on table "public"."verses" to "authenticated";

grant select on table "public"."verses" to "authenticated";

grant trigger on table "public"."verses" to "authenticated";

grant truncate on table "public"."verses" to "authenticated";

grant update on table "public"."verses" to "authenticated";

grant delete on table "public"."verses" to "service_role";

grant insert on table "public"."verses" to "service_role";

grant references on table "public"."verses" to "service_role";

grant select on table "public"."verses" to "service_role";

grant trigger on table "public"."verses" to "service_role";

grant truncate on table "public"."verses" to "service_role";

grant update on table "public"."verses" to "service_role";

create policy "Enable all actions for users based on user_id"
on "public"."user_verses"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."verses"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."verses"
as permissive
for select
to public
using (true);



