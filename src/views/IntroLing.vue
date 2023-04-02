<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue"
import WOW from "wow.js";

let timer
let history = ref(null)
let headPage = ref(null)
let nowPage = ref(0)
let finalPageShowFlag = ref(false)
let bubbleBoxShowFlag = ref(false)
const items = ref([
			{
				'': '绫彩音「Ling Caiyin」',
				'人设': 'rikuhao（ハオ）',
				'发色': '黑发',
				'瞳色': '黑瞳',
				'年龄': '16 岁',
				'身高': '155cm',
				'体重': '41kg',
				'特点': '麻花辫、呆毛、美人痣、耳机、长短袜、腰鼓'
			},
			{
				'': '乐正绫「YueZheng Ling」',
				'人设': 'rikuhao、ideolo',
				'发色': '棕发',
				'瞳色': '红瞳',
				'年龄': '16 岁',
				'身高': '160cm',
				'体重': '41kg',
				'代表色': '#EE0000',
				'生日': '4 月 12 日',
				'特点': '麻花辫、呆毛、美人痣、耳机、长短袜、腰鼓、左撇子',
				'音之精灵': '释天',
				'声源': '祈Inory',
				'声库制作人': '人形兎',
				'声库版本': 'Vocaloid™3',
				'发布日期': '2015.07.17',
				'使用乐器': '吉他',
				'擅长节奏': '70-220 BPM',
				'擅长音域': 'G2-C5',

			},
			{
				'': '乐正绫「YueZheng Ling」',
				'人设': 'TID',
				'发色': '棕发',
				'瞳色': '红瞳',
				'代表色': '#EE0000',
				'声源': '祈Inory',
				'声库制作人': '人形兎',
				'声库版本': 'Vocaloid™5',
				'发布日期': '2022.10.14',
				'音色': '炽(Normal)&幽(Dark)',
				'擅长节奏': '60-220 BPM',
				'擅长音域': 'F2-F4',
			},
			{
				'': '乐正绫「YueZheng Ling」',
				'人设': '____',
				'发色': '棕发',
				'瞳色': '红瞳',
				'代表色': '#EE0000',
				'声源': '祈Inory',
				'声库制作人': '阿元',
				'声库版本': 'ACE-Studio',
				'发布日期': '2023.__.__',
				'音色': '______',
				'擅长节奏': '____ BPM',
				'擅长音域': 'F2-F4',
			},
		]
)
let wow = new WOW({
	boxClass: "wow", // 盒子类： 当用户滚动时显示隐藏框的类名。
	animateClass: "animated",// 动画类： 触发 CSS 动画的类名（默认情况下，animate.css 库为“动画”）
	offset: 50,// 抵消： 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并达到此距离时，将显示隐藏的框。
	mobile: true,//移动： 在移动设备上打开/关闭哇.js。
	live: true,//实时：持续检查页面上的新WOW元素。
	callback: function (box) {
		// 每次启动动画时都会触发回调，传入的参数是正在动画的 DOM 节点
	},
	scrollContainer: null, // optional scroll container selector, otherwise use window,
	resetAnimation: true, // reset animation on end (default is true)
});
wow.init();

// todo 3 撑大缩小盒子时也添加动效
// https://www.zhangxinxu.com/wordpress/2015/01/content-loading-height-change-css3-transition-better-experience/
// let funTransitionHeight = function (element, time) { // time, 数值，可缺省
// 	if (typeof window.getComputedStyle == "undefined") return;
//
// 	let height = window.getComputedStyle(element).height;
// 	// 本行2015-05-20新增，mac Safari下，貌似auto也会触发transition, 故要none下~
// 	element.style.transition = "none";
//
// 	element.style.height = "auto";
// 	let targetHeight = window.getComputedStyle(element).height;
// 	element.style.height = height;
// 	if (time) element.style.transition = "height " + time + "ms";
// 	element.style.height = targetHeight;
// };

