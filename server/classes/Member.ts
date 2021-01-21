export class Member {
  readonly id: string
  readonly badges: any
  readonly display_name: string
  readonly mod: boolean
  readonly channel: string

  constructor(member: any) {
    this.id = member['user-id']
    this.channel = member["room-id"]
    this.badges = member.badges
    this.display_name = member['display-name']
    this.mod = member.mod
  }
}