import { Router } from 'express'
import AuthController, { userSchema } from '../../api/controllers/auth-controller'
import DBController from '../../api/controllers/db-controller'

const userRoute = Router()
const dbAdapter = new DBController('user_detail', undefined, 'user')
const authHandler = new AuthController(dbAdapter)

userRoute.post('/signup', (req, res, next) => authHandler.create(req, res, next))
userRoute.post('/login', (req, res, next) => authHandler.login(req, res, next))
userRoute.post('/reset-password', (req, res, next) => authHandler.passwordReset(req, res, next))
userRoute.post('/update-user', (req, res, next) => authHandler.updateUser(req, res, next))

export default userRoute
