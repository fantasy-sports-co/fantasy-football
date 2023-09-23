create table squad_confgis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  required_players INTEGER NOT NULL DEFAULT (15),
  required_goalkeepers INTEGER NOT NULL DEFAULT (2),
  required_defenders INTEGER NOT NULL DEFAULT (5),
  required_midfielders INTEGER NOT NULL DEFAULT (5),
  required_forwards INTEGER NOT NULL DEFAULT (3),
  max_players_per_team INTEGER NOT NULL DEFAULT (3),
  max_transfers_per_gw INTEGER NOT NULL DEFAULT (1),
  required_starting_squad INTEGER NOT NULL DEFAULT (11),
  league_id INTEGER REFERENCES public.leagues(id) ON DELETE NO ACTION,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() 
);

create table game_weeks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gw VARCHAR(10),
  league_id INTEGER REFERENCES public.leagues(id) ON DELETE NO ACTION,
  is_active BOOLEAN NOT NULL DEFAULT (false),
  start_date TIMESTAMP,
  end_date TIMESTAMP
);

create table user_squad_entry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id INTEGER REFERENCES public.players(id),
  team_id  INTEGER REFERENCES public.team_profile(id),
  game_week uuid REFERENCES public.game_weeks(id),
  is_starting BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE table user_squad_entry_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_in INTEGER REFERENCES public.players(id),
  player_out INTEGER REFERENCES public.players(id),
  team_id  INTEGER REFERENCES public.team_profile(id) NOT NULL,
  game_week uuid REFERENCES public.game_weeks(id) NOT NULL,
  -- transfer, substitution, squad-entry
  txn_type VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
