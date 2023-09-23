import path from 'path'
import { params, readCaCert } from './../src/db/pg-params'

const cert = await readCaCert('prod-ca-2021.crt')

require('sql-migrations').run({
  ...params,
  ssl: { mode: 'verify-full', ca: cert },
  migrationsDir: path.resolve(__dirname, 'sql')
})
