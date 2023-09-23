CREATE TABLE user_detail (
  id SERIAL not null,
  auth_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE NO ACTION,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
  favourite_team INTEGER REFERENCES public.teams(id) ON DELETE NO ACTION,
  date_of_birth DATE not null,
  gender VARCHAR(10) not null,
	created_at TIMESTAMP DEFAULT now(),
	updated_at TIMESTAMP DEFAULT now()
)
