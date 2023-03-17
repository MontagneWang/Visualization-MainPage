<script setup>
document.addEventListener('DOMContentLoaded', function () {
	let nav = document.querySelector('nav');
	let lastScrollPosition = 0;
	// 上滑隐藏导航栏
	window.addEventListener('scroll', function () {
		let scrollPosition = window.scrollY || window.pageYOffset;

		if (scrollPosition > lastScrollPosition) {
			nav.classList.add('hide');
		} else {
			nav.classList.remove('hide');
		}

		lastScrollPosition = scrollPosition;
	});
});
</script>

<template>
	<div class="tabbar">
		<nav>
			<router-link to="/">首页</router-link>
			&emsp;|&emsp;
			<router-link to="/about">About</router-link>
			&emsp;|&emsp;
			<router-link to="/vocaloid">Vocaloid</router-link>
		</nav>
		<router-view/>
	</div>
</template>

<style lang="scss" scoped>
.tabbar {
	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 10vh;
		margin: 0 auto;
		line-height: 10vh;
		background-color: rgba(255, 255, 255, 0.3);
		border: 1px solid rgba(218, 218, 218, 1);
		box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.15);
		z-index: 2;
		text-align: center;
		transition: all 0.5s;

		a {
			font-weight: bold;
			text-decoration: none;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
}

nav.hide {
	transform: translateY(-100%);
	transition: all 0.5s;
}
</style>
