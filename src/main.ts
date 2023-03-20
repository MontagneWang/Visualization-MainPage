import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'

import {createPinia} from 'pinia'

const pinia = createPinia()

import 'vue-fullpage.js/dist/style.css'
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
// @ts-ignore
import VueFullPage from 'vue-fullpage.js'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(VueFullPage)
app.mount('#app')

// createApp(App).use(pinia).use(router).mount('#app')
