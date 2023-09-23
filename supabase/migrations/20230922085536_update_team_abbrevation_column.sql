alter table public.teams
drop column abbrevations;

alter table public.teams
add column short_name VARCHAR(10);
