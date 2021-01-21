import { Channel } from "./Channel";

export class User {
  readonly socket: string
  readonly name: string
  channel: any

  constructor(socket: string) {
    this.socket = socket
    this.name = 'anonymous'
    this.channel = null
  }
}