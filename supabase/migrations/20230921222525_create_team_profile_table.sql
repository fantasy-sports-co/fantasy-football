alter table public.user_detail
add constraint unique_user_serial_id unique(id);

CREATE table team_profile (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES public.user_detail(id) ON DELETE NO ACTION,
  season_id INTEGER REFERENCES public.season(id) ON DELETE NO ACTION,
  team_name VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() 
);

alter table public.season
drop COLUMN league_id,
drop COLUMN start_date, 
drop COLUMN end_date;

alter table public.leagues
add COLUMN season_id INTEGER REFERENCES public.season(id) ON DELETE NO ACTION,
add column start_date date,
add column end_date date;
