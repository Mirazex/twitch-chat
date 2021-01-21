import { client } from "tmi.js"

import { LoggerType } from "../utils/createLogger"
import * as config from "../config"
import * as api from "../api/twitch"

export class Twitch extends client {
  readonly clientId: string = process.env["TWITCH_CLIENT_ID"] || ""
  readonly clientSecret: string = process.env["TWITCH_SECRET_KEY"] || ""
  readonly logger: LoggerType
  readonly api = api

  constructor(logger: LoggerType) {
    super(config.tmi)

    this.logger = logger
    this.connect()
      .catch((e) => console.log(e))
  }
}