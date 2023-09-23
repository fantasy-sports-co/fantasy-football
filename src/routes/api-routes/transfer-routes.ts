import { Router } from 'express'
import DBController from '../../api/controllers/db-controller'
import { z } from 'zod'
import { getPlayerList } from '../../api/sql/player-list'
import TransferController from '../../api/controllers/transfer-controller'

const filterColumns = ['team_id', 'position']
const transferRoute = Router()
const dbAdapter = new DBController('user_squad_entry', undefined, 'user squad entry')
const controller = new TransferController(dbAdapter)
const squadSelectionSchema = z.object({
  league_id: z.number(),
  player_ids: z.number().array().length(15),
  team_id: z.number()
})

transferRoute.get(
  '/player-list',
  (req, res, next) => controller.getList(req, res, next, undefined, { query: getPlayerList(req.query, filterColumns, req) })
)
transferRoute.post('/squad-selection', (req, res, next) => controller.post(req, res, next, squadSelectionSchema))

export default transferRoute
