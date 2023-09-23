import { Router } from 'express'
import userRoute from './api-routes/user-routes'
import teamProfileRoute from './api-routes/team-profile-routes'
import transferRoute from './api-routes/transfer-routes'
const v1Url = '/v1'

const router = Router()
router.use(`${v1Url}/user`, userRoute)
router.use(`${v1Url}/team-profile`, teamProfileRoute)
router.use(`${v1Url}/transfer`, transferRoute)

export default router
