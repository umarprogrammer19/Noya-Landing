/* --------------- SIMPLE CAROUSEL FOR BOTH PAGES (NO CLONING, NO LOOP) ---------------- */

// Detect all carousel DOM elements safely
const carouselContainer = document.querySelector(".carousel-container");
const cardsTrack = document.querySelector(".cards-track");
const profilesTrack = document.querySelector(".profiles-track");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Run only if BOTH tracks exist (English page)
if (cardsTrack && profilesTrack) {

  const originalCards = Array.from(cardsTrack.children);
  const originalProfiles = Array.from(profilesTrack.children);

  /* -------- Calculate Steps -------- */
  let cardsItemWidth = originalCards[0].offsetWidth;
  let cardsGap = parseFloat(getComputedStyle(cardsTrack).gap) || 0;
  let cardsStep = cardsItemWidth + cardsGap;
  let cardsPos = 0;

  let profilesItemWidth = originalProfiles[0].offsetWidth;
  let profilesGap = parseFloat(getComputedStyle(profilesTrack).gap) || 0;
  let profilesStep = profilesItemWidth + profilesGap;
  let profilesPos = 0;

  /* --------- Buttons --------- */
  const nextSlide = () => {
    const maxCardsPos = -(cardsTrack.scrollWidth - cardsTrack.clientWidth);
    const maxProfilesPos = -(profilesTrack.scrollWidth - profilesTrack.clientWidth);

    if (cardsPos > maxCardsPos) cardsPos -= cardsStep;
    if (profilesPos > maxProfilesPos) profilesPos -= profilesStep;

    cardsTrack.style.transform = `translateX(${cardsPos}px)`;
    profilesTrack.style.transform = `translateX(${profilesPos}px)`;
  };

  const prevSlide = () => {
    if (cardsPos < 0) cardsPos += cardsStep;
    if (profilesPos < 0) profilesPos += profilesStep;

    cardsTrack.style.transform = `translateX(${cardsPos}px)`;
    profilesTrack.style.transform = `translateX(${profilesPos}px)`;
  };

  if (prevButton) prevButton.addEventListener("click", prevSlide);
  if (nextButton) nextButton.addEventListener("click", nextSlide);

  /* -------- Resize Handler -------- */
  window.addEventListener("resize", () => {
    cardsItemWidth = document.querySelector(".card").offsetWidth;
    cardsGap = parseFloat(getComputedStyle(cardsTrack).gap) || 0;
    cardsStep = cardsItemWidth + cardsGap;

    profilesItemWidth = document.querySelector(".profile-img").offsetWidth;
    profilesGap = parseFloat(getComputedStyle(profilesTrack).gap) || 0;
    profilesStep = profilesItemWidth + profilesGap;

    cardsTrack.style.transform = `translateX(${cardsPos}px)`;
    profilesTrack.style.transform = `translateX(${profilesPos}px)`;
  });
}

/* ----------------------
   DR-CARD CAROUSEL (UNTOUCHED)
---------------------- */

const drCarousel =
  document.getElementById("carousel-2") ||
  document.querySelector(".carousel-2") ||
  null;

if (drCarousel) {
  const drPrev =
    document.getElementById("prev") ||
    drCarousel.parentElement.querySelector(".prev") ||
    null;

  const drNext =
    document.getElementById("next") ||
    drCarousel.parentElement.querySelector(".next") ||
    null;

  const drCard =
    drCarousel.querySelector(".dr-card") ||
    drCarousel.children[0] ||
    null;

  if (drCard) {
    let currentIndex = 0;

    function updateDrCarousel() {
      const style = getComputedStyle(drCard);
      const cardWidth =
        drCard.offsetWidth + parseInt(style.marginRight) + 20;

      drCarousel.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }

    if (drNext) {
      drNext.addEventListener("click", () => {
        const visibleCards = Math.floor(
          drCarousel.offsetWidth / drCard.offsetWidth
        );
        const maxIndex = drCarousel.children.length - visibleCards;

        if (currentIndex < maxIndex) {
          currentIndex++;
        }

        updateDrCarousel();
      });
    }

    if (drPrev) {
      drPrev.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
        }
        updateDrCarousel();
      });
    }

    window.addEventListener("resize", updateDrCarousel);
  }
}

/* ---------------------------------------------------------------
   ALL OTHER JS BELOW THIS LINE IS UNTOUCHED
---------------------------------------------------------------- */
