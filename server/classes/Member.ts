import { Userstate } from "tmi.js";

export class Member {
  readonly id: string
  readonly badges: any
  readonly display_name: string
  readonly mod: boolean
  readonly username: string
  readonly channel: string
  readonly color: string

  constructor(member: any) {
    this.id = member['user-id']
    this.channel = member["room-id"]
    this.username = member.username
    this.badges = member.badges
    this.display_name = member['display-name']
    this.mod = member.mod
    this.color = member.color
  }
}