window.addEventListener('scroll', function () {
	finalPageShowFlag.value = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100
	// 存储每页高度，单位为 vh
	let pageHeight = [100, 220, 220, 220, 220, 100];
	let totalHeight = 0;
	for (let i = 0; i < pageHeight.length; i++) {
		totalHeight += pageHeight[i];
		// 需要添加屏幕的一半高度，提早判断下一页的到来
		if (window.scrollY + window.innerHeight / 2 < totalHeight * window.innerHeight / 100) {
			nowPage.value = i;
			break;
		}
	}
})

// 通过 scrollTop 判断卷去的高度，从而算出是在第几页，需要传入第几代的数据
// 也需要根据不同的页数微调样式，比如把气泡框左移一点
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let startX = screenWidth * 0.625;
let endX = screenWidth * 0.85;
let startY = screenHeight * 0.3;
let endY = screenHeight;

function judgeMousePosition(event) {
	let mouseX = event.clientX;
	let mouseY = event.clientY;
	const rect = document.querySelector('.bubbleBox').getBoundingClientRect();
	if (mouseX >= startX && mouseX <= endX && mouseY >= startY && mouseY <= endY) {
		bubbleBoxShowFlag.value = true
	} else if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
		// 鼠标在气泡框内，保持不变
	} else {
		bubbleBoxShowFlag.value = false;
	}
}

document.addEventListener('mousemove', judgeMousePosition);

// todo 可以把这段函数抽取为工具,放入 utils
// 滚动函数（不同于默认平滑滚动，这个通过这个函数设置滚动时长）
function smoothScroll(targetPosition, duration) {
	const startPosition = window.pageYOffset;
	const distance = targetPosition - startPosition;
	let startTime = null;

	function animation(currentTime) {
		if (startTime === null) {
			startTime = currentTime;
		}
		const timeElapsed = currentTime - startTime;
		const run = ease(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) {
			requestAnimationFrame(animation);
		}
	}

	function ease(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}

	requestAnimationFrame(animation);
}

function scrollPage() {
	const scrollTo = document.getElementById('lingcaiyin').offsetTop;
	// 使用scrollTo方法实现平滑滚动
	window.scrollTo({
		top: scrollTo,
		behavior: 'smooth'
	});
}


onMounted(() => {
	// 获取每项时间轴
	document.querySelectorAll('.el-timeline-item').forEach((item, index) => {
		item.classList.add('wow', 'animate__animated', 'animate__fadeInUp')
	})
	// 获取所有时间轴图标节点
	document.querySelectorAll('.el-timeline-item__node--normal').forEach((item) => {
		item.classList.add('el-timeline-item__node--large')
	})
	// 5 秒后整屏滚动
	timer = setTimeout(() => {
		if (document.documentElement.scrollTop === 0) {
			smoothScroll(document.getElementById('lingcaiyin').offsetTop, 700);
		}
	}, 5000)
})

onBeforeUnmount(() => {
	document.removeEventListener('mousemove', judgeMousePosition);
	clearTimeout(timer)
})

</script>

