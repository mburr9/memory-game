/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 var cardsArray = ['fa-diamond',
                    'fa-paper-plane-o',
                    'fa-anchor',
                    'fa-bolt',
                    'fa-cube',
                    'fa-bicycle',
                    'fa-leaf',
                    'fa-bomb',
                    ];
var doubledCardsArray = cardsArray.concat(cardsArray);
var sec = 0;
var min = 0;

var start = setInterval (timer, 1000); //starts a game clock
/**
* @description Shuffles the cards in the cards array and builds the deck of cards
*/
function startGame() {
  shuffle(doubledCardsArray);
  var newCardArray = doubledCardsArray.map(function(card) {
    return makeNewCard(card);
    });
  newCardArray.forEach(function(card) {
    $('.deck').append(card);
       })
}

startGame();

/**
* @description Creates the HTML for a new card that will be inserted into the newCardArray
* @param {string} card - The name of a card in the cardsArray
* @returns  {string} The HTML for a card
*/
function makeNewCard(card) {
  return `<li class=\"card\"><i class=\"fa ${card}\"></i></li>`;
};

/**
* @description Adds the HTML for the timer to display on the page
*/
function timer() {
  $(".seconds").html(addZero(sec<59 ? ++sec : sec = 0));
  $(".minutes").html(addZero(parseInt(sec === 59 ? min++ : min)));
  };

/**
* @description Stops the timer running on the page
*/
function stopTimer() {
  clearInterval (start);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
* @description Adds a "0" in front of a number if the number is 9 or less
* @param {number} num
* @returns {number} num or the string "0" followed by num
*/
function addZero ( num ) {
  if (num > 9) {
    return num;
  } else {
    return "0" + num;
  }
};

$('.restart').click(function() { //event listener for user clicking on restart button that will run the restart function if clicked
  restart();
});


var allCards = $('.card');
var openCards = [];
var moves = 0;
allCards.each(function() { // goes through each card with the class .card
  $(this).click(function() { // event listener for user clicking on card
    if (!$(this).hasClass('open') && !$(this).hasClass('show') && !$(this).hasClass('match') && openCards.length != 2) { // checks that card clicked on was not already open
      openCardsArray($(this)); // puts card in openCards array
      flipCard($(this)); // flips the card to show symbol
      if (openCards.length == 2) { // checks if two consecutive cards were clicked
        moveCounter(); // increases move counter by 1
        stars(moves); // checks to see if stars should be taken off page
        setTimeout(function() {
          if (openCards[0].html() !== openCards[1].html()) { // checks if two cards clicked match
            hideCards(openCards[0],openCards[1]); // flips cards back over if they don't match
          } else {
            lockCards(openCards[0],openCards[1]); // locks cards if they do match
            if ($('.deck').find('.match').length === 16) { // checks if all cards have been matched
              endGame(); // pop up announcing the end of the game
            };
          };
        }, 1200);
      }
    }
  });
});
/**
* @description Takes a string and puts it into an array
* @param {string} card
*/
function openCardsArray(card) {
  openCards.push(card);
}

/**
* @description Adds the classes open and show to a particular element
* @param {string} card - The element to add the classes to
*/
function flipCard(card) {
  card.toggleClass('open show');
}

/**
* @description Removes the classes open and show to two particular elements and empties the openCards array
* @param {string} card1 - The first element to remove classes from
* @param {string} card2 - The second element to remove classes from
*/
function hideCards(card1, card2) {
  card1.toggleClass('open show');
  card2.toggleClass('open show');
  openCards = [];
}

/**
* @description Removes the classes open and show and adds the class match to a particular element and empties the openCards array
* @param {string} card1 - The first element to remove classes from and add a class to
* @param {string} card2 - The second element to remove classes from and add a class to
*/
function lockCards(card1, card2) {
  card1.toggleClass('open show match');
  card2.toggleClass('open show match');
  openCards = [];
}

/**
* @description Changes the HTML of the class moves to reflect the current move count
*/
function moveCounter() {
  $(".moves").html(moves += 1);
}

/**
* @description checks the move count and removes the class fa-star from a particular element if the move count is a particular number
* @param {number} moves - The number of moves made in the game
*/
function stars(moves) {
  if (moves === 14 || moves === 17) {
    $('.fa-star').last().toggleClass('fa-star');
  }
};

/**
* @description Reloads the page
*/
function restart() {
  location.reload();
};

/**
* @description Stops the timer. Initiates a popup with game stat information that asks if user wants to play again. Reloads page if user clicks ok.
*/
function endGame() {
  stopTimer();
  var starRating = $('.fa-star').length;
  if (confirm("You won!\n" + "Star Rating = " + starRating + "\nTime " + addZero(min) + ":" + addZero(sec) + "\nClick OK to play again")) {
    location.reload();
  }
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
