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
function Card (suit, rank, cardValue, cardImage) {
  //(string, string, int) -> object
  this.suit = suit;
  this.rank = rank;
  this.cardValue = cardValue;
  this.cardImage = cardImage;
  this.played = false;
}

//Player Constructor
function Player (userName){
  this.userName = userName;
  this.totalScore = 0;
  this.turnScore = 0;
  this.hand = [];
  this.goCount = 0;
}

//Game Methods

//Create and shuffle a new deck, create player objects with automatically assigned names eg. "player1"
Game.prototype.newGame = function(numberOfPlayers) {
  this.deck = new Deck();
  this.deck.create();
  this.deck.shuffleDeck();

  for (var i = 0; i < numberOfPlayers; i = i + 1){
    var player = new Player("player" + (i +1));
    this.players.push(player);
  }
  this.deck.deal(this.players);
  this.currentPlayer = this.players[0];
  this.dealerCrib = this.players[0];
}

Game.prototype.newRound = function () {
  //Create and shuffle new deck and reinitialize crib
  this.deck = new Deck();
  this.deck.create();
  this.deck.shuffleDeck();
  this.crib = [];

  //Empty players' hands
  this.players.forEach(function(player){
    player.hand = [];
    player.goCount = 0;
  });

  //Deal new hand
  this.deck.deal(this.players);

  //Switch dealer
  if (this.dealerCrib === this.players[0]){
    this.dealerCrib = this.players[1];
  } else {
    this.dealerCrib = this.players[0];
  }

  //Switch current so dealer plays first
  this.currentPlayer = this.dealerCrib;
  this.players.forEach(function(player){
    player.displayHand();

  })
  this.currentPlayer.cribCheckbox();
}




//Move cards from players hand to game.crib
Game.prototype.toCrib = function(card){
  for (i = this.currentPlayer.hand.length-1; i >=0; i--){
    if ((this.currentPlayer.hand[i] === card) && (card.played === false)){
      this.crib.push(this.currentPlayer.hand[i])
      this.currentPlayer.hand.splice(i,1);
    }
  }
}
//Takes value of card and adds it to running table score.
Game.prototype.toTable = function(card){
  //Finds card that is clicked on in players hand.
  for (i = 0; i <this.currentPlayer.hand.length; i++){
    //checks to see if the card has been played or not.
    if ((this.currentPlayer.hand[i] === card) && (card.played === false)){
      //checks score and allows play for card that doesn't exceed table score of 31.
      if(this.tableScore + card.cardValue < 31){
        this.table.push(this.currentPlayer.hand[i]);
        card.played = true;
        this.tableScore += card.cardValue;
        this.addToTableDisplay();
        this.currentPlayer.displayHand();
        this.switchPlayer();
      } else if(this.tableScore + card.cardValue === 31){
        card.played = true;
        this.tableScore += card.cardValue;
        this.addToTableDisplay();
        this.currentPlayer.displayHand();
        this.clearTable();
        alert(this.currentPlayer.userName + " got 31! One point for 31, one point for last card.");
        this.switchPlayer();
      } else{
        alert("This card is not playable");
      }
    }
  }
};
//Clears table Score
Game.prototype.clearTable = function(){
  this.tableScore = 0;
  this.clearTableUI();
}
Game.prototype.goPlayer = function(){
  //debugger
  this.currentPlayer.goCount +=1;
  game.switchPlayer();
  if ((this.players[0].goCount >= 1) && (this.players[1].goCount >= 1)){
    this.clearTable();
    this.players[0].goCount = 0;
    this.players[1].goCount = 0;
    //add scoring stuff here maybs//
  }
}
//Switches player when turn is over
Game.prototype.switchPlayer = function(){
  //checks for current player and switches to other player.
  if(this.currentPlayer.userName === this.players[0].userName){
    this.currentPlayer = this.players[1];
  } else{
    this.currentPlayer = this.players[0];
  }
  game.switchPlayerUI();

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

//Create a new 52-card deck of card objects with values and linked card images
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
      var cardImg = "img/"+ranks[j]+suits[i]+".png";
      card = new Card(suits[i], ranks[j], value, cardImg)
      thisDeck.cards.push(card);
    }
  }
};

//Deal 6 cards to each player
Deck.prototype.deal = function(players) {
  for(i = 0; i < players.length; i++){
    for(j = 0; j <= 5; j++){
      var card = this.cards.pop();
      players[i].hand.push(card);
    }
  }
};

//Return the first card in the deck
Deck.prototype.turnOver = function(){
  var topCard = this.cards[0];
  return topCard;
}


