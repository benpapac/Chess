import { useState } from 'react';
import "../BensBoard.css";
import { movement } from '../utilities/movement';
import {board} from '../utilities/board';

function BensBoard(props) {
    const [gameState, setGameState] = useState({
        newGame: true,
        upToDate: true,
        gameOver: false,
        currentPlayer: 'W',
        canMove: false,
        check: null,
        active : {
            square: null,
            piece: null,
            coordinates: null
        },

        target: {
            square: null,
            piece: null,
            coordinates: null
        },

        slope : (newState) => {
            let targetColIndex = board.columns.indexOf(newState.target.coordinates.column);
            let activeColIndex = board.columns.indexOf(newState.active.coordinates.column);

            return (newState.target.coordinates.row - newState.active.coordinates.row)
                    / 
                    (targetColIndex - activeColIndex);
        },

        currentBoard: {
            A: {1: 'WRA', 2: 'WPA', 3: null, 4: null, 5: null, 6: null, 7: 'BPA', 8: 'BRA'},
            B: {1: 'WNB', 2: 'WPB', 3: null, 4: null, 5: null, 6: null, 7: 'BPB', 8: 'BNB'},
            C: {1: 'WBC', 2: 'WPC', 3: null, 4: null, 5: null, 6: null, 7: 'BPC', 8: 'BBC'},
            D: {1: 'WQ', 2: 'WPD', 3: null, 4: null, 5: null, 6: null, 7: 'BPD', 8: 'BQ'},
            E: {1: 'WK', 2: 'WPE', 3: null, 4: null, 5: null, 6: null, 7: 'BPE', 8: 'BK'},
            F: {1: 'WBF', 2: 'WPF', 3: null, 4: null, 5: null, 6: null, 7: 'BPF', 8: 'BBF'},
            G: {1: 'WNG', 2: 'WPG', 3: null, 4: null, 5: null, 6: null, 7: 'BPG', 8: 'BNG'},
            H: {1: 'WRH', 2: 'WPH', 3: null, 4: null, 5: null, 6: null, 7: 'BPH', 8: 'BRH'},
        },

        startSquares: {
            W: {WRA: 'A1', WNB: 'B1', WBC: 'C1', WQ: 'D1', WK: 'E1', WBF: 'F1', WNG: 'G1', WRH: 'H1', 
                    WPA: 'A2', WPB: 'B2', WPC: 'C2', WPD: 'D2', WPE: 'E2', WPF: 'F2', WPG: 'G2', WPH: 'H2',},

            B: {BRA: 'A8', BNB: 'B8', BBC: 'C8', BQ: 'D8', BK: 'E8', BBF: 'F8', BNG: 'G8', BRH: 'H8', 
                    BPA: 'A7', BPB: 'B7', BPC: 'C7', BPD: 'D7', BPE: 'E7', BPF: 'F7', BPG: 'G7', BPH: 'H7',},
        }

    });


    const render = (thisSquare, gameState) => {
        let coordinates = board.setCoordinates(thisSquare);
        return board.placePieces(gameState, coordinates);
    }

     const updateSquares = async (e) => {
        console.log('oldState: ', gameState);
        const data = await board.getData(e);
        let newState = await board.checkChosenSquare(data, gameState);
        console.log(newState.active.piece, newState.target.square)
        if(newState.active.piece && newState.target.square)  {  
            console.log('checking move...', 'active = ', newState.active.piece.substring(1,2));
            newState.canMove = movement[newState.active.piece.substring(1,2)](newState);
        }
        if(newState.canMove){
            console.log('move is allowed.');
            newState = await board.movePiece(newState);
        }
        else {
            //don't move the piece
            console.log('move not allowed');
        }
        console.log('newState: ', newState);
        setGameState(newState);
}

    return (
        <section className='board' onClick={updateSquares}>
            {board.columns.map( (column) => {
               return board.rows.map( (row) => {
                    let colIndex = board.columns.indexOf(column);
                    let rowIndex = board.rows.indexOf(row);
                    let color = 'cornsilk';
                    let thisSquare = `${column}${row}`
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
                                {render(thisSquare, gameState)}
                            </div>
            })  
            })}
        </section>
    );
}

export default BensBoard;