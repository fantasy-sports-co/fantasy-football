import path from 'path'
import { params, readCaCert } from './../src/db/pg-params'
import lodash from 'lodash'

const cert = await readCaCert('prod-ca-2021.crt')

require('sql-migrations').rollback({
  ...params,
  ssl: { mode: 'verify-full', ca: cert },
  migrationsDir: path.resolve(__dirname, 'sql'),
  adapter: 'pg'
})
