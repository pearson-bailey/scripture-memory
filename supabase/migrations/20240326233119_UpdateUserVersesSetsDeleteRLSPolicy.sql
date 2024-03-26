drop policy "Enable delete for users based on user_id" on "public"."user_verses_sets";

create policy "Enable delete for authenticated users only"
on "public"."user_verses_sets"
as permissive
for delete
to authenticated
using (true);



