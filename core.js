// override ladi script
LadiPageLibraryV2.prototype.value = function (t, e, i) {
	var a = this.doc || document.getElementById(this.id);
	if (!LadiPageScript.isEmpty(a)) {
		var n = [],
			o = !1,
			r = 0,
			s = LadiPageScript.isArray(t) ? t : [t],
			l = a.querySelectorAll('.ladi-form-item > [data-is-select-country="true"]');
		if (4 == l.length)
			if (LadiPageScript.isNull(t)) {
				for (r = 0; r < l.length; r++) n.push(l[r].value);
				o = !0;
			} else
				s.forEach(function (t, e) {
					LadiPageScript.isEmpty(l[e]) || ((l[e].value = t), LadiPageScript.fireEvent(l[e], "change"));
				});
		else {
			var d = document.querySelectorAll(
					"#" +
						this.id +
						" > ." +
						["ladi-button .ladi-headline", "ladi-headline", "ladi-paragraph", "ladi-list-paragraph"].join(
							", #" + this.id + " > ."
						)
				),
				c = document.querySelectorAll(
					"#" +
						this.id +
						" > ." +
						[
							"ladi-form-item-container .ladi-form-item > input",
							"ladi-form-item-container .ladi-form-item > textarea",
							"ladi-form-item-container .ladi-form-item > select",
						].join(", #" + this.id + " > .")
				),
				p = document.querySelectorAll(
					"#" +
						this.id +
						" > ." +
						["ladi-form-item-container .ladi-form-checkbox-item > input"].join(", #" + this.id + " > .")
				),
				u = document.querySelectorAll("#" + this.id + " > .ladi-image .ladi-image-background"),
				m = document.querySelectorAll("#" + this.id + " > .ladi-video"),
				_ = document.querySelectorAll("#" + this.id + " > .ladi-survey > .ladi-survey-option"),
				y = function (t) {
					var e = [];
					return (
						LadiPageScript.isArray(t) &&
							t.forEach(function (t) {
								e.push(t.name);
							}),
						(e = e.length > 0 ? "[" + e.join(", ") + "]" : "")
					);
				};
			for (r = 0; r < d.length; r++)
				if (LadiPageScript.isNull(t))
					LadiPageScript.isObject(i) && i.only_text ? n.push(d[r].innerText) : n.push(d[r].innerHTML);
				else if (((d[r].innerHTML = t), !LadiPageScript.isEmpty(e))) {
					var g = LadiPageScript.findAncestor(d[r], "ladi-element");
					LadiPageScript.isEmpty(g) || g.classList.add(e);
				}
			for (r = 0; r < c.length; r++)
				if (LadiPageScript.isNull(t))
					if (c[r].classList.contains("ladi-form-control-file")) {
						var f = c[r].getAttribute("data-path-file") || "[]";
						(f = JSON.parse(f)), n.push(f);
					} else n.push(c[r].value);
				else
					c[r].classList.contains("ladi-form-control-file")
						? (c[r].setAttribute("data-path-file", JSON.stringify(t)),
						  (c[r].value = y(t)),
						  c[r].dispatchEvent(new Event("change")))
						: ((c[r].value = t),
						  c[r].dispatchEvent(new Event("change")),
						  "date" == c[r].getAttribute("data-type") &&
								(LadiPageScript.isEmpty(t)
									? c[r].setAttribute("type", "text")
									: c[r].setAttribute("type", "date")));
			var h = !1;
			for (r = 0; r < p.length; r++)
				LadiPageScript.isNull(t)
					? (p[r].checked && n.push(p[r].value), "checkbox" == p[r].getAttribute("type").toLowerCase() && (o = !0))
					: ((h = !1),
					  "checkbox" == p[r].getAttribute("type").toLowerCase() && -1 != s.indexOf(p[r].value) && (h = !0),
					  "radio" == p[r].getAttribute("type").toLowerCase() && s.length > 0 && s[0] == p[r].value && (h = !0),
					  h ? p[r].checked || p[r].click() : p[r].checked && p[r].click());
			for (r = 0; r < u.length; r++)
				if (LadiPageScript.isNull(t)) {
					var v = getComputedStyle(u[r]).backgroundImage;
					(v = v || "").startsWith('url("') && (v = v.substring('url("'.length)),
						v.endsWith('")') && (v = v.substring(0, v.length - '")'.length)),
						n.push(v);
				} else if (LadiPageScript.isEmpty(t)) u[r].style.setProperty("background-image", "none");
				else {
					var E = LadiPageScript.findAncestor(u[r], "ladi-element"),
						P = LadiPageScript.getOptimizeImage(t, E.clientWidth, E.clientHeight, !0, !1, !1, !0);
					u[r].style.setProperty("background-image", 'url("' + P + '")');
				}
			for (r = 0; r < m.length; r++) {
				var L = LadiPageScript.runtime.eventData[this.id];
				if (LadiPageScript.isNull(t))
					LadiPageScript.isEmpty(L) ||
						n.push({
							type: L["option.video_type"],
							value: L["option.video_value"],
						});
				else {
					L["option.video_value"] = t;
					var A = m[r].getElementsByClassName("iframe-video-preload")[0],
						b = null;
					if (L["option.video_type"] == LadiPageScript.const.VIDEO_TYPE.youtube) {
						var w =
								"https://img.youtube.com/vi/" +
								(b = LadiPageScript.getVideoId(L["option.video_type"], t)) +
								"/hqdefault.jpg",
							S = m[r].getElementsByClassName("ladi-video-background")[0];
						LadiPageScript.isEmpty(S) || S.style.setProperty("background-image", 'url("' + w + '")');
					}
					if (LadiPageScript.isEmpty(A))
						LadiPageScript.playVideo(
							this.id,
							L["option.video_type"],
							L["option.video_value"],
							L["option.video_control"]
						);
					else {
						LadiPageScript.pauseAllVideo();
						var T = !1;
						if (L["option.video_type"] == LadiPageScript.const.VIDEO_TYPE.youtube) {
							var O = window.YT.get(A.id);
							!LadiPageScript.isEmpty(O) &&
								LadiPageScript.isFunction(O.loadVideoById) &&
								(O.loadVideoById(b, 0), O.seekTo(0), (T = !0));
						}
						L["option.video_type"] == LadiPageScript.const.VIDEO_TYPE.direct &&
							LadiPageScript.isFunction(A.play) &&
							((A.src = t), (A.currentTime = 0), (T = !0)),
							T && LadiPageScript.runEventReplayVideo(A.id, L["option.video_type"], !0);
					}
				}
			}
			for (r = 0; r < _.length; r++)
				LadiPageScript.isNull(t)
					? (_[r].classList.contains("selected") && n.push(_[r].getAttribute("data-value")),
					  "true" == a.getAttribute("data-multiple") && (o = !0))
					: ((h = !1),
					  -1 != s.indexOf(_[r].getAttribute("data-value")) && (h = !0),
					  h
							? _[r].classList.contains("selected") || _[r].click()
							: _[r].classList.contains("selected") && _[r].click());
		}
		return o ? n : n.length > 0 ? n[0] : null;
	}
};

