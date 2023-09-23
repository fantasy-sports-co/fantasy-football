import RestAdapter from './../adapter/rest-adapter'

export default class LivescoreApi {
  private restAdapter: RestAdapter
  private optionalParams: object
  private endpoints = {
    teamList: '/teams/list.json'
  }

  static secretParams = {
    'key': Bun.env.LIVE_SCORE_API_KEY,
    'secret': Bun.env.LIVE_SCORE_API_SECRET
  }

  constructor(restAdapter: RestAdapter, optionalParams?: object) {
    this.restAdapter = restAdapter
    this.optionalParams = optionalParams || {}
  }

  getTeamList(params: object) {
    return this.restAdapter.read<any>(this.endpoints.teamList, { ...params, ...this.optionalParams })
  }
}
