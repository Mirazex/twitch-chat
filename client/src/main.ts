import { createApp } from 'vue'

import { store } from "./plugins/store"
import { router } from "./plugins/router"
import { createSocket } from "./plugins/socketio"

import App from './components/App.vue'

import './styles/global.css'
import './styles/all.css'
import "@fortawesome/fontawesome-free/css/all.css";

createApp(App)
  .use(store)
  .use(router)
  .use(createSocket)
  .mount('#app')
