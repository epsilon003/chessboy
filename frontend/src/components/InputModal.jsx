import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const InputModal = ({ show, onClose, onSubmit }) => {
  const [inputType, setInputType] = useState('fen');
  const [fenValue, setFenValue] = useState('');
  const [pgnValue, setPgnValue] = useState('');

  const handleSubmit = () => {
    if (inputType === 'fen') {
      onSubmit('fen', fenValue);
    } else {
      onSubmit('pgn', pgnValue);
    }
    setFenValue('');
    setPgnValue('');
  };

  const handleClose = () => {
    setFenValue('');
    setPgnValue('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black border-4 border-black p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Import Position</h3>
          <button onClick={handleClose} className="hover:bg-gray-200 p-2">
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInputType('fen')}
            className={`px-4 py-2 border-2 border-black font-bold transition ${
              inputType === 'fen' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            FEN
          </button>
          <button
            onClick={() => setInputType('pgn')}
            className={`px-4 py-2 border-2 border-black font-bold transition ${
              inputType === 'pgn' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            PGN
          </button>
        </div>

        {inputType === 'fen' ? (
          <div>
            <label className="block font-bold mb-2">FEN String:</label>
            <input
              type="text"
              value={fenValue}
              onChange={(e) => setFenValue(e.target.value)}
              placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black mb-4 font-mono"
            />
          </div>
        ) : (
          <div>
            <label className="block font-bold mb-2">PGN:</label>
            <textarea
              value={pgnValue}
              onChange={(e) => setPgnValue(e.target.value)}
              placeholder='[Event "Example"]&#10;[Site "?"]&#10;&#10;1. e4 e5 2. Nf3 Nc6...'
              rows="6"
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black mb-4 font-mono"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition font-bold flex items-center justify-center gap-2"
          >
            <Check size={18} />
            Import
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 border-2 border-black hover:bg-gray-200 transition font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;