
function Deck () {
    this.cards = [];
}
function Card (suit, rank, cardValue) {
  this.suit = suit;
  this.rank = rank;
  this.cardValue = cardValue;
  this.played = false;

}
