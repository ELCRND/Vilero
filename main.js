const HEADER_MENU = document.querySelector(".header__wrap");
const HEADER_MENU_BTN = document.querySelector(".header__menu-btn");

HEADER_MENU_BTN.addEventListener("click", () => {
  HEADER_MENU.classList.toggle("open");
  HEADER_MENU_BTN.classList.toggle("open");
});

HEADER_MENU.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    HEADER_MENU.classList.remove("open");
    HEADER_MENU_BTN.classList.remove("open");
  })
);

document.addEventListener("DOMContentLoaded", () => {
  //   const slider = document.querySelector(".slider");
  const sliderWrapper = document.querySelector(".advant__features");
  const slides = sliderWrapper.querySelectorAll(".advant__feature");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  const updateSlider = () => {
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  const showSlide = (index) => {
    if (window.innerWidth > 767) return;
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    updateSlider();
  };

  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  sliderWrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
  });

  sliderWrapper.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentX = e.pageX;
    const diffX = startX - currentX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        showSlide(currentIndex + 1);
      } else {
        showSlide(currentIndex - 1);
      }
      isDragging = false;
    }
  });

  sliderWrapper.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  sliderWrapper.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        showSlide(currentIndex + 1);
      } else {
        showSlide(currentIndex - 1);
      }
      isDragging = false;
    }
  });

  sliderWrapper.addEventListener("touchend", () => {
    isDragging = false;
  });

  const handleResize = () => {
    if (window.innerWidth > 767) {
      sliderWrapper.style.transform = "translateX(0)";
    }
  };

  handleResize();

  window.addEventListener("resize", handleResize);
});
