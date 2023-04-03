<script lang="ts" setup>
import {onMounted, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {throttle} from '../utils/throttle'
import {judgeScrollDirection} from "../utils/judgeScrollDirection";

interface RouteMap {
	[key: string]: string;
}

let routerMap: RouteMap = {
	'/': '歌曲数据',
	'/vocaloid': 'Vocaloid',
	'/ling': '乐正绫',
	'/producer': '创作者',
	'/club': '创作社团',
	'/song': '歌曲的诞生',
	'/message': '留言板',
	'/about': '关于本站',
}
const route = useRoute()
let isScrollingDown = ref(false)
let wheelDirection = 1

// 导航栏，上滑隐藏下滑显示
window.addEventListener('scroll', () => {
	isScrollingDown.value = judgeScrollDirection()
});

onMounted(() => {
	//  ref.value 获取元素添加 addEventListener 报错
	let navCircle: HTMLElement = document.querySelector('.mainCircularNav') as HTMLElement;
	let routerLink: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.mainCircularNav > div > ul > li a');
	let menuItems: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.menu li');

	// 初始化一个角度数组变量，用于保存每一个路由的旋转角度，然后做加减运算【此方法可同时解决上锁问题】
	let angleArray = [0, 45, 90, 135, 180, 225, 270, 315]

	// 滚动时修改角度数组，然后将角度赋给每一项路由，最后将是否为第一次滚动的 flag 设置为 false
	function handleWheel() {
		angleArray.forEach((eachAngle, index) => {
			angleArray[index] = eachAngle + (45) * wheelDirection
		})
		menuItems.forEach((item, index) => {
			menuItems[index].style.transform = `rotate(${angleArray[index]}deg)`;
			(menuItems[index].childNodes[0] as HTMLElement).style.transform = `rotate(${-angleArray[index]}deg)`
		})
	}

	// 将当前路由动态展示在右上方
	let menuLi = document.querySelectorAll('.menu li');
	watchEffect(() => {
		menuLi.forEach((item, index) => {
			// 找到当前 active 路由
			if (routerMap[route.path] === (item as HTMLElement).innerText && (angleArray[index] % 360) !== 45) {
				let num, delta
				// 计算 active 路由距离右上方的角度差，推算出需要调用滚动函数的次数
				delta = (angleArray[index] % 360) - 45
				delta < 0 ? delta += 360 : delta
				// 差值小于一半 上滚
				if (delta < 180) {
					wheelDirection = -1
					num = delta / 45
				} else {
					wheelDirection = 1
					num = (360 - delta) / 45
				}
				for (let i = 0; i < num; i++) {
					handleWheel()
				}
			}
		})
	})

	// 节流滚动事件，throttle() 函数会返回一个新的函数，该函数会在指定时间间隔内执行一次原始函数。
	// 必须将它返回的新函数保存到一个变量，然后使用该变量作为事件监听器
	let throttledHandleWheel = throttle(handleWheel, 500);
	navCircle.addEventListener('wheel', function (e) {
		e.preventDefault();
		// 下滚时为 1，上滚为 -1
		e.deltaY > 0 ? wheelDirection = 1 : wheelDirection = -1
		throttledHandleWheel()
	}, {passive: false});

	// 延时添加 id 属性，让路由变宽（不使用添加类名，因为会在路由切换时被覆盖类名）
	navCircle.addEventListener('mouseenter', function () {
		setTimeout(function () {
			routerLink.forEach((item) => {
				item.setAttribute('id', 'expand');
			})
		}, 500)
	});
	navCircle.addEventListener('mouseleave', function () {
		routerLink.forEach((item) => {
			item.removeAttribute('id');
		})
	});
});
</script>

<template>
	<div :class="{ hide: isScrollingDown }" class="mainCircularNav">
		<div class="insideNav">
			<span class="words">导航</span>
			<ul class="menu">
				<li>
					<router-link to="/">歌曲数据</router-link>
				</li>
				<li>
					<router-link to="/ling">乐正绫</router-link>
				</li>
				<li>
					<router-link to="/vocaloid">Vocaloid</router-link>
				</li>
				<li>
					<router-link to="/producer">创作者</router-link>
				</li>
				<li>
					<router-link to="/club">创作社团</router-link>
				</li>
				<li>
					<router-link to="/song">歌曲的诞生</router-link>
				</li>
				<li>
					<router-link to="/message">留言板</router-link>
				</li>
				<li>
					<router-link to="/about">关于本站</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>

.hide {
	transform: translateX(-30vh);
	transition: all 0.5s;
}

#expand {
	width: 16vh !important;
	border-radius: 3vh !important;
	transition: all 0.5s !important;
	position: absolute !important;
	top: 0 !important;
	left: -1vh !important;
}

