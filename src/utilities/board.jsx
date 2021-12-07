
export const board = {
    rows : [1,2,3,4,5,6,7,8],
    columns : ['A','B','C','D','E','F','G','H'],
    pieces: ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],

    placePieces : (gameState, coordinates) => {
        let thisPiece = gameState.currentBoard[coordinates.column][coordinates.row];
        if(thisPiece === null) return;
            return (
                <div id={`${thisPiece}`}>
                        {`${thisPiece}`}
                </div>
               );
    },

    movePiece : (newState) => {
        let newBoard = newState.currentBoard;
        newBoard[newState.active.coordinates.column][newState.active.coordinates.row] = null;
        newBoard[newState.target.coordinates.column][newState.target.coordinates.row] = newState.active.piece;

        return {
            ...newState,
            canMove: false,
            currentBoard: newBoard,
        }
    },

    setCoordinates : (square) => {
        if(!square) return;
        let column = square.substring(0,1);
        let row = parseInt(square.substring(1));
        return {column: column, row: row};
    },
    
    checkSquare : (data, gameState) => {
        console.log('checking square...', 'class =', data.class);
        if (data.class === 'square' && gameState.active.piece) {
            return {
                ...gameState, 
                target: {
                    piece: null,
                    square: data.square,
                    coordinates: board.setCoordinates(data.square),
                },
            };
        }
        return gameState;
    },
    checkChosenSquare : (data, gameState) => {
        console.log('checking color... color =', data.color);
        let newState = board.checkSquare(data, gameState);
        if(data.class === 'square') return newState;

        else if(data.color === gameState.currentPlayer) {
            console.log('setting active...');
            return {
                ...newState,
                active: {
                piece: data.piece,
                square: data.square,
                startSquare: data.startSquare,
                coordinates: board.setCoordinates(data.square),
                }, 
                target : {
                piece: null,
                square: null,
                coordinates: null,
                },
            };
        }
        else {
            if(!newState.active.piece) return newState;
            console.log('setting target...');
            return {
                ...newState,
                target: {
                piece: data.piece,
                square: data.square,
                startSquare: data.startSquare,
                coordinates: board.setCoordinates(data.square),
                },
            };
        }
    },
    
    getData : async (e) => {
        console.log('updating...', e);
        if(e.target.className === 'square') {
            return {
                class: e.target.className,
                piece: null,
                square: e.target.id,
            }
        }
        else return {
            color: e.target.id.substring(0,1),
            piece: e.target.id,
            square: e.target.parentElement.id,
            startSquare: e.target.id.substring(2),
        };
    },
    
}