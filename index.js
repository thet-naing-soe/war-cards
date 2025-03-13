let deckId;
const button = document.getElementById("new-deck");
function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log(deckId);
    });
}

button.addEventListener("click", handleClick);
