var ll = Object.defineProperty, al = Object.defineProperties;
var cl = Object.getOwnPropertyDescriptors;
var pr = Object.getOwnPropertySymbols;
var sl = Object.prototype.hasOwnProperty, ul = Object.prototype.propertyIsEnumerable;
var vr = (V, G, oe) => G in V ? ll(V, G, {enumerable: !0, configurable: !0, writable: !0, value: oe}) : V[G] = oe,
	hr = (V, G) => {
		for (var oe in G || (G = {})) sl.call(G, oe) && vr(V, oe, G[oe]);
		if (pr) for (var oe of pr(G)) ul.call(G, oe) && vr(V, oe, G[oe]);
		return V
	}, gr = (V, G) => al(V, cl(G));/*!
* vue-fullpage 0.2.13
* https://github.com/alvarotrigo/vue-fullpage.js
*
* @license GPLv3 for open source use only
* or Fullpage Commercial License for commercial use
* http://alvarotrigo.com/fullPage/pricing/
*
* Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
*/
(function (V, G) {
	typeof exports == "object" && typeof module != "undefined" ? module.exports = G(require("vue")) : typeof define == "function" && define.amd ? define(["vue"], G) : (V = typeof globalThis != "undefined" ? globalThis : V || self, V["vue-fullpage"] = G(V.Vue))
})(this, function (V) {
	"use strict";
	var G = "",
		oe = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
		Ci = {exports: {}};/*!
* fullPage 4.0.18
* https://github.com/alvarotrigo/fullPage.js
*
* @license GPLv3 for open source use only
* or Fullpage Commercial License for commercial use
* http://alvarotrigo.com/fullPage/pricing/
*
* Copyright (C) 2018 http://alvarotrigo.com/fullPage/ - A project by Alvaro Trigo
*/
	(function (q, ee) {
		(function (re, le) {
			q.exports = le()
		})(oe, function () {
			var re, le, Te, un;
			Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
				value: function (e) {
					if (this == null) throw new TypeError('"this" is null or not defined');
					var t = Object(this), n = t.length >>> 0;
					if (typeof e != "function") throw new TypeError("predicate must be a function");
					for (var i = arguments[1], r = 0; r < n;) {
						var a = t[r];
						if (e.call(i, a, r, t)) return a;
						r++
					}
				}
			}), Array.from || (Array.from = (re = Object.prototype.toString, le = function (e) {
				return typeof e == "function" || re.call(e) === "[object Function]"
			}, Te = Math.pow(2, 53) - 1, un = function (e) {
				var t = function (n) {
					var i = Number(n);
					return isNaN(i) ? 0 : i !== 0 && isFinite(i) ? (i > 0 ? 1 : -1) * Math.floor(Math.abs(i)) : i
				}(e);
				return Math.min(Math.max(t, 0), Te)
			}, function (e) {
				var t = this, n = Object(e);
				if (e == null) throw new TypeError("Array.from requires an array-like object - not null or undefined");
				var i, r = arguments.length > 1 ? arguments[1] : void 0;
				if (r !== void 0) {
					if (!le(r)) throw new TypeError("Array.from: when provided, the second argument must be a function");
					arguments.length > 2 && (i = arguments[2])
				}
				for (var a, l = un(n.length), h = le(t) ? Object(new t(l)) : new Array(l), f = 0; f < l;) a = n[f], h[f] = r ? i === void 0 ? r(a, f) : r.call(i, a, f) : a, f += 1;
				return h.length = l, h
			}));
			var b = window, T = document,
				Me = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
				Tr = /(Mac|iPhone|iPod|iPad)/i.test(b.navigator.userAgent),
				Pe = "ontouchstart" in b || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
				Ni = !!window.MSInputMethodContext && !!document.documentMode, v = {test: {}, shared: {}};

			function te(e, t) {
				b.console && b.console[e] && b.console[e]("fullPage: " + t)
			}

			function fn(e) {
				return b.getComputedStyle(e).display !== "none"
			}

			function et(e) {
				return Array.from(e).filter(function (t) {
					return fn(t)
				})
			}

			function s(e, t) {
				return (t = arguments.length > 1 ? t : document) ? t.querySelectorAll(e) : null
			}

			function Le(e) {
				e = e || {};
				for (var t = 1, n = arguments.length; t < n; ++t) {
					var i = arguments[t];
					if (i) for (var r in i) i.hasOwnProperty(r) && r != "__proto__" && r != "constructor" && (Object.prototype.toString.call(i[r]) !== "[object Object]" ? e[r] = i[r] : e[r] = Le(e[r], i[r]))
				}
				return e
			}

			function P(e, t) {
				return e != null && e.classList.contains(t)
			}

			function Y() {
				return "innerHeight" in b ? b.innerHeight : T.documentElement.offsetHeight
			}

			function tt() {
				return b.innerWidth
			}

			function R(e, t) {
				var n;
				for (n in e = ye(e), t) if (t.hasOwnProperty(n) && n !== null) for (var i = 0; i < e.length; i++) e[i].style[n] = t[n];
				return e
			}

			function xt(e, t) {
				if (t == null) return e.previousElementSibling;
				var n = xt(e);
				return n && D(n, t) ? n : null
			}

			function nt(e, t) {
				if (t == null) return e.nextElementSibling;
				var n = nt(e);
				return n && D(n, t) ? n : null
			}

			function ji(e) {
				return e[e.length - 1]
			}

			function ve(e, t) {
				e = De(e) ? e[0] : e;
				for (var n = t != null ? s(t, e.parentNode) : e.parentNode.childNodes, i = 0, r = 0; r < n.length; r++) {
					if (n[r] == e) return i;
					n[r].nodeType == 1 && i++
				}
				return -1
			}

			function ye(e) {
				return De(e) ? e : [e]
			}

			function Et(e) {
				e = ye(e);
				for (var t = 0; t < e.length; t++) e[t].style.display = "none";
				return e
			}

			function dn(e) {
				e = ye(e);
				for (var t = 0; t < e.length; t++) e[t].style.display = "block";
				return e
			}

			function De(e) {
				return Object.prototype.toString.call(e) === "[object Array]" || Object.prototype.toString.call(e) === "[object NodeList]"
			}

			function x(e, t) {
				e = ye(e);
				for (var n = 0; n < e.length; n++) e[n].classList.add(t);
				return e
			}

			function z(e, t) {
				e = ye(e);
				for (var n = t.split(" "), i = 0; i < n.length; i++) {
					t = n[i];
					for (var r = 0; r < e.length; r++) e[r].classList.remove(t)
				}
				return e
			}

			function _e(e, t) {
				t.appendChild(e)
			}

			function pn(e, t, n) {
				var i;
				t = t || T.createElement("div");
				for (var r = 0; r < e.length; r++) {
					var a = e[r];
					(n && !r || !n) && (i = t.cloneNode(!0), a.parentNode.insertBefore(i, a)), i.appendChild(a)
				}
				return e
			}

			function At(e, t) {
				pn(e, t, !0)
			}

			function vn(e, t) {
				for (typeof t == "string" && (t = xe(t)), e.appendChild(t); e.firstChild !== t;) t.appendChild(e.firstChild)
			}

			function Tt(e) {
				for (var t = T.createDocumentFragment(); e.firstChild;) t.appendChild(e.firstChild);
				e.parentNode.replaceChild(t, e)
			}

			function L(e, t) {
				return e && e.nodeType === 1 ? D(e, t) ? e : L(e.parentNode, t) : null
			}

			function it(e, t) {
				Pt(e, e.nextSibling, t)
			}

			function Mt(e, t) {
				Pt(e, e, t)
			}

			function Pt(e, t, n) {
				De(n) || (typeof n == "string" && (n = xe(n)), n = [n]);
				for (var i = 0; i < n.length; i++) e.parentNode.insertBefore(n[i], t)
			}

			function be() {
				var e = T.documentElement;
				return (b.pageYOffset || e.scrollTop) - (e.clientTop || 0)
			}

			function Ve(e) {
				return Array.prototype.filter.call(e.parentNode.children, function (t) {
					return t !== e
				})
			}

			function F(e) {
				e.preventDefault()
			}

			function B(e, t) {
				return e.getAttribute(t)
			}

			function Oe(e, t, n) {
				T.addEventListener(e, t, n === "undefined" ? null : n)
			}

			function he(e, t, n) {
				b.addEventListener(e, t, n === "undefined" ? null : n)
			}

			function ge(e, t, n) {
				T.removeEventListener(e, t, n === "undefined" ? null : n)
			}

			function Ye(e, t, n) {
				b.removeEventListener(e, t, n === "undefined" ? null : n)
			}

			function I(e) {
				if (typeof e == "function") return !0;
				var t = Object.prototype.toString.call(e);
				return t === "[object Function]" || t === "[object GeneratorFunction]"
			}

			function K(e, t, n) {
				var i;
				n = n === void 0 ? {} : n, typeof b.CustomEvent == "function" ? i = new CustomEvent(t, {detail: n}) : (i = T.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, n), e.dispatchEvent(i)
			}

			function D(e, t) {
				return (e.matches || e.t || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t)
			}

			function Lt(e, t) {
				if (typeof t == "boolean") for (var n = 0; n < e.length; n++) e[n].style.display = t ? "block" : "none";
				return e
			}

			function xe(e) {
				var t = T.createElement("div");
				return t.innerHTML = e.trim(), t.firstChild
			}

			function Re(e) {
				e = ye(e);
				for (var t = 0; t < e.length; t++) {
					var n = e[t];
					n && n.parentElement && n.parentNode.removeChild(n)
				}
			}

			function ki(e, t) {
				Array.prototype.filter.call(e, t)
			}

			function Ot(e, t, n) {
				for (var i = e[n], r = []; i;) (D(i, t) || t == null) && r.push(i), i = i[n];
				return r
			}

			function hn(e, t) {
				return Ot(e, t, "nextElementSibling")
			}

			function gn(e, t) {
				return Ot(e, t, "previousElementSibling")
			}

			function Hi(e) {
				return Object.keys(e).map(function (t) {
					return e[t]
				})
			}

			function fe(e) {
				return e[e.length - 1]
			}

			function ot(e, t) {
				for (var n = 0, i = e.slice(Math.max(e.length - t, 1)), r = 0; r < i.length; r++) n += i[r];
				return Math.ceil(n / t)
			}

			function Rt(e, t) {
				e.setAttribute(t, B(e, "data-" + t)), e.removeAttribute("data-" + t)
			}

			function Bi(e, t) {
				var n = [e];
				do e = e.parentNode, n.push(e); while (!D(e, t));
				return n
			}

			function mn() {
				var e = T.activeElement;
				return D(e, "textarea") || D(e, "input") || D(e, "select") || B(e, "contentEditable") == "true" || B(e, "contentEditable") == ""
			}

			b.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function (e, t) {
				t = t || window;
				for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this)
			}), typeof Object.assign != "function" && Object.defineProperty(Object, "assign", {
				value: function (e, t) {
					if (e == null) throw new TypeError("Cannot convert undefined or null to object");
					for (var n = Object(e), i = 1; i < arguments.length; i++) {
						var r = arguments[i];
						if (r != null) for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (n[a] = r[a])
					}
					return n
				}, writable: !0, i: !0
			}), window.fp_utils = {
				$: s,
				deepExtend: Le,
				hasClass: P,
				getWindowHeight: Y,
				css: R,
				prev: xt,
				next: nt,
				last: ji,
				index: ve,
				getList: ye,
				hide: Et,
				show: dn,
				isArrayOrList: De,
				addClass: x,
				removeClass: z,
				appendTo: _e,
				wrap: pn,
				wrapAll: At,
				wrapInner: vn,
				unwrap: Tt,
				closest: L,
				after: it,
				before: Mt,
				insertBefore: Pt,
				getScrollTop: be,
				siblings: Ve,
				preventDefault: F,
				isFunction: I,
				trigger: K,
				matches: D,
				toggle: Lt,
				createElementFromHTML: xe,
				remove: Re,
				filter: ki,
				untilAll: Ot,
				nextAll: hn,
				prevAll: gn,
				showError: te
			};
			var zi = Object.freeze({
				__proto__: null,
				showError: te,
				isVisible: fn,
				getVisible: et,
				$: s,
				deepExtend: Le,
				hasClass: P,
				getWindowHeight: Y,
				o: tt,
				css: R,
				prev: xt,
				next: nt,
				last: ji,
				index: ve,
				getList: ye,
				hide: Et,
				show: dn,
				isArrayOrList: De,
				addClass: x,
				removeClass: z,
				appendTo: _e,
				wrap: pn,
				wrapAll: At,
				wrapInner: vn,
				unwrap: Tt,
				closest: L,
				after: it,
				before: Mt,
				insertBefore: Pt,
				getScrollTop: be,
				siblings: Ve,
				preventDefault: F,
				l: B,
				u: Oe,
				v: he,
				p: ge,
				h: Ye,
				isFunction: I,
				trigger: K,
				matches: D,
				toggle: Lt,
				createElementFromHTML: xe,
				remove: Re,
				filter: ki,
				untilAll: Ot,
				nextAll: hn,
				prevAll: gn,
				toArray: Hi,
				g: fe,
				S: ot,
				M: Rt,
				T: Bi,
				A: mn
			});

			function rt(e) {
				return rt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
					return typeof t
				} : function (t) {
					return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				}, rt(e)
			}

			var d = {
				O: {}, R: function (e, t) {
					var n = this;
					return rt(this.O[e]) !== "object" && (this.O[e] = []), this.O[e].push(t), function () {
						return n.removeListener(e, t)
					}
				}, removeListener: function (e, t) {
					if (rt(this.O[e]) === "object") {
						var n = this.O[e].indexOf(t);
						n > -1 && this.O[e].splice(n, 1)
					}
				}, j: function (e) {
					for (var t = this, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
					rt(this.O[e]) === "object" && this.O[e].forEach(function (a) {
						return a.apply(t, i)
					})
				}, once: function (e, t) {
					var n = this, i = this.R(e, function () {
						i();
						for (var r = arguments.length, a = new Array(r), l = 0; l < r; l++) a[l] = arguments[l];
						t.apply(n, a)
					})
				}
			}, c = {
				L: 0,
				D: 0,
				slides: [],
				N: [],
				P: null,
				H: null,
				C: !1,
				I: !1,
				W: !1,
				F: !1,
				V: !1,
				Z: void 0,
				B: void 0,
				G: !1,
				canScroll: !0,
				Y: "none",
				U: "none",
				X: !1,
				_: !1,
				J: !0,
				K: 0,
				q: Y(),
				nn: !1,
				tn: {}
			};

			function p(e) {
				Object.assign(c, e)
			}

			function u() {
				return c
			}

			b.state = c;
			var Ii = "onAfterRenderNoAnchor", Ct = "onClickOrTouch", Sn = "moveSlideLeft", wn = "moveSlideRight",
				Di = "onInitialise", Q = "bindEvents", se = "onDestroy", _i = "contentChanged", Vi = "onScrollOverflowScrolled",
				yn = "onScrollPageAndSlide", Yi = "onKeyDown", Fi = "onMenuClick", Wi = "scrollPage", Zi = "landscapeScroll",
				Xi = "scrollBeyondFullpage", Gi = "onPerformMovement", Ui = "onSlideLeave", qi = "onLeave",
				bn = "afterSectionLoads", xn = "afterSlideLoads";

			function Ki(e) {
				d.j(Ct, {e, target: e.target})
			}

			function Mr() {
				["click", "touchstart"].forEach(function (e) {
					ge(e, Ki)
				})
			}

			function Pr() {
				p({J: !0})
			}

			d.R(Q, function () {
				["click", "touchstart"].forEach(function (e) {
					Oe(e, Ki)
				}), he("focus", Pr), d.R(se, Mr)
			});
			var Ji = "fullpage-wrapper", Ce = "." + Ji, Nt = "fp-responsive", En = "fp-notransition", An = "fp-destroyed",
				jt = "fp-enabled", N = "active", Tn = ".active", Ne = "fp-completely", kt = "fp-section", ne = "." + kt,
				Lr = ".fp-tableCell", je = "#fp-nav", Mn = "fp-slide", Pn = "." + Mn, Ht = ".fp-slide.active", Bt = "fp-slides",
				me = ".fp-slides", Ln = "fp-slidesContainer", lt = "." + Ln, Qi = "fp-table", Fe = "fp-overflow", at = "." + Fe,
				zt = "fp-is-overflow", On = ".fp-slidesNav", $i = ".fp-slidesNav a", eo = "fp-controlArrow", Rn = "." + eo,
				to = "fp-prev", Cn = ".fp-controlArrow.fp-prev", no = ".fp-controlArrow.fp-next", It = {
					menu: !1,
					anchors: [],
					lockAnchors: !1,
					navigation: !1,
					navigationPosition: "right",
					navigationTooltips: [],
					showActiveTooltip: !1,
					slidesNavigation: !1,
					slidesNavPosition: "bottom",
					scrollBar: !1,
					hybrid: !1,
					licenseKey: "",
					credits: {enabled: !0, label: "Made with fullPage.js", position: "right"},
					css3: !0,
					scrollingSpeed: 700,
					autoScrolling: !0,
					fitToSection: !0,
					en: 600,
					easing: "easeInOutCubic",
					easingcss3: "ease",
					loopBottom: !1,
					loopTop: !1,
					loopHorizontal: !0,
					continuousVertical: !1,
					continuousHorizontal: !1,
					scrollHorizontally: !1,
					interlockedSlides: !1,
					dragAndMove: !1,
					offsetSections: !1,
					resetSliders: !1,
					fadingEffect: !1,
					normalScrollElements: null,
					scrollOverflow: !0,
					scrollOverflowReset: !1,
					touchSensitivity: 5,
					touchWrapper: null,
					bigSectionsDestination: null,
					keyboardScrolling: !0,
					animateAnchor: !0,
					recordHistory: !0,
					allowCorrectDirection: !1,
					scrollOverflowMacStyle: !0,
					controlArrows: !0,
					controlArrowsHTML: ['<div class="fp-arrow"></div>', '<div class="fp-arrow"></div>'],
					controlArrowColor: "#fff",
					verticalCentered: !0,
					sectionsColor: [],
					paddingTop: 0,
					paddingBottom: 0,
					fixedElements: null,
					responsive: 0,
					responsiveWidth: 0,
					responsiveHeight: 0,
					responsiveSlides: !1,
					parallax: !1,
					parallaxOptions: {type: "reveal", percentage: 62, property: "translate"},
					cards: !1,
					cardsOptions: {perspective: 100, fadeContent: !0, fadeBackground: !0},
					sectionSelector: ".section",
					slideSelector: ".slide",
					afterLoad: null,
					beforeLeave: null,
					onLeave: null,
					afterRender: null,
					afterResize: null,
					afterReBuild: null,
					afterSlideLoad: null,
					onSlideLeave: null,
					afterResponsive: null,
					onScrollOverflow: null,
					lazyLoading: !0,
					observer: !0
				}, ct = null, io = !1, Nn = Le({}, It), Dt = null;

			function g(e) {
				return ct
			}

			function o() {
				return Dt || It
			}

			function We() {
				return Nn
			}

			function _t(e, t, n) {
				Dt[e] = t, n !== "internal" && (Nn[e] = t)
			}

			function oo() {
				if (!o().anchors.length) {
					var e = s(o().sectionSelector.split(",").join("[data-anchor],") + "[data-anchor]", ct);
					e.length && e.length === s(o().sectionSelector, ct).length && (io = !0, e.forEach(function (n) {
						o().anchors.push(B(n, "data-anchor").toString())
					}))
				}
				if (!o().navigationTooltips.length) {
					var t = s(o().sectionSelector.split(",").join("[data-tooltip],") + "[data-tooltip]", ct);
					t.length && t.forEach(function (n) {
						o().navigationTooltips.push(B(n, "data-tooltip").toString())
					})
				}
			}

			function ro(e) {
				return window["fp_" + e + "Extension"] !== void 0
			}

			function H(e) {
				var t = o();
				return t[e] !== null && Object.prototype.toString.call(t[e]) === "[object Array]" ? t[e].length && v[e] : t[e] && v[e]
			}

			function m(e, t, n) {
				if (H(e)) return I(v[e][t]) ? v[e][t](n) : v[e][t]
			}

			function Vt() {
				return m("dragAndMove", "isAnimating")
			}

			function lo() {
				return m("dragAndMove", "isGrabbing")
			}

			function jn(e) {
				if (o().offsetSections && v.offsetSections) {
					var t = m("offsetSections", "getWindowHeight", e);
					return t !== "" ? Math.round(t) + "px" : t
				}
				return Y() + "px"
			}

			function ao(e, t) {
				e.insertBefore(t, e.firstChild)
			}

			function J(e) {
				var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

				function n(r) {
					var a, l, h, f, y, E, w = "", M = 0;
					for (r = r.replace(/[^A-Za-z0-9+/=]/g, ""); M < r.length;) a = t.indexOf(r.charAt(M++)) << 2 | (f = t.indexOf(r.charAt(M++))) >> 4, l = (15 & f) << 4 | (y = t.indexOf(r.charAt(M++))) >> 2, h = (3 & y) << 6 | (E = t.indexOf(r.charAt(M++))), w += String.fromCharCode(a), y != 64 && (w += String.fromCharCode(l)), E != 64 && (w += String.fromCharCode(h));
					return w = function (O) {
						for (var Z, _ = "", j = 0, k = 0, A = 0; j < O.length;) (k = O.charCodeAt(j)) < 128 ? (_ += String.fromCharCode(k), j++) : k > 191 && k < 224 ? (A = O.charCodeAt(j + 1), _ += String.fromCharCode((31 & k) << 6 | 63 & A), j += 2) : (A = O.charCodeAt(j + 1), Z = O.charCodeAt(j + 2), _ += String.fromCharCode((15 & k) << 12 | (63 & A) << 6 | 63 & Z), j += 3);
						return _
					}(w), w
				}

				function i(r) {
					return r.slice(3).slice(0, -3)
				}

				return function (r) {
					var a = r.split("_");
					if (a.length > 1) {
						var l = a[1];
						return n(r.replace(i(a[1]), "").split("_")[0].slice(2).slice(0, -2)) + "_" + n(l.slice(3).slice(0, -3))
					}
					return i(r)
				}(n(e))
			}

			b.fp_utils = b.fp_utils || {}, Object.assign(b.fp_utils, {
				prependTo: ao, toggleClass: function (e, t, n) {
					if (e.classList && n == null) e.classList.toggle(t); else {
						var i = P(e, t);
						i && n == null || !n ? z(e, t) : (!i && n == null || n) && x(e, t)
					}
				}
			});
			var co = function (e) {
				this.anchor = e.anchor, this.item = e.item, this.index = e.index(), this.isLast = this.index === e.item.parentElement.querySelectorAll(e.selector).length - 1, this.isFirst = !this.index, this.isActive = e.isActive
			}, ue = function (e, t) {
				this.parent = this.parent || null, this.selector = t, this.anchor = B(e, "data-anchor") || o().anchors[ve(e, o().sectionSelector)], this.item = e, this.isVisible = fn(e), this.isActive = P(e, N), this.on = P(e, Fe) || s(at, e)[0] != null, this.rn = t === o().sectionSelector, this.container = L(e, lt) || L(e, Ce), this.index = function () {
					return this.siblings().indexOf(this)
				}
			};

			function kn(e) {
				return e.map(function (t) {
					return t.item
				})
			}

			function Hn(e, t) {
				return e.find(function (n) {
					return n.item === t
				})
			}

			ue.prototype.siblings = function () {
				return this.rn ? this.isVisible ? c.N : c.an : this.parent ? this.parent.slides : 0
			}, ue.prototype.prev = function () {
				var e = this.siblings(), t = (this.rn ? e.indexOf(this) : this.parent.slides.indexOf(this)) - 1;
				return t >= 0 ? e[t] : null
			}, ue.prototype.next = function () {
				var e = this.siblings(), t = (this.rn ? e.indexOf(this) : this.parent.slides.indexOf(this)) + 1;
				return t < e.length ? e[t] : null
			}, ue.prototype.prevPanel = function () {
				return this === this.prev() ? this.parent ? this.parent.prev() : null : this.prev() || (this.parent ? this.parent.prev() : null)
			}, ue.prototype.nextPanel = function () {
				return this === this.next() ? this.parent ? this.parent.next() : null : this.next() || (this.parent ? this.parent.next() : null)
			}, ue.prototype.ln = function () {
				return this.rn ? c.N : c.un
			};
			var so, uo = function (e) {
				co.call(this, e)
			}, Or = function (e) {
				co.call(this, e)
			};

			function ke(e) {
				var t = s(Ht, e);
				return t.length && (e = t[0]), e
			}

			function fo(e) {
				return e ? e.activeSlide ? e.activeSlide : e : null
			}

			function Ze(e) {
				var t, n, i = o();
				return i.autoScrolling && !i.scrollBar ? (t = -e, n = s(Ce)[0]) : (t = e, n = window), {options: t, element: n}
			}

			function po(e, t) {
				!o().autoScrolling || o().scrollBar || e.self != window && P(e, Bt) ? e.self != window && P(e, Bt) ? e.scrollLeft = t : e.scrollTo(0, t) : e.style.top = t + "px"
			}

			function Bn(e) {
				var t = "transform " + o().scrollingSpeed + "ms " + o().easingcss3;
				return z(e, En), R(e, {"-webkit-transition": t, transition: t})
			}

			function zn(e, t) {
				var n = e.index(), i = ve(t, ne);
				return n == i ? "none" : n > i ? "up" : "down"
			}

			function Yt(e) {
				return x(e, En)
			}

			function In(e) {
				return {"-webkit-transform": e, "-moz-transform": e, "-ms-transform": e, transform: e}
			}

			function vo(e, t) {
				t ? Bn(g()) : Yt(g()), clearTimeout(so), R(g(), In(e)), v.test.cn = e, so = setTimeout(function () {
					z(g(), En)
				}, 10)
			}

			function He(e) {
				var t = Math.round(e);
				if (o().css3 && o().autoScrolling && !o().scrollBar) vo("translate3d(0px, -" + t + "px, 0px)", !1); else if (o().autoScrolling && !o().scrollBar) R(g(), {top: -t + "px"}), v.test.top = -t + "px"; else {
					var n = Ze(t);
					po(n.element, n.options)
				}
			}

			function st(e, t) {
				t !== "internal" && m("fadingEffect", "update", e), m("cards", "update_", e), _t("scrollingSpeed", e, t)
			}

			v.setScrollingSpeed = st;
			var ut, C = null, ft = null, Ft = null;

			function Wt(e, t, n, i) {
				var r, a = function (y) {
					return y.self != b && P(y, Bt) ? y.scrollLeft : !o().autoScrolling || o().scrollBar ? be() : y.offsetTop
				}(e), l = t - a, h = !1, f = c.G;
				p({G: !0}), ut && window.cancelAnimationFrame(ut), ut = function (y) {
					r || (r = y);
					var E = Math.floor(y - r);
					if (c.G) {
						var w = t;
						n && (w = b.fp_easings[o().easing](E, a, l, n)), E <= n && po(e, w), E < n ? window.requestAnimationFrame(ut) : i === void 0 || h || (i(), p({G: !1}), h = !0)
					} else h || f || (i(), p({G: !1}), h = !0)
				}, window.requestAnimationFrame(ut)
			}

			function Ee(e) {
				return e && !e.item ? new uo(new Ie(e)) : e ? new uo(e) : null
			}

			function Dn(e) {
				return e ? new Or(e) : null
			}

			function de(e, t) {
				var n = function (i, r) {
					var a = {
						afterRender: function () {
							return {section: Ee(u().P), sn: Dn(u().P.activeSlide)}
						}, onLeave: function () {
							return {
								origin: Ee(r.items.origin),
								destination: Ee(r.items.destination),
								direction: r.direction,
								trigger: u().H
							}
						}, afterLoad: function () {
							return a.onLeave()
						}, afterSlideLoad: function () {
							return {
								section: Ee(r.items.section),
								origin: Ee(r.items.origin),
								destination: Ee(r.items.destination),
								direction: r.direction,
								trigger: u().H
							}
						}, onSlideLeave: function () {
							return a.afterSlideLoad()
						}, beforeLeave: function () {
							return a.onLeave()
						}, onScrollOverflow: function () {
							return {section: Ee(u().P), sn: Dn(u().P.activeSlide), position: r.position, direction: r.direction}
						}
					};
					return a[i]()
				}(e, t);
				return K(g(), e, n), o()[e].apply(n[Object.keys(n)[0]], Hi(n)) !== !1
			}

			function Zt(e) {
				var t = ke(e);
				s("video, audio", t).forEach(function (n) {
					n.hasAttribute("data-autoplay") && typeof n.play == "function" && n.play()
				}), s('iframe[src*="youtube.com/embed/"]', t).forEach(function (n) {
					n.hasAttribute("data-autoplay") && ho(n), n.onload = function () {
						n.hasAttribute("data-autoplay") && ho(n)
					}
				})
			}

			function ho(e) {
				e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
			}

			function _n(e) {
				var t = ke(e);
				s("video, audio", t).forEach(function (n) {
					n.hasAttribute("data-keepplaying") || typeof n.pause != "function" || n.pause()
				}), s('iframe[src*="youtube.com/embed/"]', t).forEach(function (n) {
					/youtube\.com\/embed\//.test(B(n, "src")) && !n.hasAttribute("data-keepplaying") && n.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
				})
			}

			function Xe(e) {
				o().lazyLoading && s("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]", ke(e)).forEach(function (t) {
					if (["src", "srcset"].forEach(function (i) {
						var r = B(t, "data-" + i);
						r != null && r && (Rt(t, i), t.addEventListener("load", function () {
						}))
					}), D(t, "source")) {
						var n = L(t, "video, audio");
						n && (n.load(), n.onloadeddata = function () {
						})
					}
				})
			}

			function go() {
				var e = u().P.item, t = u().P.activeSlide, n = mo(e), i = String(n);
				t && (i = i + "-" + mo(t.item)), i = i.replace("/", "-").replace("#", "");
				var r = new RegExp("\\b\\s?fp-viewing-[^\\s]+\\b", "g");
				C.className = C.className.replace(r, ""), x(C, "fp-viewing-" + i)
			}

			function mo(e) {
				if (!e) return null;
				var t = B(e, "data-anchor"), n = ve(e);
				return t == null && (t = n), t
			}

			function Vn(e, t, n) {
				var i = "";
				o().anchors.length && !o().lockAnchors && (e ? (n != null && (i = n), t == null && (t = e), p({B: t}), Yn(i + "/" + t)) : (e != null && p({B: t}), Yn(n))), go()
			}

			function Yn(e) {
				if (o().recordHistory) location.hash = e; else if (Me || Pe) b.history.replaceState(void 0, void 0, "#" + e); else {
					var t = b.location.href.split("#")[0];
					b.location.replace(t + "#" + e)
				}
			}

			function So(e, t, n) {
				var i = t === "Section" ? o().anchors[e] : B(n, "data-anchor");
				return encodeURI(o().navigationTooltips[e] || i || t + " " + (e + 1))
			}

			function Rr(e) {
				F(e), p({H: "horizontalNav"});
				var t = L(this, ne), n = s(me, L(this, ne))[0], i = Hn(u().N, t).slides[ve(L(this, "li"))];
				d.j(Zi, {slides: n, destination: i.item})
			}

			var Xt, Be = {};

			function Gt(e, t, n) {
				t !== "all" ? Be[n][t] = e : Object.keys(Be[n]).forEach(function (i) {
					Be[n][i] = e
				})
			}

			function W() {
				return Be
			}

			function Cr() {
				var e = L(this, ne);
				P(this, to) ? W().m.left && (p({H: "slideArrow"}), d.j(Sn, {section: e})) : W().m.right && (p({H: "slideArrow"}), d.j(wn, {section: e}))
			}

			function wo(e) {
				!o().loopHorizontal && o().controlArrows && (Lt(s(Cn, e.section), e.slideIndex !== 0), Lt(s(no, e.section), nt(e.destiny) != null))
			}

			function Nr() {
				clearTimeout(Xt), p({W: !1})
			}

			function ze(e, t, n) {
				var i = L(e, ne), r = u().N.filter(function (h) {
					return h.item == i
				})[0], a = r.slides.filter(function (h) {
					return h.item == t
				})[0], l = {
					slides: e,
					destiny: t,
					direction: n,
					destinyPos: {left: t.offsetLeft},
					slideIndex: a.index(),
					section: i,
					sectionIndex: r.index(),
					anchorLink: r.anchor,
					slidesNav: s(On, i)[0],
					slideAnchor: a.anchor,
					prevSlide: r.activeSlide.item,
					prevSlideIndex: r.activeSlide.index(),
					items: {section: r, origin: r.activeSlide, destination: a},
					localIsResizing: c.F
				};
				l.xMovement = bo(l.prevSlideIndex, l.slideIndex), l.direction = l.direction ? l.direction : l.xMovement, l.localIsResizing || p({canScroll: !1}), m("parallax", "applyHorizontal", l), m("cards", "apply", l), m("dropEffect", "apply", l), m("waterEffect", "apply", l), o().onSlideLeave && !l.localIsResizing && l.xMovement !== "none" && I(o().onSlideLeave) && de("onSlideLeave", l) === !1 ? p({W: !1}) : (H("dropEffect") && o().dropEffect || (x(t, N), z(Ve(t), N)), pe(), l.localIsResizing || (_n(l.prevSlide), Xe(t)), wo(l), r.isActive && !l.localIsResizing && Vn(l.slideIndex, l.slideAnchor, l.anchorLink), m("continuousHorizontal", "apply", l), d.j(Ui, l), lo() ? Fn(l) : yo(e, l, !0), o().interlockedSlides && v.interlockedSlides && (H("continuousHorizontal") && n !== void 0 && n !== l.xMovement || m("interlockedSlides", "apply", l)))
			}

			function yo(e, t, n) {
				var i, r, a = t.destinyPos;
				if (i = t.slidesNav, r = t.slideIndex, o().slidesNavigation && i != null && (z(s(Tn, i), N), x(s("a", s("li", i)[r]), N)), p({scrollX: Math.round(a.left)}), o().css3) {
					var l = "translate3d(-" + Math.round(a.left) + "px, 0px, 0px)";
					v.test.dn[t.sectionIndex] = l, H("dragAndMove") && t.vn !== void 0 || Bn(s(lt, e)), R(s(lt, e), In(l)), H("interlockedSlides") || clearTimeout(Xt), Xt = setTimeout(function () {
						n && Fn(t)
					}, o().scrollingSpeed)
				} else v.test.left[t.sectionIndex] = Math.round(a.left), Wt(e, Math.round(a.left), o().scrollingSpeed, function () {
					n && Fn(t)
				})
			}

			function bo(e, t) {
				return e == t ? "none" : e > t ? "left" : "right"
			}

			function jr() {
				clearTimeout(Xt)
			}

			function Fn(e) {
				m("continuousHorizontal", "afterSlideLoads", e), e.localIsResizing || (m("parallax", "afterSlideLoads"), m("scrollOverflowReset", "setPrevious", e.prevSlide), m("scrollOverflowReset", "reset"), I(o().afterSlideLoad) && de("afterSlideLoad", e), p({canScroll: !0}), Zt(e.destiny), d.j(xn, e)), p({W: !1}), m("interlockedSlides", "interlockedSlides", e)
			}

			function dt(e, t) {
				st(0, "internal"), t !== void 0 && p({F: !0}), ze(L(e, me), e), t !== void 0 && p({F: !1}), st(We().scrollingSpeed, "internal")
			}

			function Wn(e, t) {
				_t("recordHistory", e, t)
			}

			function Ge(e, t) {
				e || He(0), _t("autoScrolling", e, t);
				var n = u().P.item;
				if (o().autoScrolling && !o().scrollBar) R(Ft, {
					overflow: "hidden",
					height: "100%"
				}), z(C, "fp-scrollable"), Wn(We().recordHistory, "internal"), R(g(), {
					"-ms-touch-action": "none",
					"touch-action": "none"
				}), n != null && He(n.offsetTop); else if (R(Ft, {
					overflow: "visible",
					height: "initial"
				}), x(C, "fp-scrollable"), Wn(!!o().autoScrolling && We().recordHistory, "internal"), R(g(), {
					"-ms-touch-action": "",
					"touch-action": ""
				}), Yt(g()), n != null) {
					var i = Ze(n.offsetTop);
					i.element.scrollTo(0, i.options)
				}
				K(g(), "setAutoScrolling", e)
			}

			function Zn() {
				for (var e = s(Ht), t = 0; t < e.length; t++) dt(e[t], "internal")
			}

			function xo() {
				var e = s(".fp-auto-height")[0] || $n() && s(".fp-auto-height-responsive")[0];
				o().lazyLoading && e && s(".fp-section:not(.active)").forEach(function (t) {
					var n, i, r, a, l;
					i = (n = t.getBoundingClientRect()).top, r = n.bottom, a = i + 2 < c.q && i > 0, l = r > 2 && r < c.q, (a || l) && Xe(t)
				})
			}

			function kr() {
				K(xt(this), "click")
			}

			function Eo() {
				Re(s(je));
				var e = T.createElement("div");
				e.setAttribute("id", "fp-nav");
				var t = T.createElement("ul");
				e.appendChild(t), _e(e, C);
				var n = s(je)[0];
				x(n, "fp-" + o().navigationPosition), o().showActiveTooltip && x(n, "fp-show-active");
				for (var i = "", r = 0; r < u().N.length; r++) {
					var a = u().N[r], l = "";
					o().anchors.length && (l = a.anchor), i += '<li><a href="#' + encodeURI(l) + '"><span class="fp-sr-only">' + So(a.index(), "Section") + "</span><span></span></a>";
					var h = o().navigationTooltips[a.index()];
					h !== void 0 && h !== "" && (i += '<div class="fp-tooltip fp-' + o().navigationPosition + '">' + h + "</div>"), i += "</li>"
				}
				s("ul", n)[0].innerHTML = i;
				var f = s("li", s(je)[0])[u().P.index()];
				x(s("a", f), N)
			}

			function Hr(e) {
				e.preventDefault && F(e), p({H: "verticalNav"});
				var t = ve(L(this, "#fp-nav li"));
				d.j(Wi, {destination: u().N[t]})
			}

			function Xn(e, t) {
				var n;
				n = e, o().menu && o().menu.length && s(o().menu).forEach(function (i) {
					i != null && (z(s(Tn, i), N), x(s('[data-menuanchor="' + n + '"]', i), N))
				}), function (i, r) {
					var a = s(je)[0];
					o().navigation && a != null && a.style.display !== "none" && (z(s(Tn, a), N), x(i ? s('a[href="#' + i + '"]', a) : s("a", s("li", a)[r]), N))
				}(e, t)
			}

			Be.m = {up: !0, down: !0, left: !0, right: !0}, Be.k = Le({}, Be.m), d.R(Ct, function (e) {
				var t = e.target;
				(D(t, Rn) || L(t, Rn)) && Cr.call(t, e)
			}), v.landscapeScroll = ze, d.R(Q, function () {
				d.R(Gi, Nr)
			}), v.setRecordHistory = Wn, v.setAutoScrolling = Ge, v.test.setAutoScrolling = Ge, new Date().getTime();
			var Gn, Un, qn, Kn, pt, Jn, Br = (Un = !0, qn = new Date().getTime(), Kn = !b.fullpage_api, function (e, t) {
				var n = new Date().getTime(), i = e === "wheel" ? o().scrollingSpeed : 100;
				return Un = Kn || n - qn >= i, Kn = !b.fullpage_api, Un && (Gn = t(), qn = n), Gn === void 0 || Gn
			});

			function Ao(e, t) {
				if (I(o().beforeLeave)) return Br(u().H, function () {
					return de(e, t)
				})
			}

			function Ue(e, t, n) {
				var i = e.item;
				if (i != null) {
					var r, a, l = {
						element: i,
						callback: t,
						isMovementUp: n,
						dtop: To(i),
						yMovement: zn(u().P, i),
						anchorLink: e.anchor,
						sectionIndex: e.index(),
						activeSlide: e.activeSlide ? e.activeSlide.item : null,
						leavingSection: u().P.index() + 1,
						localIsResizing: c.F,
						items: {origin: u().P, destination: e},
						direction: null
					};
					if (!(u().P.item == i && !c.F || o().scrollBar && be() === l.dtop && !P(i, "fp-auto-height"))) {
						if (l.activeSlide != null && (r = B(l.activeSlide, "data-anchor"), a = ve(l.activeSlide, null)), !l.localIsResizing) {
							var h = l.yMovement;
							if (n !== void 0 && (h = n ? "up" : "down"), l.direction = h, ro("dropEffect") && v.dropEffect.onLeave_(l), ro("waterEffect") && v.waterEffect.onLeave_(l), I(o().beforeLeave) && Ao("beforeLeave", l) === !1 || I(o().onLeave) && !de("onLeave", l)) return
						}
						m("parallax", "apply", l), m("cards", "apply", l), m("dropEffect", "apply", l), m("waterEffect", "apply", l), o().autoScrolling && o().continuousVertical && l.isMovementUp !== void 0 && (!l.isMovementUp && l.yMovement == "up" || l.isMovementUp && l.yMovement == "down") && (l = function (f) {
							p({nn: !0});
							var y = u().P.item;
							return f.isMovementUp ? Mt(y, hn(y, ne)) : it(y, gn(y, ne).reverse()), He(u().P.item.offsetTop), Zn(), f.pn = y, f.dtop = f.element.offsetTop, f.yMovement = zn(u().P, f.element), f.leavingSection = f.items.origin.index() + 1, f.sectionIndex = f.items.destination.index(), K(g(), "onContinuousVertical", f), f
						}(l)), m("scrollOverflowReset", "setPrevious", u().P.item), l.localIsResizing || _n(u().P.item), H("dropEffect") && o().dropEffect || (x(i, N), z(Ve(i), N)), pe(), Xe(i), p({canScroll: v.test.hn}), Vn(a, r, l.anchorLink), d.j(qi, l), function (f) {
							var y = o().scrollingSpeed < 700, E = y ? 700 : o().scrollingSpeed;
							if (p({
								Y: "none",
								scrollY: Math.round(f.dtop)
							}), d.j(Gi), o().css3 && o().autoScrolling && !o().scrollBar) vo("translate3d(0px, -" + Math.round(f.dtop) + "px, 0px)", !0), H("waterEffect") && Zn(), o().scrollingSpeed ? (clearTimeout(pt), pt = setTimeout(function () {
								Ut(f), p({canScroll: !y || v.test.hn})
							}, o().scrollingSpeed)) : Ut(f); else {
								var w = Ze(f.dtop);
								v.test.top = -f.dtop + "px", clearTimeout(pt), Wt(w.element, w.options, o().scrollingSpeed, function () {
									o().scrollBar ? pt = setTimeout(function () {
										Ut(f)
									}, 30) : (Ut(f), p({canScroll: !y || v.test.hn}))
								})
							}
							y && (clearTimeout(Jn), Jn = setTimeout(function () {
								p({canScroll: !0})
							}, E))
						}(l), p({Z: l.anchorLink}), Xn(l.anchorLink, function (f) {
							return f.pn != null ? f.isMovementUp ? c.L - 1 : 0 : f.sectionIndex
						}(l))
					}
				}
			}

			function To(e) {
				var t = e.offsetHeight, n = e.offsetTop, i = n,
					r = H("dragAndMove") && m("dragAndMove", "isGrabbing") ? m("dragAndMove", "isScrollingDown") : n > c.K,
					a = i - Y() + t, l = o().bigSectionsDestination;
				return t > Y() ? (r || l) && l !== "bottom" || (i = a) : (r || c.F && nt(e) == null) && (i = a), H("offsetSections") && (i = v.offsetSections.getSectionPosition_(r, i, e)), p({K: i}), i
			}

			function Ut(e) {
				p({C: !1}), function (t) {
					t.pn != null && (t.isMovementUp ? Mt(s(ne)[0], t.pn) : it(s(ne)[u().N.length - 1], t.pn), He(u().P.item.offsetTop), function () {
						for (var n = s(Ht), i = 0; i < n.length; i++) dt(n[i], "internal")
					}(), t.sectionIndex = t.items.destination.index(), t.leavingSection = t.items.origin.index() + 1, p({nn: !1}))
				}(e), I(o().afterLoad) && !e.localIsResizing && de("afterLoad", e), m("parallax", "afterLoad"), m("waterEffect", "afterLoad"), m("dropEffect", "afterLoad"), m("scrollOverflowReset", "reset"), m("resetSliders", "apply", e), pe(), e.localIsResizing || Zt(e.element), x(e.element, Ne), z(Ve(e.element), Ne), xo(), p({canScroll: !0}), d.j(bn, e), I(e.callback) && e.callback()
			}

			function Qn(e, t) {
				_t("fitToSection", e, t)
			}

			function Mo() {
				c.canScroll && (p({F: !0}), Ue(c.P), p({F: !1}))
			}

			function Po() {
				var e = o().responsive || o().responsiveWidth, t = o().responsiveHeight, n = e && b.innerWidth < e,
					i = t && b.innerHeight < t;
				e && t ? qt(n || i) : e ? qt(n) : t && qt(i)
			}

			function qt(e) {
				var t = $n();
				e ? t || (Ge(!1, "internal"), Qn(!1, "internal"), Et(s(je)), x(C, Nt), I(o().afterResponsive) && o().afterResponsive.call(g(), e), m("responsiveSlides", "toSections"), K(g(), "afterResponsive", e)) : t && (Ge(We().autoScrolling, "internal"), Qn(We().autoScrolling, "internal"), dn(s(je)), z(C, Nt), I(o().afterResponsive) && o().afterResponsive.call(g(), e), m("responsiveSlides", "toSlides"), K(g(), "afterResponsive", e))
			}

			function $n() {
				return P(C, Nt)
			}

			function Lo(e) {
				o().verticalCentered && (!o().scrollOverflow && S.gn(e.item) || S.mn(e) || P(e.item, Qi) || x(e.item, Qi))
			}

			v.moveTo = moveTo, v.getScrollY = function () {
				return c.scrollY
			}, d.R(se, function () {
				clearTimeout(pt), clearTimeout(Jn)
			}), v.setFitToSection = Qn, v.fitToSection = Mo, v.setResponsive = qt;
			var ei, Oo = null;

			function ti(e) {
				var t = e.item, n = e.wn.length, i = e.index();
				!u().P && e.isVisible && (x(t, N), pe(), Oo = u().P.item), H("offsetSections") && R(t, {height: jn(t)}), o().paddingTop && R(t, {"padding-top": o().paddingTop}), o().paddingBottom && R(t, {"padding-bottom": o().paddingBottom}), o().sectionsColor[i] !== void 0 && R(t, {"background-color": o().sectionsColor[i]}), o().anchors[i] !== void 0 && t.setAttribute("data-anchor", e.anchor), n || Lo(e)
			}

			function zr() {
				o().scrollOverflow && !o().scrollBar && (S.bn(), S.Sn())
			}

			function Ir() {
				ge("keyup", S.yn)
			}

			v.getActiveSection = function () {
				return u().P
			}, d.R(Q, function () {
				d.R(Ii, zr), d.R(qi, S.onLeave), d.R(Ui, S.onLeave), d.R(xn, S.afterLoad), d.R(bn, S.afterLoad), d.R(se, Ir), Oe("keyup", S.yn)
			});
			var ni, S = {
				Mn: null, Tn: !0, An: !0, xn: null, On: null, kn: function (e) {
					if (!c.canScroll) return F(e), !1
				}, En: function (e) {
					if (!mn() && o().keyboardScrolling && [38, 33, 32, 40, 34, 36, 35].indexOf(e.keyCode) > -1 && !S.An) return F(e), !1
				}, yn: function () {
					S.Tn = c.canScroll
				}, onLeave: function () {
					clearTimeout(ei), S.An = !1
				}, afterLoad: function () {
					S.An = !1, clearTimeout(ei), ei = setTimeout(function () {
						S.Tn = c.canScroll
					}, 200)
				}, Rn: function () {
					T.activeElement === this.Mn && (this.Mn.blur(), S.An = !1)
				}, Sn: function () {
					if (o().scrollOverflow && S.Tn) {
						S.Rn();
						var e = S.jn(u().P.item);
						!e || Me || Pe || (this.Mn = e, requestAnimationFrame(function () {
							e.focus(), S.An = !0
						})), S.Tn = !1
					}
				}, bn: function () {
					o().scrollOverflowMacStyle && !Tr && x(C, "fp-scroll-mac"), u().un.forEach(function (e) {
						if (!(e.slides && e.slides.length || P(e.item, "fp-auto-height-responsive") && $n())) {
							var t, n = ke(e.item), i = S.gn(e.item), r = (t = e).rn ? t : t.parent;
							if (Ni) {
								var a = i ? "addClass" : "removeClass";
								zi[a](r.item, zt), zi[a](e.item, zt)
							} else x(r.item, zt), x(e.item, zt);
							e.on || (S.Ln(n), S.zn(n)), e.on = !0
						}
					})
				}, zn: function (e) {
					S.jn(e).addEventListener("scroll", S.Dn), e.addEventListener("wheel", S.kn, {passive: !1}), e.addEventListener("keydown", S.En, {passive: !1})
				}, Ln: function (e) {
					var t = document.createElement("div");
					t.className = Fe, vn(e, t), t.setAttribute("tabindex", "-1")
				}, Nn: function (e) {
					var t = s(at, e)[0];
					t && (Tt(t), e.removeAttribute("tabindex"))
				}, jn: function (e) {
					var t = ke(e);
					return s(at, t)[0] || t
				}, on: function (e) {
					return P(e, Fe) || s(at, e)[0] != null
				}, mn: function (e) {
					return e.rn && e.activeSlide ? e.activeSlide.on : e.on
				}, gn: function (e) {
					return S.jn(e).scrollHeight > b.innerHeight
				}, Pn: function (e, t) {
					if (!c.canScroll) return !1;
					if (o().scrollBar) return !0;
					var n = S.jn(t);
					if (!o().scrollOverflow || !P(n, Fe) || P(t, "fp-noscroll") || P(ke(t), "fp-noscroll")) return !0;
					var i = Ni ? 1 : 0, r = n.scrollTop, a = e === "up" && r <= 0,
						l = e === "down" && n.scrollHeight <= Math.ceil(n.offsetHeight + r) + i, h = a || l;
					return h || (this.xn = new Date().getTime()), h
				}, Hn: function () {
					this.On = new Date().getTime();
					var e = this.On - S.xn, t = (Me || Pe) && c.X, n = c._ && e > 600;
					return t && e > 400 || n
				}, Dn: (ni = 0, function (e) {
					var t = e.target.scrollTop, n = c.Y !== "none" ? c.Y : ni < t ? "down" : "up";
					ni = t, I(o().onScrollOverflow) && de("onScrollOverflow", {
						position: t,
						direction: n
					}), P(e.target, Fe) && c.canScroll && S.Pn(n, e.target) && S.Hn() && S.gn(u().P.item) && d.j(Vi, {direction: n})
				})
			}, ii = null, oi = null;

			function pe() {
				c.P = null, c.N.map(function (e) {
					var t = P(e.item, N);
					e.isActive = t, e.on = S.on(e.item), t && (c.P = e), e.slides.length && (e.activeSlide = null, e.slides.map(function (n) {
						var i = P(n.item, N);
						n.on = S.on(e.item), n.isActive = i, i && (e.activeSlide = n)
					}))
				}), function () {
					var e = c.P, t = !!c.P && c.P.slides.length, n = c.P ? c.P.activeSlide : null;
					if (!e && c.N.length && !u().C) {
						if (ii) {
							var i = Co(ii, c.N);
							i && (c.P = i, c.P.isActive = !0, x(c.P.item, N)), c.P && He(c.P.item.offsetTop)
						}
						if (t && !n && oi) {
							var r = Co(oi, c.P.slides);
							r && (c.P.activeSlide = r, c.P.activeSlide.isActive = !0, x(c.P.activeSlide.item, N)), c.P.activeSlide && dt(c.P.activeSlide.item, "internal")
						}
					}
				}(), K(g(), "onUpdateStateDone")
			}

			function Kt() {
				var e = s(o().sectionSelector + ", " + ne, g()), t = et(e), n = Array.from(e).map(function (a) {
					return new Ie(a)
				}), i = n.filter(function (a) {
					return a.isVisible
				}), r = i.reduce(function (a, l) {
					return a.concat(l.slides)
				}, []);
				ii = Ro(c.P), oi = Ro(c.P ? c.P.activeSlide : null), c.L = t.length, c.D = i.reduce(function (a, l) {
					return a + l.slides.length
				}, 0), c.N = i, c.an = n, c.slides = r, c.un = c.N.concat(c.slides)
			}

			function Ro(e) {
				if (!e) return null;
				var t = e ? e.item : null, n = e.rn ? c.an : c.P.Cn;
				if (t) {
					var i = Hn(n, t);
					return i ? i.index() : null
				}
				return null
			}

			function Co(e, t) {
				var n, i = e - 1, r = e;
				do {
					if (n = t[i] || t[r]) break;
					i -= 1, r += 1
				} while (i >= 0 || r < t.length);
				return n
			}

			var Ie = function (e) {
				var t = this;
				[].push.call(arguments, o().sectionSelector), ue.apply(this, arguments), this.wn = s(o().slideSelector, e), this.Cn = Array.from(this.wn).map(function (n) {
					return new Jt(n, t)
				}), this.slides = this.Cn.filter(function (n) {
					return n.isVisible
				}), this.activeSlide = this.slides.length ? this.slides.filter(function (n) {
					return n.isActive
				})[0] || this.slides[0] : null
			};
			Ie.prototype = ue.prototype, Ie.prototype.constructor = Ie;
			var vt, Jt = function (e, t) {
				this.parent = t, ue.call(this, e, o().slideSelector)
			};

			function No() {
				x(s(o().sectionSelector, g()), kt), x(s(o().slideSelector, g()), Mn)
			}

			function ri(e) {
				var t = e.slides.length, n = e.wn, i = e.slides, r = 100 * t, a = 100 / t;
				if (!s(me, e.item)[0]) {
					var l = T.createElement("div");
					l.className = Bt, At(n, l);
					var h = T.createElement("div");
					h.className = Ln, At(n, h)
				}
				R(s(lt, e.item), {width: r + "%"}), t > 1 && (o().controlArrows && function (y) {
					var E = y.item, w = [xe(o().controlArrowsHTML[0]), xe(o().controlArrowsHTML[1])];
					it(s(me, E)[0], w), x(w, eo), x(w[0], to), x(w[1], "fp-next"), o().controlArrowColor !== "#fff" && (R(s(no, E), {"border-color": "transparent transparent transparent " + o().controlArrowColor}), R(s(Cn, E), {"border-color": "transparent " + o().controlArrowColor + " transparent transparent"})), o().loopHorizontal || Et(s(Cn, E))
				}(e), o().slidesNavigation && function (y) {
					var E = y.item, w = y.slides.length;
					_e(xe('<div class="fp-slidesNav"><ul></ul></div>'), E);
					var M = s(On, E)[0];
					x(M, "fp-" + o().slidesNavPosition);
					for (var O = 0; O < w; O++) _e(xe('<li><a href="#"><span class="fp-sr-only">' + So(O, "Slide", s(Pn, E)[O]) + "</span><span></span></a></li>"), s("ul", M)[0]);
					R(M, {"margin-left": "-" + M.innerWidth / 2 + "px"});
					var Z = y.activeSlide ? y.activeSlide.index() : 0;
					x(s("a", s("li", M)[Z]), N)
				}(e)), i.forEach(function (y) {
					R(y.item, {width: a + "%"}), o().verticalCentered && Lo(y)
				});
				var f = H("responsiveSlides") ? null : e.activeSlide || null;
				f != null && c.P && (c.P.index() !== 0 || c.P.index() === 0 && f.index() !== 0) ? (dt(f.item, "internal"), x(f.item, "fp-initial")) : x(n[0], N)
			}

			Jt.prototype = ue.prototype, Jt.prototype.constructor = Ie;
			var jo = {attributes: !1, subtree: !0, childList: !0, characterData: !0};

			function ko() {
				return m("responsiveSlides", "isResponsiveSlidesChanging") || et(s(o().slideSelector, g())).length !== u().D
			}

			function li(e) {
				var t = ko();
				(ko() || m("responsiveSlides", "isResponsiveSlidesChanging") || et(s(o().sectionSelector, g())).length !== u().L) && !c.nn && (o().observer && vt && vt.disconnect(), Kt(), pe(), o().anchors = [], Re(s(je)), m("responsiveSlides", "isResponsiveSlidesChanging") || No(), oo(), o().navigation && Eo(), t && (Re(s(On)), Re(s(Rn))), u().N.forEach(function (n) {
					n.slides.length ? t && ri(n) : ti(n)
				})), o().observer && vt && s(Ce)[0] && vt.observe(s(Ce)[0], jo)
			}

			d.R(Q, function () {
				var e, t, n;
				o().observer && "MutationObserver" in window && s(Ce)[0] && (e = s(Ce)[0], t = jo, (n = new MutationObserver(li)).observe(e, t), vt = n), d.R(_i, li)
			}), v.render = li;
			var Dr = function () {
				var e = !1;
				try {
					var t = Object.defineProperty({}, "passive", {
						get: function () {
							e = !0
						}
					});
					he("testPassive", null, t), Ye("testPassive", null, t)
				} catch {
				}
				return function () {
					return e
				}
			}();

			function Ho() {
				return !!Dr() && {passive: !1}
			}

			var Bo, zo, ai, Ae, Qt = (ai = new Date().getTime(), Ae = [], {
				In: function (e) {
					var t = (e = e || b.event).wheelDelta || -e.deltaY || -e.detail, n = Math.max(-1, Math.min(1, t)),
						i = e.wheelDeltaX !== void 0 || e.deltaX !== void 0;
					Bo = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !i;
					var r = new Date().getTime();
					zo = n < 0 ? "down" : "up", Ae.length > 149 && Ae.shift(), Ae.push(Math.abs(t));
					var a = r - ai;
					ai = r, a > 200 && (Ae = [])
				}, Wn: function () {
					var e = ot(Ae, 10) >= ot(Ae, 70);
					return !!Ae.length && e && Bo
				}, Fn: function () {
					return zo
				}
			});

			function _r() {
				var e = o().css3 ? be() + Y() : fe(u().N).item.offsetTop + fe(u().N).item.offsetHeight, t = Ze(e);
				v.test.top = -e + "px", p({canScroll: !1}), Wt(t.element, t.options, o().scrollingSpeed, function () {
					setTimeout(function () {
						p({C: !0}), p({canScroll: !0})
					}, 30)
				})
			}

			function Vr() {
				g().getBoundingClientRect().bottom >= 0 && Io()
			}

			function Io() {
				var e = Ze(fe(u().N).item.offsetTop);
				p({canScroll: !1}), Wt(e.element, e.options, o().scrollingSpeed, function () {
					p({canScroll: !0}), p({C: !1}), p({Vn: !1})
				})
			}

			var ci, si, ui, Do = (ci = !1, si = {}, ui = {}, function (e, t, n) {
				switch (e) {
					case"set":
						si[t] = new Date().getTime(), ui[t] = n;
						break;
					case"isNewKeyframe":
						var i = new Date().getTime();
						ci = i - si[t] > ui[t]
				}
				return ci
			});

			function ht() {
				var e = u().P.next();
				e || !o().loopBottom && !o().continuousVertical || (e = u().N[0]), e != null ? Ue(e, null, !1) : g().scrollHeight < C.scrollHeight && d.j(Xi)
			}

			function qe() {
				var e = u().P.prev();
				e || !o().loopTop && !o().continuousVertical || (e = fe(u().N)), e != null && Ue(e, null, !0)
			}

			v.moveSectionDown = ht, v.moveSectionUp = qe;
			var $t = 0;

			function _o(e) {
				o().autoScrolling && (c.canScroll && (e.pageY < $t && W().m.up ? qe() : e.pageY > $t && W().m.down && ht()), $t = e.pageY)
			}

			function Vo(e) {
				if (W().m[e]) {
					var t = e === "down" ? ht : qe;
					H("scrollHorizontally") && (t = m("scrollHorizontally", "getScrollSection", {
						type: e,
						scrollSection: t
					})), o().scrollOverflow && S.mn(u().P) ? S.Pn(e, u().P.item) && S.Hn() && t() : t()
				}
			}

			var en, fi, Ke, tn = 0, gt = 0, nn = 0, mt = 0, on = Fo(), ae = {
				Zn: "ontouchmove" in window ? "touchmove" : on ? on.move : null,
				Bn: "ontouchstart" in window ? "touchstart" : on ? on.down : null
			};

			function St(e) {
				var t = L(e.target, ne) || u().P.item, n = S.mn(u().P);
				if (wt(e)) {
					p({X: !0, _: !1}), o().autoScrolling && (n && !c.canScroll || o().scrollBar) && F(e);
					var i = di(e);
					nn = i.y, mt = i.x;
					var r = Math.abs(tn - nn) > b.innerHeight / 100 * o().touchSensitivity,
						a = Math.abs(gt - mt) > tt() / 100 * o().touchSensitivity,
						l = s(me, t).length && Math.abs(gt - mt) > Math.abs(tn - nn), h = tn > nn ? "down" : "up";
					p({Y: l ? gt > mt ? "right" : "left" : h}), l ? !c.W && a && (gt > mt ? W().m.right && d.j(wn, {section: t}) : W().m.left && d.j(Sn, {section: t})) : o().autoScrolling && c.canScroll && r && Vo(h)
				}
			}

			function wt(e) {
				return e.pointerType === void 0 || e.pointerType != "mouse"
			}

			function rn(e) {
				if (o().fitToSection && p({G: !1}), wt(e)) {
					var t = di(e);
					tn = t.y, gt = t.x
				}
				he("touchend", Yo)
			}

			function Yo() {
				Ye("touchend", Yo), p({X: !1})
			}

			function di(e) {
				var t = {};
				return t.y = e.pageY !== void 0 && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = e.pageX !== void 0 && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, Pe && wt(e) && o().scrollBar && e.touches !== void 0 && (t.y = e.touches[0].pageY, t.x = e.touches[0].pageX), t
			}

			function Fo() {
				var e;
				return b.PointerEvent && (e = {down: "pointerdown", move: "pointermove"}), e
			}

			function pi(e) {
				o().autoScrolling && wt(e) && W().m.up && (c.canScroll || F(e))
			}

			function Wo(e, t) {
				var n = t == null ? u().P.item : t, i = Hn(c.N, n), r = s(me, n)[0];
				if (!(r == null || Vt() || c.W || i.slides.length < 2)) {
					var a = i.activeSlide, l = e === "left" ? a.prev() : a.next();
					if (!l) {
						if (!o().loopHorizontal) return;
						l = e === "left" ? fe(i.slides) : i.slides[0]
					}
					p({W: !v.test.hn}), ze(r, l.item, e)
				}
			}

			function vi(e) {
				Wo("left", e)
			}

			function hi(e) {
				Wo("right", e)
			}

			function gi(e) {
				var t = u().N.filter(function (i) {
					return i.anchor === e
				})[0];
				if (!t) {
					var n = e !== void 0 ? e - 1 : 0;
					t = u().N[n]
				}
				return t
			}

			function Zo(e) {
				e != null && ze(L(e, me), e)
			}

			function mi(e, t) {
				var n = gi(e);
				if (n != null) {
					var i = function (r, a) {
						var l = a.slides.filter(function (h) {
							return h.anchor === r
						})[0];
						return l == null && (r = r !== void 0 ? r : 0, l = a.slides[r]), l ? l.item : null
					}(t, n);
					n.anchor === c.Z || P(n.item, N) ? Zo(i) : Ue(n, function () {
						Zo(i)
					})
				}
			}

			function yt(e, t) {
				var n = gi(e);
				t !== void 0 ? mi(e, t) : n != null && Ue(n)
			}

			function Yr() {
				clearTimeout(fi), ge("keydown", Xo), ge("keyup", Go)
			}

			function Xo(e) {
				clearTimeout(fi);
				var t = e.keyCode, n = [37, 39].indexOf(t) > -1, i = o().autoScrolling || o().fitToSection || n;
				t === 9 ? function (r) {
					var a = r.shiftKey, l = T.activeElement, h = Si(ke(u().P.item));

					function f(_) {
						return F(_), h[0] ? h[0].focus() : null
					}

					if (!function (_) {
						var j = Si(T), k = j.indexOf(T.activeElement), A = j[_.shiftKey ? k - 1 : k + 1], X = L(A, Pn),
							U = L(A, ne);
						return !X && !U
					}(r)) {
						l ? L(l, ".fp-section.active,.fp-section.active .fp-slide.active") == null && (l = f(r)) : f(r);
						var y = l == h[0], E = l == h[h.length - 1], w = a && y;
						if (w || !a && E) {
							F(r);
							var M = function (_) {
								var j, k = _ ? "prevPanel" : "nextPanel", A = [],
									X = fo((c.P && c.P.activeSlide ? c.P.activeSlide : c.P)[k]());
								do (A = Si(X.item)).length && (j = {
									Gn: X,
									Yn: A[_ ? A.length - 1 : 0]
								}), X = fo(X[k]()); while (X && A.length === 0);
								return j
							}(w), O = M ? M.Gn : null;
							if (O) {
								var Z = O.rn ? O : O.parent;
								d.j(yn, {Un: Z.index() + 1, slideAnchor: O.rn ? 0 : O.index()}), Ke = M.Yn, F(r)
							}
						}
					}
				}(e) : !mn() && o().keyboardScrolling && i && (en = e.ctrlKey, fi = setTimeout(function () {
					(function (r) {
						var a = r.shiftKey, l = T.activeElement, h = D(l, "video") || D(l, "audio"), f = S.Pn("up", u().P.item),
							y = S.Pn("down", u().P.item), E = [37, 39].indexOf(r.keyCode) > -1;
						if (function (w) {
							(function (M) {
								return [40, 38, 32, 33, 34].indexOf(M.keyCode) > -1 && !c.C
							})(w) && !L(w.target, at) && w.preventDefault()
						}(r), c.canScroll || E) switch (p({H: "keydown"}), r.keyCode) {
							case 38:
							case 33:
								W().k.up && f ? c.C ? d.j(Yi, {e: r}) : qe() : S.Sn();
								break;
							case 32:
								if (a && W().k.up && !h && f) {
									qe();
									break
								}
							case 40:
							case 34:
								if (W().k.down && y) {
									if (c.C) return;
									r.keyCode === 32 && h || ht()
								} else S.Sn();
								break;
							case 36:
								W().k.up && yt(1);
								break;
							case 35:
								W().k.down && yt(u().N.length);
								break;
							case 37:
								W().k.left && vi();
								break;
							case 39:
								W().k.right && hi()
						}
					})(e)
				}, 0))
			}

			function Go(e) {
				c.J && (en = e.ctrlKey)
			}

			function Fr() {
				p({J: !1}), en = !1
			}

			function Wr(e) {
				Uo()
			}

			function Zr(e) {
				L(Ke, Pn) && !L(Ke, Ht) || Uo()
			}

			function Uo() {
				Ke && (Ke.focus(), Ke = null)
			}

			function Si(e) {
				return [].slice.call(s('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]', e)).filter(function (t) {
					return B(t, "tabindex") !== "-1" && t.offsetParent !== null
				})
			}

			v.moveSlideLeft = vi, v.moveSlideRight = hi, v.moveTo = yt, d.R(Q, function () {
				he("blur", Fr), Oe("keydown", Xo), Oe("keyup", Go), d.R(se, Yr), d.R(xn, Wr), d.R(bn, Zr)
			});
			var qo = new Date().getTime(), Je = [];

			function wi(e) {
				e ? (function () {
					var t, n = "";
					b.addEventListener ? t = "addEventListener" : (t = "attachEvent", n = "on");
					var i = "onwheel" in T.createElement("div") ? "wheel" : T.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll",
						r = Ho();
					i == "DOMMouseScroll" ? T[t](n + "MozMousePixelScroll", Qe, r) : T[t](n + i, Qe, r)
				}(), g().addEventListener("mousedown", Ko), g().addEventListener("mouseup", Jo)) : (T.addEventListener ? (ge("mousewheel", Qe, !1), ge("wheel", Qe, !1), ge("MozMousePixelScroll", Qe, !1)) : T.detachEvent("onmousewheel", Qe), g().removeEventListener("mousedown", Ko), g().removeEventListener("mouseup", Jo))
			}

			function Qe(e) {
				var t = new Date().getTime(), n = P(s(".fp-completely")[0], "fp-normal-scroll"), i = function (E, w) {
					new Date().getTime();
					var M = u().C && E.getBoundingClientRect().bottom >= 0 && Qt.Fn() === "up", O = u().Vn;
					if (O) return F(w), !1;
					if (u().C) {
						if (M) {
							var Z;
							if (!(O || Do("isNewKeyframe", "beyondFullpage") && Qt.Wn())) return (Z = Ze(fe(u().N).item.offsetTop + fe(u().N).item.offsetHeight)).element.scrollTo(0, Z.options), p({Vn: !1}), F(w), !1;
							if (Qt.Wn()) return M = !1, p({Vn: !0}), p({H: "wheel"}), Io(), F(w), !1
						} else Do("set", "beyondFullpage", 1e3);
						if (!O && !M) return !0
					}
				}(g(), e);
				if (c._ || p({X: !1, _: !0, Y: "none"}), !W().m.down && !W().m.up) return F(e), !1;
				if (i) return !0;
				if (i === !1) return F(e), !1;
				if (o().autoScrolling && !en && !n) {
					var r = (e = e || b.event).wheelDelta || -e.deltaY || -e.detail, a = Math.max(-1, Math.min(1, r)),
						l = e.wheelDeltaX !== void 0 || e.deltaX !== void 0,
						h = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !l,
						f = a < 0 ? "down" : a > 0 ? "up" : "none";
					Je.length > 149 && Je.shift(), Je.push(Math.abs(r)), o().scrollBar && F(e);
					var y = t - qo;
					return qo = t, y > 200 && (Je = []), p({U: f}), c.canScroll && !Vt() && ot(Je, 10) >= ot(Je, 70) && h && (p({H: "wheel"}), Vo(a < 0 ? "down" : "up")), !1
				}
				o().fitToSection && p({G: !1})
			}

			function Ko(e) {
				var t;
				e.which == 2 && (t = e.pageY, $t = t, g().addEventListener("mousemove", _o))
			}

			function Jo(e) {
				e.which == 2 && g().removeEventListener("mousemove", _o)
			}

			function bt(e) {
				e ? (wi(!0), function () {
					if (ae.Zn && (Me || Pe) && (!H("dragAndMove") || o().dragAndMove === "mouseonly")) {
						o().autoScrolling && (C.removeEventListener(ae.Zn, pi, {passive: !1}), C.addEventListener(ae.Zn, pi, {passive: !1}));
						var t = o().touchWrapper;
						t.removeEventListener(ae.Bn, rn), t.removeEventListener(ae.Zn, St, {passive: !1}), t.addEventListener(ae.Bn, rn), t.addEventListener(ae.Zn, St, {passive: !1})
					}
				}()) : (wi(!1), function () {
					if (ae.Zn && (Me || Pe)) {
						o().autoScrolling && (C.removeEventListener(ae.Zn, St, {passive: !1}), C.removeEventListener(ae.Zn, pi, {passive: !1}));
						var t = o().touchWrapper;
						t.removeEventListener(ae.Bn, rn), t.removeEventListener(ae.Zn, St, {passive: !1})
					}
				}())
			}

			v.setMouseWheelScrolling = wi;
			var yi = !0;

			function Xr() {
				["mouseenter", "touchstart", "mouseleave", "touchend"].forEach(function (e) {
					ge(e, $o, !0)
				})
			}

			function Qo(e, t) {
				document["fp_" + e] = t, Oe(e, $o, !0)
			}

			function $o(e) {
				var t = e.type, n = !1, i = t === "mouseleave" ? e.toElement || e.relatedTarget : e.target;
				i != document && i ? (t === "touchend" && (yi = !1, setTimeout(function () {
					yi = !0
				}, 800)), (t !== "mouseenter" || yi) && (o().normalScrollElements.split(",").forEach(function (r) {
					if (!n) {
						var a = D(i, r), l = L(i, r);
						(a || l) && (v.shared.Xn || bt(!1), v.shared.Xn = !0, n = !0)
					}
				}), !n && v.shared.Xn && (bt(!0), v.shared.Xn = !1))) : bt(!0)
			}

			function ln(e, t) {
				st(0, "internal"), yt(e, t), st(We().scrollingSpeed, "internal")
			}

			d.R(Q, function () {
				o().normalScrollElements && (["mouseenter", "touchstart"].forEach(function (e) {
					Qo(e, !1)
				}), ["mouseleave", "touchend"].forEach(function (e) {
					Qo(e, !0)
				})), d.R(se, Xr)
			}), v.silentMoveTo = ln;
			var bi, er, xi = Y(), tr = tt(), Ei = !1;

			function Gr() {
				clearTimeout(bi), clearTimeout(er), Ye("resize", Ai)
			}

			function Ai() {
				Ei || (o().autoScrolling && !o().scrollBar || !o().fitToSection) && nr(Y()), function () {
					if (Me) for (var e = 0; e < 4; e++) er = setTimeout(function () {
						window.requestAnimationFrame(function () {
							o().autoScrolling && !o().scrollBar && (p({F: !0}), ln(c.P.index() + 1), p({F: !1}))
						})
					}, 200 * e)
				}(), Ei = !0, clearTimeout(bi), bi = setTimeout(function () {
					(function () {
						if (p({F: !0}), nr(""), K(g(), "onResize"), o().autoScrolling || c.C || function () {
							if (!o().autoScrolling || o().scrollBar) {
								var r = .01 * b.innerHeight;
								T.documentElement.style.setProperty("--vh", "".concat(r, "px"))
							}
						}(), d.j(_i), pe(), Po(), Me) {
							var e = T.activeElement;
							if (!D(e, "textarea") && !D(e, "input") && !D(e, "select")) {
								var t = Y();
								Math.abs(t - xi) > 20 * Math.max(xi, t) / 100 && (Ti(!0), xi = t)
							}
						} else n = Y(), i = tt(), c.q === n && tr === i || (p({q: n}), tr = i, Ti(!0));
						var n, i;
						K(g(), "onResizeEnds"), p({F: !1})
					})(), Ei = !1
				}, 400)
			}

			function Ti(e) {
				if (!P(g(), An)) {
					p({F: !0, q: Y(), _n: tt()});
					for (var t = u().N, n = 0; n < t.length; ++n) {
						var i = t[n], r = s(me, i.item)[0], a = i.slides;
						H("offsetSections") && R(i.item, {height: jn(i.item)}), a.length > 1 && ze(r, i.activeSlide.item)
					}
					o().scrollOverflow && S.bn();
					var l = u().P.index();
					c.C || !l || H("fadingEffect") || H("dropEffect") || H("waterEffect") || ln(l + 1), p({F: !1}), I(o().afterResize) && e && o().afterResize.call(g(), b.innerWidth, b.innerHeight), I(o().afterReBuild) && !e && o().afterReBuild.call(g()), K(g(), "afterRebuild")
				}
			}

			function nr(e) {
				u().N.forEach(function (t) {
					var n = e !== "" || H("offsetSections") ? jn(t.item) : "";
					R(t.item, {height: n})
				})
			}

			function Mi() {
				var e, t, n = b.location.hash;
				if (n.length) {
					var i = n.replace("#", "").split("/"), r = n.indexOf("#/") > -1;
					e = r ? "/" + i[1] : decodeURIComponent(i[0]);
					var a = r ? i[2] : i[1];
					a && a.length && (t = decodeURIComponent(a))
				}
				return {section: e, sn: t}
			}

			function Ur() {
				Ye("hashchange", ir)
			}

			function ir() {
				if (!c.V && !o().lockAnchors) {
					var e = Mi(), t = e.section, n = e.sn, i = c.Z === void 0, r = c.Z === void 0 && n === void 0 && !c.W;
					t && t.length && (t && t !== c.Z && !i || r && !Vt() || !c.W && c.B != n && !Vt()) && d.j(yn, {
						Un: t,
						slideAnchor: n
					})
				}
			}

			function qr(e) {
				var t = e.target;
				L(t, o().menu + " [data-menuanchor]") && Kr.call(t, e)
			}

			function Kr(e) {
				p({H: "menu"}), !s(o().menu)[0] || !o().lockAnchors && o().anchors.length || (F(e), d.j(Fi, {anchor: B(this, "data-menuanchor")}))
			}

			function Jr(e) {
				var t = e.target;
				t && L(t, "#fp-nav a") ? Hr.call(t, e.e) : D(t, ".fp-tooltip") ? kr.call(t) : (D(t, $i) || L(t, $i) != null) && Rr.call(t, e.e)
			}

			v.reBuild = Ti, d.R(Q, function () {
				Ai(), he("resize", Ai), d.R(se, Gr)
			}), v.setLockAnchors = function (e) {
				o().lockAnchors = e
			}, d.R(Q, function () {
				he("hashchange", ir), d.R(se, Ur)
			}), d.R(Q, function () {
				Oe("wheel", Qt.In, Ho()), d.R(Xi, _r), d.R(Yi, Vr)
			}), d.R(Q, function () {
				d.R(Ct, qr)
			}), d.R(Q, function () {
				d.R(Ct, Jr)
			});
			var Pi, Li, or = 0;

			function an(e) {
				var t, n, i, r, a;
				if (K(g(), "onScroll"), !c.F && u().P && (fe(u().N), !u().C && !u().Vn && (!o().autoScrolling || o().scrollBar || H("dragAndMove")) && !lo())) {
					var l = H("dragAndMove") ? Math.abs(m("dragAndMove", "getCurrentScroll")) : be(), h = function ($) {
							var ce = $ > or ? "down" : "up";
							return or = $, p({K: $}), ce
						}(l), f = 0, y = l + Y() / 2,
						E = (H("dragAndMove") ? m("dragAndMove", "getDocumentHeight") : C.scrollHeight - Y()) === l, w = u().N;
					if (p({scrollY: l}), E) f = w.length - 1; else if (l) for (var M = 0; M < w.length; ++M) (L(w[M].item, ne) || w[M].item).offsetTop <= y && (f = M); else f = 0;
					if (i = h, r = u().P.item.offsetTop, a = r + Y(), (i == "up" ? a >= be() + Y() : r <= be()) && (P(u().P.item, Ne) || (x(u().P.item, Ne), z(Ve(u().P.item), Ne))), n = (t = w[f]).item, !t.isActive) {
						p({V: !0});
						var O, Z, _ = u().P.item, j = u().P.index() + 1, k = zn(u().P, n), A = t.anchor, X = t.index() + 1,
							U = t.activeSlide, we = {
								P: _,
								sectionIndex: X - 1,
								anchorLink: A,
								element: n,
								leavingSection: j,
								direction: k,
								items: {origin: u().P, destination: t}
							};
						U && (Z = U.anchor, O = U.index()), c.canScroll && (z(w.filter(function ($) {
							return $.index() !== t.index()
						}).map(function ($) {
							return $.item
						}), N), x(n, N), m("parallax", "afterLoad"), I(o().beforeLeave) && Ao("beforeLeave", we), I(o().onLeave) && de("onLeave", we), I(o().afterLoad) && de("afterLoad", we), m("resetSliders", "apply", {
							localIsResizing: c.F,
							leavingSection: j
						}), _n(_), Xe(n), Zt(n), Xn(A, X - 1), o().anchors.length && p({Z: A}), pe(), Vn(O, Z, A)), clearTimeout(Pi), Pi = setTimeout(function () {
							p({V: !1})
						}, 100)
					}
					o().fitToSection && c.canScroll && (clearTimeout(Li), Li = setTimeout(function () {
						c.N.filter(function ($) {
							var ce = $.item.getBoundingClientRect();
							return Math.round(ce.bottom) === Math.round(Y()) || Math.round(ce.top) === 0
						}).length || Mo()
					}, o().en))
				}
			}

			function rr(e, t) {
				t !== void 0 ? (t = t.replace(/ /g, "").split(",")).forEach(function (n) {
					Gt(e, n, "k")
				}) : (Gt(e, "all", "k"), o().keyboardScrolling = e)
			}

			function Qr(e) {
				var t = e.index();
				o().anchors[t] !== void 0 && e.isActive && Xn(o().anchors[t], t), o().menu && o().css3 && L(s(o().menu)[0], Ce) != null && s(o().menu).forEach(function (n) {
					C.appendChild(n)
				})
			}

			function lr() {
				var e, t, n = u().P, i = u().P.item;
				x(i, Ne), Xe(i), xo(), Zt(i), t = gi((e = Mi()).section), e.section && t && (t === void 0 || t.index() !== ve(Oo)) || !I(o().afterLoad) || de("afterLoad", {
					P: i,
					element: i,
					direction: null,
					anchorLink: n.anchor,
					sectionIndex: n.index(),
					items: {origin: u().P, destination: u().P}
				}), I(o().afterRender) && de("afterRender"), K(g(), "afterRender")
			}

			function Oi(e, t) {
				t !== void 0 ? (t = t.replace(/ /g, "").split(",")).forEach(function (n) {
					Gt(e, n, "m")
				}) : Gt(e, "all", "m"), K(g(), "setAllowScrolling", {value: e, Qn: t})
			}

			function ar() {
				var e = Mi(), t = e.section, n = e.sn;
				t ? o().animateAnchor ? mi(t, n) : ln(t, n) : d.j(Ii, null)
			}

			d.R(se, function () {
				clearTimeout(Pi), clearTimeout(Li)
			}), d.R(Q, function () {
				he("scroll", an), T.body.addEventListener("scroll", an), d.R(yn, function (e) {
					mi(e.Un, e.slideAnchor)
				}), d.R(Fi, function (e) {
					yt(e.anchor, void 0)
				}), d.R(Vi, function (e) {
					(e.direction === "down" ? ht : qe)()
				}), d.R(Wi, function (e) {
					Ue(e.destination)
				})
			}), d.R(se, function () {
				Ye("scroll", an)
			}), v.getActiveSlide = function () {
				return Dn(u().P.activeSlide)
			}, v.getScrollX = function () {
				return c.scrollX
			}, d.R(Q, function () {
				d.R(se, jr), d.R(Zi, function (e) {
					ze(e.slides, e.destination)
				}), d.R(wn, function (e) {
					hi(e.section)
				}), d.R(Sn, function (e) {
					vi(e.section)
				})
			}), d.R(Q, function () {
				var e = o().credits.position, t = ["left", "right"].indexOf(e) > -1 ? "".concat(e, ": 0;") : "", n = `
        <div class="fp-watermark" style="`.concat(t, `">
            <a href="https://alvarotrigo.com/fullPage/" 
                rel="nofollow noopener" 
                target="_blank" 
                style="text-decoration:none; color: #000;">
                    `).concat(o().credits.label, `
            </a>
        </div>
    `), i = fe(c.N), r = !c.Jn || o().credits.enabled;
				i && i.item && r && i.item.insertAdjacentHTML("beforeend", n)
			}), function () {
				d.R(Di, function () {
					var h, f, y;
					p({
						Jn: (o().licenseKey, h = o().licenseKey, f = function (E) {
							var w = parseInt("514").toString(16);
							if (!E || E.length < 29 || E.split(e[0]).length === 4) return null;
							var M = ["Each", "for"][r()]().join(""), O = E[["split"]]("-"), Z = [];
							O[M](function (k, A) {
								if (A < 4) {
									var X = function ($) {
										var ce = $[$.length - 1], ol = ["NaN", "is"][r()]().join("");
										return window[ol](ce) ? a(ce) : function (rl) {
											return rl - N.length
										}(ce)
									}(k);
									Z.push(X);
									var U = a(k[X]);
									if (A === 1) {
										var we = ["pa", "dS", "t", "art"].join("");
										U = U.toString()[we](2, "0")
									}
									w += U, A !== 0 && A !== 1 || (w += "-")
								}
							});
							var _ = 0, j = "";
							return E.split("-").forEach(function (k, A) {
								if (A < 4) {
									for (var X = 0, U = 0; U < 4; U++) U !== Z[A] && (X += Math.abs(a(k[U])), isNaN(k[U]) || _++);
									var we = l(X);
									j += we
								}
							}), j += l(_), {Kn: new Date(w + "T00:00"), qn: w.split("-")[2] === 8 * (N.length - 2) + "", $n: j}
						}(h), y = function (E) {
							var w = i[r()]().join("");
							return E && w.indexOf(E) === 0 && E.length === w.length
						}(h), (f || y) && (f && n <= f.Kn && f.$n === h.split(e[0])[4] || y || f.qn) || !1)
					})
				});
				var e = ["-"], t = "2023-2-1".split("-"), n = new Date(t[0], t[1], t[2]),
					i = ["se", "licen", "-", "v3", "l", "gp"];

				function r() {
					return [["re", "verse"].join("")][0]
				}

				function a(h) {
					return h ? isNaN(h) ? h.charCodeAt(0) - 72 : h : ""
				}

				function l(h) {
					var f = 72 + h;
					return f > 90 && f < 97 && (f += 15), String.fromCharCode(f).toUpperCase()
				}
			}(), v.setKeyboardScrolling = rr, v.shared.nt = lr, v.setAllowScrolling = Oi;
			var $r = {};

			function $e() {
				return $r
			}

			var cn, Se, cr, Ri, sn = !P(C, J("OHNsd3AtZnVsbHBhZ2UtanM5T20="));

			function sr(e) {
				if (Se = T.createElement("div"), cn = J("MTIzPGRpdj48YSBocmVmPSJodHRwOi8vYWx2YXJvdHJpZ28uY29tL2Z1bGxQYWdlL2V4dGVuc2lvbnMvIiBzdHlsZT0iY29sb3I6ICNmZmYgIWltcG9ydGFudDsgdGV4dC1kZWNvcmF0aW9uOm5vbmUgIWltcG9ydGFudDsiPlVubGljZW5zZWQgZnVsbFBhZ2UuanMgRXh0ZW5zaW9uPC9hPjwvZGl2PjEyMw=="), sn || (cn = cn.replace("extensions/", "").replace("Extension", "")), Se.innerHTML = cn, Se = Se.firstChild, "MutationObserver" in window && new MutationObserver(el).observe(T.body, {
					childList: !0,
					subtree: !1
				}), (!sn || H(e) && v[e]) && (!function (n) {
					var i = $e()[n] !== void 0 && $e()[n].length, r = [], a = !1;
					return De($e()[n]) ? r = $e()[n] : r.push($e()[n]), r.forEach(function (l) {
						var h = function () {
								if (T.domain.length) {
									for (var ce = T.domain.replace(/^(www\.)/, "").split("."); ce.length > 2;) ce.shift();
									return ce.join(".").replace(/(^\.*)|(\.*$)/g, "")
								}
								return ""
							}(),
							f = ["MTM0bG9jYWxob3N0MjM0", "MTM0MC4xMjM0", "MTM0anNoZWxsLm5ldDIzNA==", "UDdDQU5ZNlNN", "NTY3YnVuZGxlNzg5", "NTU1S2V5Nzc3", "NDU2dGVzdDQ1Ng=="],
							y = J(f[0]), E = J(f[1]), w = J(f[2]), M = J(f[6]), O = J(f[3]), Z = J(f[4]), _ = J(f[5]),
							j = o()[Z + _] !== void 0;
						i = i || j;
						var k = [y, E, w, M].indexOf(h) < 0 && h.length !== 0;
						if (!i && !j && k) return !1;
						var A = i ? J(l) : "", X = (A = A.split("_")).length > 1 && A[1].indexOf(n, A[1].length - n.length) > -1,
							U = A.length > 1 && A[1].toLowerCase().indexOf(Z) > -1, we = A[0].indexOf(h, A[0].length - h.length) < 0,
							$ = X || U;
						a = a || !(we && k && O != A[0]) && $ || !k
					}), a
				}(e) || !sn)) {
					ur();
					var t = J("MzQ1c2V0SW50ZXJ2YWwxMjM=");
					window[t](ur, 2e3)
				}
			}

			function ur() {
				Se && (Ri || (Math.random() < .5 ? ao(C, Se) : _e(Se, C), Ri = !0), Se.setAttribute("style", J("MTIzei1pbmRleDo5OTk5OTk5O3Bvc2l0aW9uOmZpeGVkO3RvcDoyMHB4O2JvdHRvbTphdXRvO2xlZnQ6MjBweDtyaWdodDphdXRvO2JhY2tncm91bmQ6cmVkO3BhZGRpbmc6N3B4IDE1cHg7Zm9udC1zaXplOjE0cHg7Zm9udC1mYW1pbHk6YXJpYWw7Y29sb3I6I2ZmZjtkaXNwbGF5OmlubGluZS1ibG9jazt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO29wYWNpdHk6MTtoZWlnaHQ6YXV0bzt3aWR0aDphdXRvO3pvb206MTttYXJnaW46YXV0bztib3JkZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7Y2xpcC1wYXRoOm5vbmU7MTIz").replace(/;/g, J("MTIzICFpbXBvcnRhbnQ7MzQ1"))))
			}

			function el(e) {
				e.forEach(function (t) {
					if (t.removedNodes[0] && t.removedNodes[0].isEqualNode(Se)) {
						clearTimeout(cr);
						var n = J("bDIwc2V0VGltZW91dDAzbA==");
						cr = window[n](tl, 900)
					}
				})
			}

			function tl() {
				Ri = !1
			}

			function nl() {
				Kt(), pe(), o().scrollBar = o().scrollBar || o().hybrid, oo(), function () {
					R(Bi(g(), "body"), {
						height: "100%",
						position: "relative"
					}), x(g(), Ji), x(ft, jt), p({q: Y()}), z(g(), An), No(), m("parallax", "init");
					for (var e = u().an, t = 0; t < e.length; t++) {
						var n = e[t], i = n.wn;
						n.item.setAttribute("data-fp-styles", B(n.item, "style")), ti(n), Qr(n), i.length > 0 && ri(n)
					}
					o().fixedElements && o().css3 && s(o().fixedElements).forEach(function (r) {
						C.appendChild(r)
					}), o().navigation && Eo(), s('iframe[src*="youtube.com/embed/"]', g()).forEach(function (r) {
						var a, l;
						l = B(a = r, "src"), a.setAttribute("src", l + (/\?/.test(l) ? "&" : "?") + "enablejsapi=1")
					}), m("fadingEffect", "apply"), m("waterEffect", "init"), m("dropEffect", "init"), m("cards", "init"), o().scrollOverflow && S.bn()
				}(), Oi(!0), bt(!0), Ge(o().autoScrolling, "internal"), Po(), go(), T.readyState === "complete" && ar(), he("load", ar), lr(), sn || sr("l"), Kt(), pe()
			}

			function fr() {
				var e = o().licenseKey;
				o().licenseKey.trim() === "" ? (te("error", "Fullpage.js requires a `licenseKey` option. Read about it on the following URL:"), te("error", "https://github.com/alvarotrigo/fullPage.js#options")) : o() && c.Jn || T.domain.indexOf("alvarotrigo.com") > -1 ? e && e.length : (te("error", "Incorrect `licenseKey`. Get one for fullPage.js version 4 here:"), te("error", "https://alvarotrigo.com/fullPage/pricing")), P(ft, jt) ? te("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (o().continuousVertical && (o().loopTop || o().loopBottom) && (o().continuousVertical = !1, te("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), !o().scrollOverflow || !o().scrollBar && o().autoScrolling || te("warn", "Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox"), !o().continuousVertical || !o().scrollBar && o().autoScrolling || (o().continuousVertical = !1, te("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), o().anchors.forEach(function (t) {
					var n = [].slice.call(s("[name]")).filter(function (a) {
						return B(a, "name") && B(a, "name").toLowerCase() == t.toLowerCase()
					}), i = [].slice.call(s("[id]")).filter(function (a) {
						return B(a, "id") && B(a, "id").toLowerCase() == t.toLowerCase()
					});
					if (i.length || n.length) {
						te("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");
						var r = i.length ? "id" : "name";
						(i.length || n.length) && te("error", '"' + t + '" is is being used by another element `' + r + "` property")
					}
				}))
			}

			function il() {
				return {
					options: o(),
					internals: {
						container: g(),
						canScroll: c.canScroll,
						isScrollAllowed: W(),
						getDestinationPosition: To,
						isTouch: Pe,
						c: sr,
						getXmovement: bo,
						removeAnimation: Yt,
						getTransforms: In,
						lazyLoad: Xe,
						addAnimation: Bn,
						performHorizontalMove: yo,
						landscapeScroll: ze,
						silentLandscapeScroll: dt,
						keepSlidesPosition: Zn,
						silentScroll: He,
						styleSlides: ri,
						styleSection: ti,
						scrollHandler: an,
						getEventsPage: di,
						getMSPointer: Fo,
						isReallyTouch: wt,
						usingExtension: H,
						toggleControlArrows: wo,
						touchStartHandler: rn,
						touchMoveHandler: St,
						nullOrSection: Ee,
						items: {SectionPanel: Ie, SlidePanel: Jt, Item: ue},
						getVisible: et,
						getState: u,
						updateState: pe,
						updateStructuralState: Kt,
						getPanels: function () {
							return c.un
						},
						getSections: function () {
							return c.N
						},
						setActiveSection: function (e) {
							c.P = e
						}
					}
				}
			}

			function ie(e) {
				var t = ["NTY3YnVuZGxlNzg5", "NTU1S2V5Nzc3"], n = J(t[0]), i = J(t[1]), r = o()[n + i] !== void 0,
					a = "fp_" + e + "Extension";
				$e()[e] = r ? o()[n + i] : o()[e + i], v[e] = window[a] !== void 0 ? new window[a] : null, v[e] && v[e].c(e)
			}

			function dr(e, t) {
				var n;
				if (C = s("body")[0], ft = s("html")[0], Ft = s("html, body"), !P(ft, jt)) return n = typeof e == "string" ? s(e)[0] : e, It.touchWrapper = n, function (i) {
					Dt = Le({}, It, i), Nn = Object.assign({}, Dt)
				}(t), function (i) {
					ct = i
				}(typeof e == "string" ? s(e)[0] : e), d.j(Di), fr(), v.getFullpageData = il, v.version = "4.0.18", v.test = Object.assign(v.test, {
					top: "0px",
					cn: "translate3d(0px, 0px, 0px)",
					dn: function () {
						for (var i = [], r = 0; r < s(o().sectionSelector, g()).length; r++) i.push("translate3d(0px, 0px, 0px)");
						return i
					}(),
					left: function () {
						for (var i = [], r = 0; r < s(o().sectionSelector, g()).length; r++) i.push(0);
						return i
					}(),
					options: o(),
					setAutoScrolling: null
				}), v.shared = Object.assign(v.shared, {
					nt: null,
					Xn: !1
				}), b.fullpage_api = v, b.fullpage_extensions = !0, g() && (d.j("beforeInit"), ie("continuousHorizontal"), ie("scrollHorizontally"), ie("resetSliders"), ie("interlockedSlides"), ie("responsiveSlides"), ie("fadingEffect"), ie("dragAndMove"), ie("offsetSections"), ie("scrollOverflowReset"), ie("parallax"), ie("cards"), ie("dropEffect"), ie("waterEffect"), m("dragAndMove", "init"), m("responsiveSlides", "init"), nl(), d.j(Q), m("dragAndMove", "turnOffTouch")), b.fullpage_api;
				fr()
			}

			return v.destroy = function (e) {
				K(g(), "destroy", e), Ge(!1, "internal"), Oi(!0), bt(!1), rr(!1), x(g(), An), d.j(se), m("dragAndMove", "destroy"), e && (He(0), s("img[data-src], source[data-src], audio[data-src], iframe[data-src]", g()).forEach(function (t) {
					Rt(t, "src")
				}), s("img[data-srcset]").forEach(function (t) {
					Rt(t, "srcset")
				}), Re(s("#fp-nav, .fp-slidesNav, .fp-controlArrow")), R(kn(u().N), {
					height: "",
					"background-color": "",
					padding: ""
				}), R(kn(u().slides), {width: ""}), R(g(), {
					height: "",
					position: "",
					"-ms-touch-action": "",
					"touch-action": ""
				}), R(Ft, {overflow: "", height: ""}), z(ft, jt), z(C, Nt), C.className.split(/\s+/).forEach(function (t) {
					t.indexOf("fp-viewing") === 0 && z(C, t)
				}), kn(u().un).forEach(function (t) {
					o().scrollOverflow && S.Nn(t), z(t, "fp-table active " + Ne), B(t, "data-fp-styles") && t.setAttribute("style", B(t, "data-fp-styles")), P(t, kt) && !io && t.removeAttribute("data-anchor")
				}), Yt(g()), [Lr, lt, me].forEach(function (t) {
					s(t, g()).forEach(function (n) {
						Tt(n)
					})
				}), R(g(), {
					"-webkit-transition": "none",
					transition: "none"
				}), b.scrollTo(0, 0), [kt, Mn, Ln].forEach(function (t) {
					z(s("." + t), t)
				}))
			}, b.fp_easings = Le(b.fp_easings, {
				easeInOutCubic: function (e, t, n, i) {
					return (e /= i / 2) < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
				}
			}), b.jQuery && function (e, t) {
				e && t ? e.fn.fullpage = function (n) {
					n = e.extend({}, n, {$: e}), new t(this[0], n), Object.keys(v).forEach(function (i) {
						o().$.fn.fullpage[i] = v[i]
					})
				} : te("error", "jQuery is required to use the jQuery fullpage adapter!")
			}(b.jQuery, dr), dr
		})
	})(Ci);
	var mr = Ci.exports;
	const Sr = ["afterLoad", "onLeave", "afterRender", "afterResize", "afterResponsive", "afterSlideLoad", "onSlideLeave"];
	var wr = (q, ee) => {
		const re = q.__vccOpts || q;
		for (const [le, Te] of ee) re[le] = Te;
		return re
	};
	const yr = {
		name: "FullPage", props: {
			options: {
				type: Object, default() {
				}
			}, skipInit: {type: Boolean, default: !1}
		}, data() {
			return {
				events: Sr.reduce((q, ee) => gr(hr({}, q), {
					[ee]: (...re) => {
						this.emitEvent(ee, re)
					}
				}), {}), api: void 0
			}
		}, watch: {
			options: {
				deep: !0, handler() {
					this.build()
				}
			}
		}, mounted() {
			!this.skipInit && this.init()
		}, beforeUnmount() {
			typeof this.api != "undefined" && this.destroy()
		}, methods: {
			build() {
				let q = this.options.slideSelector || ".slide", ee = this.options.sectionSelector || ".section";
				const re = window.fp_utils.index(document.querySelector(ee + ".active")),
					le = document.querySelector(ee + ".active " + q + ".active"), Te = le ? window.fp_utils.index(le) : -1;
				this.destroy(), re > -1 && window.fp_utils.addClass(document.querySelectorAll(ee)[re], "active"), Te > -1 && window.fp_utils.addClass(le, "active"), this.init()
			}, destroy() {
				typeof window.fullpage_api != "undefined" && typeof window.fullpage_api.destroy != "undefined" && window.fullpage_api.destroy("all")
			}, emitEvent(q, ee) {
				this.$emit(q.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), ...ee), Object.prototype.hasOwnProperty.call(this.options, q) && this.options[q].apply(this, ee)
			}, init() {
				this.api = new mr(this.$refs.fullpage, this.options)
			}
		}
	}, br = {ref: "fullpage"};

	function xr(q, ee, re, le, Te, un) {
		return V.openBlock(), V.createElementBlock("div", br, [V.renderSlot(q.$slots, "default")], 512)
	}

	var Er = wr(yr, [["render", xr]]), Ar = {
		install(q) {
			q.component("FullPage", Er)
		}
	};
	return Ar
});