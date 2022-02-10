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

    up: (squares, coordinates) => {
            console.log('moving up...');
            for(let i = 1; i < (coordinates.targetRow - coordinates.activeRow); i++){
                let thisRow = boardUtil.rows[coordinates.rowIndex +i];
                let thisCol = boardUtil.columns[coordinates.activeColIndex];
                //get the coordinates of i square.
                if(squares.currentBoard[thisCol][thisRow]) return false;
            }
         return true;
    },

    down: (squares, coordinates) => {
            console.log('moving down...');
            for(let i = 1; i < Math.abs(coordinates.targetRow - coordinates.activeRow); i++){
                let thisRow = boardUtil.rows[coordinates.rowIndex -i];
                let thisCol = boardUtil.columns[coordinates.activeColIndex];
                //get the coordinates of i square.
                console.log('current square = ', squares.currentBoard[thisCol][thisRow]);
                if(squares.currentBoard[thisCol][thisRow]) return false;
            }
            return true;
    },

    left: (squares, coordinates) => {
            console.log('moving right...');
            for(let i = 1; i < Math.abs(coordinates.targetColIndex - coordinates.activeColIndex); i++){
                let thisRow = boardUtil.rows[coordinates.rowIndex];
                let thisCol = boardUtil.columns[coordinates.activeColIndex -i];
                //get the coordinates of i square.
                if(squares.currentBoard[thisCol][thisRow]) return false;
            }
            return true;
    },

    right: (board, coordinates) => {
            console.log('moving right...');
            for(let i = 1; i < (coordinates.targetColIndex - coordinates.activeColIndex); i++){
                let thisRow = boardUtil.rows[coordinates.rowIndex];
                let thisCol = boardUtil.columns[coordinates.activeColIndex +i];
                //get the coordinates of i square.
                if(board[thisCol][thisRow]) return false;
            }
            return true;
    },

    rightAndUp: (board, coordinates) => {
        for(let i = 1; i < (coordinates.targetColIndex - coordinates.activeColIndex); i++){
                     let thisRow = parseInt(boardUtil.rows[coordinates.rowIndex +i]);
                     let thisCol = boardUtil.columns[coordinates.activeColIndex +i];
                     if(board[thisCol][thisRow]) return false;
                 }
        return true;
    },

    rightAndDown: (board, coordinates) => {
        for(let i = 1; i < (coordinates.targetColIndex - coordinates.activeColIndex); i++){
                    let thisRow = board.rows[coordinates.rowIndex-i];
                    let thisCol = board.columns[coordinates.activeColIndex -i];
                    //get the coordinates of i square.
                    if(board.currentBoard[thisCol][thisRow]) return false;
                }
        return true;
    },

    leftAndUp: (board, coordinates) => {
        for(let i = 1; i < Math.abs(coordinates.targetColIndex - coordinates.activeColIndex); i++){
                    let thisRow = parseInt(board.rows[coordinates.rowIndex +i]);
                    let thisCol = board.columns[coordinates.activeColIndex -i];
                    //get the coordinates of i square.
                    if(board[thisCol][thisRow]) return false;
                }
        return true;
    },

    leftAndDown: (board, coordinates) => {
        for(let i = 1; i < (coordinates.targetColIndex - coordinates.activeColIndex); i++){
                    let thisRow = board.rows[coordinates.rowIndex-i];
                    let thisCol = board.columns[coordinates.activeColIndex +i];
                    //get the coordinates of i square.
                    if(board[thisCol][thisRow]) return false;
                }
        return true;
    },

    checkForObstacles: (board, squares) => {
        let coordinates = {

            targetColIndex: boardUtil.columns.indexOf(squares.target.coordinates.column),
             activeColIndex: boardUtil.columns.indexOf(squares.active.coordinates.column),
    
             targetRow: squares.target.coordinates.row,
             activeRow: squares.active.coordinates.row,
             rowIndex: boardUtil.rows.indexOf(squares.active.coordinates.row),
        }
        //up
        if(movement.slope(squares) === Infinity){
            return movement.up(squares, coordinates);
        }
        //down
        else if(movement.slope(squares) === -Infinity){
            return movement.down(squares, coordinates);
        }
        //left
       else if(coordinates.targetColIndex - coordinates.activeColIndex < 0){
             return movement.left(squares, coordinates);
        }
        //right
       else if(coordinates.targetColIndex - coordinates.activeColIndex > 0){
             return movement.right(squares, coordinates);
        }
        else if(movement.slope(squares) === 1){
            //right and up
            if(movement.targetRow - movement.activeRow > 0) return movement.rightAndUp(board, coordinates);
            //left and down
            else return movement.leftAndDown(board, coordinates);
        }
        else if (movement.slope(squares) === -1){
            // left and up
            if(movement.targetRow - movement.activeRow > 0) return movement.leftAndUp(board, coordinates);
            //right and down
            else return movement.rightAndDown(board, coordinates);
        }
    },
    K: (board, squares, hasMoved) => {
       if(squares.target.piece.substring(1,2) === 'R' &&
        squares.active.piece[0] === squares.target.piece[0] 
       ){
           if(hasMoved[squares.target.piece] || hasMoved[squares.active.piece])return false;
           else return movement.checkForObstacles(board, squares);
       }
       else return (
            Math.abs(squares.target.coordinates.column - squares.active.coordinates.column) <= 1
            && Math.abs(squares.target.coordinates.row - squares.active.coordinates.row) <= 1
                );
    },

    Q: (board, squares) => {
        return ( movement.B(board, squares) || movement.R(board, squares) );
    },

    B: (board, squares) => {
        if (Math.abs( movement.slope(squares) ) !== 1 ) return false;
        return movement.checkForObstacles(board);
    },

    N: (squares) => {
        console.log('checking N rules... slope = ', movement.slope(squares));
        return (Math.abs( movement.slope(squares) ) === 2 
                || Math.abs( movement.slope(squares) ) === 1/2);
    },
    
    R: (board, squares) => {
        console.log('slope = ', Math.abs(movement.slope(squares)));
        if (
            Math.abs(movement.slope(squares) ) !== 0 
            && Math.abs( movement.slope(squares) ) !== Infinity
            )
            return false;
            //if we didn't move at all, get out.
        if( squares.active.coordinates.column === squares.target.coordinates.column && squares.active.coordinates.row === squares.target.coordinates.row) return false;
        
        return movement.checkForObstacles(board, squares);
    },

    P: (squares) => {
        if(squares.target.piece !== null) {
           if(squares.active.piece.substring(0,1) === 'W') {
               return( 
                squares.target.coordinates.row === squares.active.coordinates.row+1 
                && Math.abs(squares.target.coordinates.column - squares.active.coordinates.column) === 1
                );
               }
            else {
                return( 
                squares.target.coordinates.row === squares.active.coordinates.row-1 
                && Math.abs(squares.target.coordinates.column - squares.active.coordinates.column) === 1
                );

            }
        } 
        else if(squares.active.square === squares.active.startSquare) {
            console.log('plus 2 is allowed...');
            if(squares.active.piece.substring(0,1) === 'W') {
               console.log('checking rules for white...')
               console.log(squares.target.coordinates.row, squares.active.coordinates.row+2);
               return( 
                   (
                    squares.target.coordinates.row === squares.active.coordinates.row+1
                    ||
                    squares.target.coordinates.row === squares.active.coordinates.row+2
                    ) 
                    && squares.target.coordinates.column === squares.active.coordinates.column
                   );
           }
           else {
                return( 
                   (
                    squares.target.coordinates.row === squares.active.coordinates.row-1
                    ||
                    squares.target.coordinates.row === squares.active.coordinates.row-2
                    ) 
                    && squares.target.coordinates.column === squares.active.coordinates.column
                   );
           }

        }
        else {
           if(squares.active.piece.substring(0,1) === 'W') {
               return( 
                   squares.target.coordinates.row === squares.active.coordinates.row+1 
                   && squares.target.coordinates.column === squares.active.coordinates.column
                   );
           }
           else {
               return( 
                   squares.target.coordinates.row === squares.active.coordinates.row-1 
                   && squares.target.coordinates.column === squares.active.coordinates.column
                   );
           }
        };
    },

}