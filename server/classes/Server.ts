import express from "express"
import cors from "cors"
import * as http from "http"
import io from "socket.io"


import { Application } from "./Application"
import { errorHandler, notFoundHandler } from "../middlewares/handlers"

export class Server {
  private readonly app = express()
  private readonly server = http.createServer(this.app)
  private readonly io = new io.Server(this.server, { cors: { origin: "*" } })
  private readonly Application: Application

  constructor() {
    this.Application = new Application(this.io)

    this.addMiddleware(cors({ origin: "*" }))
    this.addMiddleware(express.static('public'))

    this.addMiddleware(notFoundHandler) 
    this.addMiddleware(errorHandler)
  }

  addMiddleware(middleware: any) {
    this.app.use(middleware)
  }

  listen(port: number | string) {
    this.server.listen(port)
    
    this.server.on("error", (e) => this.Application.logger.fatal(e))
    this.server.on("listening", () => {
      this.Application.logger.info("server listened at", port || "5000")
    })
  }
}