//////////////////* UI LOGIC *//////////////////
Game.prototype.roundOver = function(){

  var playedCount = 0;
  for(i = 0; i < this.players.length; i++){
    for(j = 0; j < this.players[i].hand.length; j++){
      if(this.players[i].hand[j].played === true)
      playedCount += 1;
    }
  }
  if (playedCount === 8){
    //show crib

    $("#cribDisplay").hide()
    $("#cribShow").show();
    for (var i =0; i < this.crib.length; i++){
      $("#cribShow").append("<img src="+this.crib[i].cardImage+">")
    }
    //show player cards
    for(i = 0; i < this.players.length; i++){
      for(j = 0; j < this.players[i].hand.length; j++){
        this.players[i].hand[j].played = false;
        console.log(this.players[i].hand[j].played);
      }
      this.players[i].displayHand();
    }
    this.clearTable();
    $("#player1, #player2").show();
    $("#player1Highlight, #player2Highlight").removeClass("highlightCurrent");
    $("#player1, #player2").children().removeClass("cards");

    $("#newGame").show();

  };
};

Game.prototype.addToTableDisplay = function() {
  var target = this;
  var lastCardIndex = target.table.length - 1;
  $("#table").append("<img src="+target.table[lastCardIndex].cardImage+">");
}

Game.prototype.switchPlayerUI = function(){
  //checks for current player and switches to other player.
  if(this.currentPlayer.userName === this.players[0].userName){
    $("#player2Highlight").removeClass("highlightCurrent");
    $("#player1Highlight").addClass("highlightCurrent");
  } else{
    $("#player1Highlight").removeClass("highlightCurrent");
    $("#player2Highlight").addClass("highlightCurrent");
  }
  $("#player1, #player2").hide();
}

Game.prototype.clearTableUI = function() {
  $("#table").empty();
}

Player.prototype.displayHand = function() {
  var target = this;

  //Clear card divs
  $("#"+target.userName+" div").each(function(){
    $(this).removeClass("stackVert");
    $(this).empty();
  });

  //Display each card in hand
  for (var i=0; i<target.hand.length; i++) {
    if (target.hand[i].played === false) {

      $("#"+target.userName+"card"+i).append("<img src="+target.hand[i].cardImage+">");
      $("#"+target.userName+"card"+i).addClass("stackVert");
    }
  }
}




Player.prototype.cribCheckbox = function() {
  var target = this;

  //Add a checkbox beside each card
  for (var i=0; i<target.hand.length; i++) {
    $("#"+target.userName+"card"+i).append("<input name="+target.userName+" type='checkbox' value='"+i+"'></input>");
  }
  //Add a button for discard
  $("#"+target.userName).append("<div><button class='btn btn-info btn-xs discard"+ target.userName +"'>Discard to Crib</button></div>");

  //Attach an event listener to discard button
  $(".discard"+target.userName).last().click(function(){
    $($("input:checkbox[name="+target.userName+"]:checked").get().reverse()).each(function(){

      var box = this;
      var card = parseInt($(box).val());
      game.toCrib(target.hand[card]);
      target.displayHand();
    })
      game.switchPlayer();
      if(game.crib.length < 4){
        game.currentPlayer.cribCheckbox();
      }
      if (game.crib.length === 4){
        $("#cribDisplay").show();
      }
  });
}


//Global Variable
var game = new Game();
//

$(document).ready(function(){

  $("#player1ShowHide").click(function(){
    $("#player1").toggle();
  });
  $("#player2ShowHide").click(function(){
    $("#player2").toggle();
  });

  $("#deck").click(function(){
    var turntCard = game.deck.turnOver();
    if (game.crib.length === 4) {
      $("#turnt").html("<img src="+turntCard.cardImage+">");
    }
  });

  $("#startGame").click(function(){
    $("#gameStart").hide();
    $("#gameField").show();

    game.newGame(2);
    game.players[0].displayHand();
    game.players[0].cribCheckbox();
    game.players[1].displayHand();

    $(".cards").click(function(){
      if(game.crib.length === 4){
        var selectedCard = parseInt($(this).attr("value"));
        var clickedCard = game.currentPlayer.hand[selectedCard];
        game.toTable(clickedCard);
        $("#tableScore").text("Current Table  Score: " + game.tableScore);
        game.roundOver();
      };
    });

    $(".goBtn").click(function(){
      game.goPlayer();
      $("#tableScore").text("Current Table Score: " + game.tableScore);
    });
  });

  $("#newGame").click(function(){
    game.clearTable();
    game.newRound();
    $("#player1, #player2").children().addClass("cards");
    $("#cribShow").hide();
    });
});
