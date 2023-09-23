alter table public.squad_confgis
RENAME to squad_configs;

insert into public.squad_configs (
  required_players,
  required_goalkeepers,
  required_defenders,
  required_midfielders,
  required_forwards,
  max_players_per_team,
  max_transfers_per_gw,
  required_starting_squad,
  league_id
)
values (
  15,
  2,
  5,
  5,
  3,
  3,
  1,
  11,
  1 
);
