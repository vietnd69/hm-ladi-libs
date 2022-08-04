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
		this.triggerFormSubmitSelector = option.submitSelector
			? option.submitSelector
			: this.defaultMainPrefix + "submit";
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
					: this.queryDom(
							"one",
							`${this.controlFormSelector} ${this.defaultMainPrefix + this.defaultSelector[key]}`
					  )
				: this.queryDom(
						"one",
						`${this.controlFormSelector} ${this.defaultMainPrefix + this.defaultSelector[key]}`
				  );

			this.remoteSelector[key] = option.remoteSelector
				? remoteSelector[key]
					? this.queryDom("all", `${this.remoteFormSelector} ${option.remoteSelector[key]}`)
					: this.queryDom(
							"all",
							`${this.remoteFormSelector} ${this.defaultRemotePrefix + this.defaultSelector[key]}`
					  )
				: this.queryDom(
						"all",
						`${this.remoteFormSelector} ${this.defaultRemotePrefix + this.defaultSelector[key]}`
				  );
		}
		for (const key in this.controlSelector) {
			// console.log(this.controlSelector[key])
			try {
				this.cacheValue[key] = this.controlSelector[key]
					? this.getInput(this.controlSelector[key]).value
					: null;
				this.controlFormName[key] = this.controlSelector[key]
					? this.getInput(this.controlSelector[key]).getAttribute("name")
					: null;
			} catch (e) {
				console.log(e);
			}
		}
		this.addChangeEvent();
		this.addSubmitMainFormEvent();
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
							console.log(switchData.key, this.defaultSelector[key]);
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
		return selector.querySelector("input") ? selector.querySelector("input") : selector.querySelector("select");
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
}
