import { Request, Response, NextFunction } from 'express'
import ErrorObject from '../tools/error'
import { z } from 'zod'
import DBController from './db-controller'
import { parseRequestSchema } from './helpers'

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.string().datetime({ offset: true }),
  favourite_team: z.number(),
  gender: z.string().max(20)
}).required({
  email: true,
  password: true
})

export const loginSchema = z.object({ email: z.string().email(), password: z.string() }).required({
  email: true,
  password: true
})

export default class AuthController {
  dbAdapter: DBController

  constructor(dbAdapter: DBController) {
    this.dbAdapter = dbAdapter
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const dataEntry = req.body
    parseRequestSchema(dataEntry, next, userSchema,)

    const { data: { user }, error } = await this.dbAdapter.supabase.auth.admin.createUser({
      email: dataEntry.email,
      password: dataEntry.password,
    })

    if (error) {
      const err: ErrorObject = { message: error.message, code: error.status }
      return next(err)
    }

    dataEntry.auth_id = user?.id
    delete dataEntry.email
    delete dataEntry.password

    let data
    try {
      data = await this.dbAdapter.create<object, object>([dataEntry])
    } catch (error) {
      console.log(error)
      throw next(error)
    }
    return res.status(200).json({ ...user, user_detail: data })
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const userObject = req.body
    parseRequestSchema(userObject, next, loginSchema,)

    const { data, error } = await this.dbAdapter.supabase.auth.signInWithPassword({
      email: userObject.email,
      password: userObject.password
    })
    if (error) return next({ message: error.message, code: error.status } as ErrorObject)
    return res.status(200).json({
      access_token: data.session.access_token,
      token_type: data.session.token_type,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in,
      expires_at: data.session.expires_at
    })
  }

  async passwordReset(req: Request, res: Response, next: NextFunction) {
    const userObject = req.body
    const schema = z.string({ required_error: 'email is required in request body' }).email()
    parseRequestSchema(userObject.email, next, schema,)

    this.dbAdapter.supabase.auth.updateUser({

    })
    const { error } = await this.dbAdapter.supabase.auth.resetPasswordForEmail(userObject.email!, {
      redirectTo: 'https://github.com/ngbede'
    })
    if (error) return next({ message: error.message, code: error.status } as ErrorObject)
    return res.status(200).json({ message: 'Email reset link sent, check your email' })
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body
    parseRequestSchema(user, next, loginSchema,)
    const { data, error } = await this.dbAdapter.supabase.auth.updateUser({
      email: user.email,
      password: user.password
    })
    console.log(error)
    return res.status(200).json(data)
  }
}
