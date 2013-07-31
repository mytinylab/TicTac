/*
TIC-TAC-TOE that learns

Each grid square can have 3 values (empty, X, 0). So, a ternary number system will be used to come up with all possible board configurations. 
Q2 | Q1 | Q0
___|____|____
Q5 | Q4 | Q3
___|____|____
Q8 | Q7 | Q6

Where Q0 = 0 to 2
      Q1 = 3^1=3    to (3^1 * 2) + Q0
      Q2 = 3^2=9    to (3^2 * 2) + Q1 + Q0
      Q3 = 3^3=27   to (3^3 * 2) + Q2 + Q1 + Q0
      Q4 = 3^4=81   to (3^4 * 2) + Q3 + Q2 + Q1 + Q0
      Q5 = 3^5=243  to (3^5 * 2) + Q4 + Q3 + Q2 + Q1 + Q0
      Q6 = 3^6=729  to (3^6 * 2) + Q5 + Q4 + Q3 + Q2 + Q1 + Q0
      Q7 = 3^7=2187 to (3^7 * 2) + Q6 + Q5 + Q4 + Q3 + Q2 + Q1 + Q0
      Q8 = 3^8=6561 to (3^8 * 2) + Q7 + Q6 + Q5 + Q4 + Q3 + Q2 + Q1 + Q0

so, if empty = 0, X = 1 and O = 2 the board configuration
 X |    |  
___|____|____
   |    |  
___|____|____
   |    | O

is like
 1 | 0  | 0 
___|____|____
 0 | 0  | 0
___|____|____
 0 | 0  | 2
 

or represented in ternary as 0 0 2 0 0 0 1 0 0
or in decimal as 1467 ==> 0 + 0 + 729*2 + 0 + 0 + 0 + 9 + 0 + 0 = (729 * 2) + 9 = 1458 + 9 = 1467

Board[#] will have a probability for each of the empty spaces. If the AI loses, the probability of that empty square to be chosen again is reduced and if the AI wins the probability of chosing that empty space is increased.
Each time the AI wins, the quadrant that selected the last board configuration gets 3 more beads
Each time the AI ties, the quadrant that selected the last board configuration gets 1 bead
Each time the AI loses, all the quadrants that lead to the board configurations played by the AI lose a bead 
*/
var totalBoardConfig = 19683;	// 19682 + no pieces on the board

// ConvertTrinatyToDecimal
// map the board configuration (3 values per square) into a decimal
// This gives each board configuration a unique number
function ConvertTernaryToDecimal(inT0, inT1, inT2, inT3, inT4, inT5, inT6, inT7, inT8) {
	var retVal = 0;
	
	retVal = inT0;
	retVal = retVal + 3*inT1;
	retVal = retVal + 3*3*inT2;
	retVal = retVal + 3*3*3*inT3;
	retVal = retVal + 3*3*3*3*inT4;
	retVal = retVal + 3*3*3*3*3*inT5;
	retVal = retVal + 3*3*3*3*3*3*inT6;
	retVal = retVal + 3*3*3*3*3*3*3*inT7;
	retVal = retVal + 3*3*3*3*3*3*3*3*inT8;

	return retVal;
}

//ConvertDecimalToTernary
function ConvertDecimalToTernary(inDecimal, outT0, outT1, outT2, outT3, outT4, outT5, outT6, outT7, outT8) {
	var retVal = 0;
	var divResult = 0;
	var divRemainder = 0;
	var index = 0;

	outT0 = 0;
	outT1 = 0;
	outT2 = 0;
	outT3 = 0;
	outT4 = 0;
	outT5 = 0;
	outT6 = 0;
	outT7 = 0;
	outT8 = 0;

	do{
		divResult = Math.round((inDecimal / 3) - 0.5);	// truncate 
		divRemainder = inDecimal % 3;

		document.write("divRemainder = " + divRemainder + "<br/>");
		
		inDecimal = divResult;
		index++;
		switch(index){
			case 0: outT0 = divRemainder; break;
			case 1: outT1 = divRemainder; break;
			case 2: outT2 = divRemainder; break;
			case 3: outT3 = divRemainder; break;
			case 4: outT4 = divRemainder; break;
			case 5: outT5 = divRemainder; break;
			case 6: outT6 = divRemainder; break;
			case 7: outT7 = divRemainder; break;
			case 8: outT8 = divRemainder; break;
		}
	}while (divResult >= 3);
	document.write("divResult = " + divResult + "<br/>");
		
	return retVal;
}

