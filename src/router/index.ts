import * as VueRouter from 'vue-router'
import Home from '../views/HelloWorld.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutThis.vue')
    },
    {
        path: '/vocaloid',
        name: 'vocaloid',
        component: () => import('../views/IntroVocaloid.vue')
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

export default router