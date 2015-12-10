function getPossibleMoves(board) {
    var moves = [];

    for(var r = 0; r < board.length; r++) {
        for(var c = 0; c < board[0].length; c++) {
            if(board[r][c] === '') {
                moves.push({
                    row: r,
                    col: c  
                });
            }
        } 
    }

    return moves;
}

function bestMove(board) {
    var moves = getPossibleMoves(board);

        
}
