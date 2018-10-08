# Memory Game Project

## Table of Contents

* [Dependencies](#dependencies)
* [Game Description](#gamedescription)
* [How to Play](#howtoplay)
* [Winning the Game](#winningthegame)

## Dependencies

This game depends on Bootstrap and Google fonts links as well as jQuery script in the header of your HTML.

## Game Description

Players turn over cards to reveal a symbol. Players are attempting to turn over two cards with the same symbol. Each card turned over counts as one move and move count is kept at the top of the game board along with a game timer. Players start with a score of 3 stars but lose 1 star after making 14 moves and lose another star after making 17 moves. Ultimately players are hoping to match all cards with the same symbol.

## How to Play

Players click on cards to reveal their symbol. After two consecutive cards are clicked, the cards will turn purple and lock if the symbols match. If the symbols do not match the cards will turn back over and the player can click on two more cards. Players can reset the game at any time by clicking the reset button on the top of the game board.

## Winning the Game

The game ends when all cards matched. At this point there is a pop up congratulating the player for winning, displaying their start rating and time it took to complete the game, and asking if they'd like to play again. If player clicks ok the game will reload and if they click cancel they will be left with the completed winning game board.
