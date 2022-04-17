
export const boardUtil = {
    rows : [1,2,3,4,5,6,7,8],
    columns : ['A','B','C','D','E','F','G','H'],
    pieces: ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],

    placePieces : (board, coordinates) => {
        let thisPiece = board[coordinates.column][coordinates.row];
        if(thisPiece === null) return;
            return (
                <div id={`${thisPiece}`}>
                        {`${thisPiece}`}
                </div>
               );
    },

    movePiece : (board, squares) => {
        if(squares.active.coordinates.column === squares.target.coordinates.column){

            return { type: 'MOVE',
            value: {
                ...board,
                [`${squares.target.coordinates.column}`]: {
                    ...board[`${squares.target.coordinates.column}`],
                    [`${squares.active.coordinates.row}`]: null,
                    [`${squares.target.coordinates.row}`]: squares.active.piece,
                }
            }
        }

        }
        else return { type: 'MOVE',
            value: {
                ...board,
                [`${squares.active.coordinates.column}`]: {
                    ...board[`${squares.active.coordinates.column}`],
                [`${squares.active.coordinates.row}`]: null,
                },
                [`${squares.target.coordinates.column}`]: {
                    ...board[`${squares.target.coordinates.column}`],

                    [`${squares.target.coordinates.row}`]: squares.active.piece,
                }
            }
        }
    },

    setCoordinates : (square) => {
        if(!square) return;
        let column = square.substring(0,1);
        let row = parseInt(square.substring(1));
        return {column: column, row: row};
    },
    
    checkSquare : (data, currentPlayer, squares) => {
        if(data.piece === squares.active.piece) return {
            type: 'CANCEL'
            }
        else if(data.class === 'square' && squares.active.piece) return {
            type: 'NEWTARGET',
            value: {
                piece: data.piece,
                startSquare: data.startSquare,
                square: data.square,
                coordinates: data.coordinates,
            }
        };

        else if(data.color === currentPlayer.color) {
            if(
                (squares.active.piece && squares.active.piece.substring(1,2) === 'K')
                &&
                data.piece.substring(1,2) === 'R'){
                return {
                    type: 'NEWTARGET',
                    value: {
                        piece: data.piece,
                        startSquare: data.startSquare,
                        square: data.square,
                        coordinates: data.coordinates,
                    }
                }
            }
            else return {
            type: 'NEWACTIVE',
            value: {
                piece: data.piece,
                startSquare: data.startSquare,
                square: data.square,
                coordinates: data.coordinates,
            }
            };
        }
        else {
            console.log('setting target...');
            return {
            type: 'NEWTARGET',
            value: {
                piece: data.piece,
                startSquare: data.startSquare,
                square: data.square,
                coordinates: data.coordinates,
            }
            };
        }
    },
    
    
    
}