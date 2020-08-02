const offerSlider = $(".offer__slider") || null;
const offerSlidernav = $(".offer__slider-nav") || null;

const offerModal = document.querySelector(".offer__modal");
const callBtn = document.querySelector(".call-btn");

document.addEventListener("DOMContentLoaded", () => {
	callBtn.addEventListener("click", () => {
		offerModal.classList.toggle("--open");
	});

	if (offerSlider) {
		offerSlider.slick({
			dots: true,
			arrows: false,
			appendDots: offerSlidernav,
			fade: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	}
});
