alter table user_squad_entry
add column position_id INTEGER REFERENCES public.positions(id) NOT NULL,
add column season_id INTEGER REFERENCES public.season(id) NOT NULL;
