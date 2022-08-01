class ladiFormControl {
	constructor(remoteSelector, controlSelector) {
		this.controlSelector = controlSelector?.form
			? document.querySelector(controlSelector.form)
			: document.querySelector(".f-main--control");
		this.control = {
			fullName: controlSelector?.fullName
				? this.controlSelector.querySelector(controlSelector.fullName)
				: this.controlSelector.querySelector(".f-main--full_name"),
			phone: controlSelector?.phone
				? this.controlSelector.querySelector(controlSelector.phone)
				: this.controlSelector.querySelector(".f-main--phone"),
			email: controlSelector?.email
				? this.controlSelector.querySelector(controlSelector.email)
				: this.controlSelector.querySelector(".f-main--email"),
			classId: controlSelector?.classId
				? this.controlSelector.querySelector(controlSelector.classId)
				: this.controlSelector.querySelector(".f-main--classid"),
			age: controlSelector?.age
				? this.controlSelector.querySelector(controlSelector.age)
				: this.controlSelector.querySelector(".f-main--age"),
			scores: controlSelector?.scores
				? this.controlSelector.querySelector(controlSelector.scores)
				: this.controlSelector.querySelector(".f-main--scores"),
			product: controlSelector?.product
				? this.controlSelector.querySelector(controlSelector.product)
				: this.controlSelector.querySelector(".f-main--product"),
			gift: controlSelector?.gift
				? this.controlSelector.querySelector(controlSelector.gift)
				: this.controlSelector.querySelector(".f-main--gift"),
			timeSlot: controlSelector?.timeSlot
				? this.controlSelector.querySelector(controlSelector.timeSlot)
				: this.controlSelector.querySelector(".f-main--timeslot"),
			address: controlSelector?.address
				? this.controlSelector.querySelector(controlSelector.address)
				: this.controlSelector.querySelector(".f-main--address"),
			note1: controlSelector?.note1
				? this.controlSelector.querySelector(controlSelector.note1)
				: this.controlSelector.querySelector(".f-main--note1"),
			note2: controlSelector?.note2
				? this.controlSelector.querySelector(controlSelector.note2)
				: this.controlSelector.querySelector(".f-main--note1"),
			note3: controlSelector?.note3
				? this.controlSelector.querySelector(controlSelector.note3)
				: this.controlSelector.querySelector(".f-main--note1"),
			note4: controlSelector?.note4
				? this.controlSelector.querySelector(controlSelector.note4)
				: this.controlSelector.querySelector(".f-main--note1"),
			note5: controlSelector?.note5
				? this.controlSelector.querySelector(controlSelector.note5)
				: this.controlSelector.querySelector(".f-main--note1"),
			note5: controlSelector?.note5
				? this.controlSelector.querySelector(controlSelector.note5)
				: this.controlSelector.querySelector(".f-main--note1"),
			note5: controlSelector?.note5
				? this.controlSelector.querySelector(controlSelector.note5)
				: this.controlSelector.querySelector(".f-main--note1"),
			note5: controlSelector?.note5
				? this.controlSelector.querySelector(controlSelector.note5)
				: this.controlSelector.querySelector(".f-main--note1"),
			isStudent: controlSelector?.IsStudent
				? this.controlSelector.querySelector(controlSelector.IsStudent)
				: this.controlSelector.querySelector(".f-main--is_student"),
			itemProductType: controlSelector?.itemProductType
				? this.controlSelector.querySelector(controlSelector.itemProductType)
				: this.controlSelector.querySelector(".f-main--item_product_type"),
			itemPrice: controlSelector?.itemPrice
				? this.controlSelector.querySelector(controlSelector.itemPrice)
				: this.controlSelector.querySelector(".f-main--item_price"),
			itemProductId: controlSelector?.itemProductId
				? this.controlSelector.querySelector(controlSelector.itemProductId)
				: this.controlSelector.querySelector(".f-main--item_product_id"),
			address: controlSelector?.address
				? this.controlSelector.querySelector(controlSelector.address)
				: this.controlSelector.querySelector(".f-main--return_url_true"),
			landingPageId: controlSelector?.landingPageId
				? this.controlSelector.querySelector(controlSelector.landingPageId)
				: this.controlSelector.querySelector(".f-main--landing_page_id"),
			returnUrlFalse: controlSelector?.returnUrlFalse
				? this.controlSelector.querySelector(controlSelector.returnUrlFalse)
				: this.controlSelector.querySelector(".f-main--return_url_false"),
			amount: controlSelector?.amount
				? this.controlSelector.querySelector(controlSelector.amount)
				: this.controlSelector.querySelector(".f-main--amount"),
			voucherCode: controlSelector?.voucherCode
				? this.controlSelector.querySelector(controlSelector.voucherCode)
				: this.controlSelector.querySelector(".f-main--voucher_code"),
			ldp: controlSelector?.ldp
				? this.controlSelector.querySelector(controlSelector.ldp)
				: this.controlSelector.querySelector(".f-main--ldp"),
			utmCampaign: controlSelector?.utmCampaign
				? this.controlSelector.querySelector(controlSelector.utmCampaign)
				: this.controlSelector.querySelector(".f-main--utm_campaign"),
			utmMedium: controlSelector?.utmMedium
				? this.controlSelector.querySelector(controlSelector.utmMedium)
				: this.controlSelector.querySelector(".f-main--utm_medium"),
			line: controlSelector?.line
				? this.controlSelector.querySelector(controlSelector.line)
				: this.controlSelector.querySelector(".f-main--line"),
		};

		//

		this.remoteSelector = remoteSelector?.form ? remoteSelector.form : ".f-remote";
		this.remote = {
			fullName: remoteSelector?.fullName
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.fullName}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--full_name`),
			phone: remoteSelector?.phone
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.phone}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--phone`),
			email: remoteSelector?.email
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.email}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--email`),
			classId: remoteSelector?.classId
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.classId}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--classid`),
			age: remoteSelector?.age
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.age}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--age`),
			scores: remoteSelector?.scores
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.scores}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--scores`),
			product: remoteSelector?.product
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.product}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--product`),
			gift: remoteSelector?.gift
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.gift}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--gift`),
			timeSlot: remoteSelector?.timeSlot
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.timeSlot}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--timeslot`),
			address: remoteSelector?.address
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.address}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--address`),
			note1: remoteSelector?.note1
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.note1}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--note1`),
			note2: remoteSelector?.note2
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.note2}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--note1`),
			note3: remoteSelector?.note3
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.note3}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--note1`),
			note4: remoteSelector?.note4
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.note4}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--note1`),
			note5: remoteSelector?.note5
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.note5}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--note1`),
			note5: remoteSelector?.note5
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.note5}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--note1`),
			note5: remoteSelector?.note5
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.note5}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--note1`),
			note5: remoteSelector?.note5
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.note5}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--note1`),
			isStudent: remoteSelector?.IsStudent
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.IsStudent}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--is_student`),
			itemProductType: remoteSelector?.itemProductType
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.itemProductType}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--item_product_type`),
			itemPrice: remoteSelector?.itemPrice
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.itemPrice}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--item_price`),
			itemProductId: remoteSelector?.itemProductId
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.itemProductId}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--item_product_id`),
			address: remoteSelector?.address
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.address}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--return_url_true`),
			landingPageId: remoteSelector?.landingPageId
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.landingPageId}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--landing_page_id`),
			returnUrlFalse: remoteSelector?.returnUrlFalse
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.returnUrlFalse}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--return_url_false`),
			amount: remoteSelector?.amount
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.amount}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--amount`),
			voucherCode: remoteSelector?.voucherCode
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.voucherCode}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--voucher_code`),
			ldp: remoteSelector?.ldp
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.ldp}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--ldp`),
			utmCampaign: remoteSelector?.utmCampaign
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.utmCampaign}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--utm_campaign`),
			utmMedium: remoteSelector?.utmMedium
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.utmMedium}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--utm_medium`),
			line: remoteSelector?.line
				? document.querySelectorAll(`${this.remoteSelector} ${remoteSelector.line}`)
				: document.querySelectorAll(`${this.remoteSelector} .f-remote--line`),
		};
	}

	addChangeEvent() {
		for (const key in this.remote) {
			if (this.remote[key]) {
				for (const ele of this.remote[key]) {
					let iEle = this.getInput(ele);
					iEle.addEventListener("change", (e) => {
						this.changeValue(e.target.value, this.getInput(this.control[key]));
                        this.changeValueFormControl()
					});
				}
			}
		}
	}
	changeValue(value, target) {
		target.value = value;
	}
	changeValueFormControl() {
		for (const key in this.control) {
			if (this.control[key]) {
				let value = this.getInput(this.control[key]).value;
				if (value !== "") {
					for (const ele of this.remote[key]) this.changeValue(value, this.getInput(ele));
				}
			}
		}
	}
	getInput(selector) {
		// console.log(selector);
		return selector.querySelector("input") ? selector.querySelector("input") : selector.querySelector("select");
	}
	log(data) {
		console.log(this.remote);
	}
}
