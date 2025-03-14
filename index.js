let deckId;
let myScore = 0;
let computerScore = 0;
const button = document.getElementById("new-deck");
const draw = document.getElementById("draw-cards");
const cards = document.getElementById("cards");
const header = document.getElementById("header");
const remainingText = document.getElementById("remaining");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");

async function handleClick() {
  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await res.json();
  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  deckId = data.deck_id;
}

button.addEventListener("click", handleClick);
draw.addEventListener("click", async () => {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  cards.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card"/>
      `;
  cards.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card"/>
      `;
  const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
  header.textContent = winnerText;

  if (data.remaining === 0) {
    draw.disabled = true;
    if (computerScore > myScore) {
      header.textContent = "The computer won the game!";
    } else if (computerScore < myScore) {
      header.textContent = "You won the game!";
    } else {
      header.textContent = "It's a tie game!";
    }
  }
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
    computerScore++;
    computerScoreEl.textContent = `Computer score: ${computerScore}`;
    return "Computer win!";
  } else if (card1ValueIndex < card2ValueIndex) {
    myScore++;
    myScoreEl.textContent = `My score: ${myScore}`;
    return "You win!";
  } else {
    return "War!";
  }
}
