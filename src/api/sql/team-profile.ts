export const getTeamById = `
  select 
    tp.id,
    u.favourite_team,
    concat(u.first_name, ' ', u.last_name) as name,
    tp.team_name,
    s.season,
    tp.created_at,
    tp.updated_at
  from public.user_detail u
  left join public.team_profile tp on tp.user_id = u.id
  left join public.season s on tp.season_id = s.id
  where tp.id = $1
`
