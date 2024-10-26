const headerBurger = document.querySelector('.header__burger')
const mobileNav = document.querySelector('.mobile-nav')
const navBg = document.querySelector('.nav__bg')
const navItem = document.querySelectorAll('.mobile-nav .nav__item')
const body = document.querySelector('body')

const openMenu = () => {
	headerBurger.classList.add('header__burger--active')
	mobileNav.classList.add('mobile-nav--active')
	body.style.overflow = 'hidden'
}

const closeMenu = () => {
	headerBurger.classList.remove('header__burger--active')
	mobileNav.classList.remove('mobile-nav--active')
	body.style.overflow = 'scroll'
}

headerBurger.addEventListener('click', () => {
	headerBurger.classList.contains('header__burger--active')
		? closeMenu()
		: openMenu()
})

navBg.addEventListener('click', () => {
	closeMenu()
})

navItem.forEach(item => {
	item.addEventListener('click', closeMenu)
})

window.addEventListener('resize', () => {
	if (window.innerWidth > 767) {
		closeMenu()
	}
})
