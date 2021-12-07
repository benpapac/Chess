import { useState } from 'react';
import "../BensBoard.css";
import { movement } from '../utilities/movement';
import {board} from '../utilities/board';

function BensBoard(props) {
    const [gameState, setGameState] = useState({
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

        kingHasMoved: {
            'W': false,
            'B': false,
        },

        currentBoard: {
            A: {1: 'WRA1', 2: 'WPA2', 3: null, 4: null, 5: null, 6: null, 7: 'BPA7', 8: 'BRA8'},
            B: {1: 'WNB1', 2: 'WPB2', 3: null, 4: null, 5: null, 6: null, 7: 'BPB7', 8: 'BNB8'},
            C: {1: 'WBC1', 2: 'WPC2', 3: null, 4: null, 5: null, 6: null, 7: 'BPC7', 8: 'BBC8'},
            D: {1: 'WQD1', 2: 'WPD2', 3: null, 4: null, 5: null, 6: null, 7: 'BPD7', 8: 'BQD8'},
            E: {1: 'WKE1', 2: 'WPE2', 3: null, 4: null, 5: null, 6: null, 7: 'BPE7', 8: 'BKE8'},
            F: {1: 'WBF1', 2: 'WPF2', 3: null, 4: null, 5: null, 6: null, 7: 'BPF7', 8: 'BBF8'},
            G: {1: 'WNG1', 2: 'WPG2', 3: null, 4: null, 5: null, 6: null, 7: 'BPG7', 8: 'BNG8'},
            H: {1: 'WRH1', 2: 'WPH2', 3: null, 4: null, 5: null, 6: null, 7: 'BPH7', 8: 'BRH8'},
        },

    });

    const render = (thisSquare, gameState) => {
        let coordinates = board.setCoordinates(thisSquare);
        return board.placePieces(gameState, coordinates);
    }

     const updateSquares = async (e) => {
        console.log('oldState: ', gameState);
        const data = await board.getData(e);
        let newState = await board.checkChosenSquare(data, gameState);

        if(newState.active.piece && newState.target.square)  {  
            let activePiece = newState.active.piece.substring(1,2);
            console.log('checking move...', 'active = ', activePiece);

           if( movement[activePiece](newState) ){
            console.log('move is allowed.');
            newState = await board.movePiece(newState);
             }
           };
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