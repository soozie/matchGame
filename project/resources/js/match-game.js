var MatchGame = {};


/**
 * Returns a random integer between min (inclusive) and max (inclusive)

}
 * Using Math.round() will give you a non-uniform distribution!
 -- */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var cardValues = MatchGame.generateCardValues();

  MatchGame.renderCards(cardValues, $('#game'));
});
/*
  Generates and returns an array of matching card values.

 */



MatchGame.generateCardValues = function () {
  var unplacedInOrderCardValues = [];
  var randomlyOrderedCardValues = [];

  for (var i = 1; i <= 8; i++) {
    unplacedInOrderCardValues.push(i, i);
  }

  while (unplacedInOrderCardValues.length > 0) {
    var randomIndex = getRandomInt(0, unplacedInOrderCardValues.length - 1);
    randomlyOrderedCardValues.push(unplacedInOrderCardValues[randomIndex]);
    unplacedInOrderCardValues.splice(randomIndex, 1);
  }

  return randomlyOrderedCardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/


MatchGame.renderCards = function(cardValues, $game) {
  var flippedCards = [];
  $game.data('flipped-cards', flippedCards);

  var cardColors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'
  ];

  $game.empty();

  var i = 0;
  for (var j = 0; j < cardValues.length; j++) {
    i++;
    var objCard = $('<div class="col-xs-3 card"></div>');
    objCard.data('cardValue', cardValues[j]);
    objCard.data('flipped', false);
    if (i > 7) {
      i = 0;
    }
    objCard.data('color', cardColors[cardValues[j] - 1]);

    objCard.on('click', function() {
      MatchGame.flipCard($(this), $game);
    });

    $('#game').append(objCard);
  }
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data().flipped === 'true') {
    return;
  }

  $card.css('background-color', $card.data().color);
  $card.data('flipped', true);
  $card.data('found', false);
  $card.text($card.data().cardValue);

  var flippedCards = $game.data('flipped-cards');
  flippedCards.push($card.data());

  $game.data('flipped-cards', flippedCards);

  if (flippedCards.length === 2) {
    if (flippedCards[0].cardValue !== flippedCards[1].cardValue) {
      setTimeout(function(){
        Array.from($('.card')).forEach(function(card) {
          if (!$(card).data().found === true) {
            $('.card').css('background-color', 'rgb(32, 64, 86)');
            $(card).data('found', false);
            $('.card').text('');
          }
        });
        $game.data('flipped-cards', []);
      }, 1000);
    } else {
      Array.from($('.card')).forEach(function(card) {
        if ($(card).data().cardValue === $card.data().cardValue) {
          $(card).data('found', true);
          $(card).css('background-color', 'rgb(153, 153, 153)');
          $(card).css('color', 'rgb(204, 204, 204)');
          $game.data('flipped-cards', []);
        }
      });
    }
  }
};
