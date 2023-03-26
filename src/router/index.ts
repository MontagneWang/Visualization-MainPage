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
    },
    {
        path: '/ling',
        name: 'ling',
        component: () => import('../components/LingIntro.vue')
    },

]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
    // 每次切换路由页面滚动到顶部
    scrollBehavior () {
        return { top: 0 }
    }
})

export default router