import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import JustValidate from 'just-validate';

import "purecss/build/grids-min.css";
import "purecss/build/grids-responsive-min.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "../sass/style.scss";

const burger = document.querySelector(".burger"),
    close = document.querySelector(".header__menu-close"),
    menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    document.body.style.overflow = "";
});

try {
    new Swiper('.works__slider', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".icon-right-open",
            prevEl: ".icon-left-open",
        },
        breakpoints: {
            // when window width is >= 1200px
            1200: {
                slidesPerView: 3,
                spaceBetween: 5,
            },

            1920: {
                spaceBetween: 35,
            }

        },

        modules: [Navigation, Pagination],

    });
} catch (e) { };

try {
    const tabs = document.querySelectorAll(".catalog__tab");
    const contents = document.querySelectorAll(".catalog__content-items");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Удаляем активный класс у всех табов и контента
            tabs.forEach((t) => t.classList.remove("catalog__tab-active"));
            contents.forEach((c) => (c.style.display = "none"));

            // Добавляем активный класс к нажатому табу и показываем соответствующий контент
            tab.classList.add("catalog__tab-active");
            contents[index].style.display = "flex";
        });
    });

    // Показываем первый контент при загрузке
    contents.forEach((c, i) => (c.style.display = i === 0 ? "flex" : "none"));
} catch (e) { }

try {
    const validator = new JustValidate('form');

    validator
        .addField('#name', [
            {
                rule: 'required',
            },
            {
                rule: 'minLength',
                value: 2,
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
            },
            {
                rule: 'email',
            },
        ])
        .addField('#quetion', [
            {
                rule: 'required',
            },
            {
                rule: 'minLength',
                value: 5,
            },
        ], {
            errorsContainer: document.querySelector('#quetion').parentElement.querySelector('.error-message'),
        })
        .addField('#checkbox', [
            {
                rule: 'required',
            },
        ], {
            errorsContainer: document.querySelector('#checkbox').parentElement.parentElement.querySelector('.checkbox-error-message'),
        })
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formData = new FormData(form);

            fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData,
            }).then(res => res.json()).then(data => {
                console.log("success", data);
                form.reset();
            })
        });

} catch (e) { }

try {
    const footerValidator = new JustValidate('.footer__form');

    footerValidator
        .addField('#news__email', [
            {
                rule: 'required',
            },
            {
                rule: 'email',
            },
        ], {
            errorsContainer: document.querySelector('#news__email').parentElement.querySelector('.error-message-footer-email'),
        })
        .addField('#footer__check-terms', [
            {
                rule: 'required',
            },
        ], {
            errorsContainer: document.querySelector('#footer__check-terms').parentElement.parentElement.querySelector('.checkbox-footer-error-message'),
        })
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formData = new FormData(form);

            fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData,
            }).then(res => res.json()).then(data => {
                console.log("success", data);
                form.reset();
            })
        });
} catch (e) { }