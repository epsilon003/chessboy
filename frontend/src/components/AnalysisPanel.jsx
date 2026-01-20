import React from 'react';
import { Save } from 'lucide-react';

const AnalysisPanel = ({ gameName, setGameName, onSaveGame, analysis }) => {
  return (
    <div className="space-y-6">
      {/* Save Game */}
      <div className="bg-white border-4 border-black p-6">
        <h3 className="text-lg font-bold mb-4 text-black">Save Game</h3>
        <input
          type="text"
          placeholder="Game name..."
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="w-full px-4 py-2 bg-white text-black border-2 border-black focus:outline-none focus:ring-2 focus:ring-black mb-3"
        />
        <button
          onClick={onSaveGame}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition font-bold"
        >
          <Save size={18} />
          Save Current Position
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-lg font-bold mb-4 text-black">Analysis</h3>
          <div className="space-y-4">
            <div className="border-2 border-black p-4">
              <div className="text-sm font-bold text-black mb-1">Evaluation</div>
              <div className="text-2xl font-bold text-black">{analysis.evaluation}</div>
            </div>
            <div className="border-2 border-black p-4">
              <div className="text-sm font-bold text-black mb-1">Best Move</div>
              <div className="text-xl font-mono text-black">{analysis.bestMove}</div>
            </div>
            <div>
              <div className="text-sm font-bold text-black mb-2">Top Lines</div>
              {analysis.topMoves.map((move, idx) => (
                <div key={idx} className="border-2 border-black p-3 mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-bold text-black">{move.move}</span>
                    <span className="font-bold text-black">{move.eval}</span>
                  </div>
                  <div className="text-sm font-mono text-black">{move.pv}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPanel;