//Hamburger
(function () {
	const hamburgerBtn = document.querySelector('.hamburger');
	const burgerBlock = document.querySelector('.header__burger');
	const bodyEl = document.querySelector('body');



	hamburgerBtn.addEventListener('click', function () {
		this.classList.toggle('active');

		workMenu();
	});

	window.addEventListener('resize', function () {
		if (document.documentElement.clientWidth > 1197 && burgerBlock.classList.contains('active')) {
			workMenu();
		}
	});

	function workMenu() {
		let coordsHamburgerBlock = burgerBlock.getBoundingClientRect();
		let isActive = hamburgerBtn.classList.contains('active');
		console.log(coordsHamburgerBlock.top)

		burgerBlock.style.height = (!isActive) ? '' : `calc(100vh - ${coordsHamburgerBlock.top}px)`;
		burgerBlock.classList[isActive ? 'add' : 'remove']('active');
		bodyEl.style.overflow = (isActive) ? 'hidden' : '';
	}
}());

//header
if (document.querySelector('header')) {
	const header = document.querySelector('header');
	const expansionEl = document.querySelector('header + .expansion-container');

	window.onscroll = function () {
		showHeader(header, expansionEl);
	};

	function showHeader(el, expansionEl) {
		const heightEl = el.offsetHeight;

		if (window.pageYOffset > heightEl + 10) {
			expansionEl.style.height = el.offsetHeight + 'px';
			el.classList.add('fixed');
		} else {
			el.classList.remove('fixed');
			expansionEl.style.height = '';
		}
	}
}

//Кнопка вверх
if (document.querySelector('.v-up')) {
	const btnDown = document.querySelector('.v-up');
	let vUpTriggerTimer = 0;

	vUp(btnDown, getScroledWindow);

	btnDown.addEventListener('click', function () {
		backToTop(-45, 0);
	});

	window.addEventListener('scroll', function () {
		clearTimeout(vUpTriggerTimer);
		vUpTriggerTimer = setTimeout(() => {
			vUp(btnDown, getScroledWindow);
		}, 200)
	});

	//пролистываине окна вверх при клике на кнопку
	function vUp(btn, scroled, scrollUp) {
		if (scroled() > (document.documentElement.clientHeight / 2)) {
			btn.classList.add('active');
		} else if (scroled() < (document.documentElement.clientHeight / 2) || btn.classList.contains('active')) {
			btn.classList.remove('active');
		}
	}
}

if (document.querySelector('.v-modal')) {
	const modalEl = document.querySelector('.v-modal');
	const btnCloseMadal = modalEl.querySelector('.v-modal__close');

	btnCloseMadal.addEventListener('click', function () {
		if (modalEl.classList.contains('active')) modalEl.classList.remove('active');
	});
}

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

if (document.querySelector('#map')) {
	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			controls: [],
			center: [53.93414857063463, 27.415064500000014],
			zoom: 14
		});

		myMap.behaviors.disable('drag');

		let MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
			`<div class="my-balloon">
				{{properties.balloonContent}}
			</div>`
		);

		let myPlacemark = new ymaps.Placemark([53.93414857063463, 27.415064500000014],
			{
				balloonContent: `ул. Цветочная 25, \n Ждановичи 223028`
			},
			{
				hideIconOnBalloonOpen: false,
				preset: 'islands#icon',
				iconColor: '#ea4335',
				balloonShadow: true,
				balloonLayout: MyBalloonLayout,
			});

		myMap.geoObjects.add(myPlacemark);
		myPlacemark.balloon.open();
	}
}

//прокрутка окна вверх вниз
function backToTop(interval, to) {
	if (window.pageYOffset <= to) return;

	window.scrollBy(0, interval);
	setTimeout(() => {
		backToTop(interval, to)
	}, 0);
}

//на сколько прокручено окно
function getScroledWindow() {
	return window.pageYOffset || document.documentElement.scrollTop;
}

