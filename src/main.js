import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$webSocketLink = 'wss://oudennieuwbackend.onrender.com/'
//app.config.globalProperties.$webSocketLink = 'ws://localhost:8080/'

app.use(createPinia())
app.use(router)

app.mount('#app')