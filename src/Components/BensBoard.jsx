import { useReducer } from 'react';
import "../BensBoard.css";
import { movement } from '../utilities/movement';
import { boardUtil } from '../utilities/boardUtil';
import { inCheck } from '../utilities.chckUtil';
import { reducers } from '../utilities/reducers.js';
import { useEffect } from 'react/cjs/react.production.min';

function BensBoard(props) {

    const [board, boardDispatch] = useReducer(reducers.boardReducer,
        {
            A: { 1: 'WRA1', 2: 'WPA2', 3: null, 4: null, 5: null, 6: null, 7: 'BPA7', 8: 'BRA8' },
            B: { 1: 'WNB1', 2: 'WPB2', 3: null, 4: null, 5: null, 6: null, 7: 'BPB7', 8: 'BNB8' },
            C: { 1: 'WBC1', 2: 'WPC2', 3: null, 4: null, 5: null, 6: null, 7: 'BPC7', 8: 'BBC8' },
            D: { 1: 'WQD1', 2: 'WPD2', 3: null, 4: null, 5: null, 6: null, 7: 'BPD7', 8: 'BQD8' },
            E: { 1: 'WKE1', 2: 'WPE2', 3: null, 4: null, 5: null, 6: null, 7: 'BPE7', 8: 'BKE8' },
            F: { 1: 'WBF1', 2: 'WPF2', 3: null, 4: null, 5: null, 6: null, 7: 'BPF7', 8: 'BBF8' },
            G: { 1: 'WNG1', 2: 'WPG2', 3: null, 4: null, 5: null, 6: null, 7: 'BPG7', 8: 'BNG8' },
            H: { 1: 'WRH1', 2: 'WPH2', 3: null, 4: null, 5: null, 6: null, 7: 'BPH7', 8: 'BRH8' },
        }
    );

    const [hasMoved, hasMovedDispatch] = useReducer(reducers.hasMovedReducer, []);

    const [squares, squaresDispatch] = useReducer(reducers.squaresReducer,
        {
            king: {
                square: 'E1',
                piece: board['E'][1],
                coordinates: {column: 'E', row: 1}
            },
            
            active: {
                square: null,
                piece: null,
                coordinates: null
            },

            target: {
                square: null,
                piece: null,
                coordinates: null
            },
        });

    const [player, playerDispatch] = useReducer(reducers.playerReducer, {
        color: 'W',
        canCastle: {
            long: true,
            short: true,
        },
        inCheck: false,
        canMove: false,
    });


    const render = (thisSquare, board) => {
        let coordinates = board.setCoordinates(thisSquare);
        return boardUtil.placePieces(board, coordinates);
    }

    const updateSquares = async (e) => {
        const inCheck = inCheck(board, squares, player);
        console.log(inCheck);
        const data = await boardUtil.getData(e);
        squaresDispatch(boardUtil.checkSquare(data, player, squares));

        if (squares.active.piece && squares.target.square) {
            let activePiece = squares.active.piece.substring(0, 2);

            if (!(movement[activePiece[1]](board, squares))) {
                boardDispatch(boardUtil.movePiece(squares));
                hasMovedDispatch({ type: 'MOVE', action: activePiece });
                if(activePiece[1] === 'K') squaresDispatch(
                    {
                        type: 'NEWKING', 
                        value: {
                            king: {
                                square: squares.target.square,
                                piece: squares.active.piece,
                                coordinates: squares.target.coordinates,
                            }
                        }
                    })
            }
        }
    }

    return (
        <section className='board' onClick={updateSquares}>
            {board.columns.map((column) => {
                return board.rows.map((row) => {
                    let colIndex = boardUtil.columns.indexOf(column);
                    let rowIndex = boardUtil.rows.indexOf(row);
                    let color = 'cornsilk';
                    let thisSquare = `${column}${row}`
                    if (!(rowIndex % 2)) {
                        color = (colIndex % 2) ? 'cornsilk' : 'dimgrey';
                    } else {
                        color = !(colIndex % 2) ? 'cornsilk' : 'dimgrey';
                    }

                    return <div
                        className={`square`}
                        id={`${column}${row}`}
                        style={{ background: `${color}` }}
                    >
                        {render(thisSquare, board)}
                    </div>
                })
            })}
        </section>
    );
}

export default BensBoard;