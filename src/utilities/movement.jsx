export const movement = {
    K: (newState) => {
        return (
            Math.abs(newState.target.Coordinates.column - newState.active.coordinates.column) <= 1
            && Math.abs(newState.target.coordinates.row - newState.active.coordinates.row) <= 1
                );
    },

    Q: (newState) => {
        return ( movement.B(newState) || movement.R(newState) );
    },

    B: (newState) => {
        return (Math.abs( newState.slope(newState) ) === 1 );
    },

    N: (newState) => {
        console.log('checking N rules... slope = ', newState.slope(newState));
        return (Math.abs( newState.slope(newState) ) === 2 
                || Math.abs( newState.slope(newState) ) === 1/2);
    },

    R: (newState) => {
        if( newState.active.coordinates.column === newState.target.coordinates.column && newState.active.coordinates.row === newState.target.coordinates.row) return false;
        return (newState.slope(newState) === 0);
    },

    P: (newState) => {
        if(newState.target.piece !== null) {
           if(newState.active.piece.substring(0,1) === 'W') {
               return( 
                newState.target.coordinates.row === newState.active.coordinates.row+1 
                && Math.abs(newState.target.coordinates.column - newState.active.coordinates.column) === 1
                );
               }
            else {
                return( 
                newState.target.coordinates.row === newState.active.coordinates.row-1 
                && Math.abs(newState.target.coordinates.column - newState.active.coordinates.column) === 1
                );

            }
        } 
        else if(newState.active.square === newState.active.startSquare) {
            console.log('plus 2 is allowed...');
            if(newState.active.piece.substring(0,1) === 'W') {
               console.log('checking rules for white...')
               console.log(newState.target.coordinates.row, newState.active.coordinates.row+2);
               return( 
                   (
                    newState.target.coordinates.row === newState.active.coordinates.row+1
                    ||
                    newState.target.coordinates.row === newState.active.coordinates.row+2
                    ) 
                    && newState.target.coordinates.column === newState.active.coordinates.column
                   );
           }
           else {
                return( 
                   (
                    newState.target.coordinates.row === newState.active.coordinates.row-1
                    ||
                    newState.target.coordinates.row === newState.active.coordinates.row-2
                    ) 
                    && newState.target.coordinates.column === newState.active.coordinates.column
                   );
           }

        }
        else {
           if(newState.active.piece.substring(0,1) === 'W') {
               return( 
                   newState.target.coordinates.row === newState.active.coordinates.row+1 
                   && newState.target.coordinates.column === newState.active.coordinates.column
                   );
           }
           else {
               return( 
                   newState.target.coordinates.row === newState.active.coordinates.row-1 
                   && newState.target.coordinates.column === newState.active.coordinates.column
                   );
           }
        };
    },

}