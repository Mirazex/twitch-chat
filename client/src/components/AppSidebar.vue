<template>
  <div class="sidebar">

    <SidebarSearch />

    <div class="list-items">
      <SidebarResult />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue"
import SidebarSearch from './AppSidebarSearch.vue'
import SidebarResult from './AppSidebarResult.vue'

export default defineComponent({
	components: { SidebarSearch, SidebarResult },
  name: 'app-sidebar',
})
</script>

<style scoped>
.list-items {
  display: flex;
  flex-direction: column;
}
.sidebar {
  display: flex;
  flex-direction: column;
  min-width: 234px;
  max-width: 234px;
  padding-left: 20px;
}
</style>