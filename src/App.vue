<script setup lang="ts">
import { useRouter } from 'vue-router'
import TheBackTop from "./components/TheBackTop.vue";
import TheCircularNav from "./components/TheCircularNav.vue";
import TheRightMenu from "./components/TheRightMenu.vue";
import IntroLing from "./views/IntroLing.vue"
// 跳转到 ling 路由
const router = useRouter()
// router.push('/message')

// 标题切换
// let timer: number | undefined
// let title: string | undefined
// document.addEventListener('visibilitychange', function () {
// 	if (document.visibilityState === 'hidden') {
// 		if (document.title !== '欢迎回来') {
// 			title = document.title
// 		}
// 		document.title = '我在这里等你'
// 		clearTimeout(timer)
// 	}
// 	// 可以直接 else if
// 	if (document.visibilityState === 'visible') {
// 		document.title = '欢迎回来'
// 		if (title === undefined) {
// 			title = 'About Ling'
// 		}
// 		timer = setTimeout('document.title = title', 1000)
// 		timer = setTimeout('document.title = \'About Ling\'', 1000)
// 	}
// })
// 控制台输出
document.addEventListener('keydown', e => {
	if (e.code === 'F12' || ((e.code === 'KeyJ' || e.code === 'KeyI') && (e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey))) {
		console.clear()
		console.log(` %c「我也曾忐忑 如果没有如果」\n %c「感谢你 停留时 看到我」\n%c 欢迎访问本博客 %c 一座互联网角落的孤岛 \n%c 联系博主：ling.vc@foxmail.com ✧(≖ ◡ ≖✿) \n %c `,
				`color: #ee0000; font-size: 16px;margin: 10px 0 5px 0 ;`,
				'color: #ee0000; font-size: 16px;margin: 5px 0 10px 0 ;',
				'background: #35495e; padding: 4px; border-radius: 3px 0 0 3px; color: #fff;color: #66ccff; font-size: 16px;margin-bottom:10px;',
				'background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff;color: #00ffcc; font-size: 16px;margin-bottom:10px;',
				'color: #ee0000; font-size: 16px;margin: 0 0 10px 0 ;',
				"font-size:880px;line-height:335px;margin-bottom:-1000px;background:url('https://i0.hdslb.com/bfs/album/9126b8133d66830b8e74cc8b5feca8f787efd42d.png') no-repeat",
		);
	}
})
</script>

<template>
	<the-circular-nav/>
	<the-back-top/>
	<the-right-menu/>
	<router-view v-slot="{ Component }">
		<keep-alive>
			<component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
		</keep-alive>
		<component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
	</router-view>
</template>
<!--todo 修改 CSS 样式（大小 + 颜色）-->
<!--todo 修改 HTML 类名-->
<!--todo 不同屏幕尺寸适配-->
<!--todo 移动端适配-->
<style>
html *
{
	font-family: LXGW WenKai Lite, serif !important;
}
body,
html {
	cursor: url(./assets/lingCursor/乐正绫-正常选择.cur),
	auto !important;
}

a:hover,
button:hover {
	cursor: url(./assets/lingCursor/乐正绫-链接选择1.cur),
	auto !important;
}

input:hover {
	cursor: url(./assets/lingCursor/乐正绫-手写.cur),
	auto !important;
}
</style>
