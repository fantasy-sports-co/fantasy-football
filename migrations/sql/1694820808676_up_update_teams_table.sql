alter table public.teams
add column season_id INTEGER REFERENCES public.season(id) ON DELETE NO ACTION;

alter table public.players
add constraint unique_external_id_to_team unique(external_id, team_id)
