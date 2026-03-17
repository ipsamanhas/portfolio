/**
 * Portfolio site: mobile menu toggle and smooth nav behavior.
 */

(function () {
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector(".nav__menu");
  const navLinks = document.querySelectorAll(".nav__link");

  if (!navToggle || !navMenu) return;

  function openMenu() {
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  }

  navToggle.addEventListener("click", toggleMenu);

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });
})();

(function () {
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll(".project-card[data-category]"));
  const scrollButtons = Array.from(document.querySelectorAll("[data-scroll-to]"));

  scrollButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const selector = btn.getAttribute("data-scroll-to");
      if (!selector) return;
      const target = document.querySelector(selector);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (filterButtons.length === 0 || cards.length === 0) return;

  function setActive(button) {
    filterButtons.forEach(function (b) {
      const isActive = b === button;
      b.classList.toggle("is-active", isActive);
      b.setAttribute("aria-selected", String(isActive));
    });
  }

  function applyFilter(filter) {
    cards.forEach(function (card) {
      const category = card.getAttribute("data-category");
      const show = filter === "all" || category === filter;
      card.style.display = show ? "" : "none";
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.getAttribute("data-filter") || "all";
      setActive(button);
      applyFilter(filter);
    });
  });
})();

/**
 * Hero image carousel: stacked look, click left/right to change slide, loop.
 */
(function () {
  const carousel = document.querySelector(".hero__carousel");
  if (!carousel) return;

  const inner = carousel.querySelector(".hero__carousel-inner");
  const items = carousel.querySelectorAll(".hero__carousel-item");
  const prevBtn = carousel.querySelector(".hero__carousel-prev");
  const nextBtn = carousel.querySelector(".hero__carousel-next");
  const hitPrev = carousel.querySelector(".hero__carousel-hit--prev");
  const hitNext = carousel.querySelector(".hero__carousel-hit--next");

  if (!inner || items.length === 0) return;

  let index = 0;
  const total = items.length;

  function goTo(i) {
    index = ((i % total) + total) % total;
    inner.style.transform = "translateX(-" + index * 100 + "%)";
  }

  function handlePrev() {
    goTo(index - 1);
  }
  function handleNext() {
    goTo(index + 1);
  }

  if (prevBtn) prevBtn.addEventListener("click", handlePrev);
  if (nextBtn) nextBtn.addEventListener("click", handleNext);
  if (hitPrev) hitPrev.addEventListener("click", handlePrev);
  if (hitNext) hitNext.addEventListener("click", handleNext);
})();
