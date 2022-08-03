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
		this.triggerFormSubmitSelector = option.submitSelector ? option.submitSelector : this.defaultMainPrefix + "submit"
		this.defaultSelector = {
			remote: "child",
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
				let value = this.getInput(this.controlSelector[key]).value;
				// if (value !== "") {
					for (const ele of this.remoteSelector[key]) this.changeValue(value, this.getInput(ele));
				// }
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
}
