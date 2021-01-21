import { ChannelStateType } from "./types";

export const SET_CHANNEL = (state: ChannelStateType, channel: string) => {
  state.current = Object.freeze(channel)
}

// Members
export const SET_MEMBERS = (state: ChannelStateType, members: any[]) => {
  state.members = Object.freeze(members)
}

export const JOIN_MEMBER = (state: ChannelStateType, member: any) => {
  if (state.members.find(m => m.id === member.id)) return
  state.members = Object.freeze([...state.members, member])
}

export const JEAVE_MEMBER = (state: ChannelStateType, id: string) => {
  if (!state.members.find(m => m.id === id)) return
  state.members = state.members.filter(m => m.id !== id)
}

// Messages
export const ADD_MESSAGE = (state: ChannelStateType, message: string) => {
  if (state.messages.length >= 60) state.messages = state.messages.filter((_, i) => i !== (state.messages.length - 1))
  state.messages = Object.freeze([message, ...state.messages])
}

export const CLEAR_MESSAGES = (state: ChannelStateType) => {
  state.messages = []
}



