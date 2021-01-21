<template>
  <div class="search-bar">
    <div class="search-field">
      <label for="search">
        <svg viewBox="0 0 24 24" height="18" width="18" focusable="false" role="i" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <g data-name="Layer 2">
            <path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0019 11a8 8 0 10-8 8 7.92 7.92 0 004.9-1.69l3.39 3.4a1 1 0 001.42 0 1 1 0 000-1.42zM5 11a6 6 0 116 6 6 6 0 01-6-6z" data-name="search"></path>
          </g>
        </svg>
      </label>
      <input 
        type="text" 
        id="search" 
        :value="value" 
        @input="(e) => onInput(e.target.value)" 
        @change="onChange()"
        placeholder="Search..."
        autocomplete="off"
        >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from "vuex";
import { useSocket } from '../plugins/socketio';

export default defineComponent({
  name: 'app-search-bar',
  setup() {
    const store = useStore()
    const socket = useSocket()

    const value = computed(() => store.state.hub.search.value)
    const onInput = (value) => store.commit('hub/SET_SEARCH_VALUE', value) 
    const onChange = () => socket.emit('twitch:search-channel', store.state.hub.search.value)
    
    return {
      value,
      onInput,
      onChange
    }
  }
})
</script>

<style scoped>

.search-bar {
  display: flex;
  position: relative;
}
.search-bar .search-field {
  position: relative;
  display: flex;
  color: var(--text-secondary);
  flex: auto;
  padding-right: 8px;
}
.search-bar .search-field label {
  cursor: text;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 16px;
}
.search-bar .search-field input::placeholder {
  color: var(--text-secondary);
}
.search-bar .search-field input {
  width: 100%;
  backdrop-filter: brightness(1.5);
  border-radius: 12px;
  font-size: 13px;
  line-height: 16px;
  font-family: Roboto;
  padding: 12px 16px;
  padding-left: 50px;
  color: var(--text-secondary);
}
.search-bar .search-field input:focus {
  backdrop-filter: brightness(1.7);
}

</style>