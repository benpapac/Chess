lookForCheck: (board, slope) => {
	let slopes = { R: [0, -0, Infinity, -Infinity], B: [1, -1], K: [2] };
        for (let i = slope; i <= 7 && i >= 0; i++);

        // i want to increase distance(i), so I can travel farther up and down, away from activeCol. 
        // If I max out one distance, stop checking in that direction.
        // Be sure to return the value found in both directions.
    },