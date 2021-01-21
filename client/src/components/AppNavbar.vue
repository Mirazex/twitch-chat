<template>
  <header class="navbar">

    <div class="left-menu">
      <router-link to="/" class="nav-logo">
        <img src="../assets/logo.png" alt="stream_chat">
      </router-link>

      <nav class="nav-items">
        <button @click="onBack()"  class="nav-item back">
          <i class="fas fa-angle-left"></i>
        </button>
        <button @click="onForward()" class="nav-item forward">
          <i class="fas fa-angle-right"></i>
        </button>
      </nav>
      
      <nav class="nav-routes">
        <router-link to="/news" class="nav-item nav-route news">
          <i class="fas fa-newspaper"></i>
        </router-link>
        <router-link to="/channels" class="nav-item nav-route tracked">
          <i class="fas fa-stream"></i>
        </router-link>
      </nav>
    </div>

    <div class="flex-grow"></div>

    <div class="right-menu">
      <button class="menu-btn badge online">
        <i class="fas fa-circle"></i>
        <span>В сети</span>
      </button>
      <button class="menu-btn icon-btn">
        <img class="user-image glow" src="../assets/bg-jugg.jpg" />
        <img class="user-image sharp" src="../assets/bg-jugg.jpg" />
      </button>
    </div>
    
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  name: 'app-navbar',
  setup() {
    const router = useRouter()

    const onBack = () => router.back()
    const onForward = () => router.forward()
    
    return {
      onBack,
      onForward,
    }
  }
})
</script>

<style scoped>
.menu-btn {
  display: flex;
  margin-right: 8px;
  padding: 8px;
}
.menu-btn.badge {
  padding: 8px 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
}
.menu-btn.badge:hover {
  backdrop-filter: brightness(1.5);
}
.menu-btn.badge.online {
  color: var(--green-primary);
  font-family: Roboto;
  font-weight: 500;
}
.menu-btn.badge.online i {
  font-size: 8px;
  margin-right: 6px;
}

.menu-btn:last-child {
  margin: 0
}
.menu-btn.icon-btn {
  padding: 0;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  position: relative;
}
.menu-btn.icon-btn .sharp {
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 15px;;
}

.menu-btn.icon-btn:hover .glow {
  filter: blur(10px) opacity(.5)
}

.menu-btn.icon-btn .user-image {
  position: absolute;
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}

.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  height: 40px;
}

.left-menu,
.right-menu {
  display: flex;
  align-items: center;
}

/* Brand Logo */
.nav-logo img {
  height: 26px;
  width: 26px;
}
.nav-logo:hover img {
  filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
}

/* Navigation */
.nav-items {
  margin-right: 8px;
  margin-left: 16px;
  display: flex;
  flex-direction: row;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: transparent;
  border-radius: 16px;
  margin-right: 4px;
}
.nav-item:last-child {
  margin: 0;
}
.nav-item i {
  height: 26px;
  width: 26px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary)
}
.nav-item:hover i {
  text-shadow: 0 0 16px rgba(255, 255, 255, .6);
}

/* Routes */
.nav-routes {
  display: flex;
  flex-direction: row;
  margin-left: 8px;
}

.nav-route:hover i {
  color: var(--red-primary);
  text-shadow: 0 0 16px rgba(255, 28, 81, .6);
}

.nav-route.news i {
  font-size: 18px;
}
.nav-route.tracked i {
  font-size: 16px;
}


.flex-grow {
  flex-grow: 1;
}
</style>