create table livescore_api_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id VARCHAR(36) not null,
  external_country_id VARCHAR(36),
  external_country_name varchar(120),
  name VARCHAR(200),
  stadium TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (external_id)
)
