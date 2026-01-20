import React from 'react';
import { BookOpen, Trash2, ChevronRight } from 'lucide-react';

const SavedGames = ({ savedGames, onLoadGame, onDeleteGame }) => {
  return (
    <div className="bg-white border-4 border-black p-6">
      <h2 className="text-xl font-bold mb-6 text-black">Saved Games</h2>
      {savedGames.length === 0 ? (
        <div className="text-center py-12 text-black">
          <BookOpen size={48} className="mx-auto mb-4" />
          <p className="font-bold">No saved games yet. Analyze and save positions to build your library!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedGames.map(game => (
            <div key={game.id} className="border-2 border-black p-4 hover:bg-gray-100 transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-black">{game.name}</h3>
                  <p className="text-sm text-black">{game.date}</p>
                </div>
                <button
                  onClick={() => onDeleteGame(game.id)}
                  className="text-black hover:bg-black hover:text-white p-1 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              {game.analysis && (
                <div className="text-sm text-black mb-3">
                  Eval: <span className="font-bold">{game.analysis.evaluation}</span>
                </div>
              )}
              <button
                onClick={() => onLoadGame(game)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition text-sm font-bold"
              >
                Load Game
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedGames;