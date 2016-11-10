# Cribbage

#### Two-player game of cribbage with manual scoring.

#### By **Brad Copenhaver, Erik Killops, Daniel Munger, and Brian Pritt** {November 2016}

## Description

This program deals a game of cribbage for two players. Players must "peg" their points manually. Multiple hands can be played until players decide to end the game.

Official rules of cribbage available here: http://www.bicyclecards.com/how-to-play/cribbage/

### Specifications
_This program will..._
* Create a standard deck of 52 cards.
 * Input: createDeck();
 * Output: [Ace of Spades, 2 of Spades, ...]

* Deal a hand of cards to a player.
 * Input: deal();
 * Output: Player.hand = [card1, card2, ...]

* Display cards in hand to each player.
 * Input: displayHand(player1.hand);
 * Output: Hand displayed.

* Move selected cards from a player's hand to a crib.
 * Input: toCrib(card1, card2);
 * Output: Crib = [card1, card2]

* Play selected card to table from player's hand.
 * Input: playToTable(card1);
 * Output: table[card1], card displayed on table

* Display current score of all cards played on table.
 * Input: table[card1, card2]
 * Output: Current table score: 12

* Keep track of two different players
 * Input: player1, player2
 * Output: player1{hand, score}, player2{hand, score}

* Alternate turns between players
 * Input: player1 plays
 * Output: player2 plays

* Reset table when table score is 31 or neither player can play
 * Input: Current table score = 31
 * Output: Current table score = 0, remove cards from table display

* Display player hands and crib for scoring round
 * Input: No valid plays left
 * Output: All cards return to hands and are visible


### Possible future version features

Automatic scoring algorithm.

## Setup/Installation Requirements

Source code available at https://github.com/bradcopenhaver/cribbage

Program can be accessed from a web browser at https://bradcopenhaver.github.io/cribbage/index.html

## Known Bugs

Table sometimes clears when it shouldn't when Go is pressed.

Players can discard more than 2 cards to the crib at start of round.

Players can press Go even when they have a valid play.

## Support and contact details

If you have questions or comments, contact one of the authors:
* Brad Copenhaver: bradcopenhaver@gmail.com
* Erik Killops: erik.killops@gmail.com
* Daniel Munger: mungerda@gmail.com
* Brian Pritt: brianpritt@gmail.com

## Technologies Used

* jquery
* Bootstrap
* javascript
* html/css

### License

This project is licensed under the MIT license.

Copyright (c) 2016 **Brad Copenhaver, Erik Killops, Daniel Munger, and Brian Pritt**

Card images: http://klimov.software/playing-cards-french-52-card-deck-vector-file-png-files/
