import "core-js/stable";
import "regenerator-runtime/runtime";
import { translations } from "./translations";

const logoGe = document.querySelectorAll(".logoGe");
const logoEn = document.querySelectorAll(".logoEn");
const languageSelectors = document.querySelectorAll(".languageSelector");
const select1 = document.getElementById("languageSelector1");
const select2 = document.getElementById("languageSelector2");

// Language Changer
function changeLanguage(language) {
  logoGe.forEach((logo) => logo.classList.toggle("hidden"));
  logoEn.forEach((logo) => logo.classList.toggle("hidden"));

  for (const key of Object.keys(translations.en)) {
    document
      .querySelectorAll(`.${key}`)
      .forEach((word) => (word.textContent = translations[language][key]));
  }
}

// Synchronize language selectors
languageSelectors.forEach((selector) => {
  selector.addEventListener("change", (event) => {
    changeLanguage(event.target.value);
  });
});

function synchronizeSelects(sourceSelect, targetSelect) {
  targetSelect.value = sourceSelect.value;
}

select1.addEventListener("change", () => {
  synchronizeSelects(select1, select2);
});

select2.addEventListener("change", () => {
  synchronizeSelects(select2, select1);
});

//

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const arrows = document.querySelectorAll(".arrow");
const firstOffer = document.querySelectorAll(".offerSli")[0];
const sliderContainer = document.querySelector(".slider-container");

const sliderFill = document.querySelector(".slider-fill");

arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    let firstOfferWidth = firstOffer.clientWidth + 20;
    sliderContainer.scrollLeft +=
      arrow.id == "left" ? -firstOfferWidth : firstOfferWidth;
  });
});

// Drag functionality

let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const autoSlide = () => {
  if (
    sliderContainer.scrollLeft ===
    sliderContainer.scrollWidth - sliderContainer.clientWidth
  ) {
    return;
  }
  if (sliderContainer.scrollLeft === 0) return;

  positionDiff = Math.abs(positionDiff);
  let firstOfferWidth = firstOffer.clientWidth + 20;
  let valDifference = firstOfferWidth - positionDiff;

  if (sliderContainer.scrollLeft > prevScrollLeft) {
    sliderContainer.scrollLeft +=
      positionDiff > firstOfferWidth / 3 ? valDifference : -positionDiff;
    return;
  }
  sliderContainer.scrollLeft -=
    positionDiff > firstOfferWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  sliderContainer.classList.add("dragging");

  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = sliderContainer.scrollLeft;
};
const dragStop = () => {
  isDragStart = false;
  sliderContainer.classList.remove("dragging");
  autoSlide();

  if (sliderContainer.scrollLeft > prevScrollLeft) {
    if (sliderContainer.scrollLeft < 124) {
      sliderFill.style.left = "0%";
    } else if (
      sliderContainer.scrollLeft > 124 &&
      sliderContainer.scrollLeft < 490
    ) {
      sliderFill.style.left = "33.33%";
    } else {
      sliderFill.style.left = "66.66%";
    }
  } else {
    if (sliderContainer.scrollLeft > 610) {
      sliderFill.style.left = "66.66%";
    } else if (
      sliderContainer.scrollLeft < 610 &&
      sliderContainer.scrollLeft > 244
    ) {
      sliderFill.style.left = "33.33%";
    } else {
      sliderFill.style.left = "0%";
    }
  }
};

const dragging = (e) => {
  if (!isDragStart) return;

  e.preventDefault();
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;

  sliderContainer.scrollLeft = prevScrollLeft - positionDiff;
  sliderFill.style.left = `${(sliderContainer.scrollLeft / 740) * 66.66}%`;
};

sliderContainer.addEventListener("mousedown", dragStart);
sliderContainer.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
document.addEventListener("touchmove", dragStart);

document.addEventListener("mouseup", dragStop);
document.addEventListener("touchend", dragStop);

sliderContainer.addEventListener("mousedown", (e) => {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  let position = 0;

  const updateSlider = () => {
    switch (position) {
      case 0:
        sliderFill.style.left = "0%";
        break;
      case 1:
        sliderFill.style.left = "33.33%";
        break;
      case 2:
        sliderFill.style.left = "66.66%";
        break;
    }
  };

  leftArrow.addEventListener("click", () => {
    if (position > 0) {
      position--;
      updateSlider();
    }

    //arrow color flip

    if (leftArrow.classList.contains("clicked")) return;
    leftArrow.classList.add("clicked");
    rightArrow.classList.remove("clicked");
  });

  rightArrow.addEventListener("click", () => {
    if (position < 2) {
      position++;
      updateSlider();
    }

    //arrow color flip
    if (rightArrow.classList.contains("clicked")) return;

    rightArrow.classList.add("clicked");
    leftArrow.classList.remove("clicked");
  });
});

// Awards
const leftArrow1 = document.querySelector(".left-arrow1");
const rightArrow1 = document.querySelector(".right-arrow1");
const arrows1 = document.querySelectorAll(".arrow1");
const firstAward = document.querySelectorAll(".award")[0];
const awardContainer = document.querySelector(".awards-container");

const sliderFill1 = document.querySelector(".slider-fill1");

arrows1.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    let firsAwardWidth = firstAward.clientWidth + 20;
    awardContainer.scrollLeft +=
      arrow.id == "left1" ? -firsAwardWidth : firsAwardWidth;
  });
});
