import { boardUtil } from './boardUtil';
import { reducers } from './reducers';

export const movement = {
    slope: (squares) => {
        let targetColIndex = boardUtil.columns.indexOf(squares.target.coordinates.column);
        let activeColIndex = boardUtil.columns.indexOf(squares.active.coordinates.column);

        return (squares.target.coordinates.row - squares.active.coordinates.row)
            /
            (targetColIndex - activeColIndex);
    },

    up: (board, coordinates) => {
        console.log('moving up...');
        for (let i = 1; i < (coordinates.targetRow - coordinates.activeRow); i++) {
            let thisRow = boardUtil.rows[coordinates.rowIndex + i];
            let thisCol = boardUtil.columns[coordinates.activeColIndex];
            console.log('obstacle: ', board[thisCol][thisRow]);
            //get the coordinates of i square.
            if (board[thisCol][thisRow]) return board[thisCol][thisRow];
        }
        return false;
    },

    down: (board, coordinates) => {
        console.log('moving down...');
        for (let i = 1; i < Math.abs(coordinates.targetRow - coordinates.activeRow); i++) {
            let thisRow = boardUtil.rows[coordinates.rowIndex - i];
            let thisCol = boardUtil.columns[coordinates.activeColIndex];
            //get the coordinates of i square.
            console.log('current square = ', board[thisCol][thisRow]);
            if (board[thisCol][thisRow]) return board[thisCol][thisRow];
        }
        return false;
    },

    left: (board, coordinates) => {
        console.log('moving left...');
        for (let i = 1; i < Math.abs(coordinates.targetColIndex - coordinates.activeColIndex); i++) {
            let thisRow = boardUtil.rows[coordinates.rowIndex];
            let thisCol = boardUtil.columns[coordinates.activeColIndex - i];
            //get the coordinates of i square.
            if (board[thisCol][thisRow]) return board[thisCol][thisRow];
        }
        return false;
    },

    right: (board, coordinates) => {
        console.log('moving right...');
        for (let i = 1; i < (coordinates.targetColIndex - coordinates.activeColIndex); i++) {
            let thisRow = boardUtil.rows[coordinates.rowIndex];
            let thisCol = boardUtil.columns[coordinates.activeColIndex + i];
            //get the coordinates of i square.
            if (board[thisCol][thisRow]) return board[thisCol][thisRow];
        }
        return false;
    },

    rightAndUp: (board, coordinates) => {
        console.log('moving right and up...');

        for (let i = 1; i < (coordinates.targetColIndex - coordinates.activeColIndex); i++) {
            let thisRow = boardUtil.rows[coordinates.rowIndex + i];
            let thisCol = boardUtil.columns[coordinates.activeColIndex + i];
            if (board[thisCol][thisRow]) return board[thisCol][thisRow];

        }
        return false;
    },

    rightAndDown: (board, coordinates) => {
        console.log('moving right and down...');

        for (let i = 1; i < (coordinates.targetColIndex - coordinates.activeColIndex); i++) {
            let thisRow = boardUtil.rows[coordinates.rowIndex - i];
            let thisCol = boardUtil.columns[coordinates.activeColIndex - i];
            //get the coordinates of i square.
            if (board[thisCol][thisRow]) return board[thisCol][thisRow];

        }
        return false;
    },

    leftAndUp: (board, coordinates) => {
        console.log('moving left and up...');
        for (let i = 1; i < Math.abs(coordinates.targetColIndex - coordinates.activeColIndex); i++) {
            let thisRow = boardUtil.rows[coordinates.rowIndex + i];
            let thisCol = boardUtil.columns[coordinates.activeColIndex - i];
            //get the coordinates of i square.
            if (board[thisCol][thisRow]) return board[thisCol][thisRow];
        }
        return false;
    },

    leftAndDown: (board, coordinates) => {
        console.log('moving left and down...');

        for (let i = 1; i < (coordinates.targetColIndex - coordinates.activeColIndex); i++) {
            let thisRow = boardUtil.rows[coordinates.rowIndex - i];
            let thisCol = boardUtil.columns[coordinates.activeColIndex + i];
            //get the coordinates of i square.
            if (board[thisCol][thisRow]) return board[thisCol][thisRow];
        }
        return false;
    },

    //I could reverse how this works. If it finds an obstacle, it RETURNS the obstacle. If it finds nothing, it returns false. Then, when checking the output, I can expect false to clear a move, or examing the returned piece to determine whether or not the move is allowed.
    findFirstPiece: (board, squares) => {
        console.log('finding first piece...');
        let coordinates = {

            targetColIndex: boardUtil.columns.indexOf(squares.target.coordinates.column),
            activeColIndex: boardUtil.columns.indexOf(squares.active.coordinates.column),

            targetRow: squares.target.coordinates.row,
            activeRow: squares.active.coordinates.row,
            rowIndex: boardUtil.rows.indexOf(squares.active.coordinates.row),
        }

        //curently, the order in which these conditionals are tested matters. It might be an improvement if the order didn't matter.
        
        //up
        if (movement.slope(squares) === Infinity) {
            return movement.up(board, coordinates);
        }
        //down
        else if (movement.slope(squares) === -Infinity) {
            return movement.down(board, coordinates);
        }
        //left
        else if (movement.slope(squares) === 1) {
            //right and up
            if (coordinates.targetRow - coordinates.activeRow > 0) return movement.rightAndUp(board, coordinates);
            //left and down
            else return movement.leftAndDown(board, coordinates);
        }
        else if (movement.slope(squares) === -1) {
            // left and up
            if (coordinates.targetRow - coordinates.activeRow) return movement.leftAndUp(board, coordinates);
            //right and down
            else return movement.rightAndDown(board, coordinates);
        }
        else if (coordinates.targetColIndex - coordinates.activeColIndex < 0) {
            return movement.left(board, coordinates);
        }
        //right
        else if (coordinates.targetColIndex - coordinates.activeColIndex > 0) {
            return movement.right(board, coordinates);
        }
    },
    K: (board, squares, hasMoved) => {
        /* something is wrong with target.piece or active.piece, or both, in this function. Not sure where the problem is yet. Needs debugging. */

        //if there's a target -- I think here is where the problem lies. If squares.target comes back undefined, the program will freak out. 
        if(squares.target.piece ){
            console.log('we\'re looking at the target...')
            //if that target is a same Rook.
            if (squares.target.piece.substring(1, 2) === 'R' &&
                squares.active.piece[0] === squares.target.piece[0]
            ) {
                //if either piece has already moved.
                if (hasMoved[squares.target.piece] || hasMoved[squares.active.piece]) return true;
                //check for obstacles.
                else return movement.findFirstPiece(board, squares);
                //still need to reason out how to move the rook.
            }
        }
        else if (
            Math.abs(squares.target.coordinates.column - squares.active.coordinates.column) <= 1
            && Math.abs(squares.target.coordinates.row - squares.active.coordinates.row) <= 1
        ) return false;
        else return movement.slope(squares);
    },

    Q: (board, squares) => {
        switch (Math.abs(movement.slope(squares))) {
            case 1:
                return movement.B(board, squares);
            case Infinity: 
            return (movement.R(board, squares));

            case 0:
                return (movement.R(board, squares));
        
            default:
                return board[squares.target.coordinates.column][squares.target.coordinates.row];
        }
    },

    B: (board, squares) => {
        console.log('checking bishop');
        if (Math.abs(movement.slope(squares)) !== 1) return true;
        return movement.findFirstPiece(board, squares);
    },

    //currently, this only checks slope, not distance. Knights could make super jumps.
    N: (board, squares) => {
        console.log('checking N rules...');

        //if one is 2, the other MUST be 1.
        //Also, if all the conditions are correct, I need to return FALSE.
        if( Math.abs(squares.target.coordinates.row - squares.active.coordinates.row) === 2 
        && Math.abs(
            boardUtil.columns.indexOf(squares.target.coordinates.column) 
            - boardUtil.columns.indexOf(squares.active.coordinates.column) ) === 1 
         ) return false;

        else if ( Math.abs(squares.target.coordinates.row - squares.active.coordinates.row) === 1 
        && Math.abs(
            boardUtil.columns.indexOf(squares.target.coordinates.column) 
            - boardUtil.columns.indexOf(squares.active.coordinates.column) === 2 )
         ) return false;

        else return movement.slope(squares);
    },

    R: (board, squares) => {
        console.log( 'checking Rook...');
        if (
            Math.abs(movement.slope(squares)) !== 0
            && Math.abs(movement.slope(squares)) !== Infinity
        )
            return movement.slope(squares);
        //if we didn't move at all, get out.
        else if (squares.active.coordinates.column === squares.target.coordinates.column && squares.active.coordinates.row === squares.target.coordinates.row) return squares.active.piece;

        else return movement.findFirstPiece(board, squares);
    },

    checkPawnTarget: (squares) => {
        console.log('checking pawn target')
        if (squares.active.piece.substring(0, 1) === 'W') {
            if (
                squares.target.coordinates.row === squares.active.coordinates.row + 1
                && Math.abs(squares.target.coordinates.column - squares.active.coordinates.column) === 1
            ) return false;
            else return squares.active.piece;
        } 
        
        else {
            if (
                squares.target.coordinates.row === squares.active.coordinates.row - 1
                && Math.abs(squares.target.coordinates.column - squares.active.coordinates.column) === 1
            ) return false;
            else return squares.active.piece;
        }
    },

    checkPawnStartSquare: (squares) => {
        if (
            squares.active.square !== squares.active.startSquare 
            || squares.target.coordinates.column !== squares.active.coordinates.column
            ) return squares.active.piece;
        else return false;
    },

    checkStandardPawn: (squares) => {
        console.log('standard pawn');
        if (squares.active.piece.substring(0, 1) === 'W') {
            console.log( squares.active.piece);
                if (
                    squares.target.coordinates.row === squares.active.coordinates.row + 1
                    && squares.target.coordinates.column === squares.active.coordinates.column
                ) return false;
                else {
                    console.log('condition not met');
                    return squares.active.piece;
                }
            }
        else if (
            squares.target.coordinates.row === squares.active.coordinates.row - 1
            && squares.target.coordinates.column === squares.active.coordinates.column
            ) return false;
            else return squares.active.piece;
    },

    P: (board, squares) => {
        //if there's a target... this will be a callback.
        if(squares.target.piece) {
            console.log('checking target');
            return movement.checkPawnTarget(squares);
        }
        // if target is +-2
        if ( 
            Math.abs(squares.active.coordinates.row - squares.target.coordinates.row) === 2
            )  {
            console.log('checking start');
            console.log ( movement.checkPawnStartSquare(squares) );
              return movement.checkPawnStartSquare(squares);
            }

        //all other conditions
        else {
            console.log('checking standard');

          return  movement.checkStandardPawn(squares);
        }
    },

}