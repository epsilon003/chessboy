import React from 'react';
import { RotateCcw, Edit3, Play } from 'lucide-react';

const pieceSymbols = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

const allPieces = ['R', 'N', 'B', 'Q', 'K', 'P', 'r', 'n', 'b', 'q', 'k', 'p'];

const ChessBoard = ({
  position,
  editMode,
  selectedPiece,
  selectedSquare,
  isAnalyzing,
  onSquareClick,
  onPieceSelect,
  onToggleEdit,
  onReset,
  onClearBoard,
  onImport,
  onAnalyze,
  parseFEN
}) => {
  const board = parseFEN(position);

  return (
    <div className="bg-white border-4 border-black p-6">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-bold text-black">Position</h2>
        <div className="flex gap-2">
          <button
            onClick={onImport}
            className="flex items-center gap-2 px-3 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition text-sm font-bold"
          >
            <Edit3 size={16} />
            Import
          </button>
          <button
            onClick={onToggleEdit}
            className={`flex items-center gap-2 px-3 py-2 border-2 border-black transition text-sm font-bold ${
              editMode ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            <Edit3 size={16} />
            {editMode ? 'Done' : 'Edit'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition text-sm font-bold"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {editMode && (
        <div className="mb-4 p-4 border-2 border-black">
          <div className="font-bold text-black mb-2">Select piece to place:</div>
          <div className="flex gap-2 flex-wrap">
            {allPieces.map(piece => (
              <button
                key={piece}
                onClick={() => onPieceSelect(piece)}
                className={`w-12 h-12 border-2 border-black text-3xl transition ${
                  selectedPiece === piece ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {pieceSymbols[piece]}
              </button>
            ))}
            <button
              onClick={onClearBoard}
              className="px-4 h-12 border-2 border-black bg-white text-black hover:bg-gray-200 transition font-bold text-sm"
            >
              Clear Board
            </button>
          </div>
        </div>
      )}

      <div className="w-full mx-auto max-w-2xl">
        <div className="grid grid-cols-8 border-4 border-black" style={{ aspectRatio: '1/1' }}>
          {board.map((row, i) =>
            row.map((piece, j) => {
              const isLight = (i + j) % 2 === 0;
              const squareKey = `${i},${j}`;
              const isSelected = selectedSquare === squareKey;
              return (
                <div
                  key={squareKey}
                  onClick={() => onSquareClick(i, j)}
                  className={`flex items-center justify-center cursor-pointer transition aspect-square ${
                    isLight ? 'bg-white' : 'bg-gray-400'
                  } ${isSelected ? 'ring-4 ring-black ring-inset' : ''} hover:opacity-70 border border-black`}
                >
                  {piece && (
                    <span className="text-black" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}>
                      {pieceSymbols[piece]}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 font-bold text-black text-sm">Current FEN:</div>
        <div className="p-2 border-2 border-black bg-white text-black font-mono text-xs break-all">
          {position}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black disabled:bg-gray-400 disabled:cursor-not-allowed transition font-bold"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Analyzing...
            </>
          ) : (
            <>
              <Play size={20} />
              Analyze Position
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChessBoard;