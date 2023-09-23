import { Router } from 'express'
import DBController from '../../api/controllers/db-controller'
import BaseController from '../../api/controllers/base-controller'
import { z } from 'zod'
import { getTeamById } from '../../api/sql/team-profile'

const teamProfileRoute = Router()
const dbAdapter = new DBController('team_profile', undefined, 'team profile')
const controller = new BaseController(dbAdapter)
const getSchema = z.string({ required_error: 'id is required in request params' })
const listSchema = z.object({ id: z.string() })
const postSchema = z.object({ team_name: z.string(), season_id: z.string(), user_id: z.number() })

teamProfileRoute.get('/', (req, res, next) => controller.getList(req, res, next, listSchema))
teamProfileRoute.get('/:id', (req, res, next) => controller.getOne(req, res, next, getSchema, { query: getTeamById }))
teamProfileRoute.post('/create', (req, res, next) => controller.post(req, res, next, postSchema))
teamProfileRoute.patch('/:id', (req, res, next) => controller.patch(req, res, next))
teamProfileRoute.delete('/:id', (req, res, next) => controller.delete(req, res, next, getSchema))

export default teamProfileRoute
