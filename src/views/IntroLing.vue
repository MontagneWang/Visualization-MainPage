<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue"
import {smoothScroll} from '../utils/scrollToPosition';
// @ts-ignore
import WOW from "wow.js";

let timer: number | undefined
let history = ref(null)
let headPage = ref(null)
let lingcaiyin = ref<HTMLInputElement | null>(null)
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
	callback: function (box: any) {
		// 每次启动动画时都会触发回调，传入的参数是正在动画的 DOM 节点
	},
	scrollContainer: null, // optional scroll container selector, otherwise use window,
	resetAnimation: true, // reset animation on end (default is true)
});
wow.init();

// idea 撑大缩小盒子时也添加动效
// 当前页数计算，传入对应数据
window.addEventListener('scroll', function () {
	finalPageShowFlag.value = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100
	// 存储每页高度，单位为 vh
	let pageHeight = [100, 190, 340, 260, 160, 100];
	let totalHeight = 0;
	for (let i = 0; i < pageHeight.length; i++) {
		totalHeight += pageHeight[i];
		// 需要添加屏幕的一半高度，提早判断下一页的到来
		if (window.scrollY + window.innerHeight / 2 < totalHeight * window.innerHeight / 100) {
			nowPage.value = i;
			break;
		}
	}
	if (document.documentElement.scrollTop !== 0) {
		clearTimeout(timer)
	}
})

// 判断鼠标位置，显隐气泡框
// fixme 这个通过位置判断似乎并不太好，在不同分辨率的屏幕下容易错位
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let startX = screenWidth * 0.625;
let endX = screenWidth * 0.85;
let startY = screenHeight * 0.3;
let endY = screenHeight;

function judgeMousePosition(event: { clientX: number; clientY: number; }) {
	let mouseX = event.clientX;
	let mouseY = event.clientY;
	const rect = (document.querySelector('.bubbleBox') as HTMLElement).getBoundingClientRect();
	if (mouseX >= startX && mouseX <= endX && mouseY >= startY && mouseY <= endY) {
		bubbleBoxShowFlag.value = true
	} else if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
		// 鼠标在气泡框内，保持不变
	} else {
		bubbleBoxShowFlag.value = false;
	}
}

document.addEventListener('mousemove', judgeMousePosition);

let pageHeight: number
onMounted(() => {
	pageHeight = (lingcaiyin.value as HTMLElement).offsetTop
	// 获取每项时间轴
	document.querySelectorAll('.el-timeline-item').forEach((item, index) => {
		item.classList.add('wow', 'animate__animated', 'animate__fadeInUp')
	})
	// 获取并变大所有时间轴图标节点
	document.querySelectorAll('.el-timeline-item__node--normal').forEach((item) => {
		item.classList.add('el-timeline-item__node--large')
	})
	// 5 秒后整屏滚动
	timer = setTimeout(() => {
		if (document.documentElement.scrollTop === 0) {
			smoothScroll(pageHeight, 600, 1);
		}
	}, 5000)
})

onBeforeUnmount(() => {
	document.removeEventListener('mousemove', judgeMousePosition);
	clearTimeout(timer)
})

</script>

