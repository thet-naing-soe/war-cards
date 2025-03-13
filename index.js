let deckId;
const button = document.getElementById("new-deck");
const draw = document.getElementById("new-draw");
const cards = document.getElementById("cards");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
    });
}

button.addEventListener("click", handleClick);
draw.addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cards.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card"/>
      `;
      cards.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card"/>
      `;
    });
});
