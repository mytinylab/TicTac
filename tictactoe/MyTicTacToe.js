function isItWinner(boardTiles, tileValue, theWinner, winnerValue) {
	if (boardTiles[0].value == tileValue){
		// top row
		if ((boardTiles[0].value == boardTiles[1].value) && (boardTiles[0].value == boardTiles[2].value)){
			theWinner = winnerValue; 
		}
		// top left to lower right diagonal
		if ((boardTiles[0].value == boardTiles[4].value) && (boardTiles[0].value == boardTiles[8].value)){
			theWinner = winnerValue; 
		}
		// left column
		if ((boardTiles[0].value == boardTiles[3].value) && (boardTiles[0].value == boardTiles[6].value)){
			theWinner = winnerValue; 
		}
	}
	else if (boardTiles[1].value == tileValue){
		// middle column
		if ((boardTiles[1].value == boardTiles[4].value)&&(boardTiles[1].value == boardTiles[7].value)){
			theWinner = winnerValue; 
		}		
	}
	else if (boardTiles[2].value == tileValue){
		// right column
		if ((boardTiles[2].value == boardTiles[5].value) && (boardTiles[2].value == boardTiles[8].value)){
			theWinner = winnerValue; 
		}
		if ((boardTiles[2].value == boardTiles[4].value) && (boardTiles[2].value == boardTiles[6].value)){
			theWinner = winnerValue; 
		}
	}
	else if (boardTiles[3].value == tileValue){
		// middle row
		if ((boardTiles[3].value == boardTiles[4].value)&&(boardTiles[3].value == boardTiles[5].value)){
			theWinner = winnerValue; 
		}	
	}
	else if (boardTiles[6].value == tileValue){
		// bottom row
		if ((boardTiles[6].value == boardTiles[7].value)&&(boardTiles[7].value == boardTiles[8].value)){
			theWinner = winnerValue; 
		}	
	}
	
	if (theWinner == winnerValue){
		return 1;
	}
	else{
		return 0;
	}
}
function doTicTacToe(inTile) {
	var theWinner = 0;	// nobody = 0, player = 1, ai = 2
	
	// -------------------------------------------------------------------
	// PLAYER'S TURN
	// display player's move
	var boardTile = document.getElementById('q'+inTile);
	if (boardTile.value != "0"){boardTile.value="X";}

	var boardTiles = new Array();
	for (i=0;i<9;i++){
		boardTiles[i] = document.getElementById('q'+i);
	}
	if (theWinner == 0){		
		// check to see if player won
		// checking top row and left column is enough to cover all ways of winning because winner will have to be 
		// in one of those squares
		tileValue = "X";
		winnerValue = 1;

		theWinner = isItWinner(boardTiles, tileValue, winnerValue);
		if (theWinner == winnerValue){alert("You won");}
	}

	
	// -------------------------------------------------------------------
	// COMPUTER'S TURN
	if (theWinner == 0){
		// computer moves
		// computer moves if there is an empty space
		for (i=0;i<9;i++){
			// see if there are any empty tiles
			if (boardTiles[i].value == '-') {
				aiMove = true;
			}
		}
		while (aiMove){
			randomQuad = Math.floor(Math.random()*9);
			if (boardTiles[randomQuad].value == "-"){
				boardTiles[randomQuad].value = "0";
				aiMove = false;
			}
		}
	
		// check to see if computer won
		tileValue = "0";
		winnerValue = 2;
		
		theWinner = isItWinner(boardTiles, tileValue, winnerValue);
		if (theWinner == winnerValue){alert("Computer won");}
	}

	// -------------------------------------------------------------------
	// RESET BOARD
	if (theWinner == 0) {
		movesLeft = false;
		for (i=0;i<9;i++){
			// see if there are any empty tiles
			if (boardTiles[i].value == '-') {
				movesLeft = true;
			}
		}
		if (movesLeft == false){
			alert("It's a tie");
			for (i=0;i<9;i++){
				boardTiles[i].value = "-";
			}		
		}
	}

	// clear board
	if (theWinner != 0){
		theWinner = 0;
		for (i=0;i<9;i++){
			boardTiles[i].value = "-";
		}		
	}
	
}