.mainCircularNav {
	z-index: 10000;
	position: fixed;
	top: 10vh;
	left: -50vh;

	height: 80vh;
	width: 80vh;

	border-radius: 50%;

	opacity: 0.6;
	transition: all 0.5s;

	.words {
		float: left;
		width: 1vh;
		transform: translate(32vh, 15vh) !important;

		line-height: 1em;
		transition: all 0.5s;
	}

	&:hover {
		left: -35vh;

		opacity: 1;
		// background:radial-gradient(black, white);
		background: rgba(0, 0, 0, 0.4);
		transition: all 0.5s;

		span {
			transform: translate(23vh, 15vh) !important;
			transition: all 0.5s;
		}

		.menu li {
			opacity: 1;
			transition: all 0.6s;
		}

		a:hover {
			background-color: #2860F8;
			color: #fff;

		}

		a.router-link-exact-active {
			color: #ee0000;
		}
	}
}

.insideNav {
	position: relative;
	height: 40vh;
	width: 40vh;
	line-height: 40vh;
	margin: 20vh;

	border-radius: 50%;
	background-color: #66ccff;

	text-align: center;
	font-size: 1.75em;
	font-weight: bold;
	transition: 0.24s 0.2s;

	.menu {
		position: absolute;
		top: -13vh;
		left: 17vh;
		padding: 0;
		margin: 0;
		z-index: -1;
		list-style: none;
		transition: transform 1.4s 0.07s;

		li {
			position: absolute;
			width: 6vh;
			height: 6vh;
			transform-origin: 3vh 33vh;
			line-height: 6vh;
			text-align: center;
			border-radius: 50%;
			opacity: 0;
			transition: all 0.5s 0.1s;

			a {
				position: absolute;
				top: 0;
				left: 0;
				width: 6vh;
				height: 6vh;
				line-height: 6vh;
				overflow: hidden;

				border-radius: 50%;
				background: #fff;
				font-size: 60%;
				color: #99b977;
				text-decoration: none;
				transition: 0.6s;
			}
		}
	}
}

.mainCircularNav:hover {
	.menu li:nth-child(1) {
		transition-delay: 0.02s;
		transform: rotate(0deg);
	}

	.menu li:nth-child(1) a {
		transition-delay: 0.04s;
		transform: rotate(-0deg);
	}

	.menu li:nth-child(2) {
		transition-delay: 0.04s;
		transform: rotate(45deg);
	}

	.menu li:nth-child(2) a {
		transition-delay: 0.08s;
		transform: rotate(-45deg);
	}

	.menu li:nth-child(3) {
		transition-delay: 0.06s;
		transform: rotate(90deg);
	}

	.menu li:nth-child(3) a {
		transition-delay: 0.12s;
		transform: rotate(-90deg);
	}

	.menu li:nth-child(4) {
		transition-delay: 0.08s;
		transform: rotate(135deg);
	}

	.menu li:nth-child(4) a {
		transition-delay: 0.16s;
		transform: rotate(-135deg);
	}

	.menu li:nth-child(5) {
		transition-delay: 0.1s;
		transform: rotate(180deg);
	}

	.menu li:nth-child(5) a {
		transition-delay: 0.2s;
		transform: rotate(-180deg);
	}

	.menu li:nth-child(6) {
		transition-delay: 0.12s;
		transform: rotate(225deg);
	}

	.menu li:nth-child(6) a {
		transition-delay: 0.24s;
		transform: rotate(-225deg);
	}

	.menu li:nth-child(7) {
		transition-delay: 0.14s;
		transform: rotate(270deg);
	}

	.menu li:nth-child(7) a {
		transition-delay: 0.28s;
		transform: rotate(-270deg);
	}

	.menu li:nth-child(8) {
		transition-delay: 0.16s;
		transform: rotate(315deg);
	}

	.menu li:nth-child(8) a {
		transition-delay: 0.32s;
		transform: rotate(-315deg);
	}
}
</style>