/* board configurations 
 * The index already has the information of what piece is in which quadrant for that board configuration
 * The board configuration stores the probability of choosing the next possible board configuration
 * all possible board configurations are considered even impossible ones (e.g. the whole board has X)
 */
function BoardConfig(inP0, inP1, inP2, inP3, inP4, inP5, inP6, inP7, inP8){
	this.p0 = inP0;	// probability for choosing this piece
	this.p1 = inP1;
	this.p2 = inP2;
	this.p3 = inP3;
	this.p4 = inP4;
	this.p5 = inP5;
	this.p6 = inP6;
	this.p7 = inP7;
	this.p8 = inP8;
}
arBoardConfig = new Array();
for (var i=0; i < totalBoardConfig; i++){
	var p0 = 3;
	var p1 = 3;
	var p2 = 3;
	var p3 = 3;
	var p4 = 3;
	var p5 = 3;
	var p6 = 3;
	var p7 = 3;
	var p8 = 3;

	arBoardConfig[i] = new BoardConfig(p0,p1,p2,p3,p4,p5,p6,p7,p8);
}

/* Choose a Bead
 * 
 */
function ChooseABead(inBoardIndex){
	var retValue=0;
	
	var totalBeads = 0;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p0;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p1;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p2;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p3;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p4;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p5;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p6;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p7;
	totalBeads = totalBeads + arBoardConfig[inBoardIndex].p8;
	
	// Get a random number
	var randNum = 0;
	randNum = Math.floor(Math.random()*totalBeads) + 1;

	// Get the bead for that random number
	totalBeads = 0;
	if (randNum <= arBoardConfig[inBoardIndex].p0){
		retValue = 0;		
	}
	else if (randNum <= (arBoardConfig[inBoardIndex].p0 + arBoardConfig[inBoardIndex].p1)){
		retValue = 1;
	}
	else if (randNum <= (arBoardConfig[inBoardIndex].p0 + arBoardConfig[inBoardIndex].p1 +arBoardConfig[inBoardIndex].p2)){
		retValue = 2;
	}
	else if (randNum <= (arBoardConfig[inBoardIndex].p0 + arBoardConfig[inBoardIndex].p1 + arBoardConfig[inBoardIndex].p2 + arBoardConfig[inBoardIndex].p3 )){
		retValue = 3;
	}
	else if (randNum <= (arBoardConfig[inBoardIndex].p0 + arBoardConfig[inBoardIndex].p1 + arBoardConfig[inBoardIndex].p2 + arBoardConfig[inBoardIndex].p3 + arBoardConfig[inBoardIndex].p4)){
		retValue = 4;
	}
	else if (randNum <= (arBoardConfig[inBoardIndex].p0 + arBoardConfig[inBoardIndex].p1 + arBoardConfig[inBoardIndex].p2 + arBoardConfig[inBoardIndex].p3 +arBoardConfig[inBoardIndex].p4 + arBoardConfig[inBoardIndex].p5)){
		retValue = 5;
	}
	else if (randNum <= (arBoardConfig[inBoardIndex].p0 + arBoardConfig[inBoardIndex].p1 + arBoardConfig[inBoardIndex].p2 + arBoardConfig[inBoardIndex].p3 + arBoardConfig[inBoardIndex].p4 +arBoardConfig[inBoardIndex].p5 + arBoardConfig[inBoardIndex].p6)){
		retValue = 6;
	}
	else if (randNum <= (arBoardConfig[inBoardIndex].p0 + arBoardConfig[inBoardIndex].p1 + arBoardConfig[inBoardIndex].p2 + arBoardConfig[inBoardIndex].p3 + arBoardConfig[inBoardIndex].p4 + arBoardConfig[inBoardIndex].p5 + arBoardConfig[inBoardIndex].p6 + arBoardConfig[inBoardIndex].p7)){
		retValue = 7;
	}
	else if (randNum <= (arBoardConfig[inBoardIndex].p0 + arBoardConfig[inBoardIndex].p1 + arBoardConfig[inBoardIndex].p2 + arBoardConfig[inBoardIndex].p3 + arBoardConfig[inBoardIndex].p4 + arBoardConfig[inBoardIndex].p5 + arBoardConfig[inBoardIndex].p6 + arBoardConfig[inBoardIndex].p7 + arBoardConfig[inBoardIndex].p8)){
		retValue = 8;
	}

	return retValue;
}


