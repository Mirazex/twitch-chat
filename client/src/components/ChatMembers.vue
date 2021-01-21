<template>
  <div class="member-bar">

    <div class="result-title"> 
      <i class="fas fa-comment"></i>
      <span>Members</span>
    </div>

    <div class="result-list" v-if="members.length">
      <div class="member" v-for="(member, i) of members" :key="i">

        <div class="member-name">
          <span :style="`color: ${member.color}`">{{ member.display_name }}</span>
        </div>

      </div>
    </div>

    <div class="result-list not-found" v-else-if="!members.length">
      <div class="text">
        <span>No members</span>
      </div>
    </div>

  </div>
</template>


<script>
import { computed, ref } from "vue"
import { useStore } from 'vuex'

export default {
  name: 'chat-members',
  setup() {
    const store = useStore()

    const members = computed(() => store.state.channel.members)

    return {
      members
    }
  }
}
</script>

<style scoped>
.result-list {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  margin-bottom: 8px;
  overflow-y: auto;
}

.result-list::-webkit-scrollbar {
  width: 8px;

}
.result-list::-webkit-scrollbar-track {
  background-color: transparent;
}
.result-list::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  border-radius: 8px;
}
.result-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.result-list .member {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 16px;
  border-radius: 12px;
  cursor: pointer;
}
.result-list .member:hover {
  backdrop-filter: brightness(1.3);
}

.result-list .member-logo {
  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-right: 14px;
}
.result-list .member-image {
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

.result-list .member:hover .member-image.glow {
  filter: blur(10px) opacity(.5)
}


.result-list .member-name {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 450
}
.result-list .member:hover .member-name {
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
  margin-left: 8px;
  margin-top: 8px;
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

.member-bar {
  display: flex;
  flex-direction: column;
  min-width: 234px;
  max-width: 234px;
  padding-right: 20px;
}
</style>