// ladiForm
class ladiFormControl {
	constructor(option = {}) {
		this.defaultMainPrefix = ".f-main--";
		this.defaultRemotePrefix = ".f-remote--";

		this.controlFormSelector = option.controlSelector
			? option.controlSelector.form
				? option.controlSelector.form
				: this.defaultMainPrefix + "control"
			: this.defaultMainPrefix + "control";

		this.remoteFormSelector = option.remoteSelector
			? option.remoteSelector.form
				? option.remoteSelector.form
				: this.defaultRemotePrefix + "control"
			: this.defaultRemotePrefix + "control";

		this.submitFormId = document.querySelector(this.controlFormSelector).getAttribute("id");

		this.triggerFormSubmitSelector = option.submitSelector ? option.submitSelector : this.defaultMainPrefix + "submit";

		this.defaultSelector = {
			fullName: "full_name",
			phone: "phone",
			email: "email",
			classId: "classid",
			age: "age",
			scores: "scores",
			product: "product",
			gift: "gift",
			timeSlot: "timeslot",
			address: "address",
			note1: "note1",
			note2: "note2",
			note3: "note3",
			note4: "note4",
			note5: "note5",
			isStudent: "is_student",
			itemProductType: "item_product_type",
			itemPrice: "item_price",
			itemProductId: "item_product_id",
			returnUrlTrue: "return_url_true",
			landingPageId: "landing_page_id",
			returnUrlFalse: "return_url_false",
			amount: "amount",
			voucherCode: "voucher_code",
			ldp: "ldp",
			utmCampaign: "utm_campaign",
			utmMedium: "utm_medium",
			line: "line",
		};

		this.cacheValue = {};

		this.controlSelector = {};
		this.remoteSelector = {};

		this.controlFormName = {};

		this.switchSelector = [];
		this.switchData = [];

		for (const key in this.defaultSelector) {
			// console.log("run");
			this.controlSelector[key] = option.controlSelector
				? controlSelector[key]
					? this.queryDom("one", `${this.controlFormSelector} ${option.controlSelector[key]}`)
					: this.queryDom("one", `${this.controlFormSelector} ${this.defaultMainPrefix + this.defaultSelector[key]}`)
				: this.queryDom("one", `${this.controlFormSelector} ${this.defaultMainPrefix + this.defaultSelector[key]}`);

			this.remoteSelector[key] = option.remoteSelector
				? remoteSelector[key]
					? this.queryDom("all", `${this.remoteFormSelector} ${option.remoteSelector[key]}`)
					: this.queryDom("all", `${this.remoteFormSelector} ${this.defaultRemotePrefix + this.defaultSelector[key]}`)
				: this.queryDom("all", `${this.remoteFormSelector} ${this.defaultRemotePrefix + this.defaultSelector[key]}`);
		}

		for (const key in this.controlSelector) {
			// console.log(this.controlSelector[key])
			this.cacheValue[key] = this.controlSelector[key] ? this.getInput(this.controlSelector[key]).value : null;
			this.controlFormName[key] = this.controlSelector[key]
				? this.getInput(this.controlSelector[key]).getAttribute("name")
				: null;
		}

		this.addChangeEvent();
		this.addSubmitMainFormEvent();
		this.changeValueFormControl();
	}

