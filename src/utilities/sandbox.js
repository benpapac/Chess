/* B/R/Q check
when a piece moves, I could check in all legal directions for the enemy king. If I find it, I could store an array listing the piece, the enemy king, and all obstacles between them.

Then, whenever any piece in the array is affected by the game, I would update this array. If the piece, or the enemy king, move, I simply delte this stored array.

If at any time, all obstacles between the two are removed, I announce check for the enemy king.
*/

/* N check
 whenever a knight moves, I check its periphery. If one of the legal squares holds the enemy king, I announce check , and store the two locations in an object. If the king or knight move away, I delete this object.
*/
