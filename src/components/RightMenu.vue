<script lang="ts" setup>
import {onMounted} from "vue";

// @ts-ignore
$(document).ready(function () {
	// DOM 加载完毕后，绑定 rightMenu 插件到 html
	// @ts-ignore
	$('html').rightMenu({'menu': 'circleMenu'})
});

onMounted(() => {
	let Coords: { clientY: number; clickX: number; clientX: number; clickY?: number; screenX?: number; screenY?: number; }
	let items = document.querySelectorAll('.eachItem');
	for (let i = 0, l = items.length; i < l; i++) {
		// 计算eachItem元素的位置
		(items[i] as HTMLElement).style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
		(items[i] as HTMLElement).style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
	}

	// 定义 rightMenu 插件
	(function ($) {
		let rightMenu = {
			// 插件默认设置
			defaults: {click_to_close: true, stay_open: false}, init: function (options: any) {
				let o = options, $this = $(this);
				$this.each(function (i: any) {
					// @ts-ignore
					let $this = $(this), settings = $.extend({}, rightMenu.defaults, o), $menu = $('.' + settings.menu);
					// 鼠标按下事件
					$this.on('mousedown', function (e: { which: number; target: any; }) {
						// 如果 不是右键点击 或者 点击的元素不是 rightMenu 的子元素 ，且设置了 click_to_close，则关闭 rightMenu（左键点击其他区域关闭菜单）
						if (e.which !== 3 && $(e.target).parents('.rightMenu').length < 1 && settings.click_to_close) {
							$this.find('.rightMenu').stop(true, false).animate({opacity: 0}, {
								// 改长消失时间
								duration: 1000,
								queue: false,
								complete: function () {
									$(this).css('display', 'none').find('.active').removeClass('active').next().stop(true, true).slideUp('normal')
								}
							});
							$(".circle").removeClass("active");
							$(".rightMenu").delay(400).hide(0);
						}
					});
					// 鼠标右键点击事件
					$this.on('contextmenu', function (e: { preventDefault: () => void; stopPropagation: () => void; target: any; }) {
						e.preventDefault();
						e.stopPropagation();
						rightMenu.getCoords(e);
						// $('.rightMenu_close_me').stop(true, false).animate({opacity: 0}, {
						// 	duration: 100,
						// 	queue: false,
						// 	complete: function () {
						// 		$(this).css('display', 'none')
						// 	}
						// });
						// 如果已经有active类，则关闭rightMenu，否则打开rightMenu
						if ($("#rightCircle").hasClass("active")) {
							$(".circle").removeClass("active");
							$(".rightMenu").delay(400).hide(0);
						} else {
							// 需要在右键其他地方时跟左键其他地方一样，不更改消失的位置
							let add = 150;
							let top = Coords.clientY - add,
									left = ($('html')[0] === e.target) ? Coords.clickX - add : Coords.clientX - add;
							let bodyHe = document.documentElement.clientHeight;
							let bodyWi = document.documentElement.clientWidth;
							if (top < 0) top = 0;
							if (bodyHe - Coords.clientY < 150) top = bodyHe - 300;
							if (left < 0) left = 0;
							if ($('html')[0] === e.target) {
								if (bodyWi - Coords.clickX < 150) left = bodyWi - 300
							} else {
								if (bodyWi - Coords.clientX < 150) left = bodyWi - 300
							}
							// 设置rightMenu的位置并显示
							$menu.css({
								top: top + 'px',
								left: left + 'px',
								display: 'block'
							}).stop(true, false).animate({opacity: 1}, {duration: 100, queue: false});
							$(".circle").addClass("active");
							$(".rightMenu").show();
						}
					})
				})
			},
			// 获取鼠标点击的坐标
			getCoords: function (e: any) {
				let evt = e ? e : window.event;
				let clickX = 0, clickY = 0;
				if ((evt.clientX || evt.clientY) && document.body && document.body.scrollLeft != null) {
					clickX = evt.clientX + document.body.scrollLeft;
					clickY = evt.clientY + document.body.scrollTop
				}
				if ((evt.clientX || evt.clientY) && document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.scrollLeft != null) {
					clickX = evt.clientX + document.documentElement.scrollLeft;
					clickY = evt.clientY + document.documentElement.scrollTop
				}
				if (evt.pageX || evt.pageY) {
					clickX = evt.pageX;
					clickY = evt.pageY
				}
				return Coords = {
					clickX: clickX,
					clickY: clickY,
					clientX: evt.clientX,
					clientY: evt.clientY,
					screenX: evt.screenX,
					screenY: evt.screenY
				}
			}
		};
		// 绑定rightMenu插件到jQuery
		$.fn.rightMenu = function (method: string, options: any) {
			// @ts-ignore
			if (rightMenu[method]) {
				// @ts-ignore
				return rightMenu[method].apply(this, Array.prototype.slice.call(arguments, 1))
			} else if (typeof method === 'object' || !method) {
				// @ts-ignore
				return rightMenu.init.apply(this, arguments)
			} else {
				$.error('Method ' + method + ' does not exist')
			}
		}
		// @ts-ignore
	})(jQuery);
});

