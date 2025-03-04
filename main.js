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
let tresholdOffset = 0;
const visibleSlideQuant = 2; // минимальное количество слайдов
const scrollDelay = 500; // задержка между прокруткой;
const speed = 1000; // скорость прокрутки в мс
const slideHeight = LEFT_COLUMN.children[0].clientHeight;
const totalSlides = Math.max(
  LEFT_COLUMN.children.length,
  CENTER_COLUMN.children.length,
  RIGHT_COLUMN.children.length
);
const gap = +window.getComputedStyle(LEFT_COLUMN).gap.replaceAll(/[a-z]/g, "");

function scrollSlider(e) {
  const isAtEnd =
    e.deltaY > 0 && currentSlide === totalSlides - visibleSlideQuant;
  const isAtStart = e.deltaY < 0 && currentSlide === 0;

  if (isAtEnd || isAtStart) {
    // возврат сролла страницы при достижении крайних слайдов
    return;
  }

  e.preventDefault(); // запрет скролла страницы

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
  currentSlide = Math.min(currentSlide + 1, totalSlides - visibleSlideQuant);
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

function initGallery() {
  if (window.innerWidth >= 1024) {
    GALLERY.style.transform = "none";
    GALLERY.addEventListener("wheel", scrollSlider, { passive: false });

    tresholdOffset =
      (CENTER_COLUMN.children.length - visibleSlideQuant) * (slideHeight + gap); // компенсация начального смещения центральной колонки

    [LEFT_COLUMN, CENTER_COLUMN, RIGHT_COLUMN].forEach(
      (slider) => (slider.style.transition = `transform ${speed}ms ease-out`)
    );

    CENTER_COLUMN.style.transform = `translateY(-${
      (CENTER_COLUMN.children.length - visibleSlideQuant) * (slideHeight + gap)
    }px)`; // смещение центральной колонки вверх до двух последних элементов
  } else {
    GALLERY.removeEventListener("wheel", scrollSlider);

    [LEFT_COLUMN, CENTER_COLUMN, RIGHT_COLUMN].forEach(
      (slider) => (slider.style.transition = `none`)
    );

    CENTER_COLUMN.style.transform = `translateY(0)`;
  }
}

initGallery();
window.addEventListener("resize", initGallery);
//
//
//
//
//===========================GALLERY 1023===========================
const SLIDES = document.querySelectorAll(".gallery-images__item");
let slideIdx = 0;
let currentOfsset = 0;
const total = SLIDES.length;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index, direction) {
  if (index >= total) {
    slideIdx = 0;
  } else if (index < 0) {
    slideIdx = total - 1;
  } else {
    slideIdx = index;

    if (direction === "r") {
      currentOfsset += SLIDES[slideIdx - 1].offsetWidth + gap;
    } else {
      currentOfsset -= SLIDES[slideIdx - 1]?.offsetWidth + gap || 0;
    }
  }

  GALLERY.style.transform = `translateX(-${slideIdx * 100}%)`;
}

function nextSlide() {
  showSlide(slideIdx + 1, "r");
}

function prevSlide() {
  showSlide(slideIdx - 1, "l");
}

GALLERY.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

GALLERY.addEventListener("touchmove", (e) => {
  touchEndX = e.touches[0].clientX;
});

GALLERY.addEventListener("touchend", () => {
  if (touchEndX === 0) return;

  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    nextSlide();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    prevSlide();
  }

  touchStartX = 0;
  touchEndX = 0;
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    GALLERY;
  }
});
//
//
//
//===========================ZOOM===========================

const GALLERY_ZOOM_MODAL = document.querySelector(".gallery__modal");
const GALLERY_ZOOM_MODAL_IMAGE = GALLERY_ZOOM_MODAL.querySelector(
  ".gallery-modal__content img"
);
const GALLERY_CLOSE_MODAL_BUTTON = GALLERY_ZOOM_MODAL.querySelector(
  ".gallery-modal__close"
);
const GALLERY_ZOOM_IMAGE_BUTTON = document.querySelectorAll(
  ".gallery-images__item"
);
const GALLERY_IMAGES = document.querySelectorAll(".gallery-images__item img");

let currentImageIndex = 0;

function openZoomModal(index) {
  currentImageIndex = index;

  GALLERY_ZOOM_MODAL.style.display = "flex";
  GALLERY_ZOOM_MODAL_IMAGE.src = GALLERY_IMAGES[currentImageIndex].src;
}

function closeZoomModal() {
  GALLERY_ZOOM_MODAL.style.display = "none";
}

GALLERY_ZOOM_IMAGE_BUTTON.forEach((image, idx) => {
  image.addEventListener("click", () => openZoomModal(idx));
});

GALLERY_CLOSE_MODAL_BUTTON.addEventListener("click", closeZoomModal);
