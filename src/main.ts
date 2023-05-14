import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import 'vue-fullpage.js/dist/style.css'
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
// @ts-ignore
import VueFullPage from 'vue-fullpage.js'
import 'animate.css/animate.min.css' //引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(pinia)
app.use(router)
app.use(VueFullPage)
app.mount('#app')

// createApp(App).use(pinia).use(router).mount('#app')
