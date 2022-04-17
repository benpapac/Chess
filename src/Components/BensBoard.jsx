import { useReducer, useEffect } from 'react';
import "../BensBoard.css";
import { movement } from '../utilities/movement';
import { boardUtil } from '../utilities/boardUtil';
import { checkUtil } from '../utilities/checkUtil';
import { updaters } from '../utilities/updaters';
import { reducers } from '../utilities/reducers.js';


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
            kings: {
                whiteKingSquare: 'E1',
                whiteKingPiece: board['E'][1],
                whiteKingCoordinates: {column: 'E', row: 1},
                blackKingSquare: 'E8',
                blackKingPiece: board['E'][8],
                blackKingCoordinates: {column: 'E', row: 8}
            },
            
            active: {
                startSquare: null,
                square: null,
                piece: null,
                coordinates: null
            },

            target: {
                startSquare: null,
                square: null,
                piece: null,
                coordinates: null
            },

            cancel: false,
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

    useEffect ( () => {
        let activePiece = squares.active.piece ?
                squares.active.piece.substring(0, 2)
                : null;

        let targetSquare = squares.target.square;

        // console.log('active: ', activePiece, 'target: ', target)
        console.log('squares.target: ', squares.target);
                
        if(!activePiece) return;
        if(targetSquare) {
            //do stuff.
            console.log('squares: ', squares);
            if (!(movement[activePiece[1]](board, squares, hasMoved))) {
                boardDispatch(boardUtil.movePiece(board, squares));
                hasMovedDispatch({ type: 'MOVE', value: squares.active.piece });
                
                playerDispatch(updaters.updatePlayer(player));
                console.log('playerDispatch: ', updaters.updatePlayer(player));
                
            }
                // let newKings = activePiece[1] === 'K' ? 
                //     boardUtil.updateKings(squares, activePiece)
                //     : squares.kings;

                // console.log('newKings: ',newKings);
                // console.log('kings: ',squares.kings);

                // squaresDispatch({ type: 'NEWTURN', action: {
				// 	...squares,

				// 	active: {
				// 		square: null,
				// 		piece: null,
				// 		coordinates: null,
				// 	},

				// 	target: {
				// 		square: null,
				// 		piece: null,
				// 		coordinates: null,
				// 	},

				// 	cancel: false,
                // }}
                // )
            }
    }, [squares]);

    const render = (thisSquare, board) => {
        let coordinates = boardUtil.setCoordinates(thisSquare);
        return boardUtil.placePieces(board, coordinates);
    }

    const updateGameState = async (e) => {
        // console.log('squares: ', squares);
        const inCheck = checkUtil.inCheck(board, squares, player);
        //first, what did the player click on? Let's get the data.
        const data = await updaters.getClickData(e);
        
        squaresDispatch(boardUtil.checkSquare(data, player, squares));
        
    }
    return (
        <section className='board' onClick={updateGameState}>
            {boardUtil.columns.map((column) => {
                return boardUtil.rows.map((row) => {
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