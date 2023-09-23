import { NextFunction, Request, Response } from 'express'
import ErrorObject from '../api/tools/error'

const errorHandle = (
  error: ErrorObject,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: there is a weired error that happens here, watch this space
  // console.error('Error handler: ', error) 
  const err = (error.code || 500).toString()

  console.log(error)
  if (err.startsWith('5')) {
    delete error.error
    error.message = 'Internal server error'
    error.code = 500
  }
  error.message = error.message ?? 'An error occured please contact support'
  return res.status(parseInt(err)).json(error)
}

export default errorHandle
