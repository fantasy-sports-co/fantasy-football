import { createClient } from '@supabase/supabase-js'
import { Database } from './database-types'

const DB_URL = Bun.env.ENV_LOCAL === 'true' ? Bun.env.DB_URL_LOCAL! : Bun.env.DB_URL!
const ANON_KEY = Bun.env.ENV_LOCAL === 'true' ? Bun.env.DB_ANON_KEY_LOCAL! : Bun.env.DB_ANON_KEY!
const SERVICE_ROLE_KEY = Bun.env.ENV_LOCAL === 'true' ? Bun.env.DB_SERVICE_ROLE_LOCAL! : Bun.env.DB_SERVICE_ROLE!

export const supabaseClient = createClient<Database>(DB_URL, ANON_KEY)

// use for auth related stuff master key with elevated priviledges
export const supabaseAdmin = createClient<Database>(DB_URL, SERVICE_ROLE_KEY)
