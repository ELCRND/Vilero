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
const slideHeight = () => LEFT_COLUMN.children[0].clientHeight;
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
    currentSlide * (slideHeight() + gap)
  }px)`;
  RIGHT_COLUMN.style.transform = `translateY(-${
    currentSlide * (slideHeight() + gap)
  }px)`;
}

function hadleScrollDown() {
  currentSlide = Math.min(currentSlide + 1, totalSlides - visibleSlideQuant);
  CENTER_COLUMN.style.transform = `translateY(${
    -tresholdOffset + currentSlide * (slideHeight() + gap)
  }px)`;
}

function handleScrollUp() {
  currentSlide = Math.max(currentSlide - 1, 0);
  CENTER_COLUMN.style.transform = `translateY(-${
    tresholdOffset - currentSlide * (slideHeight() + gap)
  }px)`;
}

function initGallery() {
  if (window.innerWidth >= 1024) {
    GALLERY.style.transform = "none";
    GALLERY.addEventListener("wheel", scrollSlider, { passive: false });

    tresholdOffset =
      (CENTER_COLUMN.children.length - visibleSlideQuant) *
      (slideHeight() + gap); // компенсация начального смещения центральной колонки

    [LEFT_COLUMN, CENTER_COLUMN, RIGHT_COLUMN].forEach(
      (slider) => (slider.style.transition = `transform ${speed}ms ease-out`)
    );

    CENTER_COLUMN.style.transform = `translateY(-${
      (CENTER_COLUMN.children.length - visibleSlideQuant) *
      (slideHeight() + gap)
    }px)`; // смещение центральной колонки вверх до двух последних элементов
  } else {
    GALLERY.removeEventListener("wheel", scrollSlider);

    [LEFT_COLUMN, CENTER_COLUMN, RIGHT_COLUMN].forEach(
      (slider) => (slider.style.transition = `none`)
    );
  }
  LEFT_COLUMN.style.transform = `translateY(0)`;
  CENTER_COLUMN.style.transform = `translateY(0)`;
  RIGHT_COLUMN.style.transform = `translateY(0)`;
}

initGallery();
window.addEventListener("resize", initGallery);
// //
// //
// //
// //===========================ZOOM===========================
window.addEventListener("resize", () => {
  if (window.innerWidth > 1023) {
    closeZoomModal();
  }
});

const GALLERY_ZOOM_MODAL = document.querySelector(".gallery__modal");
const GALLERY_ZOOM_MODAL_IMAGE = GALLERY_ZOOM_MODAL.querySelector(
  ".gallery-modal__content img"
);
const GALLERY_CLOSE_MODAL_BUTTON = GALLERY_ZOOM_MODAL.querySelector(
  ".gallery-modal__close"
);
const GALLERY_PREV_BUTTON = GALLERY_ZOOM_MODAL.querySelector(
  ".gallery-modal__prev"
);
const GALLERY_NEXT_BUTTON = GALLERY_ZOOM_MODAL.querySelector(
  ".gallery-modal__next"
);
const GALLERY_ZOOM_IMAGE_BUTTON = document.querySelectorAll(
  ".gallery-images__item"
);
const GALLERY_IMAGES = document.querySelectorAll(".gallery-images__item img");

let currentImageIndex = 0;

function openZoomModal(index) {
  if (index >= 0 && index < GALLERY_IMAGES.length) {
    currentImageIndex = index;
    GALLERY_ZOOM_MODAL.style.display = "flex";
    setTimeout(() => {
      GALLERY_ZOOM_MODAL.classList.add("active");
    }, 10);
    GALLERY_ZOOM_MODAL_IMAGE.src = GALLERY_IMAGES[currentImageIndex].src;
    GALLERY_ZOOM_MODAL_IMAGE.onload = () => {
      GALLERY_ZOOM_MODAL_IMAGE.classList.add("loaded");
    };
  } else {
    console.error("Invalid image index:", index);
  }
}

function closeZoomModal() {
  GALLERY_ZOOM_MODAL.classList.remove("active");
  setTimeout(() => {
    GALLERY_ZOOM_MODAL.style.display = "none";
  }, 300);
  GALLERY_ZOOM_MODAL_IMAGE.classList.remove("loaded");
}

function showNextImage() {
  GALLERY_ZOOM_MODAL_IMAGE.classList.remove("loaded");
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % GALLERY_IMAGES.length;
    GALLERY_ZOOM_MODAL_IMAGE.src = GALLERY_IMAGES[currentImageIndex].src;
    GALLERY_ZOOM_MODAL_IMAGE.onload = () => {
      GALLERY_ZOOM_MODAL_IMAGE.classList.add("loaded");
    };
  }, 300);
}

function showPrevImage() {
  GALLERY_ZOOM_MODAL_IMAGE.classList.remove("loaded");
  setTimeout(() => {
    currentImageIndex =
      (currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    GALLERY_ZOOM_MODAL_IMAGE.src = GALLERY_IMAGES[currentImageIndex].src;
    GALLERY_ZOOM_MODAL_IMAGE.onload = () => {
      GALLERY_ZOOM_MODAL_IMAGE.classList.add("loaded");
    };
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  GALLERY_CLOSE_MODAL_BUTTON.addEventListener("click", closeZoomModal);

  GALLERY_ZOOM_IMAGE_BUTTON.forEach((image, idx) => {
    image.addEventListener("click", () => openZoomModal(idx));
  });
});

// Свайпы
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

GALLERY_ZOOM_MODAL.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  isSwiping = false;
});

GALLERY_ZOOM_MODAL.addEventListener("touchmove", (e) => {
  touchEndX = e.touches[0].clientX;
  isSwiping = true;
});

GALLERY_ZOOM_MODAL.addEventListener("touchend", () => {
  if (isSwiping) {
    handleSwipe();
  }
  isSwiping = false;
});

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      showPrevImage();
    } else {
      showNextImage();
    }
  }
}

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      showPrevImage();
    } else {
      showNextImage();
    }
  }
}

// закрытие при нажатии на фоновую область

GALLERY_ZOOM_MODAL.addEventListener("click", (e) => {
  if (!e.target.closest(".gallery-modal__content img")) {
    closeZoomModal();
  }
});
