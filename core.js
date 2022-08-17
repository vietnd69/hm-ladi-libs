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

		this.controlFormEle = document.querySelector(this.controlFormSelector);

		this.submitFormId = document.querySelector(this.controlFormSelector).getAttribute("id");

		this.remoteFormSelector = option.remoteSelector
			? option.remoteSelector.form
				? option.remoteSelector.form
				: this.defaultRemotePrefix + "control"
			: this.defaultRemotePrefix + "control";

		this.remoteFormEle = document.querySelectorAll(this.remoteFormSelector);

		this.triggerFormSubmitSelector = option.submitSelector ? option.submitSelector : this.defaultMainPrefix + "submit";

		this.controlEle = this.controlFormEle.querySelectorAll(".ladi-element .ladi-form-item");

		this.inputControlEle = [];

		for (const element of this.controlEle) {
			const { tag, ele } = this.getInput(element);
			// console.log(tag, ele);
			const name = ele[0].getAttribute("name");
			this.inputControlEle.push({ tag, name, ele, value: "" });
		}

		this.inputRemoteEle = [];
		for (const item of this.inputControlEle) {
			const elements = document.querySelectorAll(`${this.remoteFormSelector} *[name="${item.name}"]`);
			// console.log(elements);
			if (elements.length > 0) {
				this.inputRemoteEle.push({ tag: item.tag, name: item.name, ele: elements });
			}
		}

		// console.log(this.inputControlEle);

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

		this.cacheValue = [];

		this.controlSelector = {};
		this.remoteSelector = {};

		this.controlFormName = {};

		this.switchSelector = [];
		this.switchData = [];

		this.cacheTextSubmit = document.querySelector(`#${this.submitFormId} .ladi-button .ladi-headline`).innerText;

		this.addChangeEvent();
		this.addSubmitMainFormEvent();
	}

	addChangeEvent() {
		for (const input of this.inputRemoteEle) {
			for (const ele of input.ele) {
				ele.addEventListener("change", (e) => {
					const value = e.target.value;
					const index = this.inputControlEle.findIndex((item) => item.name === input.name);
					// console.log(value);
					this.inputControlEle[index].value = e.target.value;
					for (const controlInput of this.inputControlEle[index].ele) {
						if (input.tag === "checkbox" || input.tag === "radio") {
							if (controlInput.value === value) {
								console.log(controlInput.value);
								controlInput.checked = true;
								controlInput.parentNode.querySelector("span").setAttribute("data-checked", true);
							} else {
								controlInput.parentNode.querySelector("span").setAttribute("data-checked", false);
							}
						} else {
							controlInput.value = value;
						}
						// console.log(controlInput)
					}
					this.updateAllValue(input.name, value);
				});
			}
		}
	}

	addSubmitMainFormEvent() {
		const selectors = document.querySelectorAll(this.triggerFormSubmitSelector);

		const submitBtn = document.querySelector(`#${this.submitFormId} .ladi-button`).parentNode;
		for (const selector of selectors) {
			selector.addEventListener("click", () => {
				submitBtn.dispatchEvent(new Event("click"));
				const copy = submitBtn.querySelector(".ladi-headline").innerText;
				selector.querySelector(".ladi-headline").innerText = copy;
				this.cacheTextSubmit = copy;
				const checkSubmitInterval = setInterval(() => {
					if (!(this.cacheTextSubmit === submitBtn.querySelector(".ladi-headline").innerText)) {
						const copy = submitBtn.querySelector(".ladi-headline").innerText;
						selector.querySelector(".ladi-headline").innerText = copy;
						this.cacheTextSubmit = copy;
						clearInterval(checkSubmitInterval);
					}
				}, 500);
			});
		}
	}

	updateAllValue(name, value) {
		// console.log("run")
		this.changeDataSwitch(name);
		for (const input of this.inputRemoteEle) {
			if (input.tag === "checkbox" || input.tag === "radio") {
				for (const ele of input.ele) {
					// console.log(ele);
					if (ele.value === value) {
						ele.checked = true;

						ele.parentNode.querySelector("span").setAttribute("data-checked", true);
					} else {
						ele.parentNode.querySelector("span").setAttribute("data-checked", false);
					}
				}
			} else {
				if (input.name === name) {
					for (const ele of input.ele) {
						ele.value = value;
					}
				}
			}
		}
	}

	getInput(selector) {
		// console.log(selector);

		const input = selector.querySelectorAll("input");

		const inputTag =
			input.length > 0
				? input[0].getAttribute("type") === "radio"
					? "radio"
					: input[0].getAttribute("type") === "checkbox"
					? "checkbox"
					: "input"
				: selector.querySelectorAll("select").length > 0
				? "select"
				: "textarea";

		const inputSelector = inputTag === "radio" || inputTag === "checkbox" ? "input" : inputTag;
		const inputEle = selector.querySelectorAll(inputSelector);
		return { tag: inputTag, ele: inputEle };
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

	addSwitchData(name, pushTo, data) {
		this.switchData.push({ name, pushTo, data });
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
		this.switchSelector.push({ name, pushTo, doms });
		// console.log(this.switchData)

		this.changeDataSwitch(name);
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

	changeDataSwitch(name) {
		// console.log(this.defaultSelector)
		const input = this.inputControlEle.find((item) => item.name === name);
		const value = input.ele[0].value;

		const get = this.switchData.filter((data) => data.name === name);
		const pushTo = get.map((i) => i.pushTo);
		for (const iPushTo of pushTo) {
			const data = this.switchData.find((data) => data.name === name && data.pushTo === iPushTo);
			const selectors = this.switchSelector.find((i) => i.name === name && i.pushTo === iPushTo);
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

	getRequired() {}
	checkValidate() {}
}

class ladiTabControl {
	constructor(boxTabSelector, boxTabRemote, activeSelector) {
		this.boxTabRemote = boxTabRemote;
		this.boxTabSelector = boxTabSelector;
		this.activeSelector = activeSelector;
		this.boxTabEle = document.querySelectorAll(boxTabSelector);
		this.boxTabRemoteEle = this.boxTabRemote ? document.querySelectorAll(boxTabRemote) : undefined;
		this.activeBtnEle = this.activeSelector ? document.querySelector(activeSelector) : undefined;

		this.tabIndexData = [];

		if (activeSelector) {
			this.styleId = "hm-style--" + activeSelector.replace(/[^a-zA-Z0-9 ]/g, "");
			this.setStyleTag();
			this.styleEle;
			this.activeABtnEle = this.activeBtnEle.querySelector(".ladi-button");

			this.activeBtnBgEle = this.activeBtnEle.querySelector(".ladi-button-background");

			this.activeBtnTextEle = this.activeBtnEle.querySelector(".ladi-element .ladi-headline");
			setTimeout(() => {
				this.setActive();
			}, 500);
		}

		this.setTabGroupData();
		this.addClickEvent();
		this.checkChangeTab();
	}

	setActive() {
		this.activeBtnStyle = this.getStyle(this.activeABtnEle, ["border", "border-radius"]);

		this.activeBgStyle = this.getStyle(this.activeBtnBgEle, ["background", "border", "border-radius"]);

		this.activeTextStyle = this.getStyle(this.activeBtnTextEle, ["color", "font-weight", "font-size"]);

		this.addGlobalStyle(`${this.boxTabRemote} .ladi-button-group > .ladi-element.active .ladi-button`, this.activeBtnStyle);

		this.addGlobalStyle(
			`${this.boxTabRemote} .ladi-button-group > .ladi-element.active .ladi-headline`,
			this.activeTextStyle
		);

		this.addGlobalStyle(
			`${this.boxTabRemote} .ladi-button-group > .ladi-element.active .ladi-button-background`,
			this.activeBgStyle
		);
	}

	setTabGroupData() {
		this.tabGroupData = [];
		for (const boxTab of this.boxTabEle) {
			const tabs = boxTab.querySelectorAll(".ladi-tabs > div[data-index]");
			const tabData = [];
			for (const tab of tabs) {
				const group = this.getTabGroup(tab);
				if (group) {
					tab.setAttribute("data-group", group);
					this.setTabGroupDataOnButton(group);
					tabData.push(group);
				}
			}
			this.tabGroupData.push({
				boxTabId: boxTab.getAttribute("id"),
				dataGroup: tabData,
			});
		}
	}
	setTabGroupDataOnButton(group) {
		if (this.boxTabRemoteEle) {
			for (const tabBtn of this.boxTabRemoteEle) {
				const buttons = tabBtn.querySelectorAll(".ladi-button-group > .ladi-element[data-action]");
				for (const btn of buttons) {
					if (btn.classList.contains(group)) {
						btn.setAttribute("data-group", group);
					}
				}
			}
		}
	}
	getTabGroup(tab) {
		const selectorP = tab.getElementsByTagName("p");
		const selectorH3 = tab.getElementsByTagName("h3");
		for (const dom of selectorP) {
			if (dom.textContent.includes("{@") && dom.textContent.includes("@}")) {
				return dom.textContent.replace(/@|{|}/g, "");
			}
		}
		for (const dom of selectorH3) {
			if (dom.textContent.includes("{@") && dom.textContent.includes("@}")) {
				return dom.textContent.replace(/@|{|}/g, "");
			}
		}
	}

	checkChangeTab() {
		for (const boxTab of this.boxTabEle) {
			setTimeout(() => {
				const tabs = boxTab.querySelectorAll(".ladi-tabs > div[data-index]");
				// console.log(tabs)
				const [activeTabIndex, activeTabGroup] = this.getTabActive(tabs);
				this.activeBtn(activeTabIndex, activeTabGroup);
				// console.log(activeTabIndex, activeTabGroup);
				// console.log("run")
			}, 10);
		}
	}
	unSelectedAllBtn(tabBtn) {
		const buttons = tabBtn.querySelectorAll(".ladi-button-group > .ladi-element.active[data-action]");
		for (const btn of buttons) {
			btn.classList.remove("active");
		}
	}
	activeBtn(index, group) {
		// console.log(index, group);
		if (this.boxTabRemoteEle) {
			for (const tabBtn of this.boxTabRemoteEle) {
				const buttons = tabBtn.querySelectorAll(".ladi-button-group > .ladi-element[data-action]");
				this.unSelectedAllBtn(tabBtn);
				// console.log(check)
				if (group) {
					for (const btn of buttons) {
						if (btn.classList.contains(group)) {
							btn.classList.add("active");
						} else if (!btn.getAttribute("data-group")) {
							if (buttons[index - 1]) {
								buttons[index - 1].classList.add("active");
							}
						}
					}
				} else {
					if (buttons[index - 1]) {
						buttons[index - 1].classList.add("active");
					}
				}
			}
		}
	}
	addClickEvent() {
		if (this.boxTabRemoteEle) {
			for (const boxTab of this.boxTabRemoteEle) {
				boxTab.addEventListener("click", () => this.checkChangeTab());
			}
		}

		for (const boxTab of this.boxTabEle) {
			boxTab.addEventListener("click", () => this.checkChangeTab());
		}
	}
	getTabActive(tabs) {
		for (const tab of tabs) {
			if (tab.classList.contains("selected")) {
				return [tab.getAttribute("data-index"), tab.getAttribute("data-group") ? tab.getAttribute("data-group") : null];
			}
		}
		return null;
	}
	getGroupTabActive(tabs) {
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

	changeTabWidthIndex(index, tabId) {
		try {
			ladi(tabId).index(index);
		} catch (e) {
			console.log(e);
		}
	}

	tabControlWithForm(formSelector) {
		const selector = document.querySelectorAll(formSelector);

		const changeAllValue = (value) => {
			for (const ele of selector) {
				const input = ele.querySelector("select");
				const options = input.querySelectorAll("option");
				for (const option of options) {
					if (option.value === value) {
						input.value = value;
						break;
					}
					input.value = "";
				}
			}
		};

		// for (const boxTab of this.boxTabEle) {
		// 	boxTab.addEventListener("click", () => changeAllValue(""));
		// }
		
		const changeTabWithValue = (value) => {
			changeAllValue(value);
			for (const boxTab of this.tabGroupData) {
				const index = boxTab.dataGroup.findIndex((element) => element === value);
				if (index != -1) {
					this.changeTabWidthIndex(index + 1, boxTab.boxTabId);
				} else {
					this.changeTabWidthIndex(1, boxTab.boxTabId);
				}
			}
			// console.log(this.tabGroupData);

			console.log(value);
		};

		for (const ele of selector) {
			const input = ele.querySelector("select");
			// console.log(input)
			input.addEventListener("change", (e) => {
				changeTabWithValue(e.target.value);
			});
		}
	}
}

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

LadiPageLibraryV2.prototype.index = function (t) {
	var e = this.doc || document.getElementById(this.id);
	e.dispatchEvent(new Event("click"));
	if (LadiPageScript.isEmpty(e)) this.indexSectionTabs(t);
	else {
		var i = LadiPageScript.runtime.eventData[this.id];
		if (!LadiPageScript.isEmpty(i)) {
			var a = 0;
			("gallery" != i.type && "carousel" != i.type) ||
				((a = parseFloatLadiPage(e.getAttribute("data-current")) || 0), (a += 1)),
				"collection" == i.type && (a = parseFloatLadiPage(e.getAttribute("data-page")) || 1);
			var n = null;
			if (
				("tabs" == i.type &&
					((n = e.querySelector(".ladi-tabs > .ladi-element.selected[data-index]")),
					LadiPageScript.isEmpty(n) && (n = e.querySelector(".ladi-tabs > .ladi-element")),
					LadiPageScript.isEmpty(n) || (a = parseFloatLadiPage(n.getAttribute("data-index")) || 1)),
				LadiPageScript.isEmpty(t))
			)
				return a;
			if ("tabs" != i.type) {
				if ((("gallery" != i.type && "carousel" != i.type) || ((t -= 1), (a -= 1)), t == a))
					return (
						"carousel" == i.type && e.setAttribute("data-stop", !0),
						void ("gallery" == i.type && e.hasAttribute("data-loaded") && e.setAttribute("data-stop", !0))
					);
				t > a
					? (("gallery" != i.type && "carousel" != i.type) || e.setAttribute("data-current", t - 1),
					  "collection" == i.type && e.setAttribute("data-page", t - 1),
					  this.next())
					: (("gallery" != i.type && "carousel" != i.type) || e.setAttribute("data-current", t + 1),
					  "collection" == i.type && e.setAttribute("data-page", t + 1),
					  this.prev());
			} else {
				var o = e.querySelector('.ladi-tabs > .ladi-element[data-index="' + t + '"]');
				LadiPageScript.isEmpty(o) ||
					(LadiPageScript.isEmpty(n) || n.classList.remove("selected"),
					o.classList.add("selected"),
					e.dispatchEvent(new Event("click")),
					LadiPageScript.reloadLazyload(!1));
			}
		}
	}
};
