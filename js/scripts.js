
function Deck () {
    this.cards = [];
}
function Card (suit, rank, cardValue) {
  this.suit = suit;
  this.rank = rank;
  this.cardValue = cardValue;
  this.played = false;

}

Deck.prototype.shuffleDeck(){
  //This is the Fisher-Yates shuffle
  var m = this.cards.length, t, i;
  //while there are cards still to be shuffled
  while(m) {
    //takes a random element
    i = Math.floor(Math.random() * m--);
    //swap it with the current element
    t = this.cards[m];
    this.cards[m] = this.cards[i];
    this.cards[i] = t;
  }
  //return the shuffled deck.
  return this.cards
};
