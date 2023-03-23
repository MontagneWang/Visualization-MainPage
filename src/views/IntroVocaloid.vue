<script lang="ts" setup>
</script>

<template>
	<div>
		<section class="g-word">Top</section>
		<section class="img g-img1"></section>
		<section class="g-word">Content1</section>
		<section class="img g-img2"></section>
		<section class="g-word">Content2</section>
		<section class="img g-img3"></section>
		<section class="g-word">Footer</section>
	</div>
</template>

<style lang="scss" scoped>

section {
	height: 100vh;
	background: rgba(0, 0, 0, .3);
	color: #fff;
	line-height: 100vh;
	text-align: center;
	font-size: 20vh;

}

.img {
	background-attachment: fixed;
	background-size: cover;
	background-position: center center;
}

.g-img1 {
	background-image: url(https://i0.hdslb.com/bfs/album/0ca866a292d01b5e7675e9f11b0d23f988c9b15f.jpg);
}

.g-img2 {
	background-image: url(https://i0.hdslb.com/bfs/album/f8e7f616ba36090ae62abe41c0e554eee3481138.jpg);
}

.g-img3 {
	background-image: url(https://i0.hdslb.com/bfs/album/fdc33e70d152722828029d756bd741414915d3dc.jpg);
}
</style>
