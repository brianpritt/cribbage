/* BACK END */

//Game Constructor
function Game () {
  this.players = [];
  this.crib = [];
  this.deck;
  this.currentPlayer;
  this.dealerCrib;
  this.table = [];
  this.tableScore = 0;
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

//Game Methods

//Create and shuffle a new deck, create player objects with automatically assigned names eg. "player1"
Game.prototype.newGame = function(numberOfPlayers) {
  this.deck = new Deck();
  this.deck.create();
  this.deck.shuffleDeck();

  for (var i = 0; i<numberOfPlayers; i=i+1){
    var player = new Player("player" + (i +1));
    this.players.push(player);
  }
  this.deck.deal(this.players);
  this.currentPlayer = this.players[0];
}

//Move cards from players hand to game.crib
Game.prototype.toCrib = function(card){
  for (i = 0; i <this.currentPlayer.hand.length; i++){
    if ((this.currentPlayer.hand[i] === card) && (card.played === false)){
      this.crib.push(this.currentPlayer.hand[i])
      this.currentPlayer.hand.splice(i,1);
    }
  }
}

Game.prototype.toTable = function(card){
  for (i = 0; i <this.currentPlayer.hand.length; i++){
    if ((this.currentPlayer.hand[i] === card) && (card.played === false)){
      if(this.tableScore + card.cardValue <= 31){
        this.table.push(this.currentPlayer.hand[i])
        card.played = true;
        this.tableScore += card.cardValue;
      } else{
        alert("GO");
      }
    }
  }
}
Game.prototype.switchPlayer = function(){
  // // if(this.currentPlayer.userName === this.players[0].userName){
  // //   this.currentPlayer = this.players[1];
  // // } else{
  // //   this.currentPlayer = this.players[0];
  // // }
  // for (i = 0; i < this.players.length; i++){
  //   if (this.currentPlayer.userName === this.players[i].userName)
  //   {
  //     var value = i+1;
  //     this.currentPlayer = this.players[value];
  //   }
  //   // } else {
  //   //   this.currentPlayer = this.players[0]
  //   // }
  // }
};
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
      players[i].hand.push(card);
    }
  }
};

Deck.prototype.turnOver = function(){
  var topCard = this.cards[0];
  return topCard;
}


////UI Logic below here

Player.prototype.displayHand = function() {
  var target = this;
  for (var i=0; i<target.hand.length; i++) {
    $("#"+target.userName+"card"+i).append("<img class='card' src=img/"+target.hand[i].rank + target.hand[i].suit + ".png>");
  }
}
Player.prototype.cribCheckbox = function() {
  var target = this;
  for (var i=0; i<target.hand.length; i++) {
    $("#"+target.userName+"card"+i).append("<input name="+target.userName+" type='checkbox' value='"+i+"'></input>");
  }
  $("#"+target.userName).append("<button class='btn btn-primary btn-xs discard"+ target.userName +"'>Discard to Crib</button>");

  $(".discard"+target.userName).last().click(function(){
    debugger;
    $("input:checkbox[name="+target.userName+"]:checked").each(function(){
      debugger;
      var box = this;
      var card = parseInt($(box).val());
      game.toCrib(target.hand[card]);
    })
  });
}


var game = new Game();
$(document).ready(function(){

  $("#startGame").click(function(){
    // event.preventDefault();

    $("#gameStart").hide();
    $("#gameField").show();


    game.newGame(2);
    game.players[0].displayHand();
    game.players[0].cribCheckbox();
    game.currentPlayer=game.players[1];
    game.players[1].displayHand();
    game.players[1].cribCheckbox();
    debugger;
  });

// $(".discard").click(function(){
//   $("input:checkbox[name=player1]:checked").each(function(){
//     var card = this.val();
//     game.toCrib(game.players[0].hand[card]);
//   })
// });


});
