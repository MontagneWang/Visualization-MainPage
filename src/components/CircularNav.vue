<script setup>
document.addEventListener('DOMContentLoaded', function () {
	let nav = document.querySelector('.mainCircularNav');
	let routerLink = document.querySelectorAll('.mainCircularNav > div > ul > li a');
	let menuItems = document.querySelectorAll('.menu li');
	let lastScrollPosition, transform, angle = 0

	// 鼠标滑轮下滚返回 true，否则返回 false
	function judgeScrollDirection() {
		let flag
		let scrollPosition = window.scrollY || window.pageYOffset;
		(scrollPosition > lastScrollPosition) ? flag = true : flag = false
		lastScrollPosition = scrollPosition
		return flag
	}

	// 监听滚轮事件
	nav.addEventListener('wheel', function (e) {
		e.preventDefault(); // 阻止默认滚动事件
		// 当前鼠标一次 150
		// let delta = e.deltaY; // 获取滚轮滚动距离
		// todo 只能是每次 45° 滚动？还是每个度数都可以？
		// todo 需要添加节流

		menuItems.forEach((item, index) => {
			// 获取当前角度，由于 transform 输出的是矩阵，获取角度需要进行如下变化 | 例：matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)
			transform = window.getComputedStyle(item).getPropertyValue("transform")
			let values = transform.split('(')[1].split(')')[0].split(',');
			angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));

			if (angle < 0) {
				angle = 360 + angle
			}
			console.log(angle, index, item.childNodes[0].text)
			// 根据滚轮方向改变转动方向
			// judgeScrollDirection() ? angle += 45 : angle -= 45
			angle += 45

			// if (angle === 360) angle = 359
			// todo 当前问题：超过 360° 的元素会旋转一圈至下一个位置（可能原因度数超过 360° 被归零后再加上 45° 导致的）
			item.style.transform = `rotate(${angle}deg)`;
			item.childNodes[0].style.transform = `rotate(-${angle}deg)`;
		});
	}, {passive: false});

	// 导航栏，上滑隐藏下滑显示
	window.addEventListener('scroll', function () {
		judgeScrollDirection() ? nav.classList.add('hide') : nav.classList.remove('hide')
	});

	// 延时 0.75 秒后添加类名，让路由变宽
	nav.addEventListener('mouseenter', function () {
		setTimeout(function () {
			routerLink.forEach((item) => {
				item.classList.add('expand')
			})
		}, 500)
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
	position: absolute!important;
	top: 0!important;
	left: -1vh!important;
}

.mainCircularNav {
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
}

.mainCircularNav .words {
	//float: left;
	//transform: translate(16vh, 14vh) !important;

	line-height: 1em;
	transition: all 0.5s;
}

.mainCircularNav:hover {
	left: -35vh;

	//top: -35vh;
	opacity: 1;
	//background:radial-gradient(black, white);
	background: rgba(0, 0, 0, 0.4);
	transition: all 0.5s;

	span {
		transform: translate(16vh, 5vh) !important;
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
