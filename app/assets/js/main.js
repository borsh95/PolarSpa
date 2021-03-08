//Hamburger
(function () {
	const hamburgerBtn = document.querySelector('.hamburger');
	const burgerBlock = document.querySelector('.header__burger');
	const bodyEl = document.querySelector('body');



	hamburgerBtn.addEventListener('click', function () {
		this.classList.toggle('active');

		let isActive = this.classList.contains('active');
		burgerBlock.classList[isActive ? 'add' : 'remove']('active');
		bodyEl.style.overflow = (isActive) ? 'hidden' : '';
	});

	window.addEventListener('resize', function () {
		if (document.documentElement.clientWidth > 1197 && burgerBlock.classList.contains('active')) {
			hamburgerBtn.classList.remove('active');
			burgerBlock.classList.remove('active');
			bodyEl.style.overflow = '';
		}
	});
}());

if (document.querySelector('.search-toggle')) {
	const btnOpen = document.querySelector('.search-toggle');
	const btnClose = document.querySelector('.search__btn-close');
	const search = document.querySelector('.header__search');

	btnOpen.addEventListener('click', function () {
		search.classList.add('active');
	});

	btnClose.addEventListener('click', function () {
		search.classList.remove('active');
	});
}