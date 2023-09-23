import { NextFunction, Request, Response } from 'express'
import BaseController from './base-controller'
import DBController from './db-controller'
import { z } from 'zod'
import { parseRequestSchema } from './helpers'
import { getListArgs } from '../tools/sql-tools'

interface gameWeekConfig {
  required_players: number
  required_goalkeepers: number
  required_defenders: number
  required_midfielders: number
  required_forwards: number
  max_players_per_team: number
  max_transfers_per_gw: number
  required_starting_squad: number
  league_id: number
  created_at: string
  updated_at: string
  id: string
  gw_uuid: string
  gw: string | null
  is_active: boolean
  start_date: string | null
  end_date: string | null
}

interface squadEntry {
  player_id: number
  team_id: number
  game_week: string
  is_starting: boolean
  position_id: number
  season_id: number
  league_id: number
  league_team_id: number
}

export default class TransferController extends BaseController {
  constructor(dbAdapter: DBController) {
    super(dbAdapter)
  }

  async post<T>(req: Request, res: Response, next: NextFunction, schema?: z.ZodSchema<T>) {
    const dataEntry = req.body
    parseRequestSchema(dataEntry, next, schema)

    let gwConfig: gameWeekConfig
    try {
      const data = await this.dbAdapter.runQuery<gameWeekConfig>(`
        select
          sc.*,
          gw.id as gw_uuid,
          gw,
          is_active, 
          start_date, 
          end_date 
        from public.squad_configs sc
        left join public.game_weeks gw on gw.league_id = sc.league_id
        where sc.league_id = $1 and gw.is_active is true`,
        [`${dataEntry.league_id}`]
      )
      gwConfig = data[0]

      const { args, nextOffset } = getListArgs(dataEntry.player_ids)
      console.log(args)

      try {
        const squadData = await this.dbAdapter.runQuery<squadEntry>(`
          select
            p.id as player_id,
            tp.id as team_id,
            --t.name,
            --ps.position,
            '${gwConfig.gw_uuid}' as game_week,
            false as is_starting,
            p.position_id,
            tp.season_id,
            gw.league_id,
            t.id as league_team_id
          from public.team_profile tp 
          left join public.teams t on t.season_id = tp.season_id
          left join public.players p on t.id = p.team_id
          left join public.game_weeks gw on gw.league_id = t.league_id
          left join public.positions ps on ps.id = p.position_id
          where p.id in (${args}) and tp.id = $${nextOffset} 
      `, [...dataEntry.player_ids, dataEntry.team_id])
        console.log(squadData)

        const data = await this.dbAdapter.create(squadData)
        console.log(data)
      } catch (error) {
        console.log(error)
        next(error)
      }


    } catch (error) {
      throw next(error)
    }
    return res.status(200).json(gwConfig)
  }
}