function showNav() {

}
</script>

<template>
	<div class="rightMenu circleMenu">
		<div id="rightCircle" class="circle">
			<div class="item">
				<a class="eachItem" href="/"></a>
				<a class="eachItem" href="/"></a>
				<a class="eachItem" href="/"></a>
				<a class="eachItem" @click.prevent="showNav"></a>
				<a class="eachItem" href="/"></a>
				<a class="eachItem" href="/"></a>
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
	z-index: 1000;
}

.circle, .item {
	height: 300px;
	position: relative;
	width: 300px;
}

.circle {
	margin: 0 auto;
}

.item {
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

.active .item {
	opacity: 1;
	-webkit-transform: scale(1) rotate(0);
	-moz-transform: scale(1) rotate(0);
	-transform: scale(1) rotate(0);
}

.eachItem {
	border-radius: 50%;
	color: #eeeeee;
	display: block;
	height: 80px;
	line-height: 80px;
	margin-left: -41px;
	margin-top: -41px;
	position: absolute;
	text-align: center;
	width: 80px;
	background-size: 80px;
	border: 2px #b59494 solid;
	box-shadow: inset 0 0 80px #ffffff30;
	-webkit-box-shadow: inset 0 0 80px #ffffff30;
	-moz-box-shadow: inset 0 0 80px #ffffff30;
}

.eachItem:hover {
	box-shadow: inset 0 0 80px #ffffff00;
	-webkit-box-shadow: inset 0 0 80px #ffffff00;
	-moz-box-shadow: inset 0 0 80px #ffffff00;
}

.item a {
	background-size: cover;
}

.item a:nth-of-type(1) {
	background-image: url("../assets/1.ico");
	//background-image: url("https://article.biliimg.com/bfs/article/850121f432591413f7427cf54a1e5727f1356aec.jpg");
}

.item a:nth-of-type(2) {
	background-image: url("../assets/2.ico");
	//background-image: url("https://bu.dusays.com/2022/11/28/638499c63fbdd.jpeg");
}

.item a:nth-of-type(3) {
	background-image: url("../assets/3.ico");
	//background-image: url("https://bu.dusays.com/2022/11/28/6384960b9654b.jpg");
}

.item a:nth-of-type(4) {
	background-image: url("../assets/4.ico");
	//background-image: url("https://i0.hdslb.com/bfs/album/9a53af023d8fcb52790a6b607f23210e966b75cd.jpg");
}

.item a:nth-of-type(5) {
	background-image: url("../assets/5.ico");
	//background-image: url("https://i0.hdslb.com/bfs/album/95651bccd2d0921dad6d097048260854a4ea9660.png");
}

.item a:nth-of-type(6) {
	background-image: url("../assets/6.ico");
	//background-image: url("https://i0.hdslb.com/bfs/album/2e7548b8dd355cc69d49bdaa08ff435983f1ae83.png");
}
</style>
