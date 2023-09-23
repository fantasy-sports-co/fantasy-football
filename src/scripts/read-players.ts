import ApiFootball from '../api/api-football/api-interface'
import RestAdapter from '../api/adapter/rest-adapter'
import { pgInstance } from '../db/pg'
import { getInsertProperties } from '../api/tools/sql-tools'
import leaguePlayersResponse from '../api/api-football/shcema'
import { PoolClient } from 'pg'

export interface TeamSchema {
  id: number,
  name: string,
  stadium: string | null
  abbrevations: string[] | null
  league_id: number | null
  season_id: number | null
  source: string | null
  external_id: string | null
}

const positionsToID: any = {
  'Midfielder': 3,
  'Goalkeeper': 2,
  'Attacker': 5,
  'Defender': 1
}
const TEAM_ID_TO_EXPORT_PLAYERS = 20

const restAdapter = new RestAdapter(
  Bun.env.FOOTBALL_API_URL!,
  Bun.env.FOOTBALL_API_KEY!,
  {
    'X-RapidAPI-Key': Bun.env.FOOTBALL_API_KEY,
    'X-RapidAPI-Host': Bun.env.FOOTBALL_API_HOST
  }
)
const apiFootballAdapter = new ApiFootball(restAdapter)

const pgClient = await pgInstance.connect()

const { rows } = await pgClient.query<TeamSchema>(`select * from public.teams where id = $1`, [TEAM_ID_TO_EXPORT_PLAYERS])
console.log('Team ', rows)

for (const row of rows) {
  const { data } = await apiFootballAdapter.getLeaguePlayers({
    team: row.external_id,
    season: 2023,
    page: `1`
  })

  if (data.results) {
    await exportHandler(data, pgClient, row.id)
    for (let i = data.paging.current + 1; i <= data.paging.total; i++) {
      console.log('Next page ', i)
      const { data: data2 } = await apiFootballAdapter.getLeaguePlayers({
        team: row.external_id,
        season: 2023,
        page: `${i}`
      })
      await exportHandler(data2, pgClient, row.id)
    }
  }
}


async function exportHandler(playerData: leaguePlayersResponse, pg: PoolClient, teamId: number) {
  const playerList = []
  if (playerData.results) {
    for (const player of playerData.response) {
      const index = player.statistics.length - 1
      playerList.push({
        external_id: player.player.id,
        first_name: player.player.firstname,
        last_name: player.player.lastname,
        position_id: positionsToID[player.statistics[index].games.position],
        team_id: teamId,
        source: 'API-FOOTBALL'
      })
    }
    console.log(`Page: ${playerData.paging.current}`)
    const { columns, values, placeholders } = getInsertProperties(playerList, ['first_name', 'last_name', 'position_id', 'team_id', 'external_id', 'source'])
    const { rows } = await pg.query(`insert into public.players (${columns}) values ${placeholders} returning *`, values)
    console.log(rows.length, ` rows exported to public.players`)
  }
}
