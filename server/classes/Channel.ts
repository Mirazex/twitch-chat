import { Userstate } from "tmi.js";
import { Member } from "./Member";

export class Channel {
  readonly id: string;
  readonly name: string;
  readonly display_name: string;
  readonly logo: string;
  members: Member[];
  
  constructor(channel: any = {}) {
    this.id = channel._id
    this.name = channel.name
    this.display_name = channel.display_name
    this.logo = channel.logo
    this.members = []
  }

  getMember(id?: string) {
    return this.members.find(i => i.id === id || i.username === id)
  }
  addMember(data: Userstate) {
    const existed = this.getMember(data['user-id'])
    if (existed) return

    const member = new Member(data)
    this.members.push(member)

    return member
  }
  removeMember(id: string) {
    const existed = this.getMember(id)
    if (!existed) return
    this.members = this.members.filter(i => i.id !== id)
    return true
  }
}