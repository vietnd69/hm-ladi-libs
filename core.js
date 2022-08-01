class ladiFormControl {
	constructor(remoteSelector, controlSelector) {
		this.control = {
			selector: controlSelector?.form
				? document.querySelector(controlSelector.form)
				: document.querySelector(".f-main--control"),
			fullName: controlSelector?.fullName
				? document.querySelector(controlSelector.fullName)
				: document.querySelector(".f-main--full_name"),
			phone: controlSelector?.phone
				? document.querySelector(controlSelector.phone)
				: document.querySelector(".f-main--phone"),
			email: controlSelector?.email
				? document.querySelector(controlSelector.email)
				: document.querySelector(".f-main--email"),
			classId: controlSelector?.classId
				? document.querySelector(controlSelector.classId)
				: document.querySelector(".f-main--classid"),
			age: controlSelector?.age
				? document.querySelector(controlSelector.age)
				: document.querySelector(".f-main--age"),
			scores: controlSelector?.scores
				? document.querySelector(controlSelector.scores)
				: document.querySelector(".f-main--scores"),
			product: controlSelector?.product
				? document.querySelector(controlSelector.product)
				: document.querySelector(".f-main--product"),
			gift: controlSelector?.gift
				? document.querySelector(controlSelector.gift)
				: document.querySelector(".f-main--gift"),
			timeSlot: controlSelector?.timeSlot
				? document.querySelector(controlSelector.timeSlot)
				: document.querySelector(".f-main--timeslot"),
			address: controlSelector?.address
				? document.querySelector(controlSelector.address)
				: document.querySelector(".f-main--address"),
			note1: controlSelector?.note1
				? document.querySelector(controlSelector.note1)
				: document.querySelector(".f-main--note1"),
			note2: controlSelector?.note2
				? document.querySelector(controlSelector.note2)
				: document.querySelector(".f-main--note1"),
			note3: controlSelector?.note3
				? document.querySelector(controlSelector.note3)
				: document.querySelector(".f-main--note1"),
			note4: controlSelector?.note4
				? document.querySelector(controlSelector.note4)
				: document.querySelector(".f-main--note1"),
			note5: controlSelector?.note5
				? document.querySelector(controlSelector.note5)
				: document.querySelector(".f-main--note1"),
			note5: controlSelector?.note5
				? document.querySelector(controlSelector.note5)
				: document.querySelector(".f-main--note1"),
			note5: controlSelector?.note5
				? document.querySelector(controlSelector.note5)
				: document.querySelector(".f-main--note1"),
			note5: controlSelector?.note5
				? document.querySelector(controlSelector.note5)
				: document.querySelector(".f-main--note1"),
			isStudent: controlSelector?.IsStudent
				? document.querySelector(controlSelector.IsStudent)
				: document.querySelector(".f-main--is_student"),
			itemProductType: controlSelector?.itemProductType
				? document.querySelector(controlSelector.itemProductType)
				: document.querySelector(".f-main--item_product_type"),
			itemPrice: controlSelector?.itemPrice
				? document.querySelector(controlSelector.itemPrice)
				: document.querySelector(".f-main--item_price"),
			itemProductId: controlSelector?.itemProductId
				? document.querySelector(controlSelector.itemProductId)
				: document.querySelector(".f-main--item_product_id"),
			address: controlSelector?.address
				? document.querySelector(controlSelector.address)
				: document.querySelector(".f-main--return_url_true"),
			landingPageId: controlSelector?.landingPageId
				? document.querySelector(controlSelector.landingPageId)
				: document.querySelector(".f-main--landing_page_id"),
			returnUrlFalse: controlSelector?.returnUrlFalse
				? document.querySelector(controlSelector.returnUrlFalse)
				: document.querySelector(".f-main--return_url_false"),
			amount: controlSelector?.amount
				? document.querySelector(controlSelector.amount)
				: document.querySelector(".f-main--amount"),
			voucherCode: controlSelector?.voucherCode
				? document.querySelector(controlSelector.voucherCode)
				: document.querySelector(".f-main--voucher_code"),
			ldp: controlSelector?.ldp
				? document.querySelector(controlSelector.ldp)
				: document.querySelector(".f-main--ldp"),
			utmCampaign: controlSelector?.utmCampaign
				? document.querySelector(controlSelector.utmCampaign)
				: document.querySelector(".f-main--utm_campaign"),
			utmMedium: controlSelector?.utmMedium
				? document.querySelector(controlSelector.utmMedium)
				: document.querySelector(".f-main--utm_medium"),
			line: controlSelector?.line
				? document.querySelector(controlSelector.line)
				: document.querySelector(".f-main--line"),
		};

		//
		this.remote = {
			remoteSelector: remoteSelector?.form
				? document.querySelectorAll(remoteSelector.form)
				: document.querySelectorAll(".f-remote"),
			remoteFullName: remoteSelector?.fullName
				? document.querySelectorAll(remoteSelector.fullName)
				: document.querySelectorAll(".f-remote--full_name"),
			remotePhone: remoteSelector?.phone
				? document.querySelectorAll(remoteSelector.phone)
				: document.querySelectorAll(".f-remote--phone"),
			remoteEmail: remoteSelector?.email
				? document.querySelectorAll(remoteSelector.email)
				: document.querySelectorAll(".f-remote--email"),
			remoteClassId: remoteSelector?.classId
				? document.querySelectorAll(remoteSelector.classId)
				: document.querySelectorAll(".f-remote--classid"),
			remoteAge: remoteSelector?.age
				? document.querySelectorAll(remoteSelector.age)
				: document.querySelectorAll(".f-remote--age"),
			remoteScores: remoteSelector?.scores
				? document.querySelectorAll(remoteSelector.scores)
				: document.querySelectorAll(".f-remote--scores"),
			remoteProduct: remoteSelector?.product
				? document.querySelectorAll(remoteSelector.product)
				: document.querySelectorAll(".f-remote--product"),
			remoteGift: remoteSelector?.gift
				? document.querySelectorAll(remoteSelector.gift)
				: document.querySelectorAll(".f-remote--gift"),
			remoteTimeSlot: remoteSelector?.timeSlot
				? document.querySelectorAll(remoteSelector.timeSlot)
				: document.querySelectorAll(".f-remote--timeslot"),
			remoteAddress: remoteSelector?.address
				? document.querySelectorAll(remoteSelector.address)
				: document.querySelectorAll(".f-remote--address"),
                note1: remoteSelector?.note1
				? document.querySelector(remoteSelector.note1)
				: document.querySelector(".f-remote--note1"),
			note2: remoteSelector?.note2
				? document.querySelector(remoteSelector.note2)
				: document.querySelector(".f-remote--note1"),
			note3: remoteSelector?.note3
				? document.querySelector(remoteSelector.note3)
				: document.querySelector(".f-remote--note1"),
			note4: remoteSelector?.note4
				? document.querySelector(remoteSelector.note4)
				: document.querySelector(".f-remote--note1"),
			note5: remoteSelector?.note5
				? document.querySelector(remoteSelector.note5)
				: document.querySelector(".f-remote--note1"),
			note5: remoteSelector?.note5
				? document.querySelector(remoteSelector.note5)
				: document.querySelector(".f-remote--note1"),
			note5: remoteSelector?.note5
				? document.querySelector(remoteSelector.note5)
				: document.querySelector(".f-remote--note1"),
			note5: remoteSelector?.note5
				? document.querySelector(remoteSelector.note5)
				: document.querySelector(".f-remote--note1"),
			isStudent: remoteSelector?.IsStudent
				? document.querySelector(remoteSelector.IsStudent)
				: document.querySelector(".f-remote--is_student"),
			itemProductType: remoteSelector?.itemProductType
				? document.querySelector(remoteSelector.itemProductType)
				: document.querySelector(".f-remote--item_product_type"),
			itemPrice: remoteSelector?.itemPrice
				? document.querySelector(remoteSelector.itemPrice)
				: document.querySelector(".f-remote--item_price"),
			itemProductId: remoteSelector?.itemProductId
				? document.querySelector(remoteSelector.itemProductId)
				: document.querySelector(".f-remote--item_product_id"),
			address: remoteSelector?.address
				? document.querySelector(remoteSelector.address)
				: document.querySelector(".f-remote--return_url_true"),
			landingPageId: remoteSelector?.landingPageId
				? document.querySelector(remoteSelector.landingPageId)
				: document.querySelector(".f-remote--landing_page_id"),
			returnUrlFalse: remoteSelector?.returnUrlFalse
				? document.querySelector(remoteSelector.returnUrlFalse)
				: document.querySelector(".f-remote--return_url_false"),
			amount: remoteSelector?.amount
				? document.querySelector(remoteSelector.amount)
				: document.querySelector(".f-remote--amount"),
			voucherCode: remoteSelector?.voucherCode
				? document.querySelector(remoteSelector.voucherCode)
				: document.querySelector(".f-remote--voucher_code"),
			ldp: remoteSelector?.ldp
				? document.querySelector(remoteSelector.ldp)
				: document.querySelector(".f-remote--ldp"),
			utmCampaign: remoteSelector?.utmCampaign
				? document.querySelector(remoteSelector.utmCampaign)
				: document.querySelector(".f-remote--utm_campaign"),
			utmMedium: remoteSelector?.utmMedium
				? document.querySelector(remoteSelector.utmMedium)
				: document.querySelector(".f-remote--utm_medium"),
			line: remoteSelector?.line
				? document.querySelector(remoteSelector.line)
				: document.querySelector(".f-remote--line"),
		};
	}


	addChangeEvent() {
        for (selector of this.remote) {
            if (selector) {
                let inputSl = selector.querySelector("input")
                if (inputSl) { input = selector.querySelector("select")}
                inputSl.addEventListener('change', (e) => {
                    console.log(e.target.value) 
                });
            }
        }
    }
}