<template>
	<!-- idea 通过 <Transition> 来增加过渡 -->
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
	<div ref="headPage" class="page head" @click="smoothScroll(pageHeight)">
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
	<!--todo 背景图添加持续年份（竖着写在右边）-->
	<!--     TimeLine 新加内容，事件选取需要体现时代变化（跨时代意义）【每年生贺也放进来】-->
	<!--     TimeLine 美化-->
	<div id="lingcaiyin" ref="lingcaiyin" class="page">
		<div class="story">
			<div class="bg"></div>
		</div>
		<div class="content">
			<div class="inside">
				<el-timeline>
					<el-timeline-item icon="Aim" placement="top" timestamp="2011.11.20" type="primary">
						VOCALOID China Project 项目启动
					</el-timeline-item>
					<el-timeline-item icon="Management" placement="top" timestamp="2011.12.01" type="warning">
						开始征集 VOCALOID China Project 企划人物形象设计
					</el-timeline-item>
					<el-timeline-item icon="Checked" placement="top" timestamp="2012.01.03" type="danger">
						VOCALOID China Project 形象征集结束
					</el-timeline-item>
					<el-timeline-item icon="FolderChecked" placement="top" timestamp="2012.01.17" type="success">
						<el-card>
							<h2>「雅音宫羽、绫彩音、MOKO、牙音、蝶音」五位人设入选</h2>
							<p>VOCALOID China Project 形象评选结果公布，分别是「雅音宫羽、绫彩音、MOKO、牙音、蝶音」</p>
							<h3>『元气十足的可爱外表和带有浓郁中国风的新颖设计，赢得了大批粉丝的青睐。』</h3>
						</el-card>
					</el-timeline-item>
					<el-timeline-item center icon="Place" placement="top" timestamp="2012.03.21"
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
					</el-timeline-item>
					<el-timeline-item icon="Promotion" placement="top" timestamp="2014.04.05" type="primary">
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
					<el-timeline-item icon="microphone" placement="top" timestamp="2014.10.15" type="primary">
						「乐正绫」声源公布，「祈Inory」为其 VOCALOID™3 中文声库声源
					</el-timeline-item>
					<el-timeline-item color="rgb(238,0,0)" icon="StarFilled" placement="top" timestamp="2015.06.12">
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
					<el-timeline-item icon="headset" placement="top" timestamp="2015.07.04" type="primary">
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
					<el-timeline-item center icon="mic" placement="top" timestamp="2015.07.17" type="success">
						<el-card>
							<h2>「乐正绫」VOCALOID™3 中文声库发售</h2>
							<p>VOCALOID™3 中文声库「乐正绫」正式发售，从此声库走向民间创作者，一个新的时代开启了</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item icon="" placement="top" timestamp="2015 年" type="primary">
						2015 年，乐正绫参与的专辑有：
						《平行四界Quadimension 3》《Saligia系列》《双向·轮回与幸福》《平行四界Quadimension 4》
						<p>TUNO桐音 老师发布了《南北寻光》专辑，该专辑以「旅行」为创作主题，共有十二首（再版时增加到十八首）单曲，于 2015 年 8 月 15 日开售</p>
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
					<el-timeline-item icon="" placement="top" timestamp="2017.04.28" type="primary">
						<p>Vsinger 官方投稿了乐正绫独唱曲《未来的我》 —— 「励志歌词与旋律，搭配明亮坚定的歌声和史诗般恢弘的编曲，充满了希望与力量。」</p>
					</el-timeline-item>
					<el-timeline-item icon="" placement="top" timestamp="2017.12.02" type="primary">
						<el-card>
							<h2>「乐正绫」首张官方专辑<span style="color: #ee0000;">《绫》</span>正式发售</h2>
							<p>2017 年 12 月 2 日，Vsinger 发布了乐正绫的首张官方单人专辑《绫》，该专辑内共有7首单曲。</p>
						</el-card>
					</el-timeline-item>
					<!--<el-timeline-item icon="" placement="top" timestamp="2018.07.28" type="primary">-->
					<!--	<p>忘川风华录投稿了南北合唱的《易水诀》，这是忘川第一次选取乐正绫作为歌手来演唱歌曲-->
					<!--		<del> 可惜也是最后一次</del>-->
					<!--	</p>-->
					<!--</el-timeline-item>-->

					<el-timeline-item icon="" placement="top" timestamp="2019.04.12" type="primary">
						<p>乐正绫四周年，官方投稿了生贺曲《我在》，以绫的视角描写自诞生以来的心境，以及对听众们的感谢。</p>
						<p>同日，官方宣布与游戏联动，投稿了游戏联动曲《蝶恋花·何处谣》</p>
					</el-timeline-item>
					<el-timeline-item icon="" placement="top" timestamp="2019.12.07" type="primary">
						<p>沙雕教投稿了【赤羽x乐正绫】《赤伶》【原创剧情向pv附】</p>
						<p>『原曲为李建衡作曲、何天程编曲、清彦作词、HITA演唱的同名歌曲，收录于同名专辑中。</p>
						<p>&emsp;以中国抗日战争时期为背景，讲述名伶裴晏之受日军要求唱戏，设计纵火焚毁戏楼的故事，展现「位卑未敢忘忧国」的爱国情怀。</p>
						<p>&emsp;本作在原曲背景故事的基础上进行延伸，将乐正绫设定为裴晏之（赤羽饰）的后辈；两位歌手合称的「赤绫」与标题谐音，为人所津津乐道。</p>
						<p>&emsp;纯熟调教下的戏腔高亢优美、极具震撼力，令人身临其境，回溯那场热烈而悲壮的绝唱。』</p>
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
					<el-timeline-item placement="top" timestamp="2020.04.12">
						<el-card>
							<h2>乐正绫五周年，官方发布了生日贺曲《花》，本曲使用了尚未发售的乐正绫 V5 音源 </h2>
							<h3 style="color: #ee0000">「请你知晓　—— <i>好不好</i>」</h3>
						</el-card>
						<p>【乐正绫原创曲】花 2020-04-12 16:12 乐正绫 568686</p>
						<p>【乐正绫原创】春日纪行 ✉ 0412乐正绫诞生祭 2020-04-12 07:28 星葵 169222</p>
						<p>乐正绫2020官方EP《告白诗》试听PV 2020-04-12 12:00 乐正绫 163378</p>
						<p>《告白诗》是Vsinger（上海禾念信息科技有限公司）旗下VOCALOID 3虚拟女性歌手乐正绫的第二张官方专辑</p>
						<p>乐正绫的第一张官方单人EP，同时是2020年乐正绫诞生祭企划作品。</p>
						<p>该专辑内共有4首单曲，其中包含1首当时尚未发售的乐正绫VOCALOID 5声库演唱之曲目，于2020年4月12日正式发售。</p>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2020.05.22">
						ChiliChill 发布了《山遥路远》，本曲使用了尚未发售的乐正绫 V5 音源
						<h3>「快走吧，山遥路远」</h3>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2021.04.12">
						<h3>乐正绫六周年，官方发布了生日贺曲《丑马》，本曲也使用了尚未发售的乐正绫 V5 音源 </h3>
						<p>官方还投稿了一份互动视频</p>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2021.06.18">
						<p>Vsinger官方微博发文，正式宣布乐正绫 V5 声库进入测试阶段，
							<del>同时公开 V5 初版形象。</del>
						</p>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2021 年">
						<p>这一年，乐正绫参与的专辑有：</p>
					</el-timeline-item>

					<el-timeline-item placement="top" timestamp="2022.02.01">
						<el-card>
							<h2 style="color: #ee0000">唢呐一响，好戏开场！</h2>
							<p>2022 的春节，我们已经有了自己举办的「虚拟歌手贺岁纪」</p>
							<p>在这次贺岁纪中，涌现出了许多优秀的歌曲，绫参与演唱的原创歌曲有：《扬旗鸣鼓》《布虎记》</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2022.04.12">
						<h3>乐正绫七周年，官方发布了生日贺曲《未知旅行FM》</h3>
						<p>同时，同人也举办了七周年生日接龙活动，创作了许多歌曲</p>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2022.05.11">
						<p>2022年5月11日，正式公开乐正绫 V5 新形象</p>
					</el-timeline-item>
					<el-timeline-item center placement="top" timestamp="2022.10.14">
						<el-card>
							<h3>乐正绫 Vocaloid5 声库正式发售</h3>
							<del>值得一提的是，声库盒子上并未使用争议依旧较大的 V5 立绘</del>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2022 年">
						<p>这一年，乐正绫参与的专辑有：</p>
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
					<el-timeline-item placement="top" timestamp="2022.12.25">
						<el-card>
							<h2>卫星哥官方发文，正式宣布 ACE-Studio「乐正绫」Ai 声库开启内测</h2>
							<del>但出了点意外，官方又一直没有消息，调教老师们等了十八天才收到内测码</del>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023.01.13">
						<h3>乐正绫第一首 Ai 曲投稿</h3>
						<p>【乐正绫AI】云端 —— 愿我们都能在云端歌唱</p>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023.01.14">
						<h3>Vsinger 官方发布，开启形象创作征集活动</h3>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023.04.10">
						<el-card>
							<h2>乐正绫 Ai 形象敲定！</h2>
							<p>在数十个优秀作品中，_______老师的设计脱颖而出，成功当选绫 Ai 形象🎉🎉🎉</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023.04.12">
						<el-card>
							<h2>乐正绫八周年生日快乐🎂</h2>
							<p>生日接龙</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item placement="top" timestamp="2023 年">
						<p>这一年，乐正绫参与的专辑有：</p>
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