<template>
	<!--fixme 3 通过 <Transition> 来增加过渡失败-->
	<!--<Transition>-->
	<div v-show="nowPage!==0 && nowPage!==5"
	     ref="bubbleBox"
	     :class="{show:bubbleBoxShowFlag}"
	     class="bubbleBox">
		<ul>
			<li v-for="(value, key) in items[nowPage-1]" :key="key">
				{{ key }} {{ key === '' ? '' : '-' }} {{ value }}
			</li>
		</ul>
	</div>
	<!--</Transition>-->
	<!--首页-->
	<div ref="headPage" class="page head" @click="scrollPage">
		<div class="history show ">
			<div class="inside">
				<div class="words ">
					<span class="animate__animated animate__fadeIn animate__delay-1s">悠悠十年</span>
					<span class="titleMid animate__animated animate__fadeIn">&nbsp;|&nbsp;</span>
					<span class="animate__animated animate__fadeIn animate__delay-2s">一瞬永远</span>
				</div>
			</div>
		</div>
	</div>
	<!--todo 1 背景图添加持续年份（竖着写在右边）-->
	<!--       TimeLine 新加内容，事件选取需要体现时代变化（跨时代意义）【每年生贺也放进来】-->
	<!--       TimeLine 美化-->
	<div id="lingcaiyin" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item icon="Aim" placement="top" timestamp="2011/11/20" type="primary">
						VOCALOID China Project 项目启动
					</el-timeline-item>
					<el-timeline-item icon="Management" placement="top" timestamp="2011/12/01" type="warning">
						开始征集 VOCALOID China Project 企划人物形象设计
					</el-timeline-item>
					<el-timeline-item icon="Checked" placement="top" timestamp="2012/01/03" type="danger">
						VOCALOID China Project 形象征集结束
					</el-timeline-item>
					<el-timeline-item icon="FolderChecked" placement="top" timestamp="2012/01/17" type="success">
						<el-card>
							<h2>「雅音宫羽、绫彩音、MOKO、牙音、蝶音」五位人设入选</h2>
							<p>VOCALOID China Project 形象评选结果公布，分别是「雅音宫羽、绫彩音、MOKO、牙音、蝶音」</p>
							<h3>『元气十足的可爱外表和带有浓郁中国风的新颖设计，赢得了大批粉丝的青睐。』</h3>
						</el-card>
					</el-timeline-item>
					<el-timeline-item center icon="Place" placement="top" timestamp="2012/03/21"
					                  type="success">
						<el-card>
							<h3>VOCALOID China Project 最终形象定稿公布</h3>
							<p>确定最终形象为「洛天依、乐正绫、徵羽摩柯、乐正龙牙、墨清弦」</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item class="is-loading" icon="Loading" placement="top"
					                  timestamp="2012 年 7 月 12 日，VOCALOID™3「洛天依」中文声库首发，只是在之后三年时间里，「乐正绫」却依旧找不到属于她的声音"
					                  type="primary">
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
					</el-timeline-item>
					<el-timeline-item icon="Promotion" placement="top" timestamp="2014/04/05" type="primary">
						<p>《云端》发布 —— 「三年孤寂愿与你相伴」</p>
						<p> P 主与 STAFF 们以这一首无声歌曲，献给当时仍未发售声库的乐正绫</p>
						<p>某种意义上算是阿绫的<strong> 第一首 </strong>歌曲</p>
						<p>「作曲：卫星（音绕阁） | 填词：萌兔（音绕阁） | 绘师：碎影无痕、锦冲田 | 编曲：bz86nick | PV：墨兰花语 | 演唱：乐正绫」</p>
						<p>『乐正绫作为同洛天依一起第一批被VC选中的人设，一直没有音源，</p>
						<p>&emsp;UP 主和众多喜欢她的小伙伴一直都很想听她唱歌，</p>
						<p>&emsp;但是，两年了，UP 主终于等不起了，和一些喜欢绫的人一起创作了这首属于这个没有音源的歌姬的曲子，</p>
						<p>&emsp;希望喜欢绫的大家不要忘记她，也希望有更多的人能喜欢上这个中国红元气娘 —— 乐正绫』 —— 萌兔兔兔子</p>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
	<!--2015 -> 2021-->
	<div id="v3" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item icon="microphone" placement="top" timestamp="2014/10/15" type="primary">
						「乐正绫」声源公布，「祈Inory」为其 VOCALOID™3 中文声库声源
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)" icon="StarFilled" placement="top" timestamp="2015/06/12">
						<el-card>
							<h2 style="color: #ee0000">「记住我&emsp;鲜艳的红色」</h2>
							<h3>&nbsp;官方发布了「乐正绫」第一首试听曲 —— 《Scarlet Drop》</h3>
							<p>“作为乐正绫爱好者们急切期盼的曲目，激昂的旋律从头至尾弥漫着重金属的味道，<br/>
								&nbsp;歌词字里行间抒发着乐正绫不顾被世间
								<del>官方</del>
								与未来所阻隔和遗忘，努力唱响自己的歌声。”
							</p>
							<p>『抵达梦的尽头　之后放声而歌</p>
							<p>&emsp;已不再是过客　<span style="color: #ee0000">因为彼此约定着</span>』</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="headset" placement="top" timestamp="2015/07/04" type="primary">
						<el-card>
							<h2 style="color: rgb(64, 88, 164)">「将这份无用思念&emsp;与你再讲一遍」</h2>
							<h3>&nbsp;乐正绫第二首官方试听曲《梦语》发布</h3>
							<p>“本曲是 Vsinger 官方发布的第二首乐正绫无参试听 Demo 曲。<br/>
								&nbsp;与前一首试听曲《Scarlet Drop》不同，本曲采用了柔美抒情的曲风。<br/>
								&nbsp;歌词的字里行间都充满了温柔的思念之情，<br/>
								&nbsp;强烈地抒发了乐正绫作为一个
								<del>被官方遗忘许久的</del>
								虚拟歌手，对观众的思念之情。”
							</p>
							<p>『如果说　有一天　再相见</p>
							<p>&emsp;将这份无用思念　与你再讲一遍</p>
							<p>&emsp;那我再看一眼　在你眼中流转的世界</p>
							<p><span style="color: #ee0000;font-size:1.5em;">&emsp;一瞬永远&nbsp;</span>』</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item center icon="mic" placement="top" timestamp="2015/07/17" type="success">
						<el-card>
							<h2>「乐正绫」VOCALOID™3 中文声库发售</h2>
							<p>VOCALOID™3 中文声库「乐正绫」正式发售，从此声库走向民间创作者，一个新的时代开启了</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="List" placement="top" timestamp="2016 年" type="primary">
						<p>2016 是一个神奇的年份，在这一年，乐正绫登上了拜年祭的舞台，留下了一曲传唱千古的《九九八十一》</p>
						<p>8 月 25 日，COP 投稿了《世末歌者》，这首歌后来成为了乐正绫再生数第二高的歌曲，
							<del>同时也为 V 家留下了 2018 coming soon 的传说</del>
						</p>
						<p>同年还有「妄想症系列」、「白石溪」、「节气物语」等作品，越来越多的 P 主开始借绫之口抒发心中所想。</p>
						<p>当然，16 年还有一个企划 —— 「时之歌Project」，不知道如今的你，还在听这些曲子吗</p>
						<p>2016-08-06&nbsp;《破晓将至》【乐正绫原创】<br/>
							2016-04-09&nbsp;《黑暗审判》【乐正绫原创】<br/>
							2016-03-19&nbsp;《光流终焉》【乐正绫原创】<br/>
							2016-12-03&nbsp;《为战而生》【乐正绫原创】<br/>
							2016-02-27&nbsp;《虚拟神明》【言和&乐正绫原创】<br/>
							2016-01-30&nbsp;&emsp;《悬空》&emsp;【洛天依&乐正绫原创】<br/>
							2016-01-10&nbsp;&emsp;《归一》&emsp;【洛天依&乐正绫&心华原创】<br/></p>
						<h3>『心跳沉沉试图召唤着哀伤&emsp;而你用双手拨开我所有匆忙』</h3>
					</el-timeline-item>
					<el-timeline-item icon="" placement="top" timestamp="2017 年" type="primary">
						2017 年，妄想症系列依旧在谱写其传说
						【原创曲】乐正绫「寄明月」、(国风舞曲 Proj 1/4) 2017-10-03 21:31
						【乐正绫原创】荆轲【原创PV付】 2017-09-30 19:25
						【乐正绫原创】【亡国祸水】四·国殇（feat.洛天依）【世界协奏之歌制作组】【PV付】 2017-04-30 16:58
						【Vsinger乐正绫】未来的我【官方PV版】 2017-04-28 17:53
						【乐正绫原创】一千绫一夜【2017乐正绫诞生祭】 2017-04-12 01:08 泓mizuhiro
						【乐正绫原创】撒马尔罕之恋【PV付】 2017-11-28 15:43 账号已注销
						【Vsinger乐正绫】官方专辑《绫》-试听PV 2017-12-02 12:44 vsinger团队
						【乐正绫原创】烈火灼冰【雾霭拾光系列】【双本家PV付】【踏云社】 2017-12-17 15:24 账号已注销
						【乐正绫】闲云志（+VSQX） 2017-01-06 12:10 Dec顾令
						【洛天依乐正绫】阳山绝2.0【原创曲PV付】 2017-02-05 12:01
						【洛天依乐正绫原创】迂回步【星辉、雨狸】【Vsinger创作赛】【华尔兹/花嫁】【霾AXIS】 2017-03-18 08:49
						时之歌
						【乐正绫原创】洛维娜【时之歌Project】 2017-05-07 18:30 时之歌Project
						【洛天依&乐正绫原创】月儿谣【时之歌Project】 2017-08-12 21:03 时之歌Project 62767
					</el-timeline-item>
					<el-timeline-item icon="" placement="top" timestamp="2018 年" type="primary">
						乐正绫 原创《傲娇系男孩的告白日》（专辑《绫》收录） 2018-10-12 01:52 ilem 1307032
						【乐正绫/洛天依原创】易水诀【忘川风华录】 2018-07-28 18:00 忘川风华录 1147382
						【乐正绫&乐正龙牙】孩子气的战争【VOCALOID COVER】 2018-05-18 00:22 Creuzer 835479
						【原创国风电音】千里邀月×乐正绫（超电出品） 2018-11-30 17:00 純白 790179
						【心华 言和 乐正绫原创曲】99°C溺亡【专辑人·間收录曲】【踏云社】 2018-02-12 03:39 影随龙风
						【乐正绫原创】儒风诉骨【诸子百家/PV付】 2018-05-05 09:17 安陵影钦
						【洛天依乐正绫原创】眼泪【南北寻光收录曲】 2018-02-23 22:54 TUNO桐音
						【洛天依乐正绫原创】要有光【南北寻光收录曲】 2018-03-16 20:20 TUNO桐音 155387
						【洛天依乐正绫原创】ADVENTURE【南北寻光收录曲】 2018-03-03 10:56 TUNO桐音 151010
						【洛天依·乐正绫原创】梦遇【无名社五周年02】【《无名》专辑收录曲】 2018-01-01 20:33 无名社
						【乐正绫原创】拥我【PV付】【踏云社】 2018-04-04 12:00 从来没有中过奖的Sheep 57528
						【乐正绫原创】没有声音的勇者【2018乐正绫诞生祭】 2018-04-12 00:00 泓mizuhiro
					</el-timeline-item>
					<el-timeline-item icon="" placement="top" timestamp="2019 年" type="primary">
						【赤羽x乐正绫】《赤伶》【炸裂戏腔】【原创剧情向pv附】 2019-12-07 18:05 鲜洋芋 2270733
						【Vsinger全员原创曲】Attack！【洛天依/言和/乐正绫/乐正龙牙/徵羽摩柯/墨清弦】 2019-06-06 18:06 洛天依 866414
						【乐正绫原创】北京第三区交通委提醒您(feat.洛天依)——流浪地球印象曲【片尾彩蛋】 2019-02-10 14:51 清风疾行没有q 780920
						【五色战队】Hear me！【洛天依/乐正绫/徵羽摩柯/墨清弦/乐正龙牙】【人形兎】 2019-02-03 12:00 苏逸_Suyi 755622
						【乐正绫】我在 2019-04-12 21:34 乐正绫
						【乐正绫&300大作战】蝶恋花·何处谣 2019-04-12 14:57 乐正绫
						【乐正绫原创】道寄江雪【诸子百家/PV付】 2019-06-30 18:06 安陵影钦
						【乐正绫x龙牙x洛天依原创】玲珑络【南亭阙 第二卷】VSINGER电音国风企划/米库喵 2019-05-01 16:00 恩雅NYA
						杜甫 | 洛天依、乐正绫合唱《剑器行》 一舞剑器动四方 2019-12-15 18:00 汐音社
						【言和&乐正绫原创曲】心电感应 2019-06-21 18:00 乐正绫
						【洛天依/乐正绫/言和】VC七周年纪念同人专辑《柒》宣发试听PV~预售中~ 2019-10-03 22:47 COPY
					</el-timeline-item>
					<el-timeline-item icon="" placement="top" timestamp="2020 年" type="primary">
						【乐正绫原创】《哈利波特·学院印象曲系列》格兰芬多 2020-04-25 12:00 提糯Tino 1696430
						【乐正绫原创曲】花 2020-04-12 16:12 乐正绫
						生贺专
						【乐正绫原创】山遥路远 2020-05-22 16:41 YuH_ChiliChill
						【乐正绫原创】法令青史【诸子百家/PV付】 2020-01-28 18:00 安陵影钦
						<el-timeline-item placement="top" timestamp="2020/04/12">
							<h2>乐正绫五周年，官方发布了生日贺曲《花》，本曲使用了尚未发售的乐正绫 V5 音源 </h2>
							<h3 style="color: #ee0000">「请你知晓　—— <i>好不好</i>」</h3>
						</el-timeline-item>
						<el-timeline-item placement="top" timestamp="2020/05/22">
							ChiliChill 发布了《山遥路远》，本曲使用了尚未发售的乐正绫 V5 音源
							<h3>「快走吧，山遥路远」</h3>
						</el-timeline-item>
						【乐正绫原创曲】花 2020-04-12 16:12 乐正绫 568686
						【乐正绫角色歌】鸾绫【乐正绫五周年生日】南亭阙 2020-04-12 17:00 恩雅NYA 237957
						【乐正绫原创曲】赞美太阳！炸裂前的凤凰挽歌《日心陨落》【科幻电音/星电感应系列】 2020-04-12 20:02 周小蚕 210746
						【乐正绫原创】春日纪行 ✉ 0412乐正绫诞生祭 2020-04-12 07:28 星葵 169222
						乐正绫2020官方EP《告白诗》试听PV 2020-04-12 12:00 乐正绫 163378
						【乐正绫原创】偏执罪 feat.gumi English【2020乐正绫五周年生日】 2020-04-12 17:00 枭目☆moku 147903

						【乐正绫原创】满天星（沙雕教/HB to 溱绫西陌） 2020-12-13 00:00 星葵 131736
					</el-timeline-item>

				</el-timeline>
			</div>
		</div>
	</div>
	<!--2021 -> 2023-->
	<div id="v5" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					洛天依 乐正绫 原创《我没有歌能给你听》 2021-11-27 12:21 ilem 1627074
					从前有个衔玉教
					【乐正绫六周年生贺曲】我仍唱着-倾诉欲【闹闹丶】 2021-04-12 17:20 丨闹闹丶丨
					【乐正绫V5原创】纵横此间【诸子百家/武侠风PV付】 2021-12-31 18:00 安陵影钦
					【乐正绫V5原创曲】藏蓝【VC-GENS罗盘社】【原创PV付】 2021-11-15 17:00 残杨如血
					【乐正绫V5原创】花海【《水·花》专辑收录曲】【Xylose木糖醇】 2021-07-30 11:00 从来没有中过奖的Sheep


					<el-timeline-item placement="top" timestamp="2021/04/12">
						<h3>乐正绫六周年，官方发布了生日贺曲《丑马》，本曲也使用了尚未发售的乐正绫 V5 音源 </h3>
					</el-timeline-item>
					<el-timeline-item center placement="top" timestamp="2022/10/14">
						<el-card>
							<h3>乐正绫 Vocaloid5 声库正式发售（预售）</h3>
							<del>值得一提的是，声库盒子上并未使用争议过大的 V5 立绘</del>
						</el-card>
					</el-timeline-item>
					2021年6月18日，Vsinger官方微博发文，正式宣布乐正绫V5声库进入测试阶段，同时公开V5初版形象。
					2022年5月11日，正式公开乐正绫V5新形象。
					2022年10月14日，V5声库正式发售。
					<el-timeline-item placement="top" timestamp="2022">
						唢呐一响，好戏开场！洛天依×乐正绫原创《扬旗鸣鼓》【2022虚拟歌手贺岁纪单品/bilibili音乐】 2022-02-01 21:09 丨闹闹丶丨 1153126
						【乐正绫原创曲】未知旅行FM【2022官方生贺曲】 2022-04-12 18:00 乐正绫 573490
						南北大战为火锅！？洛天依X乐正绫《绝涮双娇》【贺岁原创曲/漫画PV付】 2022-01-29 18:00 iKz_茶壶 528311
						【乐正绫原创】雪来临时 2022-02-01 17:00 COPY 186262

						生日接龙

						【乐正绫V5原创】自愈【乐正绫七周年生日】 2022-04-12 10:00 星葵 170984
						【乐正绫七周年生日】春天的芭蕾【原创PV】【VOCALOID COVER】 2022-04-12 00:00 InkFea墨墨羽 116296
						【乐正绫原创】艳兽【2022乐正绫七周年生贺】 2022-04-12 14:00 枭目☆moku 88709
						【乐正绫】恋愛裁判 Love Trial【中填手书完整版】 2022-04-12 23:00 R_boorain 74184
						【乐正绫V5原创】白羊座α星，地球时区4月12日【乐正绫七周年生日快乐】 2022-04-12 21:00 是陆柒柒 51151
					</el-timeline-item>

				</el-timeline>
			</div>
		</div>
	</div>
	<!--2023 ->  -->
	<div id="ai" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item placement="top" timestamp="2022/12/25">
						<p>卫星哥官方发文，正式宣布 ACE-Studio 「乐正绫」Ai 声库开启内测</p>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023/01/13">
						<el-card>
							<h2>乐正绫第一首 Ai 曲投稿</h2>
							<p>【乐正绫AI】云端 —— 愿我们都能在云端歌唱</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023/01/14">
						乐正绫官方宣布，开启形象创作征集活动
					</el-timeline-item>
					<el-timeline-item center placement="top" timestamp="2023/04/10">
						<el-card>
							<h2>乐正绫 Ai 形象敲定！</h2>
							<p>在数十个优秀作品中，_______老师的设计脱颖而出，成功当选绫 Ai 形象🎉🎉🎉</p>
						</el-card>
					</el-timeline-item>

					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2015/07/17">
						todo，可根据需要增删长度
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
	<!--尾页-->
	<div class="page final">
		<div ref="history"
		     :class="{show:finalPageShowFlag}"
		     class="history">
			<div class="inside">
				<p>在此歌唱 从零开始万千景象延伸远方</p>
				<p>（注：这里动态展示时间线）</p>
			</div>
		</div>
	</div>
