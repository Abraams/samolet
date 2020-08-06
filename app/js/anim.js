let offerFadeInTimeline, sliderFadeInTimeline, sliderFadeOutTimeline;

function initOfferDesktopAnimations() {
	offerFadeInTimeline = anime.timeline({
		easing: "easeOutSine",
		duration: 900,
	});

	offerFadeInTimeline
		.add(
			{
				targets: ".offer__slider-item.slick-active .offer__title",
				translateX: [-120, 0],
				opacity: [0, 1],
			},
			"+=250"
		)
		.add(
			{
				targets: ".offer__slider-item.slick-active .offer__hero",
				translateX: [-120, 0],
				opacity: [0, 1],
			},
			"-=750"
		)
		.add(
			{
				targets: ".offer__slider-item.slick-active .offer__btn",
				translateX: [-120, 0],
				opacity: [0, 1],
			},
			"-=750"
		)
		.add(
			{
				targets: ".offer__slider-nav li",
				translateX: [-55, 0],
				opacity: [0, 1],
				duration: 500,
				delay: anime.stagger(150),
			},
			"-=600"
		)
		.add(
			{
				targets: ".offer__slider-item.slick-active .offer__img",
				translateX: ["5%", 0],
				opacity: [0, 1],
				duration: 1400,
				easing: "easeInOutCubic",
			},
			"-=1000"
		)
		.add(
			{
				targets: ".offer__modal-anim-wrap",
				translateY: ["-45%", "-50%"],
				opacity: [0, 1],
				duration: 1400,
				easing: "easeInOutCubic",
			},
			"-=900"
		);
}

// ---

function slideFadeInDesktop(elem, duration) {
	sliderFadeInTimeline = anime.timeline({
		easing: "easeOutSine",
		duration,
	});

	sliderFadeInTimeline
		.add({
			targets: elem.querySelector(".offer__title"),
			translateX: 0,
			opacity: 1,
		})
		.add(
			{
				targets: elem.querySelector(".offer__hero"),
				translateX: 0,
				opacity: 1,
			},
			`-=${duration - 150}`
		)
		.add(
			{
				targets: elem.querySelector(".offer__btn"),
				translateX: 0,
				opacity: 1,
			},
			`-=${duration - 150}`
		)
		.add(
			{
				targets: elem.querySelector(".offer__img"),
				translateX: 0,
				opacity: 1,
				duration: duration * 2,
				easing: "easeInOutCubic",
			},
			`-=${duration + 550}`
		);
}

function slideFadeOutDesktop(elem, duration) {
	sliderFadeOutTimeline = anime.timeline({
		easing: "easeInOutSine",
		duration,
	});

	sliderFadeOutTimeline
		.add({
			targets: elem.querySelector(".offer__title"),
			translateX: -120,
			opacity: 0,
		})
		.add(
			{
				targets: elem.querySelector(".offer__hero"),
				translateX: -120,
				opacity: [1, 0],
			},
			`-=${duration - 50}`
		)
		.add(
			{
				targets: elem.querySelector(".offer__btn"),
				translateX: -120,
				opacity: 0,
			},
			`-=${duration - 50}`
		)
		.add(
			{
				targets: elem.querySelector(".offer__img"),
				translateX: "20%",
				opacity: 0,
				duration: duration * 2,
				easing: "easeInOutCubic",
			},
			`-=${duration + 50}`
		);
}

// ---

function slideFadeInMobile(elem, duration) {
	sliderFadeInTimeline = anime.timeline({
		easing: "easeOutSine",
		duration,
	});

	sliderFadeInTimeline
		.add({
			targets: elem.querySelector(".offer__title"),
			translateY: 0,
			opacity: 1,
		})
		.add(
			{
				targets: elem.querySelector(".offer__hero"),
				translateY: 0,
				opacity: 1,
			},
			`-=${duration - 100}`
		)
		.add(
			{
				targets: elem.querySelector(".offer__btn"),
				translateY: 0,
				opacity: 1,
			},
			`-=${duration - 100}`
		);
}

function slideFadeOutMobile(elem, duration) {
	sliderFadeOutTimeline = anime.timeline({
		easing: "easeInOutSine",
		duration,
	});

	sliderFadeOutTimeline
		.add({
			targets: elem.querySelector(".offer__title"),
			translateY: -20,
			opacity: 0,
		})
		.add(
			{
				targets: elem.querySelector(".offer__hero"),
				translateY: -20,
				opacity: [1, 0],
			},
			`-=${duration - 50}`
		)
		.add(
			{
				targets: elem.querySelector(".offer__btn"),
				translateY: -20,
				opacity: 0,
			},
			`-=${duration - 50}`
		);
}
