alter table public.user_squad_entry
add COLUMN league_id INTEGER REFERENCES public.leagues(id) NOT NULL,
add column league_team_id integer references public.teams(id) on delete no action not null;
