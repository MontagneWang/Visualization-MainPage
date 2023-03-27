<script setup>
import {onMounted, ref} from "vue"
import WOW from "wow.js";

let history = ref(null)
onMounted(() => {
	let timeLineItems = document.querySelectorAll('.el-timeline-item')
	timeLineItems.forEach((item, index) => {
		item.classList.add('wow', 'animate__animated', 'animate__fadeInUp')
	})

	let wow = new WOW({
		boxClass: "wow", // 盒子类： 当用户滚动时显示隐藏框的类名。
		animateClass: "animated",// 动画类： 触发 CSS 动画的类名（默认情况下，animate.css 库为“动画”）
		offset: 150, // 抵消： 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并达到此距离时，将显示隐藏的框。
		mobile: true,//移动： 在移动设备上打开/关闭哇.js。
		live: true,//实时：持续检查页面上的新WOW元素。
		callback: function (box) {
			// the callback is fired every time an animation is started
			// the argument that is passed in is the DOM node being animated
			console.log(1)
		},
		scrollContainer: null, // optional scroll container selector, otherwise use window,
		resetAnimation: true, // reset animation on end (default is true)
	});
	wow.init();

	window.addEventListener('scroll', function () {
		if (window.innerHeight + window.pageYOffset
				>= document.body.offsetHeight - 100) {
			history.value.classList.add('show')
		} else {
			history.value.classList.remove('show')
		}
	});
})

</script>

<template>
	<!--1 月 17 日：公布 VOCALOID China Project 形象评选结果，为雅音宫羽、绫彩音、MOKO、牙音和蝶音等五位人设。开始开发 VOCALOID 商品。
3 月 21 日：公布 VOCALOID China Project 最终形象定稿，确定为洛天依、徵羽摩柯、墨清弦、乐正绫和乐正龙牙。
-->
	<!--todo 背景图上添加文字（VOCALOID™ China Project、Vocaloid™3、Vocaloid™5、ACE-Studio）-->
	<!--todo 可以尝试设置两张背景图？或者直接把文字 P 到一张图上-->
	<!--3 月 21 日：公布 VOCALOID China Project 最终形象定稿，确定为洛天依、徵羽摩柯、墨清弦、乐正绫和乐正龙牙。-->
	<!--todo 文字内容需要体现时代变化-->
	<!--VOCALOID China Project 形象征集 -->
	<!--todo 时间轴 样式引入-->
	<div id="lingcaiyin" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item placement="top" timestamp="2011/11/20">
						VOCALOID China Project 项目启动
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2011/12/01">
						开始征集 VOCALOID China Project 企划人物形象设计
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2012/01/03">
						VOCALOID China Project 形象征集结束
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2012/01/17">
						<el-card>
							<h3>「雅音宫羽、绫彩音、MOKO、牙音、蝶音」五位人设入选</h3>
							<p>VOCALOID China Project 形象评选结果公布，分别是「雅音宫羽、绫彩音、MOKO、牙音、蝶音」</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2012/03/21">
						<el-card>
							<h3>VOCALOID China Project 最终形象定稿公布</h3>
							<p>确定最终形象为「洛天依、乐正绫、徵羽摩柯、乐正龙牙、墨清弦」</p>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
	<!--2012 -> 2015-->
	<div id="v3" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item placement="top" timestamp="2011/11/20">
						VOCALOID China Project 项目启动
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2011/12/01">
						开始征集 VOCALOID China Project 企划人物形象设计
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2012/01/03">
						VOCALOID China Project 形象征集结束
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2012/01/17">
						<el-card>
							<h3>「雅音宫羽、绫彩音、MOKO、牙音、蝶音」五位人设入选</h3>
							<p>VOCALOID China Project 形象评选结果公布，分别是「雅音宫羽、绫彩音、MOKO、牙音、蝶音」</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2012/03/21">
						<el-card>
							<h3>VOCALOID China Project 最终形象定稿公布</h3>
							<p>确定最终形象为「洛天依、乐正绫、徵羽摩柯、乐正龙牙、墨清弦」</p>
						</el-card>
					</el-timeline-item>
				</el-timeline>

			</div>
		</div>
	</div>
	<!--2015 -> 2020-->
	<div id="v5" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				V5 介绍
			</div>
		</div>
	</div>
	<!--2020 -> 2023-->
	<div id="ai" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				Ai 介绍
			</div>
		</div>
	</div>
	<!--尾页-->
	<div class="page final">
		<!--	这里滚动到快底部时展示白框 -->
		<!--	然后动态展示时间线发展历程-->
		<div ref="history" class="history">
			<div class="inside">
				<p>在此歌唱 从零开始万千景象延伸远方</p>
				<p>（注：这里动态展示时间线）</p>
			</div>
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

		.inside {
			margin: 5vh 3vw;
		}

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
		padding: 15vh 0 0 0;

		.inside {
			margin: 0 3vw;
			height: 80vh;
		}
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
