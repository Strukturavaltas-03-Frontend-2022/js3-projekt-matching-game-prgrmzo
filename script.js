"use strict";

const section = document.querySelector("section");

const getData = () => [
  { cardSrc: "./assets/svgs/bulbasaur.svg", name: "bulbasaur" },
  { cardSrc: "./assets/svgs/charmander.svg", name: "charmander" },
  { cardSrc: "./assets/svgs/eevee.svg", name: "eevee" },
  { cardSrc: "./assets/svgs/pikachu.svg", name: "pikachu" },
  { cardSrc: "./assets/svgs/squirtle.svg", name: "squirtle" },
  { cardSrc: "./assets/svgs/bulbasaur.svg", name: "bulbasaur" },
  { cardSrc: "./assets/svgs/charmander.svg", name: "charmander" },
  { cardSrc: "./assets/svgs/eevee.svg", name: "eevee" },
  { cardSrc: "./assets/svgs/pikachu.svg", name: "pikachu" },
  { cardSrc: "./assets/svgs/squirtle.svg", name: "squirtle" },
];

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

randomize();

let generateEventListener;

(generateEventListener = () => {
  section.addEventListener(
    "click",
    () => {
      timer();
    },
    { once: true }
  );
})();

const cardGenerator = () => {
  const cardData = randomize();

  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = item.cardSrc;
    card.setAttribute("name", item.name);

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      matchChecker(e);
    });
  });
};

const matchChecker = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
    }
  }
  if (toggleCard.length === 10) {
    clearInterval(interval);
    setTimeout(() => restart(), 5000);
  }
};

const restart = () => {
  secs = 0;
  timeCounter.innerHTML = "00:00";
  generateEventListener();

  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");

  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.cardSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 500);
  });
};

cardGenerator();

// Timer

let secs = 0;
let mins = 0;
let interval;

const timeCounter = document.querySelector(".time");

const timer = () => {
  interval = setInterval(() => {
    secs++;

    if (secs < 10) {
      secs = `0${secs}`;
    } else if (secs > 59) {
      secs = 0;
      mins++;

      if (mins < 10) {
        mins = `0${mins}`;
      }
    }

    timeCounter.innerHTML = `0${mins}:${secs}`;
  }, 1000);
};
