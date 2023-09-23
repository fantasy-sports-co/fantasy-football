create table country (
  id SERIAL PRIMARY key,
  name VARCHAR(120) not null,
  continent VARCHAR(120) not null,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

create table leagues (
  id SERIAL PRIMARY key,
  country_id INTEGER REFERENCES public.country(id) ON DELETE NO ACTION,
  name VARCHAR(200) not null,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE table teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) not null,
  stadium TEXT,
  abbrevations VARCHAR(10)[],
  league_id INTEGER REFERENCES public.leagues(id) ON DELETE NO ACTION,
  season_id integer REFERENCES public.season(id) ON DELETE NO ACTION,
  source varchar(50),
  external_id varchar(36),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE table positions (
  id SERIAL PRIMARY KEY,
  position VARCHAR(20) NOT NULL,
  abbrevation VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE table players (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(120),
  last_name VARCHAR(120),
  position_id INTEGER REFERENCES public.positions(id) ON DELETE NO ACTION,
  team_id INTEGER REFERENCES public.teams(id) ON DELETE NO ACTION,
  jersey_number SMALLINT,
  active BOOLEAN DEFAULT true,
  source varchar(50),
  external_id varchar(36),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