	addChangeEvent() {
		for (const key in this.remoteSelector) {
			// console.log("oooo");
			if (this.remoteSelector[key]) {
				for (const ele of this.remoteSelector[key]) {
					let iEle = this.getInput(ele);
					iEle.addEventListener("change", (e) => {
						this.cacheValue[key] = e.target.value;
						this.changeValue(e.target.value, this.getInput(this.controlSelector[key]));
						this.changeValueFormControl();
						for (const switchData of this.switchData) {
							// console.log(switchData.key, this.defaultSelector[key]);
							if (switchData.key === this.defaultSelector[key]) {
								this.changeDataSwitch(switchData.key);
							}
						}
					});
				}
			}
		}
	}

	addSubmitMainFormEvent() {
		const selectors = document.querySelectorAll(this.triggerFormSubmitSelector);
		for (const selector of selectors) {
			selector.addEventListener("click", () => {
				this.submitForm(this.submitFormId);
			});
		}
	}

	changeValue(value, target) {
		target.value = value;
	}

	changeValueFormControl() {
		for (const key in this.controlSelector) {
			if (this.controlSelector[key]) {
				let value = this.cacheValue[key];
				for (const ele of this.remoteSelector[key]) {
					if (this.getInput(ele).value !== value) {
						this.changeValue(value, this.getInput(ele));
					}
				}
			}
		}
	}

	getInput(selector) {
		// console.log(selector);
		return selector.querySelector("input")
			? selector.querySelector("input")
			: selector.querySelector("select")
			? selector.querySelector("select")
			: selector.querySelector("textarea");
	}

	queryDom(range, selector) {
		const stringSelector =
			typeof selector === "string"
				? selector
				: selector.reduce((prevISelector, iSelector) => prevISelector + " " + iSelector);
		if (range === "one") {
			return document.querySelector(stringSelector);
		}
		if (range === "all") {
			return document.querySelectorAll(stringSelector);
		}
	}

	getCacheValue(key) {
		return this.cacheValue[key];
	}

	submitForm(selector) {
		// console.log(selector)
		try {
			ladi(selector).submit();
		} catch (e) {
			console.log(e);
		}
	}

	addSwitchData(key, pushTo, data) {
		this.switchData.push({ key, pushTo, data });
		const keyCode = "{$" + pushTo + "$}";
		const selectorP = document.getElementsByTagName("p");
		const selectorH3 = document.getElementsByTagName("h3");
		let doms = [];
		for (const dom of selectorP) {
			if (dom.textContent === keyCode) {
				doms.push(dom);
				dom.textContent = "";
			}
		}
		for (const dom of selectorH3) {
			if (dom.textContent === keyCode) {
				doms.push(dom);
				dom.textContent = "";
			}
		}
		this.switchSelector.push({ key, pushTo, doms });
		this.changeDataSwitch(key);
	}