</template>

<!--todo 2 移动端适配-->
<!--todo 1 scss 变量引入-->
<!--todo 2 每一页高度修改（上方数组存储也要改），每一页高度设置为变量然后调用-->
<style lang="scss" scoped>
.el-timeline {
	--el-timeline-node-size-large: 18px !important;
}

$pageHeight: 220;
.head {
	.inside {
		font-size: 5em;

		div {
			text-align: center;
			line-height: 70vh;
			//color: rgba(238, 0, 0,0.7);
			white-space: nowrap;
			overflow: hidden;
		}
	}
}

span.titleMid {
	animation: blink 1.5s infinite;
}

@keyframes blink {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

body,
html {
	height: 100vh;
}

.bubbleBox {
	opacity: 0;
	width: 20vw;
	max-height: 1000px;
	position: fixed;
	left: calc(80vw - 32vw);
	top: 20vh;
	background-color: #fff;
	border-radius: 5px;
	border: 1px solid #66ccff;
	transition: all 0.5s;
	z-index: 100000;

	ul {
		margin: 0;
		padding: 10%;

		li {
			line-height: 1.3em;
		}
	}
}

.el-timeline-item {
	width: 75vw;
}

.show {
	opacity: 1 !important;
	transition: all 0.5s;
}

.head,
.final {
	height: 100vh !important;

	.history {
		height: 90vh;
		width: 90vw;
		background-image: linear-gradient(to bottom, transparent 0, transparent 10vh, rgba(255, 255, 255, 0.3) 10vh, rgba(255, 255, 255, 0.5) 90vh, transparent 90vh, transparent 100vh);
		margin: 0 auto;
		opacity: 0;
		transition: all 0.5s;
		padding: 10vh 0 0 0;

		.inside {
			margin: 5vh 3vw;
		}
	}
}

.page {
	//height: 120vh;
	height: 220vh;
	background-size: cover !important;
	background-position: center, top;
	background-attachment: fixed !important;

	// 注意：这里不可以通过 margin 值设置，background-image 需要与背景同高为 120vh，上下 10vh 设置为透明
	.content {
		width: 90vw;
		//height: 100vh;
		height: 200vh;
		//background-image: linear-gradient(to bottom, transparent 0, transparent 10vh, rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) 110vh, transparent 110vh, transparent 120vh);
		background-image: linear-gradient(to bottom, transparent 0, transparent 10vh, rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) 210vh, transparent 210vh, transparent 220vh);
		text-align: left;
		margin: 0 auto;
		padding: 15vh 0 0 0;

		.inside {
			overflow: hidden;
			margin: 3vh 1vw;
			//height: 90vh;
			height: 190vh;
		}
	}

	.story {
		width: 100vw;

		.bg {
			//height: 120vh;
			height: 220vh;
			position: absolute;
			width: 98vw;
			z-index: 10;
			background-size: auto 70vh !important;
		}
	}
}

