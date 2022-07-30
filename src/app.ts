import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express'
import { Server } from 'http'
import createHttpError from 'http-errors'
import { config } from 'dotenv'
import cors from 'cors'

config()

const app: Application = express()

app.use(cors())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // res.send({
  //   status: 200,
  //   message: 'success',
  //   body: {
  //     test: 'data'
  //   }
  // })
  res.setHeader('Content-Type', 'application/json')
  res.json({ a: 1 })
})

app.post('/register', (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(req)
})

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message
  })
}

app.use(errorHandler)

const port: Number = Number(process.env.PORT) || 3000

const server: Server = app.listen(port, () => console.log('Server running'))
