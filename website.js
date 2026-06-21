/**
 * Portfolio site: mobile navigation behavior for the editorial layout.
 */
(function () {
  const MOBILE_NAV_BREAKPOINT = 840;
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector(".nav__menu");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));

  if (!nav || !navToggle || !navMenu) return;

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
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  }

  function handleDocumentClick(event) {
    if (!navMenu.classList.contains("is-open")) return;
    if (nav.contains(event.target)) return;
    closeMenu();
  }

  function handleDocumentKeydown(event) {
    if (event.key !== "Escape") return;
    closeMenu();
  }

  function handleWindowResize() {
    if (window.innerWidth > MOBILE_NAV_BREAKPOINT) {
      closeMenu();
    }
  }

  navToggle.addEventListener("click", toggleMenu);
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleDocumentKeydown);
  window.addEventListener("resize", handleWindowResize);

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
})();

/**
 * Hero digicam gallery: cycle through all portfolio photos.
 */
(function () {
  const digicamImage = document.querySelector("[data-digicam-image]");
  const prevButton = document.querySelector(".digicam__nav--prev");
  const nextButton = document.querySelector(".digicam__nav--next");

  if (!digicamImage || !prevButton || !nextButton) return;

  const galleryImagePaths = [
    "images/image1.JPG",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg",
    "images/image5.jpg",
    "images/image6.JPG",
    "images/image7.JPG",
    "images/image8.JPG",
    "images/image9.jpg",
    "images/image10.jpg",
    "images/image11.jpg"
  ];
  const imageObjectPositions = {
    "images/image6.JPG": "center 28%",
    "images/image7.JPG": "center 22%",
    "images/image9.jpg": "center 36%"
  };
  const defaultObjectPosition = "center 18%";

  let currentIndex = Math.max(galleryImagePaths.indexOf(digicamImage.getAttribute("src") || ""), 0);

  function renderImage() {
    const currentPath = galleryImagePaths[currentIndex];
    digicamImage.setAttribute("src", currentPath);
    digicamImage.setAttribute("alt", "Photo " + (currentIndex + 1) + " from Ipsa's digicam gallery");
    digicamImage.style.objectPosition = imageObjectPositions[currentPath] || defaultObjectPosition;
  }

  function showPreviousImage() {
    currentIndex = (currentIndex - 1 + galleryImagePaths.length) % galleryImagePaths.length;
    renderImage();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryImagePaths.length;
    renderImage();
  }

  prevButton.addEventListener("click", showPreviousImage);
  nextButton.addEventListener("click", showNextImage);
  renderImage();
})();

/**
 * Reveal sections and cards on load (hero) and when scrolled into view.
 */
(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const heroTargets = document.querySelectorAll("#hero .board-card");
  const scrollTargets = document.querySelectorAll(
    [
      "#experience .section-heading",
      "#experience .experience-banner",
      "#experience .experience-card",
      "#projects .section-heading",
      "#projects .project-tile",
      "#skills .section-heading",
      "#skills .skill-card",
      "#contact .contact-card"
    ].join(", ")
  );

  const allTargets = [...heroTargets, ...scrollTargets];

  if (!allTargets.length) return;

  function showElement(element) {
    element.classList.add("is-visible");
  }

  function applyStagger(parentSelector, childSelector, stepSeconds) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    parent.querySelectorAll(childSelector).forEach(function (child, index) {
      child.style.setProperty("--reveal-delay", index * stepSeconds + "s");
    });
  }

  allTargets.forEach(function (element) {
    element.classList.add("reveal");
  });

  heroTargets.forEach(function (element, index) {
    element.classList.add("reveal--hero");
    element.style.setProperty("--reveal-delay", index * 0.14 + "s");
  });

  applyStagger("#experience .experience__grid", ".experience-card", 0.1);
  applyStagger("#projects .projects__board", ".project-tile", 0.08);
  applyStagger("#skills .skills__grid", ".skill-card", 0.1);

  if (prefersReducedMotion) {
    allTargets.forEach(showElement);
    return;
  }

  heroTargets.forEach(function (element) {
    window.setTimeout(function () {
      showElement(element);
    }, 120);
  });

  if (!("IntersectionObserver" in window)) {
    scrollTargets.forEach(showElement);
    return;
  }

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        showElement(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  scrollTargets.forEach(function (element) {
    revealObserver.observe(element);
  });
})();
