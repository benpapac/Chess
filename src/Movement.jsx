import React from 'react';
import { act } from 'react-dom/test-utils';


export class Movement {
    constructor(  targetRow, activeRow, targetColumn, activeColumn ){
         this.slope = (targetRow - activeRow)/(targetColumn - activeColumn);
         this.targetColumn = targetColumn;
         this.targetRow = targetRow;
         this.activeColumn = activeColumn;
         this.activeRow = activeRow;
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
}