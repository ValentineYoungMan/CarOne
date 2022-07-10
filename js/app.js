// core version + navigation, pagination modules:
//import Swiper, { Navigation, Pagination } from 'swiper';


// Провірка поддержка webp, додавання класу webp або no-webp для HTML 
function isWebp() {
    // Провірка підтримки webp 
    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Додавання класу _webp або _no-webp для HTML
    testWebP(function (support) {
    
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });
}

isWebp();
//-------------------------------------------------------------------------------------------
//background image
function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();
//-------------------------------------------------------------------------------------------
//menu burger

const iconMenu = document.querySelector('.header__menu-icon');
const menuBody = document.querySelector('.header__nav');
if (iconMenu) {
    
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

//-------------------------------------------------------------------------------------------

let headerNavigation = document.querySelector('.header__navigation');
let logoWhite = document.querySelector('.logo__white');
let logoBlack = document.querySelector('.logo__black');

let headerNavigationOffset = headerNavigation.offsetTop;

document.addEventListener('scroll', ()=>{
    if(window.pageYOffset > headerNavigationOffset){
        headerNavigation.classList.add('fixed');
        logoWhite.classList.remove('active');
        logoBlack.classList.add('active');
    } else {
        headerNavigation.classList.remove('fixed');
        logoBlack.classList.remove('active');
        logoWhite.classList.add('active');
    }
})


const anchors = document.querySelectorAll('.header__nav__a[href]')

for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const sectionId = anchor.getAttribute('href')
        document.querySelector(sectionId).scrollIntoView({
            behavior: "smooth",
            block: 'start',
        })
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');

    })
}

let buttonToTop = document.querySelector('.button-toTop')
let header = document.querySelector('.header')

window.addEventListener('scroll', () => {
    if(window.pageYOffset > header.offsetHeight) {
        buttonToTop.classList.add('_visible')
    } else if(window.pageYOffset <= header.offsetHeight){
        buttonToTop.classList.remove('_visible')
    }
})


//-------------------------------------------------------------------------------------------
// const mainblockSwiper = new Swiper('.mainblock', {

//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },

//     loop: true,
//     parallax: true,

// });

const productskSwiper = new Swiper('.products__items', {

    slidesPerView: 3,
    loop: true,
    loopedSlides: 3,
    spaceBetween: 20,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    speed: 800,
    breakpoints: {
        0:{
            slidesPerView: 1,
        },
        568: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

const testimonialskSwiper = new Swiper('.testimonials__items', {
    loop: true,
    loopedSlides: 3,
    pagination: {
        el: '.swiper-pagination2',
        clickable: true,
    },
     autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    speed: 800,
})

//--------------------------------------------------------------------------------------

function galleryFilter() {
    const buttons = document.querySelectorAll('.gallery__category');
    const cards = document.querySelectorAll('.gallery__item__container');

    function filter(category, items) {
        items.forEach((item) => {
            const isItemFiltered = !item.classList.contains(category)
            const isShowAll = category.toLowerCase() === 'all'
            if (isItemFiltered && !isShowAll) {
                item.classList.add('anime')
            } else {
                item.classList.remove('hide')
                item.classList.remove('anime')
            }
        })
    }

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const currentCategory = button.dataset.filter;
            filter(currentCategory, cards);

            buttons.forEach(button => {
                button.classList.remove('active');
            })
            let item = e.target;
            item.classList.add('active');
        })
    })

    cards.forEach((card) => {
        card.ontransitionend = function () {
            if (card.classList.contains('anime')) {
                card.classList.add('hide')
            }
        }
    })
}

galleryFilter();

//--------------------------------------------------------------------------------------

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

let ButtonSubmit = document.querySelector('.message__button');
let inputsNameItems = document.querySelectorAll('.message__input.required');
let inputEmail = document.querySelector('.input-email');


ButtonSubmit.addEventListener('click', (e) => {
    e.preventDefault();
     //check inputs

    function checkForms(){

        document.querySelector('.message__succesed').classList.remove('active');

        for (let i = 0; i < inputsNameItems.length; i++) {
            inputsNameItems[i].closest('.input__container').querySelector('.message__input__error').classList.remove('error');
    
            if (!inputsNameItems[i].value) {
                inputsNameItems[i].closest('.input__container').querySelector('.message__input__error').classList.add('error');
            }
    
        }   
        if (emailTest(inputEmail)) {
            inputEmail.closest('.input__container').querySelector('.message__input__error').classList.add('error');
        }
        console.log(emailTest(inputEmail))
    }

    checkForms();

    let check = [...inputsNameItems].every(function(elem) {
        if (elem.value) {
            return true;
        } else {
            return false;
        }
    });

    if (check==true) {
        document.querySelector('.message__succesed').classList.add('active');
    }
    
})

//--------------------------------------------------------------------------------------

let footerButton = document.querySelector('.footer__button');
let footerInput = document.querySelector('.footer__input');

footerButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.footer__subscribed').classList.remove('active');

    footerInput.closest('.footer__form').querySelector('.message__input__error').classList.remove('error');
    
    if (emailTest(footerInput)) {
        footerInput.closest('.footer__form').querySelector('.message__input__error').classList.add('error');
    } else {
        document.querySelector('.footer__button').classList.add('active');
        document.querySelector('.footer__subscribed').classList.add('active');
    }


})