var MatchGame = {};
var arrayCards = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8]];

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  var randomCards = arrayCards.sort(function(a, b){return 0.5 - Math.random()});
  console.log(randomCards);
  randomCards.forEach(function(card, index) {
    console.log(card, index);
  });
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {

  return arrayCards;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
