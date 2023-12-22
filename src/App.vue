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

function getPerformanceTiming () {
	let performance = window.performance;

	if (!performance) {
		// 当前浏览器不支持
		console.log('浏览器不支持 performance 接口');
		return;
	}

	let t = performance.timing;
	let times = {
		loadPage:'',
		domReady:'',
		redirect:'',
		lookupDomain:'',
		ttfb:'',
		request:'',
		loadEvent:'',
		appcache:'',
		unloadEvent:'',
		connect:''
	};

	//【重要】页面加载完成的时间
	//【原因】这几乎代表了用户等待页面可用的时间
	times.loadPage = `页面加载完成的时间：${t.loadEventEnd - t.navigationStart}`;

	//【重要】解析 DOM 树结构的时间
	//【原因】反省下你的 DOM 树嵌套是不是太多了！
	times.domReady = `解析 DOM 树结构的时间：${t.domComplete - t.responseEnd}`

	//【重要】重定向的时间
	//【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
	times.redirect = `重定向的时间：${t.redirectEnd - t.redirectStart}`

	//【重要】DNS 查询时间
	//【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
	// 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
	times.lookupDomain = `DNS 查询时间：${t.domainLookupEnd - t.domainLookupStart}`

	//【重要】读取页面第一个字节的时间
	//【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
	// TTFB 即 Time To First Byte 的意思
	// 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
	times.ttfb = `读取页面第一个字节的时间：${t.responseStart - t.navigationStart}`

	//【重要】内容加载完成的时间
	//【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
	times.request = `内容加载完成的时间：${t.responseEnd - t.requestStart}`

	//【重要】执行 onload 回调函数的时间
	//【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
	times.loadEvent = `执行 onload 回调函数的时间：${t.loadEventEnd - t.loadEventStart}`

	// DNS 缓存时间
	times.appcache = `DNS 缓存时间：${t.domainLookupStart - t.fetchStart}`

	// 卸载页面的时间
	times.unloadEvent = `卸载页面的时间：${t.unloadEventEnd - t.unloadEventStart}`

	// TCP 建立连接完成握手的时间
	times.connect = `TCP 建立连接完成握手的时间：${t.connectEnd - t.connectStart}`

	console.log(times)
	return times;
}
getPerformanceTiming()


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
