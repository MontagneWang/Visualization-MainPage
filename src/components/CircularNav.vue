<script setup>
import {onMounted, watch, watchEffect} from "vue";
import {useRoute} from "vue-router";

function throttle(func, delay) {
	let start = 0
	return function (...args) {
		let now = +new Date() // 通过 + 号可以转化成时间戳
		if (now - start > delay) {
			func.apply(this, args)
			start = now
		}
	}
}

onMounted(() => {
// document.addEventListener('DOMContentLoaded', function () {
	// 可以使用 ref 获取元素
	let nav = document.querySelector('.mainCircularNav');
	let routerLink = document.querySelectorAll('.mainCircularNav > div > ul > li a');
	let menuItems = document.querySelectorAll('.menu li');
	let [lastScrollPosition, transform, angle, waitSecond, delayTime, count, fullRound] = [0, 0, 0, 0, 0, 0, 0, 0]
	let firstWheelFlag = true
	let wheelDirection = 1, lastWheelDirection = 0

	// 鼠标滑轮下滚返回 true，否则返回 false
	function judgeScrollDirection() {
		let flag
		let scrollPosition = window.scrollY || window.pageYOffset;
		(scrollPosition > lastScrollPosition) ? flag = true : flag = false
		lastScrollPosition = scrollPosition
		return flag
	}

	// todo ⚠ 直接设置一个全局数组变量，用于保存每一个路由的旋转角度，然后做加减运算，这样就不用每次重新获取 css 角度然后计算了
	function handleWheel(e) {
		menuItems.forEach((item, index) => {
			// 获取当前角度，由于 transform 输出的是矩阵，获取角度需要进行如下变化 | 例：matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)
			transform = window.getComputedStyle(item).getPropertyValue("transform")
			let values = transform.split('(')[1].split(')')[0].split(',');
			angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));

			if (wheelDirection === -1) {
				if (angle < 0) {
					angle = 360 + angle
				}
				angle += 45 + fullRound * 360
				// 通过 count 计算转动圈数，然后添加在角度上，解决角度清零导致的元素转一圈问题（第 1 次滚动无问题，第 2 次需要给第 7 号添加，第 3 次给第 6 号与第 7 号添加）
				if (8 - count <= index) {
					angle += 360
				}
			} else if (wheelDirection === 1) {
				if (angle > 0) {
					angle = angle - 360
				}
				angle += -45 + fullRound * -360
				angle += 360

				if (index + count <= 0) {
					angle -= 360
				}
			}
			// todo ⚠ 直接设置一个全局数组变量，用于保存每一个路由的旋转角度，然后做加减运算，这样就不用每次重新获取 css 角度然后计算了
			// todo bugfix 正向逆向滚动交错时会产生错位
			// 正向滚动逆向滚动分开独立计算，每次滚动方向发生改变的时候 count 和 full 重置
			// 或者直接重置所有位置，然后再对应滚动一次
			// if (wheelDirection === lastWheelDirection || firstWheelFlag) {
			// 	// console.log(' 方向一致 ')
			// } else {
			// 	// console.log(' 方向发生改变 ')
			// 	count = 0
			// 	fullRound = 0
			// }
			console.log(angle, index, item.childNodes[0].text, count)
			item.style.transform = `rotate(${angle}deg)`;
			item.childNodes[0].style.transform = `rotate(${-angle}deg)`;
		});
		// 通过 count 计算转动圈数，然后添加在角度上，解决角度清零导致的元素转一圈问题
		if (wheelDirection === -1) {
			if (count < 7) {
				count += 1
			} else {
				// 已转动一整圈，将转动次数置零，整圈数 +1
				count = 0;
				fullRound = fullRound + 1
			}
		} else {
			if (count > -7) {
				count -= 1
			} else {
				count = 0;
				fullRound = fullRound + 1
			}
		}
		lastWheelDirection = wheelDirection
		firstWheelFlag = false
	}

	// todo 当前路由动态展示在最右侧
	// region
	// watchEffect(() => {
	// 	let menuItems = document.querySelectorAll('.menu li');
	// 	menuItems.forEach((item, index) => {
	// 		// if (item.innerText === routerMap[route.path]) {
	// 		// 选中当前路由 item
	// 		if (routerMap[route.path].includes(item.innerText)) {
	// 			let angle = 90
	// 			item.style.transform = `rotate(${angle}deg)`;
	// 			item.childNodes[0].style.transform = `rotate(${-angle}deg)`;
	// 			menuItems = Array.from(menuItems)
	// 			for (let i = menuItems.length; i--;) {
	// 				index<7?index++:index=0
	// 				angle += 45
	// 				console.log(angle, index, menuItems[index].childNodes[0].text, count)
	// 				menuItems[index].style.transform = `rotate(${angle}deg)`;
	// 				menuItems[index].childNodes[0].style.transform = `rotate(${-angle}deg)`;
	// 			}
	// 			count = 0
	// 			fullRound = 0
	// 		}
	// 	});
	// })
	// endregion

	// 节流滚动事件，下滚时为 1，上滚为 -1
	let throttledHandleWheel = throttle(handleWheel, 700);
	nav.addEventListener('wheel', function (e) {
		e.preventDefault();
		e.wheelDelta < 0 ? wheelDirection = 1 : wheelDirection = -1
		// todo Lock
		// 1. 在第一次全部元素排列好前禁止滚动（700ms）
		// 2. 第一次滑入不滚动，第二次滑入快速滚动仍会触发错误
		throttledHandleWheel(e)
	}, {passive: false});

	// 导航栏，上滑隐藏下滑显示
	window.addEventListener('scroll', function () {
		judgeScrollDirection() ?
				nav.classList.add('hide') : nav.classList.remove('hide')
	});

	// 延时添加 id 属性，让路由变宽（不使用添加类名，因为会在路由切换时被覆盖类名）
	nav.addEventListener('mouseenter', function () {
		firstWheelFlag ? delayTime = 500 : delayTime = 150
		setTimeout(function () {
			routerLink.forEach((item) => {
				item.setAttribute('id', 'expand');
			})
		}, delayTime)
	});
	nav.addEventListener('mouseleave', function () {
		routerLink.forEach((item) => {
			item.removeAttribute('id');
		})
	});
});

let routerMap = {
	'/': ' 首页 ',
	'/about': 'About',
	'/vocaloid': 'Vocaloid'
}
const route = useRoute()

</script>

<template>
	<div class="mainCircularNav">
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
				<li><a class="fa fa-icon" href="#">创作者</a></li>
				<li><a class="fa fa-icon" href="#">创作社团</a></li>
				<li><a class="fa fa-icon" href="#">歌曲的诞生</a></li>
				<li><a class="fa fa-icon" href="#">留言板</a></li>
				<li>
					<router-link to="/about">关于本站</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
// todo 修改背景图、中心图
// .insideNav {
//	background: url("../assets/0.jpg");
//	background-size: cover;
//
//	span {
//		display: none;
//	}
// }

.hide {
	// transform: translateY(-30vh);
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

	// top: -50vh;
	// left: 63vh;

	height: 80vh;
	width: 80vh;

	// border: solid 7px #ee0000;
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

		// top: -35vh;
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
