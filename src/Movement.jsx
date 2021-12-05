import React from 'react';
import { act } from 'react-dom/test-utils';


/*export class Movement {
    constructor(  targetSquare, activeSquare ){
        this.targetColumn = targetSquare.substring(0,1);
        this.targetRow = targetSquare.substring(1);
        this.activeColumn = activeSquare.substring(0,1);
        this.activeRow = activeSquare.substring(1);
        this.slope = (this.targetRow - this.activeRow)/(this.targetColumn - this.activeColumn);
     }

    upOne () {
        if( this.targetColumn !== this.activeColumn || this.targetRow !== this.activeRow+1) return false;
        return true;
    }

    downOne () {
        if( this.targetColumn !== this.activeColumn || this.targetRow !== this.activeRow-1) return false;
        return true;
    }

    pawnCaptureUp () {
        return( this.targetRow === this.activeRow+1 && Math.abs(this.targetColumn - this.activeColumn) === 1);
    }

    pawnCaptureDown () {
        return( this.targetRow === this.activeRow-1 && Math.abs(this.targetColumn - this.activeColumn) === 1);
    }

    zeroSlope () {
        if( this.activeColumn === this.targetColumn && this.activeRow === this.targetRow) return false;
        return (this.slope === 0);
    }

    positiveSlope() {
        return (this.slope === 1 );
    }

    negativeSlope () {
        return (this.slope === -1 );
    }

    lShape () {
        return (Math.abs(this.slope) === 2 || Math.abs(this.slope) === 1/2);
    }
    
}*/

export const Movement = {

    king: (activeSquare, target) => {

    },

    queen: (activeSquare, target) => {

    },

    bishop: (activeSquare, target) => {

    },

    knight: (activeSquare, target) => {

    },

    rook: (activeSquare, target) => {

    },

    whitePawn: (activeSquare, target) => {

    },

    blackPawn: (activeSquare, target) => {

    }

}