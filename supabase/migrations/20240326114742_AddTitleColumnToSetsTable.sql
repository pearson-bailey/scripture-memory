alter table "public"."sets" add column "title" text not null;

alter table "public"."sets" add constraint "sets_title_check" CHECK ((length(title) < 50)) not valid;

alter table "public"."sets" validate constraint "sets_title_check";