// 图片切换到 B 站图床
.head {
	background: url(../assets/首页.png) fixed;
	//background: url(https://article.biliimg.com/bfs/article/3907d9824988b14a38f69cc18a5960b11ad214a7.png) fixed;
	background-position: center !important;
}

#lingcaiyin {
	background-image: url(../assets/VCP.png), url(../assets/云端.png);
	//background-image: url(../assets/VCP.png), url(https://article.biliimg.com/bfs/article/f73d67839c71eb90352b6945ffd807ab2d5f369a.png);

	.bg {
		background: url(../assets/0.png) 80% bottom no-repeat fixed;
		//background: url(../assets/0.png) 80% bottom no-repeat fixed;
		background-size: auto 72.5vh !important;
	}
}

#v3 {
	background-image: url(../assets/v3word.png), url(../assets/梦语.png);
	//background-image: url(../assets/v3word.png), url(https://article.biliimg.com/bfs/article/e1143590da779c44243f54a685a9a7f410d169ae.png);

	.bg {
		background: url(../assets/v3.png) 80% bottom no-repeat fixed;
		//background: url(../assets/v3.png) 80% bottom no-repeat fixed;
	}
}

#v5 {
	background-image: url(../assets/v5word.png), url(../assets/山遥路远.png);
	//background-image: url(../assets/v5word.png), url(https://article.biliimg.com/bfs/article/54f15a16f5554c03056011570f8ff1c4557b749b.png);

	.bg {
		background: url(../assets/V5.png) 83.5% bottom no-repeat fixed;
		//background: url(../assets/v5.png) 83.5% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

#ai {
	background-image: url(../assets/ace.png), url(../assets/无限接近幻想.jpg);
	//background-image: url(../assets/ace.png), url(https://article.biliimg.com/bfs/article/c06ba9fa33e09d6c6d7df2ff420a24c919e688f2.jpg);

	.bg {
		background: url(../assets/ai.png) 81% bottom no-repeat fixed;
		//background: url(../assets/ai.png) 81% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

.final {
	background: url(../assets/繁华唱遍.png) fixed;
	//background: url(https://article.biliimg.com/bfs/article/6b55f667d718fda42ffef7550188df246473e2f7.png) fixed;
}
</style>