<!--todo 每一页高度修改（上方数组存储也要改），每一页高度设置为变量然后调用-->
<style lang="scss" scoped>
.el-timeline {
	--el-timeline-node-size-large: 18px !important;
}

.el-timeline-item {
	width: 75vw;
}

.head {
	.inside {
		font-size: 5em;

		div {
			text-align: center;
			line-height: 70vh;
			//color: rgba(238, 0, 0,0.7);
			white-space: nowrap;
			overflow: hidden;

			span.titleMid {
				animation: blink 1.5s infinite;
			}
		}
	}
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
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.5) 10vh, rgba(255, 255, 255, 0.5) 90vh,
						transparent 90vh, transparent 100vh);
		margin: 0 auto;
		opacity: 0;
		transition: all 0.5s;
		padding: 10vh 0 0 0;

		.inside {
			margin: 5vh 3vw;
		}
	}
}

$pageHeight: 320vh;
.page {
	height: $pageHeight;
	background-size: cover !important;
	background-position: center, top;
	background-attachment: fixed !important;

	// 注意：这里不可以通过 margin 值设置，background-image 需要与背景同高为 120vh，上下 10vh 设置为透明
	.content {
		width: 90vw;
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		text-align: left;
		margin: 0 auto;
		padding: 15vh 0 0 0;

		.inside {
			overflow: hidden;
			margin: 3vh 1vw;
			height: $pageHeight - 30vh;
		}
	}

	.story {
		width: 100vw;

		.bg {
			height: $pageHeight;
			position: absolute;
			width: 98vw;
			z-index: 10;
			background-size: auto 70vh !important;
		}
	}
}

