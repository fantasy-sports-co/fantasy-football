import { pgInstance } from '../db/pg'
import RestAdapter from '../api/adapter/rest-adapter'
import ApiFootball from '../api/api-football/api-interface'
import LivescoreApi from '../api/livescore-api/api-interface'
import { getInsertProperties } from '../api/tools/sql-tools'
import { groupBy } from 'lodash'

const restAdapter = new RestAdapter(
  Bun.env.FOOTBALL_API_URL!,
  Bun.env.FOOTBALL_API_KEY!,
  {
    'X-RapidAPI-Key': Bun.env.FOOTBALL_API_KEY,
    'X-RapidAPI-Host': Bun.env.FOOTBALL_API_HOST
  }
)

const restAdapter2 = new RestAdapter(
  Bun.env.LIVE_SCORE_API_URL!,
  Bun.env.LIVE_SCORE_API_KEY!,
)

export const positionsToID: any = {
  'Midfielder': 3,
  'Goalkeeper': 2,
  'Attacker': 5,
  'Defender': 1
}

const teamList = [
  {
    id: 1,
    name: "Wolves"
  }, {
    id: 2,
    name: "Tottenham",
  }, {
    id: 3,
    name: "Liverpool"
  }, {
    id: 4,
    name: "Manchester United"
  }, {
    id: 5,
    name: "Nottingham Forest"
  }, {
    id: 6,
    name: "West Ham"
  }, {
    id: 7,
    name: "Fulham"
  }, {
    id: 8,
    name: "Sheffield Utd"
  }, {
    id: 9,
    name: "Crystal Palace"
  }, {
    id: 10,
    name: "Everton"
  }, {
    id: 11,
    name: "Bournemouth"
  }, {
    id: 12,
    name: "Aston Villa"
  }, {
    id: 13,
    name: "Newcastle"
  }, {
    id: 14,
    name: "Chelsea"
  }, {
    id: 15,
    name: "Luton"
  }, {
    id: 16,
    name: "Arsenal"
  }, {
    id: 17,
    name: "Brentford"
  }, {
    id: 18,
    name: "Manchester City"
  }, {
    id: 19,
    name: "Brighton"
  }, {
    id: 20,
    name: "Liverpool U21"
  }, {
    id: 21,
    name: "Burnley"
  }
]

const teamLstByName = groupBy(teamList, 'name')

const teamGroup: object[] = []
const playerGroup: object[] = []
const teamsRecorded: string[] = []

const apiFootballAdapter = new ApiFootball(restAdapter)
const { data } = await apiFootballAdapter.getLeaguePlayers({ league: '39', season: '2023', page: '2' })

if (data.results) {
  data.response.forEach(entry => {
    const index = entry.statistics.length - 1
    let teamName = entry.statistics[index].team.name
    if (!teamsRecorded.includes(teamName) && teamsRecorded.length !== 20) {
      teamGroup.push({
        name: teamName,
        league_id: 1,
        season_id: 1
      })
      teamsRecorded.push(teamName)
      playerGroup.push({
        first_name: entry.player.firstname,
        last_name: entry.player.lastname,
        position_id: positionsToID[entry.statistics[index].games.position],
        team_id: teamLstByName[teamName][0].id
      })
    }
  })
  for (let i = 3; i <= data.paging.total; i++) {
    const { data } = await apiFootballAdapter.getLeaguePlayers({ league: '39', season: '2023', page: `${i}` })
    data.response.forEach(entry => {
      const index = entry.statistics.length - 1
      let teamName = entry.statistics[index].team.name
      playerGroup.push({
        first_name: entry.player.firstname,
        last_name: entry.player.lastname,
        position_id: positionsToID[entry.statistics[index].games.position],
        team_id: teamLstByName[teamName][0].id
      })

    })
    console.log(`Page: ${data.paging.current}`)
    console.log(teamsRecorded)
    // if (teamsRecorded.length === 21) break
  }
}

console.log(teamGroup)
await pgInstance.connect()

try {
  const { columns, values, placeholders } = getInsertProperties(playerGroup, ['first_name', 'last_name', 'position_id', 'team_id'])
  const { rows } = await pgInstance.query(`insert into public.players (${columns}) values ${placeholders} returning *`, values)
  console.log(rows)
} catch (error) {
  console.log(error)
} finally {
  await pgInstance.disconnect()
}