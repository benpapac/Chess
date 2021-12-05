import { useState } from 'react';
import "../BensBoard.css";
import { Movement } from '../Movement';

function BensBoard(props) {
    const columns = ['A','B','C','D','E','F','G','H'];
    const rows = ['1','2','3','4','5','6','7','8'];
    const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    const currentPlayer =  'white';

    const [active, setActive] = useState({
        square: null,
        piece: null,
        coordinates: null
    });
    const [target, setTarget] = useState({
        square: null,
        piece: null,
        coordinates: null
    });


    const makePieces = (rowIndex, colIndex) => {
        if(rowIndex > 1 && rowIndex < 6) return;
        let color = rowIndex <= 1 ? 'white' : 'black';
        let thisPiece = (rowIndex === 0 || rowIndex === 7) ? pieces[colIndex]: 'pawn';

        return <div className={`${color}-${thisPiece}`}> {`${color} ${thisPiece}`} </div>;
    }

    const getData = async (e) => {
        console.log('updating...', e.target.className);
        if(e.target.className === 'square') {
           return {
            class: e.target.className,
            color: null,
            piece: null,
            square: e.target.id
            }
        }
       else return {
            class: e.target.className,
            color: e.target.className.substring(0,5),
            piece: e.target.className.substring(6),
            square: e.target.parentElement.id
        };
    }

    const getCoordinates = (square) => {
        if(!square) return;
        let column = columns.indexOf(square.substring(0,1));
        let row = rows.indexOf(square.substring(1));

        return {colIndex: column, rowIndex: row};
    }

    const checkSquare = (data) => {
        console.log('checking square...', 'class =', data.class);
        if (data.class === 'square' && active.piece) {
            setTarget({
                piece: null,
                square: data.square,
                coordinates: getCoordinates(data.square),
            });
            return data.square;
        }
    }
    const checkForPiece = (data) => {
        console.log('checking color... color =', data.color);
        if(data.class === 'square') return;
        if(data.color === currentPlayer) {
            console.log('setting active...');
                setActive({
                    piece: data.color.concat(data.piece),
                    square: data.square,
                    coordinates: getCoordinates(data.square),
                });
                return data;
        }
        else {
            if(!active.piece) return;
            console.log('setting target...');
            setTarget({
                    piece: data.color.concat(data.piece),
                    square: data.square,
                    coordinates: getCoordinates(data.square)
                });
                return data;
        }
    }

    const updateSquares = async (e) => {
        const data = await getData(e);
        checkSquare(data);
        checkForPiece(data);
    }

    return (
        <section className='board' onClick={updateSquares}>
            {columns.map( (column) => {
               return rows.map( (row) => {
                    let colIndex = columns.indexOf(column);
                    let rowIndex = rows.indexOf(row);
                    let color = 'cornsilk';
                    if(!(rowIndex % 2)) {
                       color = (colIndex % 2) ? 'cornsilk' : 'dimgrey';
                    } else {
                       color = !(colIndex % 2) ? 'cornsilk' : 'dimgrey';
                    }

                    return <div 
                            className={`square`}
                            id={`${column}${row}`}
                            style={{background:`${color}`}}
                            >
                                {makePieces(rowIndex, colIndex)}
                            </div>
            })  
            })}
        </section>
    );
}

export default BensBoard;