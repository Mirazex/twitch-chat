export const SET_CHANNEL = (state, channel) => {
  state.current = channel
}

// Members
export const SET_MEMBERS = (state, members: any[]) => {
  state.members = members
}

export const JOIN_MEMBER = (state, member) => {
  if (state.members.find(m => m.id === member.id)) return
  state.members.push(member)
}

export const JEAVE_MEMBER = (state, member) => {
  if (!state.members.find(m => m.id === member.id)) return
  state.members = state.members.filter(m => m.id !== member.id)
}

// Messages
export const ADD_MESSAGE = (state, message) => {
  state.messages.push(message)
}

export const CLEAR_MESSAGES = (state) => {
  state.messages = []
}



