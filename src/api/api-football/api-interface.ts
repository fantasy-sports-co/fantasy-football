import RestAdapter from './../adapter/rest-adapter'
import leaguePlayersResponse from './shcema'

export default class ApiFootball {
  private restAdapter: RestAdapter
  private endpoints = {
    teamSquads: '/players/squads',
    leaguePlayers: '/players'
  }

  // 39 - EPL
  // 399 - NPFL
  constructor(restAdapter: RestAdapter) {
    this.restAdapter = restAdapter
  }

  getTeamSquad(params: object) {
    return this.restAdapter.read(this.endpoints.teamSquads, params)
  }

  getLeaguePlayers(params: object) {
    return this.restAdapter.read<leaguePlayersResponse>(this.endpoints.leaguePlayers, params)
  }
}
