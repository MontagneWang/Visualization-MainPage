<script lang="ts" setup>
import {onMounted} from "vue";
import Modal from '../utils/ToastComp.vue'
import {ref} from 'vue'
// toast
const showModal = ref(false)

let rightMenu = ref<HTMLDivElement | null>(null)

// 全局变量，整个圆盘的半径 radius
const radius = 110;
onMounted(() => {
	const items = document.querySelectorAll('.eachItem') as unknown as HTMLElement[];
	// 设置每个元素位置
	items.forEach((item, index) => {
		item.style.left = `${(50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / items.length) * index * Math.PI)).toFixed(4)}%`;
		item.style.top = `${(50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / items.length) * index * Math.PI)).toFixed(4)}%`;
	});
	// （左键其他区域关闭菜单）如果[不是右键点击]或者[点击的元素不是右键菜单的子元素]，则关闭菜单
	window.addEventListener('mousedown', e =>
			e.which !== 3
			&& !isDescendant(rightMenu.value as HTMLElement, e.target as HTMLElement)
			&& rightMenu.value!.classList.remove("active"));
	// 右键点击，若已有 active 类，则关闭 rightMenu，否则打开 rightMenu
	window.addEventListener('contextmenu', e => {
		e.preventDefault();
		rightMenu.value!.classList.contains("active") ?
				rightMenu.value!.classList.remove("active") : showRightMenu(e);
	})

	// 显示右键菜单
	function showRightMenu(e: MouseEvent) {
		let top = e.clientY - radius;
		let left = e.clientX - radius;
		// 设置rightMenu的位置并显示
		rightMenu.value!.style.top = top + 'px';
		rightMenu.value!.style.left = left + 'px';
		rightMenu.value!.style.display = 'block';
		rightMenu.value!.style.opacity = String(0);
		rightMenu.value!.style.transition = 'opacity 0.5s';
		// 使用requestAnimationFrame触发动画
		requestAnimationFrame(() => {
			rightMenu.value!.style.opacity = String(1);
			rightMenu.value!.classList.add("active");
			rightMenu.value!.style.display = "block";
		});
	}

	// 判断一个元素是否是另一个元素的后代元素
	function isDescendant(parent: ParentNode, child: HTMLElement): boolean {
		if (child.parentNode === parent) {
			return true;
		} else if (child.parentNode === null!) {
			return false;
		} else {
			return isDescendant(parent, child.parentNode as HTMLElement);
		}
	}
})
</script>

<template>
	<Teleport to="body">
		<!-- 使用这个 modal 组件，传入 prop -->
		<modal :show="showModal" @close="showModal = false">
			<template #header>
				<h3>嵌入内容</h3>
			</template>
			<template #body>
			</template>
		</modal>
	</Teleport>

	<div ref="rightMenu" class="rightMenu circleMenu">
		<div id="rightCircle" class="circle">
			<div :style="{height:radius*2+'px',width:radius*2+'px'}" class="item">
				<a class="eachItem" href="" target="_blank"></a>
				<a class="eachItem" href="" target="_blank"></a>
				<a class="eachItem" href="" target="_blank"></a>
				<a class="eachItem" href="/" target="_blank" @click.prevent="showModal = true"></a>
				<a class="eachItem" href="" target="_blank"></a>
				<a class="eachItem" href="mailto:ling.vc@foxmail.com" target="_blank"></a>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>

.rightMenu {
	margin: 0;
	padding: 0;
	display: none;
	position: fixed;
	z-index: 999;

	.circle {
		//height: 200px;
		//width: 200px;
		margin: 0 auto;
		position: relative;
	}

	.item {
		//height: 200px;
		//width: 200px;
		position: relative;
		border-radius: 50%;
		opacity: 0;
		-webkit-transform-origin: 50% 50%;
		-moz-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
		-webkit-transform: scale(0.1) rotate(-270deg);
		-moz-transform: scale(0.1) rotate(-270deg);
		-transform: scale(0.1) rotate(-270deg);
		-webkit-transition: all 0.4s ease-out;
		-moz-transition: all 0.4s ease-out;
		transition: all 0.4s ease-out;
	}
}

