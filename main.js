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

CENTER_COLUMN.style.transform = `translateY(-${
  (CENTER_COLUMN.children.length - 2) * 520
}px)`;

const initialOffset = (CENTER_COLUMN.children.length - 2) * 520;

let currentSlide = 0;
let lastScrollTime = 0;
const scrollDelay = 400;

function scrollSlider(event) {
  event.preventDefault();

  const currentTime = new Date().getTime();
  if (currentTime - lastScrollTime < scrollDelay) {
    return;
  }

  lastScrollTime = currentTime;

  if (event.deltaY > 0) {
    // down
    currentSlide = Math.min(currentSlide + 1, LEFT_COLUMN.children.length - 2);
    CENTER_COLUMN.style.transform = `translateY(${
      -initialOffset + currentSlide * 520
    }px)`;
  } else {
    //  up
    currentSlide = Math.max(currentSlide - 1, 0);
    CENTER_COLUMN.style.transform = `translateY(-${
      initialOffset - currentSlide * 520
    }px)`;
  }

  LEFT_COLUMN.style.transform = `translateY(-${currentSlide * 520}px)`;
  RIGHT_COLUMN.style.transform = `translateY(-${currentSlide * 520}px)`;
}

GALLERY.addEventListener("wheel", scrollSlider, { passive: false });