	getKey(obj, value) {
		for (const key in obj) {
			// console.log(key, value)
			if (obj[key] === value) {
				return key;
			}
		}
		return false;
	}

	changeDataSwitch(key) {
		const keyObj = this.getKey(this.controlFormName, key);
		// console.log(this.defaultSelector)
		const value = this.getInput(this.controlSelector[keyObj]).value;
		const get = this.switchData.filter((data) => data.key === key);
		const pushTo = get.map((i) => i.pushTo);
		for (const iPushTo of pushTo) {
			const data = this.switchData.find((data) => data.key === key && data.pushTo === iPushTo);
			const selectors = this.switchSelector.find((i) => i.key === key && i.pushTo === iPushTo);
			for (const iValue of data.data) {
				if (iValue.value === value) {
					for (const selector of selectors.doms) {
						selector.innerText = iValue.text;
					}
				}
			}
		}
	}

	checkChangeValue(selector) {
		const ele = document.querySelectorAll(selector);
		for (const iEle of ele) {
			iEle.addEventListener("click", () => {
				for (const key in this.cacheValue) {
					if (this.cacheValue[key] !== null) {
					}
				}
			});
		}
	}
}

class ladiTabControl {
	constructor(boxTabSelector, boxTabRemote, activeSelector) {
		this.boxTabEle = document.querySelectorAll(boxTabSelector);
		this.boxTabRemoteEle = document.querySelectorAll(boxTabRemote);
		this.activeBtnEle = document.querySelector(activeSelector);

		this.styleId = "hm-style";
		this.setStyleTag();
		this.styleEle;

		window.onload = () => {
			this.activeBtnBgEle = this.activeBtnEle.querySelector(".ladi-button-background");
			this.activeBgStyle = this.getStyle(this.activeBtnBgEle, ["background", "border", "border-radius"]);

			this.addGlobalStyle(
				`${boxTabRemote} .ladi-button-group > .ladi-element.active .ladi-button-background`,
				this.activeBgStyle
			);

			this.activeBtnTextEle = this.activeBtnEle.querySelector(".ladi-element .ladi-headline");
			this.activeTextStyle = this.getStyle(this.activeBtnTextEle, ["color", "font-weight", "font-size"]);

			this.addGlobalStyle(`${boxTabRemote} .ladi-button-group > .ladi-element.active .ladi-headline`, this.activeTextStyle);
		};
		
		this.addClickEvent();
		this.checkChangeTab();
	}
	getTabGroupActive() {}
	checkChangeTab() {
		for (const boxTab of this.boxTabEle) {
			const tabs = boxTab.querySelectorAll(".ladi-tabs > div[data-index]");
			const activeTab = this.getTabActive(tabs);
			this.activeBtnWithIndex(activeTab);
			console.log(activeTab);
		}
	}
	unSelectedAllBtn(tabBtn) {
		const buttons = tabBtn.querySelectorAll(".ladi-button-group > .ladi-element.active[data-action]");
		for (const btn of buttons) {
			btn.classList.remove("active");
		}
	}
	activeBtnWithIndex(index) {
		for (const tabBtn of this.boxTabRemoteEle) {
			const buttons = tabBtn.querySelectorAll(".ladi-button-group > .ladi-element[data-action]");
			this.unSelectedAllBtn(tabBtn);
			if (buttons[index - 1]) {
				buttons[index - 1].classList.add("active");
			}
		}
	}
	addClickEvent() {
		for (const boxTab of this.boxTabRemoteEle) {
			boxTab.addEventListener("click", () => this.checkChangeTab());
		}
	}
	getTabActive(tabs) {
		for (const tab of tabs) {
			if (tab.classList.contains("selected")) {
				return tab.getAttribute("data-index");
			}
		}
		return null;
	}
	addGlobalStyle(selector, style) {
		this.styleEle.innerHTML += `${selector} {${style}}`;
	}
	setStyleTag() {
		const styleEle = document.createElement("style");
		styleEle.setAttribute("id", this.styleId);
		document.head.appendChild(styleEle);
		this.styleEle = document.getElementById(this.styleId);
	}
	getStyle(selector, stylesName) {
		const selectorStyle = window.getComputedStyle(selector);
		const styles = stylesName.map((styleName) => `${styleName}: ${selectorStyle.getPropertyValue(styleName)} !important`);
		// console.log(styles);
		return styles.join(";");
	}
}
