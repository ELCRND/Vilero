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
