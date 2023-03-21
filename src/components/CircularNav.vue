<script setup>
function throttle(func, delay) {
	let start = 0
	//let start=+new Date() 不可以这样写，会导致无法第一次就执行函数
	return function (...args) {
		let now = +new Date() //通过+号可以转化成时间戳
		if (now - start > delay) {
			func.apply(this, args)
			start = now
		}
	}
	//第一次会立即触发事件调用函数，通过判断前后触发事件的时间间隔是否大于设置的等待时间
	//大于就证明已经过了规定时间，可以再次调用函数，否则反之
}

document.addEventListener('DOMContentLoaded', function () {
	let nav = document.querySelector('.mainCircularNav');
	let routerLink = document.querySelectorAll('.mainCircularNav > div > ul > li a');
	let menuItems = document.querySelectorAll('.menu li');
	let [lastScrollPosition, transform, angle, delayTime, count, fullRound] = [0, 0, 0, 0, 0, 0, 0, 0]
	let firstWheelFlag = true
	let wheelDirection = 1

	// 鼠标滑轮下滚返回 true，否则返回 false
	function judgeScrollDirection() {
		let flag
		let scrollPosition = window.scrollY || window.pageYOffset;
		(scrollPosition > lastScrollPosition) ? flag = true : flag = false
		lastScrollPosition = scrollPosition
		return flag
	}


	function handleWheel(e) {
		window.addEventListener('wheel', (e) => {
			// console.log(e.wheelDelta)
			// 下滚时为 1，上滚为 -1
			e.wheelDelta < 0 ? wheelDirection = 1 : wheelDirection = -1
		})

		firstWheelFlag = false
		menuItems.forEach((item, index) => {
			// 获取当前角度，由于 transform 输出的是矩阵，获取角度需要进行如下变化 | 例：matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)
			transform = window.getComputedStyle(item).getPropertyValue("transform")
			let values = transform.split('(')[1].split(')')[0].split(',');
			angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
			// 先全部转换为正数
			if (angle < 0) {
				angle = 360 + angle
			}
			// 根据滚轮方向改变转动方向
			// todo 原文：angle += 45 + fullRound * 360
			angle += (45 + fullRound * 360)*wheelDirection
			// 第1次滚动无问题，第2次需要给第7号添加，第3次给第6号与第7号添加
			// 通过 count 计算转动圈数，然后添加在角度上，解决角度清零导致的元素转一圈问题
			if (8 - count <= index) {
				angle += 360
			}
			// 需要解决上滚时的角度旋转问题
			console.log(angle, index, item.childNodes[0].text,count)
			item.style.transform = `rotate(${angle}deg)`;
			item.childNodes[0].style.transform = `rotate(-${angle}deg)`;
		});
		// 通过 count 计算转动圈数，然后添加在角度上，解决角度清零导致的元素转一圈问题
		count < 7 ? count += 1 : (() => {
			// 将转动次数置零
			count = 0;
			// 全部滚动次数 +1
			fullRound = fullRound + 1
		})()
	}

	// 监听滚轮事件，对菜单进行滚动
	let throttledHandleWheel = throttle(handleWheel, 700);
	nav.addEventListener('wheel', function (e) {
		// 阻止默认滚动事件
		e.preventDefault();
		// 节流滚动函数
		throttledHandleWheel(e)
	}, {passive: false});

	// 导航栏，上滑隐藏下滑显示
	window.addEventListener('scroll', function () {
		judgeScrollDirection() ? nav.classList.add('hide') : nav.classList.remove('hide')
	});

	// 延时添加类名，让路由变宽
	nav.addEventListener('mouseenter', function () {
		firstWheelFlag ? delayTime = 500 : delayTime = 270
		setTimeout(function () {
			routerLink.forEach((item) => {
				item.classList.add('expand')
			})
		}, delayTime)
	});
	nav.addEventListener('mouseleave', function () {
		routerLink.forEach((item) => {
			item.classList.remove('expand')
		})
	});
});
</script>

<template>
	<div class="mainCircularNav">
		<div class="insideNav">
			<span class="words">导航</span>
			<ul class="menu">
				<li>
					<router-link to="/">首页</router-link>
				</li>
				<li>
					<router-link to="/about">About</router-link>
				</li>
				<li>
					<router-link to="/vocaloid">Vocaloid</router-link>
				</li>
				<li><a class="fa fa-icon" href="#">4</a></li>
				<li><a class="fa fa-icon" href="#">5</a></li>
				<li><a class="fa fa-icon" href="#">6</a></li>
				<li><a class="fa fa-icon" href="#">7</a></li>
				<li><a class="fa fa-icon" href="#">8</a></li>
			</ul>
		</div>
	</div>
	<router-view/>
</template>

<style lang="scss" scoped>
.hide {
	//transform: translateY(-30vh);
	transform: translateX(-30vh);
	transition: all 0.5s;
}

.expand {
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

	//top: -50vh;
	//left: 63vh;

	height: 80vh;
	width: 80vh;

	//border: solid 7px #ee0000;
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
}

.mainCircularNav:hover {
	left: -35vh;

	//top: -35vh;
	opacity: 1;
	//background:radial-gradient(black, white);
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
