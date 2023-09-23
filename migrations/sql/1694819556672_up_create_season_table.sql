create table season (
  id SERIAL PRIMARY KEY,
  season VARCHAR(20) not null,
  league_id INTEGER REFERENCES public.leagues(id) ON DELETE NO ACTION,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(season, league_id)
)
