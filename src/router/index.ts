import * as VueRouter from 'vue-router'
import Home from '../views/DataVisualization.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta:{
            title:'home',
            keepAlive:false,
            requireAuth:false
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutThis.vue'),
        meta:{
            title:'about',
            keepAlive:false,
            requireAuth:false
        }
    },
    {
        path: '/vocaloid',
        name: 'vocaloid',
        component: () => import('../views/IntroVocaloid.vue'),
        meta:{
            title:'vocaloid',
            keepAlive:false,
            requireAuth:false
        }
    },
    {
        path: '/ling',
        name: 'ling',
        component: () => import('../views/IntroLing.vue'),
        meta:{
            title:'ling',
            keepAlive:false,
            requireAuth:false
        }
    },
    {
        path: '/producer',
        name: 'producer',
        component: () => import('../views/IntroProducer.vue'),
        meta:{
            title:'producer',
            keepAlive:false,
            requireAuth:false
        }
    },
    {
        path: '/club',
        name: 'club',
        component: () => import('../views/ProducerClub.vue'),
        meta:{
            title:'club',
            keepAlive:false,
            requireAuth:false
        }
    },
    {
        path: '/song',
        name: 'song',
        component: () => import('../views/BirthOfSong.vue'),
        meta:{
            title:'song',
            keepAlive:false,
            requireAuth:false
        }
    },
    {
        path: '/message',
        name: 'message',
        component: () => import('../views/MessageBoard.vue'),
        meta:{
            title:'message',
            keepAlive:false,
            requireAuth:false
        }
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

//路由前置守卫；用来设置元信息
router.beforeEach((to,from,next)=>{
    if(to.meta.title){
        document.title= to.meta.title as string
    }
    next()
})

export default router