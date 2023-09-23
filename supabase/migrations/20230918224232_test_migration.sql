create table test_table (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name text not null,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT into public.test_table (test_name)
values ('THis is a migration test, lol...'),
('supabase might be the best thing since sliced bread');