.head {
	//background: url(../assets/bgPic/首页.png) fixed;
	background: url(https://article.biliimg.com/bfs/article/3907d9824988b14a38f69cc18a5960b11ad214a7.png) fixed;
	background-position: center !important;
}

#lingcaiyin {
	// 每一页的独特高度
	$pageHeight: 190vh;

	height: $pageHeight;

	.bg {
		height: $pageHeight;
	}

	.content {
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		.inside {
			height: $pageHeight - 30vh;
		}
	}

	//background-image: url(../assets/bgWord/VCP.png), url(../assets/bgPic/云端.png);
	background-image: url(https://article.biliimg.com/bfs/article/77f11eee1f298e29095747608cb090c62eadb81c.png), url(https://article.biliimg.com/bfs/article/f73d67839c71eb90352b6945ffd807ab2d5f369a.png);

	.bg {
		//background: url(../assets/bgLing/0.png) 80% bottom no-repeat fixed;
		background: url(https://article.biliimg.com/bfs/article/3a6184943556ceb4c6216a0099770274d7b9ffa2.png) 80% bottom no-repeat fixed;
		background-size: auto 72.5vh !important;
	}
}

#v3 {
	$pageHeight: 340vh;

	height: $pageHeight;

	.bg {
		height: $pageHeight;
	}

	.content {
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		.inside {
			height: $pageHeight - 30vh;
		}
	}

	//background-image: url(../assets/bgWord/v3word.png), url(../assets/bgPic/梦语.png);
	background-image: url(https://article.biliimg.com/bfs/article/9d857ae5dc05626cc44cecd4b18ff88a3d096b48.png), url(https://article.biliimg.com/bfs/article/e1143590da779c44243f54a685a9a7f410d169ae.png);

	.bg {
		//background: url(../assets/bgLing/v3.png) 80% bottom no-repeat fixed;
		background: url(https://article.biliimg.com/bfs/article/1c4505061ad44ae244932752d3d794f29c2684ad.png) 80% bottom no-repeat fixed;
	}
}

#v5 {
	$pageHeight: 260vh;

	height: $pageHeight;

	.bg {
		height: $pageHeight;
	}

	.content {
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		.inside {
			height: $pageHeight - 30vh;
		}
	}

	//background-image: url(../assets/bgWord/v5word.png), url(../assets/bgPic/山遥路远.png);
	background-image: url(https://article.biliimg.com/bfs/article/3b373ba97060d3b0f43da260e6d44cdf85633533.png), url(https://article.biliimg.com/bfs/article/54f15a16f5554c03056011570f8ff1c4557b749b.png);

	.bg {
		//background: url(../assets/bgLing/V5.png) 83.5% bottom no-repeat fixed;
		background: url(https://article.biliimg.com/bfs/article/9b14ff130dbdd0c8c32661806864f4760ae21ac1.png) 83.5% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

#ai {
	$pageHeight: 160vh;

	height: $pageHeight;

	.bg {
		height: $pageHeight;
	}

	.content {
		height: $pageHeight - 20vh;
		background-image: linear-gradient(
						to bottom, transparent 0, transparent 10vh,
						rgba(255, 255, 255, 0.8) 10vh, rgba(255, 255, 255, 0.8) $pageHeight - 10vh,
						transparent $pageHeight - 10vh, transparent $pageHeight);

		.inside {
			height: $pageHeight - 30vh;
		}
	}

	//background-image: url(../assets/bgWord/ace.png), url(../assets/bgPic/无限接近幻想.jpg);
	background-image: url(https://article.biliimg.com/bfs/article/ddaf99a3cc247c44f8c1e9df24adbbc0d211831d.png), url(https://article.biliimg.com/bfs/article/c06ba9fa33e09d6c6d7df2ff420a24c919e688f2.jpg);

	.bg {
		//background: url(../assets/ai.png) 81% bottom no-repeat fixed;
		background: url(https://article.biliimg.com/bfs/article/4652649af358ea81f80eec4994596cb778457b88.png) 81% bottom no-repeat fixed;
		background-size: auto 71vh !important;
	}
}

.final {
	//background: url(../assets/bgPic/繁华唱遍.png) fixed;
	background: url(https://article.biliimg.com/bfs/article/6b55f667d718fda42ffef7550188df246473e2f7.png) fixed;
}
</style>
