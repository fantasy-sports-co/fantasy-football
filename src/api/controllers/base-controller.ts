import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import DBController from './db-controller'
import ErrorObject from '../tools/error'
import { parseRequestSchema } from './helpers'

interface filter {
  orderBy?: string
  limit?: number
  page?: number
}

export default class BaseController {
  dbAdapter: DBController

  constructor(dbAdapter: DBController) {
    this.dbAdapter = dbAdapter
  }

  _rejectPatchColumns(reqBody: any, next: NextFunction, invalidCols?: string[]) {
    const bodyKeys: string[] = Object.keys(reqBody)
    const columns: string[] = ['id'].concat(invalidCols || [])
    let invalidReq = bodyKeys.some(el => columns.includes(el))
    if (!invalidReq) return
    const error: ErrorObject = {
      message: 'Invalid request, cant update specified columns in request body',
      code: 400,
      error: columns
    }
    throw next(error)
  }

  async getOne<S, T>(
    req: Request,
    res: Response,
    next: NextFunction,
    schema?: z.ZodSchema<S>,
    params?: { query?: string, validationText?: string, selectColumns?: string[] }
  ) {
    const id = req.params.id
    parseRequestSchema(id, next, schema, params?.validationText)
    if (params?.query) {
      let q = params.query.concat(' LIMIT 1')
      try {
        const data = await this.dbAdapter.runQuery<T>(q, [id])
        return res.status(200).json(data[0])
      } catch (error) {
        next(error)
      }
    }

    try {
      const data = await this.dbAdapter.get<T>(['*'], { id }, 1)
      return res.status(200).json(data[0])
    } catch (error) {
      next(error)
    }
  }

  async getList<S, T>(
    req: Request,
    res: Response,
    next: NextFunction,
    schema?: z.ZodSchema<S>,
    params?: { query?: string, validationText?: string, selectColumns?: string[], filters?: filter }
  ) {
    const id = req.params.id
    parseRequestSchema(id, next, schema, params?.validationText)
    if (params?.query) {
      try {
        const data = await this.dbAdapter.runQuery<T>(params.query, req.values)
        return res.status(200).json(data)
      } catch (error) {
        next(error)
      }
    }

    try {
      const data = await this.dbAdapter.get<T>(['*'], { id })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  async post<T>(req: Request, res: Response, next: NextFunction, schema?: z.ZodSchema<T>) {
    const dataEntry = req.body
    parseRequestSchema(dataEntry, next, schema)

    try {
      const data = await this.dbAdapter.create<object, object>([dataEntry])
      return res.status(200).json(data)
    } catch (error) {
      throw next(error)
    }
  }

  async patch<T>(
    req: Request,
    res: Response,
    next: NextFunction,
    schema?: z.ZodSchema<T>,
    params?: { query?: string, validationText?: string, selectColumns?: string[], excludedColumns?: string[] }
  ) {
    const id = req.params.id
    const dataEntry = req.body
    this._rejectPatchColumns(dataEntry, next, params?.excludedColumns)
    parseRequestSchema(dataEntry, next, schema)

    try {
      const data = await this.dbAdapter.update<object, object>(dataEntry, 'id', id)
      return res.status(200).json(data)
    } catch (error) {
      throw next(error)
    }
  }

  async put(req: Request, res: Response, next: NextFunction) {
    const error: ErrorObject = { message: 'Implement your own custom put method on extended class!', code: 500 }
    next(error)
  }

  async delete<T>(
    req: Request,
    res: Response,
    next: NextFunction,
    schema?: z.ZodSchema<T>,
    params?: { validationText?: string }) {
    const id = req.params.id
    parseRequestSchema(id, next, schema, params?.validationText)

    try {
      const data = await this.dbAdapter.delete<T>('id', id)
      return res.status(200).json(data[0])
    } catch (error) {
      next(error)
    }
  }
}
