<script  setup>
import {onMounted, ref} from "vue"

let history = ref(null)
onMounted(() => {
	window.addEventListener('scroll', function () {
		if (window.innerHeight + window.pageYOffset
				>= document.body.offsetHeight - 100) {
			history.value.classList.add('show')
		}else{
			history.value.classList.remove('show')
		}
	});
	// todo 给每一行文字都添加滚动时浮现的效果，可以使用 animate.css
})
</script>

<template>
	<!--1 月 17 日：公布 VOCALOID China Project 形象评选结果，为雅音宫羽、绫彩音、MOKO、牙音和蝶音等五位人设。开始开发 VOCALOID 商品。
3 月 21 日：公布 VOCALOID China Project 最终形象定稿，确定为洛天依、徵羽摩柯、墨清弦、乐正绫和乐正龙牙。
-->
	<!--todo 背景图上添加文字（VOCALOID China Project、Vocaloid3、Vocaloid5、ACE-Studio）-->
	<!--todo 可以尝试设置两张背景图？或者直接把文字 P 到一张图上-->
	<!--3 月 21 日：公布 VOCALOID China Project 最终形象定稿，确定为洛天依、徵羽摩柯、墨清弦、乐正绫和乐正龙牙。-->
	<!--todo 文字内容需要体现时代变化-->
	<!--VOCALOID China Project 形象征集 -->
	<div id="lingcaiyin" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<p>2011年</p>
			<p>6月14日：公司登记成立。</p>
			<p>11月20日：VOCALOID China Project项目启动。[3]</p>
			<p>12月1日：正式发布中文软件扩展包「VOCALOID™3 LEP-ZHO」，正式开始征集VOCALOID China Project企划人物形象设计。</p>
			<p>2012年</p>
			<p>1月3日：VOCALOID China Project形象征集结束。</p>
			<p>1月17日：公布VOCALOID China Project形象评选结果，为雅音宫羽、绫彩音、MOKO、牙音和蝶音等五位人设。开始开发VOCALOID商品。</p>
		</div>
	</div>
	<!--2012 -> 2015-->
	<div id="v3" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			V3 介绍
		</div>
	</div>
	<!--2015 -> 2020-->
	<div id="v5" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			V5 介绍
		</div>
	</div>
	<!--2020 -> 2023-->
	<div id="ai" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			ai 介绍
		</div>
	</div>
	<!--尾页-->
	<div class="page final">
		<!--	这里滚动到快底部时展示白框 -->
		<!--	然后动态展示时间线发展历程-->
		<div ref="history" class="history">
			<p>在此歌唱 从零开始万千景象延伸远方</p>
			<p>（注：这里动态展示时间线）</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
body,
html {
	height: 100vh;
}

.final {
	height: 100vh !important;

	.history {
		height: 90vh;
		width: 90vw;
		background-image: linear-gradient(to bottom, transparent 0, transparent 10vh, rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) 90vh, transparent 90vh, transparent 100vh);
		margin: 0 auto;
		opacity: 0;
		transition: all 0.5s;
		padding: 10vh 0 0 0;
	}

	.show {
		opacity: 1;
		transition: all 0.5s;
	}
}

.page {
	height: 120vh;
	background-size: cover !important;
	background-position: top !important;

	// 注意：这里不可以通过 margin 值设置，background-image 需要与背景同高为 120vh，上下 10vh 设置为透明
	.content {
		width: 90vw;
		height: 100vh;
		background-image: linear-gradient(to bottom, transparent 0, transparent 10vh, rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) 110vh, transparent 110vh, transparent 120vh);
		text-align: left;
		margin: 0 auto;
		padding: 10vh 0;
	}

	.story {
		width: 100vw;

		.bg {
			height: 120vh;
			position: absolute;
			width: 98vw;
			z-index: 10;
			background-size: auto 70vh !important;
		}
	}
}

#lingcaiyin {
	background: url(../assets/云端.png) fixed;
	background-position: center !important;

	.bg {
		background: url(../assets/0.png) 80% bottom no-repeat fixed;
		background-size: auto 72.5vh !important;
	}
}

#v3 {
	background: url(../assets/梦语.png) fixed;

	.bg {
		background: url(../assets/v3.png) 80% bottom no-repeat fixed;
	}
}

#v5 {
	background: url(../assets/山遥路远.png) fixed;

	.bg {
		background: url(../assets/v5.png) 83.5% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

#ai {
	background: url(../assets/无限接近幻想.jpg) fixed;

	.bg {
		background: url(../assets/ai.png) 81% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}


.final {
	background: url(../assets/繁华唱遍.png) fixed;

}
</style>
