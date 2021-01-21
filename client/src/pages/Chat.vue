<template>
  <div class="content" v-if="channel.current">
    <div class="content-header">
      <img class="background" :src="channel.current.logo" :alt="channel.current.display_name">
      <div class="header-content">
        <div class="channel-image">
          <img :src="channel.current.logo" :alt="channel.current.display_name">
        </div>
        <div class="channel-name">
          <span>{{ channel.current.display_name }}</span>
        </div>
      </div>
    </div>
    <div class="messages-list">
      <div class="message" v-for="(message, i) of channel.messages" :key="i">
        <div class="message-author">
          <span>{{ channel.members.find(m => m.id === message.member)?.display_name }}</span>
        </div>

        <div class="message-content">
          <p>{{ message.content }}</p>
        </div>

      </div>

    </div>
  </div>
  <!-- <Memberbar v-if="stream.channel"/> -->
  
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSocket } from '../plugins/socketio'
import { useStore } from 'vuex'

// import Memberbar from '../components/Memberbar.vue'
export default defineComponent({
	// components: { Memberbar },
  name: 'channel-chat',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const socket = useSocket()
    const store = useStore()
    
    onMounted(() => {
      store.commit('channel/CLEAR_MESSAGES')
      store.commit('channel/SET_MEMBERS', [])
      socket.emit('twitch:join-channel', route.params.channelId)
    })

    watch(() => route.params.channelId, (id) => {
      store.commit('channel/CLEAR_MESSAGES')
      store.commit('channel/SET_MEMBERS', [])
      socket.emit('twitch:join-channel', id)
    })

    socket.on('twitch:join-channel', (channel) => {
      if (!channel) {
        store.commit('channel/SET_CHANNEL', null)
        return router.push('/')
      }

      const { members, ...rest } = channel

      store.commit('channel/SET_MEMBERS', members)
      store.commit('channel/SET_CHANNEL', rest)
    })

    socket.on('twitch:message', (member, message) => {
      store.commit('channel/ADD_MESSAGE', { member: member.id, content: message })
    })

    socket.on('twitch:join-member', (member) => {
      console.log(member)
      store.commit('channel/JOIN_MEMBER', member)
    })
    socket.on('twitch:leave-member', (member) => {
      store.commit('channel/LEAVE_MEMBER', member)
    })


    return {
      channel: store.state.channel
    }
  }
})
</script>

<style scoped>
.message-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 400;
}
.message-author {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;;
}
.message {
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
  padding: 16px;
  background-color: rgba(42, 42, 50, .5);
  
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
.messages-list {
  margin-top: 24px;
  display: flex;
  flex-direction: column-reverse;
}

.members-bar {
  display: flex;
  flex-direction: column;
  min-width: 234px;
  max-width: 234px;
  padding-left: 20px;
}

.header-content {
  display: flex;
  width: 100%;
  align-items: center;
}
.content-header {
  position: relative;
  padding: 16px;
  background-color: rgba(18, 17, 22, .75);
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .04), 0 2px 2px rgba(0, 0, 0, .08)
}
.content-header .background {
  position: absolute;
  object-fit: cover;
  filter: blur(160px) opacity(15%);
  height: calc(100% + 368px);
  width: calc(100% + 368px);
  opacity: .8;
}
.content-header .channel-image {
  padding: 0px;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  position: relative;
  margin-right: 16px;
}
.content-header .channel-image img {
  position: absolute;
  height: 100%;
  width: 100%;
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
}
.content-header .channel-name {
  margin: 0;
  font-size: 20px;
  line-height: 16px;
  color: var(--text-primary);
  font-weight: 600;
  font-family: Roboto;
}

.content {
  display: flex;
  flex: auto;
  padding: 0 20px;
  flex-direction: column;
}
</style>