import React from 'react';
import "../BensBoard.css";

function BensBoard(props) {
    const columns = ['A','B','C','D','E','F','G','H'];
    const rows = ['1','2','3','4','5','6','7','8'];
    const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];


    const makePieces = (rowIndex, colIndex) => {
        if(rowIndex > 1 && rowIndex < 6) return;
        let color = rowIndex <= 1 ? 'white' : 'black';
        let thisPiece = (rowIndex === 0 || rowIndex === 7) ? pieces[colIndex]: 'pawn';

        return <div className={`${color}-piece ${thisPiece}`}> {`${color} ${thisPiece}`} </div>;
    }

    return (
        <section className='board'>
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