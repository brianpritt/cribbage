/* BACK END */

//Game Constructor
function Game () {
  this.players = [];
  this.deck;
  this.currentPlayer;
  this.dealerCrib;
}

//Create and shuffle a new deck, create player objects with automatically assigned names eg. "player1"
Game.prototype.newGame = function(numberOfPlayers) {
  this.deck = new Deck();
  this.deck.create();
  this.deck.shuffleDeck();

  for (var i = 0; i<numberOfPlayers; i=i+1){
    var player = new Player("player" + (i +1));
    this.players.push(player);
  }
  this.currentPlayer = this.players[0];
}

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
//Player Constructor
function Player (userName){
  this.userName = userName;
  this.score = 0;
  this.hand = [];
}

//Deck Methods

Deck.prototype.shuffleDeck = function(){
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
  return this.cards;
};

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
        value = j+1;
      }
      card = new Card(suits[i], ranks[j], value)
      thisDeck.cards.push(card);
    }
  }

};

Deck.prototype.deal = function(players) {

  for(i=0; i<players.length; i++){
    for(j=0; j<=5; j++){
      var card = this.cards.pop();
      player[i].hand.push(card);
    }
  }
};
