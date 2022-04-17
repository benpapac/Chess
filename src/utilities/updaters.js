import { boardUtil } from './boardUtil';

export const updaters = {
	getClickData: async (e) => {
		if (e.target.className === 'square') {
			return {
				class: e.target.className,
				piece: null,
				square: e.target.id,
				coordinates: boardUtil.setCoordinates(e.target.id),
			};
		} else
			return {
				color: e.target.id.substring(0, 1),
				piece: e.target.id,
				startSquare: e.target.id.substring(2, 4),
				square: e.target.parentElement.id,
				coordinates: boardUtil.setCoordinates(e.target.parentElement.id),
			};
	},

	updatePlayer: (player) => {
		let newColor = player.color === 'W' ? 'B' : 'W';
		console.log('updating player... ', newColor);
		return {
			type: 'MOVE',
			value: {
				...player,
				color: newColor,
			},
		};
	},

	updateKings: (squares, activePiece) => {
		if (activePiece[1] === 'K') {
			console.log('updating kings...');
			if (activePiece[0] === 'B') {
				return {
					type: 'NEWKING',
					value: {
						...squares.kings,
						blackKingSquare: squares.target.square,
						blackKingPiece: squares.active.piece,
						blackKingCoordinates: squares.target.coordinates,
					},
				};
			} else
				return {
					type: 'NEWKING',
					value: {
						...squares.kings,
						whiteKingSquare: squares.target.square,
						whiteKingPiece: squares.active.piece,
						whiteKingCoordinates: squares.target.coordinates,
					},
				};
		} else return;
	},
};
