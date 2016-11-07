/* BACK END */

//Deck Constructor
function Deck () {
    this.cards = [];
}

//Card Contructor
function Card (suit, rank, cardValue) {
  //(string, string, int) -> object
  this.suit = suit;
  this.rank = rank;
  this.cardValue = cardValue;
  this.played = false;
}

//Create a new 52-card deck.
Deck.prototype.create = function () {
  var thisDeck = this;
  var ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
  var suits = ["Spades", "Clubs", "Hearts", "Diamonds"];
  for (i = 0; i < suits.length; i += 1) {
    for (j = 0; j < ranks.length; j += 1) {
      var value = 0;
      if (ranks[j] === "Jack" || ranks[j] === "Queen" || ranks[j] === "King") {
        value = 10;
      } else {
        value = i+1;
      }
      card = new Card(suits[i], ranks[j], value)
      thisDeck.cards.push(card);
    }
  }
};
