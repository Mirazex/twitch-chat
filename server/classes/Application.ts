import { reset } from "chalk";
import { Server } from "socket.io";

import { Twitch } from "../classes/Twitch"
import { createLogger, LoggerType } from "../utils/createLogger"

import { Channel } from "./Channel";
import { ChannelManager } from "./ChannelManager";
import { UserManager } from "./UserManager";

export class Application {
  readonly twitch: Twitch
  readonly io: Server
  readonly logger: LoggerType
  readonly channels: ChannelManager
  readonly users: UserManager

  constructor(io: Server) {
    this.io = io
    this.logger = createLogger()
    this.twitch = new Twitch(this.logger)

    this.users = new UserManager(this)
    this.channels = new ChannelManager(this)

    this.handleEvents()
  }

  handleEvents() {
    this.io.on('connection', (socket) => {
      const clientId = this.twitch.clientId
      const headers = this.twitch.api.getHeaders(clientId)

      const user = this.users.add(socket)
      socket.on('disconnect', () => this.users.remove(socket.id))

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
        if (!channel) return socket.emit('twitch:join-channel', null)
        if (this.channels.get(channel._id)) {
          socket.join(channel._id)
          return socket.emit('twitch:join-channel', this.channels.get(channel._id))
        }

        try {
          await this.twitch.join(channel.display_name)
          const newChannel = this.channels.add(channel)

          user.channel = newChannel.id
          socket.join(newChannel.id)
          this.logger.info('user', user.socket, 'connected to new channel', newChannel.display_name)
          socket.emit('twitch:join-channel', newChannel)

        } catch(e) {
          this.logger.info('failed connect to channel', channel.display_name)
          socket.emit('twitch:join-channel', null)
        }
      })
    })

    this.twitch.on('chat', (_, member, message, self) => {
      if (self) return
      
      member.badges = member.badges || {}
      const channelId: string = member["room-id"]!
      const memberId: string = member["user-id"]!

      const channel: any = this.channels.get(channelId)

      let author: any = channel.getMember(memberId)
      if (!author) {
        author = channel.addMember(member)
        this.io.to(channel.id).emit('twitch:join-member', author)
        this.logger.info('join new member to chat', author["display_name"])
      }

      this.logger.info(`message: <${channel.id}|${channel.display_name}> from ${author.display_name}`, message)
      this.io.to(channel.id).emit('twitch:message', author, message)
    })

    this.twitch.on('part', (channel: any, username, self) => {
      if (self) return
  
      
      channel = this.channels.get(channel.split('#')[1])
      const member = channel.getMember(username)
      if (!member) return

      this.io.to(channel.id).emit('twitch:leave-member', member.id)
    })

  }
}