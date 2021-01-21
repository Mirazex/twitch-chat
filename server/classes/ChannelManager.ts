import { Application } from "./Application";
import { Channel } from "./Channel";

export class ChannelManager {
  readonly app: Application
  cache: Channel[]

  constructor(app: Application) {
    this.app = app
    this.cache = []
  }

  add(data: any) {
    const exists = this.cache.find(i => i.id === data._id)
    if (exists) return exists
    
    const channel = new Channel(data)
    this.cache.push(channel)
    this.app.logger.info(`register channel <${channel.id}|${channel.display_name}>`)
    return channel
  }

  get(id: string) {
    return this.cache.find(i => i.id === id || i.name === id)
  }

  remove(id: string) {
    const channel = this.cache.find(i => i.id === id)
    if (!channel) return

    this.cache = this.cache.filter(i => i.id !== id)
    this.app.logger.warn(`unregister channel <${channel.id}|${channel.display_name}>`)
    return channel
  }
}