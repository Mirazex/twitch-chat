import { Socket } from "socket.io";
import { Application } from "./Application";
import { User } from "./User";

export class UserManager {
  readonly app: Application
  cache: User[]
  
  constructor(app: Application) {
    this.app = app
    this.cache = []
  }

  add(data: Socket) {
    const exists = this.cache.find(i => i.socket === data.id)
    if (exists) return exists
    
    const user = new User(data)
    this.cache.push(user)
    this.app.logger.info(`connected user <${user.socket}|${user.name}>`)
    return user
  }

  get(id: string) {
    return this.cache.find(i => i.socket === id)
  }

  remove(id: string) {
    const user = this.cache.find(i => i.socket === id)
    if (!user) return

    this.cache = this.cache.filter(i => i.socket !== id)
    this.app.logger.warn(`disconnected user <${user.socket}|${user.name}>`)
    return user
  }
}