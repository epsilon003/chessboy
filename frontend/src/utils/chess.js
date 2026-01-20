// Chess FEN/PGN parsing utilities

export const parseFEN = (fen) => {
  const rows = fen.split('/');
  const board = [];
  
  rows.forEach(row => {
    const boardRow = [];
    for (let char of row) {
      if (isNaN(char)) {
        boardRow.push(char);
      } else {
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push(null);
        }
      }
    }
    board.push(boardRow);
  });
  
  return board;
};

export const boardToFEN = (board) => {
  const rows = board.map(row => {
    let fen = '';
    let emptyCount = 0;
    
    row.forEach(piece => {
      if (piece === null) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        fen += piece;
      }
    });
    
    if (emptyCount > 0) {
      fen += emptyCount;
    }
    
    return fen;
  });
  
  return rows.join('/');
};

export const isValidFEN = (fen) => {
  const parts = fen.trim().split('/');
  if (parts.length !== 8) {
    return false;
  }

  for (let part of parts) {
    let count = 0;
    for (let char of part) {
      if (isNaN(char)) {
        if (!'rnbqkpRNBQKP'.includes(char)) {
          return false;
        }
        count++;
      } else {
        count += parseInt(char);
      }
    }
    if (count !== 8) {
      return false;
    }
  }
  
  return true;
};

export const analyzePosition = async (fen) => {
  // Simulate analysis - in production, call Stockfish API
  return new Promise((resolve) => {
    setTimeout(() => {
      const analysis = {
        evaluation: '+0.5',
        bestMove: 'e2-e4',
        topMoves: [
          { move: 'e2-e4', eval: '+0.5', pv: 'e2-e4 e7-e5 Nf3 Nc6' },
          { move: 'd2-d4', eval: '+0.3', pv: 'd2-d4 d7-d5 c4 e6' },
          { move: 'Nf3', eval: '+0.2', pv: 'Nf3 Nf6 c4 e6' }
        ]
      };
      resolve(analysis);
    }, 2000);
  });
};

export const parsePGN = (pgn) => {
  // Simplified PGN parsing - in production use chess.js
  console.log('PGN parsing requires chess.js library');
  return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
};

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';