import { NextFunction, Request } from 'express'
import { parseOffsetLimit, parseQueryColumns } from "./utils"

export const playerListSubQuery = `
  select 
    p.id,
    p.first_name,
    p.last_name,
    ps.position,
    ps.abbrevation as pos,
    p.team_id,
    t.name,
    t.short_name,
    0 as points
  from public.players p
  left join public.teams t on t.id = p.team_id
  left join public.positions ps on ps.id = p.position_id
  left join public.leagues l on l.id = t.league_id
  where p.active is true
`

export const getPlayerList = (query: any | object, filterColumns: string[], req: Request) => {
  const { limit, offset } = parseOffsetLimit(query.limit, query.page)
  const { args, values } = parseQueryColumns(filterColumns, query)
  req.values = values
  return `
  with players_list as (
    ${playerListSubQuery}
    ${args ? ` and ${args} ` : ''}
    limit ${limit} offset ${offset}
  ),
  goalkeepers as (
    select 
      coalesce(jsonb_agg(g), '[]'::jsonb) as players,
      'Goalkeepers' as position
    from players_list g where pos IN ('GK')
  ),
  defenders as (
    select
      coalesce(jsonb_agg(d), '[]'::jsonb) as players,
      'Defenders' as position
    from players_list d where pos IN ('DEF')
  ),
  midfielders as (
    select
      coalesce(jsonb_agg(m), '[]'::jsonb) as players,
      'Midfielders' as position
    from players_list m where pos IN ('MID')
  ),
  forwards as (
    select
      coalesce(jsonb_agg(f), '[]'::jsonb) as players,
      'Forwards' as position
    from players_list f where pos IN ('FW')
  )
  select * from goalkeepers
  UNION
  select * from defenders
  UNION
  select * from midfielders
  UNION 
  select * from forwards`
}
