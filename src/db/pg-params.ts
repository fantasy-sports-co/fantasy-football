import fs from 'fs'
import path from 'path'

export interface paramType {
  user: string | undefined
  host: string | undefined
  database: string | undefined
  password: string | undefined
  port: number
  max: number
  idleTimeoutMillis: number | undefined
  connectionTimeoutMillis: number | undefined
  ssl: object | undefined
}

const HOST = Bun.env.ENV_LOCAL === 'true' ? Bun.env.PG_HOST_LOCAL : Bun.env.PG_HOST
const PASSWORD = Bun.env.ENV_LOCAL === 'true' ? Bun.env.PG_PASSWORD_LOCAL : Bun.env.PG_PASSWORD
const PORT = Bun.env.ENV_LOCAL === 'true' ? Bun.env.PG_PORT_LOCAL! : Bun.env.PG_PORT!

export const params: paramType = {
  user: Bun.env.PG_USER,
  host: HOST,
  database: Bun.env.PG_DATABASE,
  password: PASSWORD,
  port: parseInt(PORT),
  max: 30,
  idleTimeoutMillis: 300000,
  connectionTimeoutMillis: 60000,
  ssl: undefined
}

export async function readCaCert(caCert: string) {
  const buffer = await fs.promises.readFile(path.resolve(__dirname.concat('../../../'), caCert))
  return buffer.toString()
}
