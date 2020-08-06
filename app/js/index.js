const offerSlider = $(".offer__slider") || null;
const offerSlides = $(".offer__slider-item") || null;
const offerSlidernav = $(".offer__slider-nav") || null;

const offerModalAnimWrap = document.querySelector(".offer__modal-anim-wrap");
const offerModal = document.querySelector(".offer__modal");
const callBtn = document.querySelector(".call-btn");

@@include("anim.js");

document.addEventListener("DOMContentLoaded", () => {
	callBtn.addEventListener("click", () => {
		offerModalAnimWrap.classList.toggle("--open");
	});

	if (offerSlider) {
		offerSlider.slick({
			infinite: false,
			dots: true,
			arrows: false,
			appendDots: offerSlidernav,
			fade: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 1000,
		});

		offerSlider.on("beforeChange", function (
			event,
			slick,
			currentSlide,
			nextSlide
		) {
			const current = offerSlides[currentSlide];
			const next = offerSlides[nextSlide];
			const duration = slick.options.speed;

			if (window.innerWidth > 1025) {
				console.log(1);
				slideFadeOutDesktop(next, 0);
				slideFadeOutDesktop(current, duration / 3);
			} else {
				console.log(2);
				slideFadeOutMobile(next, 0);
				slideFadeOutMobile(current, duration / 3);
			}
		});

		offerSlider.on("afterChange", function (
			event,
			slick,
			currentSlide,
			nextSlide
		) {
			const current = offerSlides[currentSlide];
			const next = offerSlides[nextSlide];
			const duration = slick.options.speed;

			if (window.innerWidth > 1025) {
				slideFadeInDesktop(current, duration / 2);
			} else {
				slideFadeInMobile(current, duration / 3);
			}
		});
	}

	if (window.innerWidth > 1025) {
		initOfferDesktopAnimations();
	}
});
