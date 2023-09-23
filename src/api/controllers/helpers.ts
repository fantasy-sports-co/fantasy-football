import { z } from 'zod'
import { NextFunction } from 'express'
import ErrorObject from '../tools/error'

export function parseRequestSchema<T>(dataEntry: any, next: NextFunction, schema?: z.Schema<T>, validationText?: string) {
  if (!schema) return
  try {
    schema.parse(dataEntry)
  } catch (error: any) {
    console.log(error)
    throw next({ message: validationText || 'Invalid request object', code: 422, error: parseZodErrors(error.issues) } as ErrorObject)
  }
}

export function parseZodErrors(errors: object[] | any[]) {
  return errors.map(err => {
    return {
      parameter: err.path[0],
      message: err.message
    }
  })
}
