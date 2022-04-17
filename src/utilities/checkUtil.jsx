import { movement } from './movement';
import { boardUtil } from './boardUtil';

/*
In this file, I want to sort out the best way to whether or not a given king is in check.

I need to ask if, after a move has been selected, is the currentPlayer's king in check?
Any time the current player makes a move, they must satisfy the check test. This is the only logic I need.

What if I run opposite tests?
Ergo, run the Knight movement logic as a test, from the King, to see if any opposing Knights are on those squares?

Then, do the same for opposing bishops, rooks, Queens, and Pawns?

This feels slow. It would work, though.
*/

//Let's run a findFirstPiece, using a slope of our choice, from the King's position.
//To do this, I need to create a temporary "squares" variable, that I can then manipulate to produce each slope.

export const checkUtil = {
	 rookChecks: (board, {kingRow, kingColIndex, kingCol, boardColLength}) => {
		let foundPieces = {};
		//Rook left/right
		for (
			let i = 1;
			kingColIndex - i >= 0 || kingColIndex + i <= boardColLength;
			i++
			) {
				let downColIndex = kingColIndex - i;
				let downCol = boardUtil.columns[downColIndex];
				
				let upColIndex = kingColIndex + i;
				let upCol = boardUtil.columns[upColIndex];

				if (upCol <= 7){
					if (board[upCol][kingRow] && !foundPieces['right'])
					foundPieces['right'] = board[upCol][kingRow];
				}
				if(downCol >= 0){
					if (board[downCol][kingRow] && !foundPieces['left'])
					foundPieces['left'] = board[downCol][kingRow];
				}
			}
			
			//Rook up/down
			for (let i = 1; kingRow - i >= 1 || kingRow + i <= 8; i++) {
				let downRow = kingRow - i;
				let upRow = kingRow + i;
				
				if(kingRow + i <= 7){
					if (board[kingCol][kingRow + i] && !foundPieces['up'])
					foundPieces['up'] = board[kingCol][kingRow + i];
				}
				if(kingRow - i >= 0 ){
					if (board[kingCol][kingRow - i] && !foundPieces['down'])
					foundPieces['down'] = board[kingCol][kingRow - i];
				}
			}
			return foundPieces;
		},
		
		
		 knightChecks: (board, {kingRow, kingColIndex, kingCol, boardColLength}) => {
			let foundPieces = {};
			let kingColRightTwo =
			boardUtil.columns[
				kingColIndex + 2 <= boardColLength ? kingColIndex + 2 : boardColLength
			];
			let kingColRightOne =
			boardUtil.columns[
				kingColIndex + 1 <= boardColLength ? kingColIndex + 1 : boardColLength
			];
			let kingColLeftOne =
			boardUtil.columns[kingColIndex - 1 <= 0 ? kingColIndex - 1 : 0];
			let kingColLeftTwo =
			boardUtil.columns[kingColIndex - 2 <= 0 ? kingColIndex - 2 : 0];
			
			if (board[kingColRightTwo][kingRow + 1])
			foundPieces['rightTwoUpOne'] = board[kingColRightTwo][kingRow + 1];
			
			if (board[kingColRightTwo][kingRow - 1])
			foundPieces['rightTwoDownOne'] = board[kingColRightTwo][kingRow - 1];
			
			if (board[kingColRightOne][kingRow + 2])
			foundPieces['rightOneUpTwo'] = board[kingColRightOne][kingRow + 2];
			
			if (board[kingColRightOne][kingRow - 2])
			foundPieces['rightOneDownTwo'] = board[kingColRightOne][kingRow - 2];
			
			if (board[kingColLeftTwo][kingRow + 1])
			foundPieces['leftTwoUpOne'] = board[kingColLeftTwo][kingRow + 1];
			
			if (board[kingColLeftTwo][kingRow - 1])
			foundPieces['leftTwoDownOne'] = board[kingColRightTwo][kingRow + 1];
			
			if (board[kingColLeftOne][kingRow + 2])
			foundPieces['leftOneUpTwo'] = board[kingColLeftOne][kingRow + 2];
			
			if (board[kingColLeftOne][kingRow - 2])
			foundPieces['LeftOneDownTwo'] = board[kingColLeftOne][kingRow - 2];
			
			return foundPieces;
		},
		
		 bishopChecks: (board, {kingRow, kingColIndex, kingCol, boardColLength}) => {
			let foundPieces = {};
			for (
				let i = 1;
				(kingRow + i <= 8 && kingColIndex + i <= boardColLength) ||
				(kingRow - i >= 1 && kingColIndex - i >= 0) ||
				(kingRow + i <= 8 && kingColIndex - i >= 0) ||
				(kingRow - i >= 1 && kingColIndex + i >= boardColLength);
				i++
				) {
					
					let downColIndex = kingColIndex - i;
					let downCol = boardUtil.columns[downColIndex];
					
					let upColIndex = kingColIndex + i;
					let upCol = boardUtil.columns[upColIndex];
					
					//slope = 1

					if(upColIndex <= boardColLength && kingRow + i <= 8) {
						if (board[upCol][kingRow + i] && !foundPieces['upAndRight'])
						foundPieces['upAndRight'] = board[upCol][kingRow + i];
					}

					if(downColIndex >= 0 && kingRow - i >= 0){
						if (board[downCol][kingRow - i] && !foundPieces['downAndLeft'])
						foundPieces['downAndLeft'] = board[downCol][kingRow - i];
					}
					
					//slope = -1
					if (upCol <= boardColLength && kingRow - i >= 0){
						if (board[upCol][kingRow - i] && !foundPieces['upAndleft'])
						foundPieces['upAndLeft'] = board[upCol][kingRow - i];
					}

					if (downCol >= 0 && kingRow + i <= 8){
						if (board[downCol][kingRow + i] && !foundPieces['downAndRight'])
						foundPieces['downAndRight'] = board[downCol][kingRow + i];
					}
				}
				return foundPieces;
			},
			
			 inCheck: (board, squares, player) => {
				const king = player.color === 'B' ? 'blackKing' : 'whiteKing';
				console.log('kings: ', squares);
				
				let kingData = {
					kingRow: squares.kings[`${king}Coordinates`].row,
					kingCol: squares.kings[`${king}Coordinates`].column,
					kingColIndex: boardUtil.columns.indexOf(squares.kings[`${king}Coordinates`].column),
					boardColLength: (boardUtil.columns.length - 1)
				}
				
				let foundPieces = {};
				
				foundPieces = {...foundPieces, ...checkUtil.rookChecks(board, kingData)};
				
				//bishop
				foundPieces = {...foundPieces, ...checkUtil.bishopChecks(board, kingData)};
				
				//knight
				foundPieces = {...foundPieces, ...checkUtil.knightChecks(board,kingData)};
				/*
				check for Knights
				*/
				
				return foundPieces.length ? foundPieces : false;
			}
		}