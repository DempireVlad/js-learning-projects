const root = document.documentElement;
const burger = document.querySelector(".burger");
const menu = document.querySelector(".planets_mobile_choise");
const planetButtons = document.querySelectorAll(".planet-btn");
const menuItem = document.querySelectorAll(".menu-item");

// MOBILE MENU
burger.addEventListener("click", () => {
  menu.classList.toggle("open");
  document.body.classList.toggle('no-scroll', menu.classList.contains("open"));
});

// PLANET BUTTONS
planetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    planetButtons.forEach((btn) => btn.classList.remove("active_nav"));
    button.classList.add("active_nav");

    const planet = button.dataset.planet;
    const cssVar = `--${planet}`;
    activeColor = getComputedStyle(root).getPropertyValue(cssVar).trim();

    // для запису CSS-ЗМІННОЇ
    root.style.setProperty("--active-color", activeColor);
  });
});

// MENU ITEMS кнопки
menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    menuItem.forEach((itm) => itm.classList.remove("active"));
    item.classList.add("active");
  });
});