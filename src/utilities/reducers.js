export const reducers = {
	boardReducer: (state, action) => {
		switch (action.type) {
			case 'MOVE':
				//move currentPiece to targetSquare.
				//if there's a target piece, it is replaced.
				return action.value;
			case 'PROMOTE':
			//implement pawn promotion.

			case 'CASTLE':
			//implement castling.
			default:
			// board is unchanged.
		}
	},

	hasMovedReducer: (state, action) => {
		switch (action.type) {
			case 'MOVE':
				return [...state, action.value];
			default:
				return state;
		}
	},

	squaresReducer: (state, action) => {
		switch (action.type) {
			case 'CANCEL':
				return {
					...state,
					cancel: true,
				};
			case 'NEWKING':
				return {
					...state,
					kings: {
						...action.value,
					},
					cancel: false,
				};
			case 'NEWACTIVE':
				//update the active data
				return {
					...state,
					active: {
						...action.value,
					},
					target: {
						square: null,
						piece: null,
						coordinates: null,
					},
					cancel: false,
				};
			case 'NEWTARGET':
				//update the target data
				return {
					...state,
					target: {
						...action.value,
					},
					cancel: false,
				};
			case 'NEWTURN':
				return {
					...action.value,
				};
			default:
				return state;
		}
	},

	playerReducer: (state, action) => {
		switch (action.type) {
			case 'CANCASTLE':
				// return state, with canCastle as true
				return {
					...state,
					canMove: action.value,
				};
			case 'MOVE':
				//return state, with canMove as false and inCheck as false.
				return {
					...state,
					...action.value,
				};
			default:
				return state;
		}
	},
};
