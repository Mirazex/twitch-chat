import { reset } from "chalk";
import { Server } from "socket.io";

import { Twitch } from "../classes/Twitch"
import { createLogger, LoggerType } from "../utils/createLogger"
import { Channel } from "./Channel";
import { Member } from "./Member";
import { User } from "./User";

export class Application {
  readonly twitch: Twitch
  readonly channels: Map<string, any>
  readonly logger: LoggerType
  readonly io: Server

  constructor(io: Server) {
    this.io = io
    this.logger = createLogger()
    this.twitch = new Twitch(this.logger)
    this.channels = new Map()

    this.handleEvents()
  }

  handleEvents() {
    this.io.on('connect', (socket) => {
      const clientId = this.twitch.clientId
      const headers = this.twitch.api.getHeaders(clientId)
      const user = new User(socket.id);

      this.logger.info(`connected user`, user.socket)
      

      // Search Twitch Channel
      socket.on('twitch:search-channel', async (channelName: string) => {
        this.logger.info('search channel', channelName)

        try {
          const res = await this.twitch.api.getChannel(channelName, headers)
          const data = {
            total: res.total,
            channels: res.channels.map((channel: any) => new Channel(channel))
          }

          this.logger.info(`founded ${data.total} channels`)
          socket.emit('twitch:search-channel', data)
        } catch(e) {
          this.logger.error(e)
        }
      })

      // Join to Channel
      socket.on('twitch:join-channel', async (id: string) => {
        const channel: any = await this.twitch.api.getChannelById(id, headers)
        this.logger.info('join to channel', id)

        if (!channel) {
          this.logger.info('channel', id, 'not found')
          return socket.emit('twitch:join-channel', null)
        }

        if (this.channels.has(channel._id)) {
          this.logger.info(user.socket, 'connected to existed channel', channel.display_name)
          return socket.emit('twitch:join-channel', this.channels.get(channel._id))
        }
        
        const newChannel = new Channel(channel)

        try {
          await this.twitch.join(newChannel.display_name)
          this.channels.set(newChannel.id, newChannel)

          user.channel = newChannel.id
          this.logger.info('user', user.socket, 'connected to new channel', newChannel.display_name)
          socket.emit('twitch:join-channel', newChannel)

        } catch(e) {
          this.logger.info('failed connect to channel', newChannel.display_name)
          socket.emit('twitch:join-channel', null)
        }
      })

      // Handle Twitch Message
      this.twitch.on('message', (_, member, message, self) => {
        if (self) return
        if (member["message-type"] !== 'chat') return
        
        member.badges = member.badges || {}
        const channelId: string = member["room-id"]!
        const memberId: string = member["user-id"]!

        const channel: Channel = this.channels.get(channelId)
        let author: any = channel.getMember(memberId)
        if (!author) {
          author = channel.addMember(member)
          socket.emit('twitch:join-member', author)
          this.logger.info('join new member to chat', author["display_name"])
        }

        console.log(user.channel !== channel.id)
        console.log(user.socket, channel.display_name)
        if (user.channel !== channel.id) return

        this.logger.info('new message', channel.members.length, author["display_name"], message)
        socket.emit('twitch:message', author, message)
      })

      socket.on('disconnect', () => this.logger.warn(`disconnected`, user.socket))
    })
  }
}