alter table public.user_squad_entry_transactions
add column entry_uuid uuid REFERENCES public.user_squad_entry(id) ON DELETE NO ACTION NOT NULL;