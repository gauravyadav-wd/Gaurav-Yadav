"use strict";

const navItem = document.querySelector(".navbar");
const slides = document.querySelectorAll(".project-item");
const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");

navItem.addEventListener("click", function (e) {
  e.preventDefault();

  // if (e.target.classList.contains("nav-item")) {
  const id = e.target.getAttribute("href");
  console.log(id);
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  // }
});

//SLIDER

const dotContainer = document.querySelector(".dots");

let curSlide = 0;
let Maxslide = slides.length;
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const slideReset = function () {
  slides.forEach(function (el, i) {
    el.style.opacity = "0";
  });
  slides[curSlide].style.opacity = 1;
};

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const nextSlide = function () {
  if (curSlide === Maxslide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  slideReset();
  activateDot(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = Maxslide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  slideReset();
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  slideReset();
  createDots();
  activateDot(0);
};
init();
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

//INTERSECTION OBSERVER
const allSections = document.querySelectorAll(".section");

const loadContent = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(loadContent, {
  root: null,
  threshold: "0.1",
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

const skillSection = document.querySelector(".skills");
const loadAnimation = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.add("skills-animator");
};

const skillObserver = new IntersectionObserver(loadAnimation, {
  root: null,
  threshold: "0.1",
});

skillObserver.observe(skillSection);

//ONload

const header = document.querySelector(".hero-section");
const navbar = document.querySelector(".navbar");
const container = document.querySelector("#container");

//TEMP
header.style.opacity = 1;
navbar.style.opacity = 1;
container.style.display = "none";

// const body = document.querySelector("body");
// const el = document.createElement("div");

// window.onload = function () {
//   body.style.overflow = "hidden";
// };

// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };

// const myTimeout = setTimeout(function () {
//   el.style.opacity = "0";
//   body.style.overflow = "visible";
//   container.style.display = "none";
//   header.style.opacity = "1";
//   navbar.style.opacity = "1";
// }, 3500);

//COUNTER

const counters = document.querySelectorAll(".value");
const speed = 200;

counters.forEach((counter) => {
  const animate = () => {
    const value = +counter.getAttribute("akhi");
    const data = +counter.innerText;

    const time = value / speed;
    if (data < value) {
      counter.innerText = Math.ceil(data + time);
      setTimeout(animate);
    } else {
      counter.innerText = value;
    }
  };

  animate();
});

//PROJECT item mouseover
const pitems = document.querySelectorAll(".project-item");
const pitemImage = document.querySelectorAll(".project-image-container");

pitems.forEach(function (pitem, i) {
  pitem.addEventListener("mouseenter", function () {
    pitemImage[i].classList.remove("opacity");
  });

  pitem.addEventListener("mouseleave", function () {
    pitemImage[i].classList.add("opacity");
  });
});

// Cursor animation hero

const heroIcon = document.querySelectorAll(".hero-icon");
const setCursorLocation = (e) => {
  heroIcon.forEach(function (icon) {
    let cursorLocation = `margin-top: ${(e.pageY - 20) / 15}px; margin-left: ${
      (e.pageX - 20) / 15
    }px;`;
    icon.setAttribute("style", cursorLocation);
  });
};

document.addEventListener("mousemove", setCursorLocation);

const removeListener = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    document.removeEventListener("mousemove", setCursorLocation);
  }
};

const addListener = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    console.log(entry.isIntersecting);
    console.log("trying to add");
    document.addEventListener("mousemove", setCursorLocation);
  }
};

const about = document.querySelector(".about-section");
const aboutObserver = new IntersectionObserver(removeListener, {
  root: null,
  threshold: "0.1",
});

aboutObserver.observe(about);

const heroObserver = new IntersectionObserver(addListener, {
  root: null,
  threshold: "0.1",
});
heroObserver.observe(header);

//Audio play
const play = document.querySelector(".toggle");
const musicAnimation = document.querySelector(".music").firstElementChild;
let statusAudio = true;
let audio = new Audio("audio.mp3");
play.addEventListener("click", function (e) {
  // e.preventDefault();
  if (statusAudio) {
    audio.play();
    musicAnimation.classList.add("music-animation");
    statusAudio = false;
  } else {
    musicAnimation.classList.remove("music-animation");

    audio.pause();
    statusAudio = true;
  }
});

// About Image

const aboutImage = document.querySelector(".about-img");

aboutImage.addEventListener("mouseenter", function () {
  this.classList.remove("about-opacity");
  this.classList.add("scale");
});
aboutImage.addEventListener("mouseleave", function () {
  this.classList.add("about-opacity");
  this.classList.remove("scale");
});

//Media queries

// Create a condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia("(max-width: 608px)");
const Logo = document.querySelector(".logo");
const handleTabletChange = function (e) {
  // Check if the media query is true
  if (e.matches) {
    console.log("Media Query Matched!");
    document.querySelector(".heading-primary2").textContent =
      "I build things for the Web";
    Logo.remove();
  }
};

mediaQuery.addListener(handleTabletChange); // Initial check
handleTabletChange(mediaQuery);
