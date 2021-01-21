import { NextFunction, Request, Response } from "express"

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  const error = new Error(`Not Found - ${req.originalUrl}`)
  next(error)
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(res.statusCode || 500)
  res.send(`<pre>${err}</pre>`)
}