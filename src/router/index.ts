import * as VueRouter from 'vue-router'
import Home from '../views/DataVisualization.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			title: '首页',
			keepAlive: true,
			requireAuth: false
		}
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/AboutThis.vue'),
		meta: {
			title: '关于',
			keepAlive: true,
			requireAuth: false
		}
	},
	{
		path: '/vocaloid',
		name: 'vocaloid',
		component: () => import('../views/IntroVocaloid.vue'),
		meta: {
			title: 'Vocaloid™ China',
			keepAlive: true,
			requireAuth: false
		}
	},
	{
		path: '/ling',
		name: 'ling',
		component: () => import('../views/IntroLing.vue'),
		meta: {
			title: 'About_Ling',
			keepAlive: true,
			requireAuth: false
		}
	},
	{
		path: '/producer',
		name: 'producer',
		component: () => import('../views/IntroProducer.vue'),
		meta: {
			title: '创作者',
			keepAlive: false,
			requireAuth: false
		}
	},
	{
		path: '/club',
		name: 'club',
		component: () => import('../views/ProducerClub.vue'),
		meta: {
			title: '创作社团',
			keepAlive: true,
			requireAuth: false
		}
	},
	{
		path: '/song',
		name: 'song',
		component: () => import('../views/BirthOfSong.vue'),
		meta: {
			title: '词曲站',
			keepAlive: false,
			requireAuth: false
		}
	},
	{
		path: '/message',
		name: 'message',
		component: () => import('../views/MessageBoard.vue'),
		meta: {
			title: '留言板',
			keepAlive: false,
			requireAuth: false
		}
	},

]

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
	// 每次切换路由页面滚动到顶部
	scrollBehavior() {
		return {top: 0}
	}
})

//路由前置守卫；用来设置元信息
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title as string
	}
	next()
})

export default router