<template>
  <Navbar />
  <div class="container">
    <Sidebar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Navbar from './AppNavbar.vue'
import Sidebar from './AppSidebar.vue'
import { defineComponent } from "vue"

export default defineComponent({
	components: { Navbar, Sidebar },
  name: 'App',
})
</script>

<style scoped>
.container {
  display: flex;
  padding: 24px 0;
  flex: auto;
}
</style>