.active .item {
	opacity: 1;
	-webkit-transform: scale(1) rotate(0);
	-moz-transform: scale(1) rotate(0);
	-transform: scale(1) rotate(0);
}

$eachItemHeight: 60px;
.eachItem {
	border-radius: 50%;
	color: #eeeeee;
	display: block;
	width: $eachItemHeight;
	height: $eachItemHeight;
	line-height: $eachItemHeight;
	// 避免使用除法
	margin-left: -($eachItemHeight*0.5 + 1px);
	margin-top: -($eachItemHeight*0.5 + 1px);
	background-size: $eachItemHeight;
	position: absolute;
	text-align: center;
	//box-shadow: inset 0 0 $eachItemHeight #ffffff30;
	//-webkit-box-shadow: inset 0 0 $eachItemHeight #ffffff30;
	//-moz-box-shadow: inset 0 0 $eachItemHeight #ffffff30;
	transition: all 0.5s;
	overflow: hidden;


	&:nth-child(2n-1) {
		border: 1.5px #ee0000 solid;
	}

	&:nth-child(2n) {
		border: 1.5px #ee0000 solid;
	}

	// 放大且变亮
	&:hover {
		z-index: 1000;
		transition: all 0.5s;
		//box-shadow: inset 0 0 $eachItemHeight*1.5 #ffffff00;
		//-webkit-box-shadow: inset 0 0 $eachItemHeight*1.5 #ffffff00;
		//-moz-box-shadow: inset 0 0 $eachItemHeight*1.5 #ffffff00;
		width: $eachItemHeight*1.6;
		height: $eachItemHeight*1.6;
		line-height: $eachItemHeight*1.6;
		// 避免使用除法
		margin-left: -($eachItemHeight*0.8 + 1px);
		margin-top: -($eachItemHeight*0.8 + 1px);
		background-size: $eachItemHeight*1.6;
	}

	&:hover::before {
		opacity: 1;
	}

	// 白色透密遮罩
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #ffffff70;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	// 说明文字
	&::before {
		content: "占位\A文字";
		white-space: pre;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		line-height: 1;
		font-size: 1.8em;
		opacity: 0;
		transition: opacity 0.5s ease;
		display: flex; /* 添加flex布局 */
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		color: #ee0000;
	}

	&:nth-child(1)::before {
		content: "占位\A字符";
	}

	&:nth-child(2)::before {
		content: "占位\A字符";
	}

	&:nth-child(3)::before {
		content: "占位\A字符";
	}

	&:nth-child(4)::before {
		content: "占位\A字符";
	}

	&:nth-child(5)::before {
		content: "占位\A字符";
	}

	&:nth-child(6)::before {
		content: "反馈\A Bug";
	}
}

.item a {
	background-size: cover;

	&:nth-of-type(1) {
		background-image: url("../assets/Icon/1.ico");
		//background-image: url("https://article.biliimg.com/bfs/article/850121f432591413f7427cf54a1e5727f1356aec.jpg");
	}

	&:nth-of-type(2) {
		background-image: url("../assets/Icon/2.ico");
		//background-image: url("https://bu.dusays.com/2022/11/28/638499c63fbdd.jpeg");
	}

	&:nth-of-type(3) {
		background-image: url("../assets/Icon/3.ico");
		//background-image: url("https://bu.dusays.com/2022/11/28/6384960b9654b.jpg");
	}

	&:nth-of-type(4) {
		background-image: url("../assets/Icon/4.ico");
		//background-image: url("https://i0.hdslb.com/bfs/album/9a53af023d8fcb52790a6b607f23210e966b75cd.jpg");
	}

	&:nth-of-type(5) {
		background-image: url("../assets/Icon/5.ico");
		//background-image: url("https://i0.hdslb.com/bfs/album/95651bccd2d0921dad6d097048260854a4ea9660.png");
	}

	&:nth-of-type(6) {
		background-image: url("../assets/Icon/6.ico");
		//background-image: url("https://i0.hdslb.com/bfs/album/2e7548b8dd355cc69d49bdaa08ff435983f1ae83.png");
	}
}


</style>
