<template>
  <div class="search-result">

    <div class="result-title" @click="onToggle()"> 
      <i class="fas fa-angle-down" v-if="open"></i>
      <i class="fas fa-angle-right" v-else></i>
      <span>Channels</span>
      <div class="count">
        <span>{{ result.total }}</span>
      </div>
    </div>

    <div class="result-list" v-if="result.total && open">

      <router-link :to="`/channels/${channel.id}`" class="channel"  v-for="(channel, i) of result.channels" :key="i">
        <div class="channel-logo">
          <img class="channel-image glow" :src="channel.logo"/>
          <img class="channel-image sharp" :src="channel.logo"/>
        </div>
        <div class="channel-name">
          <span>{{ channel.display_name }}</span>
        </div>
      </router-link>

    </div>

    <div class="result-list not-found" v-else-if="!result.total && open">
      <div class="text">
        <span>{{ search ? 'Channels not found' : 'Input channel name' }}</span>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useSocket } from '../plugins/socketio'

export default defineComponent({
  name: 'app-search-result',
  setup() {
    const store = useStore()
    const socket = useSocket()
    const open = ref(true)

    const result = computed(() => store.state.hub.search.result)
    const search = computed(() => store.state.hub.search.value)
    const onToggle = () => (open.value = !open.value)

    socket.on("twitch:search-channel", data => store.commit('hub/SET_SEARCH_RESULT', data))

    return {
      result,
      search,
      onToggle,
      open
    }
  }
})
</script>

<style scoped>
.result-list {
  display: flex;
  flex-direction: column;
}
.result-list .channel {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 16px;
  border-radius: 12px;
  cursor: pointer;
}
.result-list .channel:hover {
  backdrop-filter: brightness(1.3);
}

.result-list .channel-logo {
  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-right: 14px;
}
.result-list .channel-image {
  position: absolute;
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
.result-list .channel-image.sharp {
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 15px;;
}

.result-list .channel:hover .channel-image.glow {
  filter: blur(10px) opacity(.5)
}


.result-list .channel-name {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 450
}
.result-list .channel:hover .channel-name {
  color: var(--text-primary);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.2))
}

.result-list.not-found .text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
  margin-left: 16px;
}



.result-title {
  display: flex;
  flex-direction: row;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 16px;
  margin-top: 24px;
  cursor: pointer;
}
.result-title i {
  margin-right: 16px;
  display: flex;
  height: 18px;
  width: 18px;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4)
}
.result-title span {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
}
.result-title .count {
  direction: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: brightness(1.5);
  padding: 4px 8px;
  border-radius: 16px;
  margin-left: 16px;
}
.result-title .count span {
  font-size: 12px;
  line-height: 12px;
  font-family: 'Roboto Mono';
}


.search-result {
  display: flex;
  flex-direction: column;
}
</style>