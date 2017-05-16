
$(document).ready(function(){
	// console.log(freshDeck);

	const freshDeck = createDeck();
	var theDeck = freshDeck;
	var playersHand = [];
	var dealersHand = [];

	function createDeck(){
		var newDeck = [];
		var suits = ['h', 's', 'd', 'c'];
		// loop for suits(outter loop)
		for(let s = 0; s < suits.length; s++){
			// loop for card values
			for(let c = 1; c <= 13; c++){
				newDeck.push(c + suits[s]);
			}
		}
		return newDeck;
	}

	$('.deal-button').click(function(){
		console.log("user clicked deal");
		theDeck = shuffleDeck();
		//update the player and dealer's hand now that the deck is shuffled.
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		console.log(theDeck.length);
		placeCard('player', 1, playersHand[0]);
		placeCard('dealer', 1, dealersHand[0]);
		placeCard('player', 2, playersHand[1]);
		placeCard('dealer', 2, dealersHand[1]);
	});

	function placeCard(who, where, cardToPlace){
		var classSelector = '.' + who + '-cards .card-' + where;
		// console.log(classSelector);
		$(classSelector).html('<img src="cards/' + cardToPlace + '.png">');

	}

	function shuffleDeck(){
		// Loop a big number of times.
		// Each time through, switch two elements in the array. When loop is done, array will be shuffled.
		for (let i = 0; i < 50000; i++){
			var randomcard1 = Math.floor(Math.random() * theDeck.length);
			var randomcard2 = Math.floor(Math.random() * theDeck.length);
			// switch theDeck[randomcard1] with theDeck[randomcard2]

			// console.log(theDeck[randomcard1]);
			// console.log(theDeck[randomcard2]);
			var temp = theDeck[randomcard1];
			theDeck[randomcard1] = theDeck[randomcard2];
			theDeck[randomcard2] = temp;

			
		}
		return theDeck;
	}

});