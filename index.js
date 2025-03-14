let deckId;
const button = document.getElementById("new-deck");
const draw = document.getElementById("draw-cards");
const cards = document.getElementById("cards");
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log(deckId)
    });
}

button.addEventListener("click", handleClick);
draw.addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      remainingText.textContent = `Remaining cards: ${data.remaining}`
      cards.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card"/>
      `;
      cards.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card"/>
      `;
      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      // console.log(winnerText);
      header.textContent = winnerText;
    });
});

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    return "Card 1 win";
  } else if (card1ValueIndex < card2ValueIndex) {
    return "Card 2 win";
  } else {
    return "It's a tie!";
  }
}
