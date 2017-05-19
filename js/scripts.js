
$(document).ready(function(){
	// console.log(freshDeck);

	const freshDeck = createDeck();
	var theDeck = freshDeck.slice();
	var playersHand = [];
	var dealersHand = [];
	var dealerWinCounter = 0;
	var playerWinCounter = 0;

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


		reset();
		//update the player and dealer's hand now that the deck is shuffled.
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		console.log(theDeck.length);
		placeCard('player', 1, playersHand[0]);
		$('#first').html('<img src="cards/deck.png">')
		// placeCard('dealer', 1, dealersHand[0]);
		placeCard('player', 2, playersHand[1]);
		placeCard('dealer', 2, dealersHand[1]);



		calculateTotal(playersHand, 'player');
		$('.dealer-total').html("?????");

		



	});

	$('.hit-button').click(function(){

		if(calculateTotal(playersHand, 'player') < 21){
			playersHand.push(theDeck.shift()); //This covers 1 & 2
			var lastCardIndex = playersHand.length - 1;
			var slotForNewCard = playersHand.length;
			placeCard('player',slotForNewCard,playersHand[lastCardIndex]); //3
			calculateTotal(playersHand, 'player'); //4
		}
		// console.log("player clicked hit")
		// playersHand.push(theDeck.shift());
		// placeCard('player', playersHand.length, playersHand[playersHand.length - 1])
		// calculateTotal(playersHand, 'player');
		 
	});

	$('.stand-button').click(function(){
		console.log("player clicked on stand")
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		// console.log(dealerTotal);
		
		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift());
			placeCard('dealer', dealersHand.length, dealersHand[dealersHand.length - 1])
			dealerTotal = calculateTotal(dealersHand, 'dealer');

		}

		placeCard('dealer', 1, dealersHand[0]);
		checkWin();

		$('.hit-button').click(function(){
			$(this).attr("disabled", true);
		});
	});
	
	///////////////////////////////////////////////////
	//////////////UTILITY FUNCTIONS////////////////////
	///////////////////////////////////////////////////


	
	function reset(){
		// 1. Reset the deck.
		theDeck = freshDeck.slice();
		shuffleDeck();
		// 2. Reset the player and dealer hand arrays
		playersHand = [];
		dealersHand = [];
		// 3. Reset the cards in the DOM
		$('.card').html('');
		$('.dealer-total-number').html('0')
		$('.player-total-number').html('0')
		$('.message').text('');
		


	}
	
	function checkWin(){
		var playerTotal = calculateTotal(playersHand, 'player');
		var dealerTotal = calculateTotal(dealersHand, 'dealer'); 
		var winner = '';
		if(playerTotal > 21){
			winner = "You have busted!";
			dealerWinCounter++;
		}else if(dealerTotal > 21){
			winner = "Dealer has busted!";
			playerWinCounter++;
		}else if ((playerTotal == 21) && (playersHand.length == 2)){
			winner = "Player BlackJack!";
			playerWinCounter++;
		}else if ((dealerTotal == 21) && (dealersHand.length  == 2)){
			winner = "Dealer BlackJack";
			dealerWinCounter++;
		}else{

			if(playerTotal > dealerTotal){
				winner = "You beat the dealer!";
				playerWinCounter++;
			}else if(playerTotal < dealerTotal){
				winner = "The dealer got you!";
				dealerWinCounter++;
			}else{
				winner = "It's a push!"
			}

		}
		$('.message').html(winner);
		$('.dealer-wins-total').html("Dealer wins: " + dealerWinCounter);
		$('.player-wins-total').html("Player wins: " + playerWinCounter);


		
	}
	

	function calculateTotal(hand,who){
		// console.log(hand);
		var handValue = 0;
		var thisCardValue = 0;
		var hasAce = false;
		var howManyAces = 0;
		// loop through hand array, grab the number in the element and add it together
		for (let i = 0; i < hand.length; i++){
			thisCardValue = Number(hand[i].slice(0,-1));
			if(thisCardValue > 10){
				thisCardValue = 10;
			}else if(thisCardValue == 1){
				hasAce = true;
				howManyAces++;
				thisCardValue = 11;
			}
			handValue += thisCardValue
		}

		for (let i = 0; i < howManyAces; i++){
			if(handValue > 21){
				handValue -= 10
			}
		}

		console.log(handValue)
		var classSelector = '.' + who + '-total';
		$(classSelector).html(handValue);
		return handValue;
		
	}


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