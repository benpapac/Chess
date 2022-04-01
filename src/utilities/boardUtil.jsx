
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
        let activeCol = [squares.active.coordinates.column];
        let targetCol = [squares.target.coordinates.column];

        return { type: 'MOVE',
            value: {
                ...board,
                activeCol: {
                ...activeCol,
                activeRow: null,
                },
                targetCol: {
                    ...targetCol,
                    targetRow: squares.active.piece,
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
                square: data.square,
                coordinates: data.coordinates,
            }
        };

        else if(data.color === currentPlayer.color) {
            console.log('same color.');

           
            if(
                (squares.active.piece && squares.active.piece.substring(1,2) === 'K')
                &&
                data.piece.substring(1,2) === 'R'){
                return {
                    type: 'NEWTARGET',
                    value: {
                        piece: data.piece,
                        square: data.square,
                        coordinates: data.coordinates,
                    }
                }
            }
            else return {
            type: 'NEWACTIVE',
            value: {
                piece: data.piece,
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
                square: data.square,
                coordinates: data.coordinates,
            }
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
                coordinates: boardUtil.setCoordinates(e.target.id),
            }
        }
        else return {
            color: e.target.id.substring(0,1),
            piece: e.target.id,
            square: e.target.parentElement.id,
            coordinates: boardUtil.setCoordinates(e.target.parentElement.id),
        };
    },
    
}