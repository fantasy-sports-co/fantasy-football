export default interface leaguePlayersResponse {
  get: string
  parameters: {
    league: string
    page: string
    season: string
  }
  errors: any[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: responseType[]
}

interface responseType {
  player: player
  statistics: statistic[]
}

interface statistic {
  team: team
  league: league
  games: games
  substitutes: substitutes
  shots: shots
  goals: goals
  passes: passes
  tackles: tackles
  duels: duels
  dribbles: dribbles
  fouls: fouls
  cards: cards
  penalty: penalty
}

interface player {
  id: number
  name: string
  firstname: string
  lastname: string
  birth: {
    date: string
    place: string
    country: string
  }
  nationality: string
  height: string
  weight: string
  age: number
  injured: boolean
  photo: string
}

interface team {
  id: number
  name: string
  logo: string
}

interface league {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
}

interface goals {
  total: number | null
  conceded: number | null
  assists: number | null
  saves: number | null
}

interface cards {
  yellow: number | null
  yellowred: number | null
  red: number | null
}

interface penalty {
  won: number | null
  commited: number | null
  scored: number | null
  missed: number | null
  saved: number | null
}

interface games {
  appearences: number | null
  lineups: number | null
  minutes: number | null
  number: number | null
  position: string
  rating: string
  captain: boolean
}

interface shots {
  total: number | null
  on: number | null
}

interface substitutes {
  in: number | null
  out: number | null
  bench: number | null
}

interface passes {
  total: number | null
  key: number | null
  accuracy: number | null
}

interface tackles {
  total: number | null
  blocks: number | null
  interceptions: number | null
}

interface duels {
  total: number | null
  won: number | null
}

interface dribbles {
  attempts: number | null
  success: number | null
  past: number | null
}

interface fouls {
  drawn: number | null
  committed: number | null
}