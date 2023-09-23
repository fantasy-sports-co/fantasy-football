import { Pool } from 'pg'
import { paramType, params, readCaCert } from './pg-params'

export class Pg {
  params: paramType
  private _pool!: Pool

  constructor(params: paramType) {
    this.params = params
  }

  async connect() {
    let cert: string | undefined
    if (Bun.env.ENV_LOCAL !== 'true') {
      try {
        cert = await readCaCert('prod-ca-2021.crt')
      } catch (e) {
        console.error(e)
      }
    }
    this.params.ssl = cert ? { mode: 'verify-full', ca: cert } : undefined
    this._pool = new Pool(this.params)
    return this._pool.connect()
  }

  disconnect() {
    return this._pool.end()
  }

  async query(queryString: string, queryParams?: Array<String>) {
    try {
      const result = await this._pool.query(queryString, queryParams)
      return result
    } catch (e: any) {
      throw new Error(`${e}`)
    }
  }
}

// export new instance
export const pgInstance = new Pg(params)

// console.log(params)

// await pgInstance.connect()

// const data = await pgInstance.query('select * from auth.users')
// console.log(data)
