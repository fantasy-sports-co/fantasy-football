import { User } from '@supabase/supabase-js'

// add custom global user object to express requests
declare global {
  namespace Express {
    interface Request {
      values: string[] | any[string]
    }
  }
}
