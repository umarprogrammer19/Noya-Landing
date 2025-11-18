/* ---------------- SAFE CAROUSEL FOR BOTH PAGES ---------------- */

// Detect all carousel DOM elements safely
const carouselContainer = document.querySelector(".carousel-container");
const cardsTrack = document.querySelector(".cards-track");
const profilesTrack = document.querySelector(".profiles-track");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Run only if BOTH tracks exist (English page) 
// OR skip silently if missing (Arabic page)
if (cardsTrack && profilesTrack) {

  const originalCards = Array.from(cardsTrack.children);
  const originalProfiles = Array.from(profilesTrack.children);

  /* -------- Duplicate Cards -------- */
  const cardClonesStart = originalCards.map(c => c.cloneNode(true));
  const cardClonesEnd = originalCards.map(c => c.cloneNode(true));
  cardClonesStart.forEach(clone => cardsTrack.prepend(clone));
  cardClonesEnd.forEach(clone => cardsTrack.appendChild(clone));

  /* -------- Duplicate Profiles -------- */
  const profileClonesStart = originalProfiles.map(p => p.cloneNode(true));
  const profileClonesEnd = originalProfiles.map(p => p.cloneNode(true));
  profileClonesStart.forEach(clone => profilesTrack.prepend(clone));
  profileClonesEnd.forEach(clone => profilesTrack.appendChild(clone));

  /* -------- Calculate Steps -------- */
  let cardsItemWidth = originalCards[0].offsetWidth;
  let cardsGap = parseFloat(getComputedStyle(cardsTrack).gap) || 0;
  let cardsStep = cardsItemWidth + cardsGap;
  let cardsLoopLength = originalCards.length * cardsStep;
  let cardsPos = -cardsLoopLength;

  cardsTrack.style.transform = `translateX(${cardsPos}px)`;

  let profilesItemWidth = originalProfiles[0].offsetWidth;
  let profilesGap = parseFloat(getComputedStyle(profilesTrack).gap) || 0;
  let profilesStep = profilesItemWidth + profilesGap;
  let profilesLoopLength = originalProfiles.length * profilesStep;
  let profilesPos = -profilesLoopLength;

  profilesTrack.style.transform = `translateX(${profilesPos}px)`;

  /* -------- Infinite Loop Fix -------- */
  const handleCardsTransitionEnd = () => {
    cardsTrack.style.transition = "none";
    if (cardsPos <= -2 * cardsLoopLength) cardsPos += cardsLoopLength;
    else if (cardsPos >= 0) cardsPos -= cardsLoopLength;

    cardsTrack.style.transform = `translateX(${cardsPos}px)`;
    setTimeout(() => (cardsTrack.style.transition = "transform 0.5s ease"));
  };

  const handleProfilesTransitionEnd = () => {
    profilesTrack.style.transition = "none";
    if (profilesPos <= -2 * profilesLoopLength) profilesPos += profilesLoopLength;
    else if (profilesPos >= 0) profilesPos -= profilesLoopLength;

    profilesTrack.style.transform = `translateX(${profilesPos}px)`;
    setTimeout(() => (profilesTrack.style.transition = "transform 0.5s ease"));
  };

  cardsTrack.addEventListener("transitionend", handleCardsTransitionEnd);
  profilesTrack.addEventListener("transitionend", handleProfilesTransitionEnd);

  /* -------- Buttons -------- */
  const nextSlide = () => {
    cardsPos -= cardsStep;
    profilesPos -= profilesStep;
    cardsTrack.style.transform = `translateX(${cardsPos}px)`;
    profilesTrack.style.transform = `translateX(${profilesPos}px)`;
  };

  const prevSlide = () => {
    cardsPos += cardsStep;
    profilesPos += profilesStep;
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
    cardsLoopLength = originalCards.length * cardsStep;

    cardsPos = -cardsLoopLength;
    cardsTrack.style.transition = "none";
    cardsTrack.style.transform = `translateX(${cardsPos}px)`;

    profilesItemWidth = document.querySelector(".profile-img").offsetWidth;
    profilesGap = parseFloat(getComputedStyle(profilesTrack).gap) || 0;
    profilesStep = profilesItemWidth + profilesGap;
    profilesLoopLength = originalProfiles.length * profilesStep;

    profilesPos = -profilesLoopLength;
    profilesTrack.style.transition = "none";
    profilesTrack.style.transform = `translateX(${profilesPos}px)`;
  });
}

// ----------------------
// DR-CARD CAROUSEL FIXED
// ----------------------

// Auto-detect carousel (supports both English & Arabic pages)
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

  // Detect first card inside carousel
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

    // Next button
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

    // Prev button
    if (drPrev) {
      drPrev.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
        }
        updateDrCarousel();
      });
    }

    // Responsive recalculation
    window.addEventListener("resize", updateDrCarousel);
  }
}



/* ---------------------------------------------------------------
   ALL OTHER JS BELOW THIS LINE IS UNTOUCHED (your scroll, toggle, etc)
---------------------------------------------------------------- */
