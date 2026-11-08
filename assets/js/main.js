/* =========================================
   MOBILE NAVIGATION
========================================= */

const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

function closeMenu() {
    navMenu.classList.remove("show-menu");
    navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    navToggle.setAttribute("aria-expanded", "true");
});

navClose.addEventListener("click", closeMenu);

document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

/* =========================================
   GSAP SLIDE ANIMATION
========================================= */

function animateSlide(slide, firstLoad = false) {
    if (!slide) return;

    const image = slide.querySelector(".artwork__image");
    const top = slide.querySelector(".slide__top");
    const eyebrow = slide.querySelector(".slide__eyebrow");
    const title = slide.querySelector(".slide__title");
    const details = slide.querySelector(".slide__details");

    const elements = [top, eyebrow, title, details];

    gsap.killTweensOf([image, ...elements]);

    gsap.set(elements, {
        autoAlpha: 0,
        y: 35,
    });

    gsap.fromTo(
        image,
        {
            scale: 1.2,
        },
        {
            scale: 1,
            duration: 2,
            ease: "power3.out",
            overwrite: true,
        },
    );

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out",
        },
    });

    tl.to(top, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
    })
        .to(
            eyebrow,
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
            },
            "-=0.4",
        )
        .to(
            title,
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
            },
            "-=0.45",
        )
        .to(
            details,
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
            },
            "-=0.55",
        );

    return tl;
}

/* =========================================
   SWIPER
========================================= */

const gallerySwiper = new Swiper(".gallery__swiper", {
    loop: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },

    speed: 1300,
    grabCursor: true,
    parallax: true,
    watchSlidesProgress: true,

    keyboard: {
        enabled: true,
    },

    autoplay: {
        delay: 6500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    pagination: {
        el: ".gallery__pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".gallery__next",
        prevEl: ".gallery__prev",
    },

    on: {
        init(swiper) {
            animateSlide(swiper.slides[swiper.activeIndex], true);
        },

        slideChangeTransitionStart(swiper) {
            animateSlide(swiper.slides[swiper.activeIndex]);
        },
    },
});
