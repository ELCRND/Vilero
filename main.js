// ========================HEADER-MENU===========================
const HEADER_MENU = document.querySelector(".header__wrap");
const HEADER_MENU_BTN = document.querySelector(".header__menu-btn");

HEADER_MENU_BTN.addEventListener("click", () => {
  HEADER_MENU.classList.toggle("open");
  HEADER_MENU_BTN.classList.toggle("open");
  document.body.classList.toggle("scroll-off");
});

HEADER_MENU.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    HEADER_MENU.classList.remove("open");
    HEADER_MENU_BTN.classList.remove("open");
    document.body.classList.remove("scroll-off");
  })
);
//
//
//
// ===========================GALLERY===========================
const GALLERY = document.querySelector(".gallery-images");
const LEFT_COLUMN = document.querySelector(
  ".gallery-images__column--left .gallery-images__slider"
);
const CENTER_COLUMN = document.querySelector(
  ".gallery-images__column--center .gallery-images__slider"
);
const RIGHT_COLUMN = document.querySelector(
  ".gallery-images__column--right .gallery-images__slider"
);

let currentSlide = 0;
let lastScrollTime = 0;
const visibleSlideQuant = 2; // минимальное количество слайдов
const scrollDelay = 400; // задержка между прокруткой;
const slideHeight = LEFT_COLUMN.children[0].clientHeight;
const gap = +window.getComputedStyle(LEFT_COLUMN).gap.replaceAll(/[a-z]/g, "");
const tresholdOffset =
  (CENTER_COLUMN.children.length - visibleSlideQuant) * (slideHeight + gap); // компенсация начального смещения центральной колонки

CENTER_COLUMN.style.transform = `translateY(-${
  (CENTER_COLUMN.children.length - visibleSlideQuant) * (slideHeight + gap)
}px)`; // смещение центральной колонки вверх до двух последних элементов

function scrollSlider(e) {
  e.preventDefault();

  const currentTime = new Date().getTime();
  if (currentTime - lastScrollTime < scrollDelay) {
    return;
  }
  lastScrollTime = currentTime;

  e.deltaY > 0 ? hadleScrollDown() : handleScrollUp();

  LEFT_COLUMN.style.transform = `translateY(-${
    currentSlide * (slideHeight + gap)
  }px)`;
  RIGHT_COLUMN.style.transform = `translateY(-${
    currentSlide * (slideHeight + gap)
  }px)`;
}

function hadleScrollDown() {
  currentSlide = Math.min(
    currentSlide + 1,
    LEFT_COLUMN.children.length - visibleSlideQuant
  );
  CENTER_COLUMN.style.transform = `translateY(${
    -tresholdOffset + currentSlide * (slideHeight + gap)
  }px)`;
}

function handleScrollUp() {
  currentSlide = Math.max(currentSlide - 1, 0);
  CENTER_COLUMN.style.transform = `translateY(-${
    tresholdOffset - currentSlide * (slideHeight + gap)
  }px)`;
}

GALLERY.addEventListener("wheel", scrollSlider, { passive: false });