/* keep a record of the game */
function GameHistory(inIndex, inQ, inPiece ){
	this.index;		// board configuration index
	this.q;			// quadrant played
	this.piece;		// piece placed on that quadrant (0=empty, 1=X, 2=O)
}
arGameHistory = new Array();
arGameHistory = new GameHistory(0,0,0);	// starts with the empty board


function whoWon(inBoardIndex) {
	var retVal;
	
	
}

var aQuad = new Array();
for (var index=0;index<9;index++){
	aQuad[index] = 0;
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
		tileValue = "X";
		winnerValue = 1;
		if (boardTiles[0].value == tileValue){
			if ((boardTiles[0].value == boardTiles[1].value) && (boardTiles[0].value == boardTiles[2].value)){
				theWinner = winnerValue; 
			}
			if ((boardTiles[0].value == boardTiles[4].value) && (boardTiles[0].value == boardTiles[8].value)){
				theWinner = winnerValue; 
			}
			if ((boardTiles[0].value == boardTiles[3].value) && (boardTiles[0].value == boardTiles[6].value)){
				theWinner = winnerValue; 
			}
		}
		else if (boardTiles[1].value == tileValue){
			if ((boardTiles[1].value == boardTiles[4].value)&&(boardTiles[1].value == boardTiles[7].value)){
				theWinner = winnerValue; 
			}		
		}
		else if (boardTiles[2].value == tileValue){
			if ((boardTiles[2].value == boardTiles[5].value) && (boardTiles[2].value == boardTiles[8].value)){
				theWinner = winnerValue; 
			}
			if ((boardTiles[2].value == boardTiles[4].value) && (boardTiles[2].value == boardTiles[6].value)){
				theWinner = winnerValue; 
			}
		}
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
		if (boardTiles[0].value == tileValue){
			if ((boardTiles[0].value == boardTiles[1].value) && (boardTiles[0].value == boardTiles[2].value)){
				theWinner = winnerValue; 
			}
			if ((boardTiles[0].value == boardTiles[4].value) && (boardTiles[0].value == boardTiles[8].value)){
				theWinner = winnerValue; 
			}
			if ((boardTiles[0].value == boardTiles[3].value) && (boardTiles[0].value == boardTiles[6].value)){
				theWinner = winnerValue; 
			}
		}
		else if (boardTiles[1].value == tileValue){
			if ((boardTiles[1].value == boardTiles[4].value)&&(boardTiles[1].value == boardTiles[7].value)){
				theWinner = winnerValue; 
			}		
		}
		else if (boardTiles[2].value == tileValue){
			if ((boardTiles[2].value == boardTiles[5].value) && (boardTiles[2].value == boardTiles[8].value)){
				theWinner = winnerValue; 
			}
			if ((boardTiles[2].value == boardTiles[4].value) && (boardTiles[2].value == boardTiles[6].value)){
				theWinner = winnerValue; 
			}
		}
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



// make a move
// if someone won, then fix the probabilities of board configurations

function test(){
	var retVal;
	
	// ternary to decimal
	document.write("Ternary to Decimal<br/>");	
	// what was played
	var pieceOn0=2;
	var pieceOn1=1;
	var pieceOn2=2;
	var pieceOn3=0;
	var pieceOn4=2;
	var pieceOn5=0;
	var pieceOn6=0;
	var pieceOn7=0;
	var pieceOn8=0;
	
	retVal = ConvertDecimalToTernary(26, pieceOn0,pieceOn1,pieceOn2,pieceOn3,pieceOn4,pieceOn5,pieceOn6,pieceOn7,pieceOn8);
	retVal = ConvertTernaryToDecimal(pieceOn0,pieceOn1,pieceOn2,pieceOn3,pieceOn4,pieceOn5,pieceOn6,pieceOn7,pieceOn8);
		
	document.write("<div style='font-family:courier;'>");
	document.write(retVal);
	document.write("<br/>");
	document.write("END ternary to decimal");
	document.write("<br/>");


//	document.write(arBoardConfig[1].p0);
//	document.write("<br/>");

	document.write("<br/>");
	document.write("---<br/>");
	document.write("---<br/>");
	document.write("---<br/>");
	
	document.write("</div>");	
}