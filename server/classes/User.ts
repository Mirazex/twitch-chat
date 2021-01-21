import { Socket } from "socket.io";

export class User {
  readonly socket: string
  readonly name: string
  channel: any

  constructor(socket: Socket) {
    this.socket = socket.id
    this.name = 'anonymous'
    this.channel = null
  }
}