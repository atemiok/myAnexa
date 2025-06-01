-- Create private storage bucket
insert into storage.buckets (id, name, public) 
values ('documents', 'documents', false);

-- Storage RLS policies
create policy "admin docs" on storage.objects 
  for all using (current_role() = 'admin');

create policy "owner docs" on storage.objects 
  for all using (storage.objects.owner = auth.uid()); 