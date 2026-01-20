import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChessBoard from './components/ChessBoard';
import AnalysisPanel from './components/AnalysisPanel';
import SavedGames from './components/SavedGames';
import UploadImage from './components/UploadImage';
import InputModal from './components/InputModal';
import { parseFEN, boardToFEN, isValidFEN, analyzePosition, parsePGN, STARTING_FEN } from './utils/chess';
import { getItem, setItem, STORAGE_KEYS } from './utils/storage';
import { validateFEN, validateGameName } from './utils/validation';
import './styles/main.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('board');
  const [position, setPosition] = useState(STARTING_FEN);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [savedGames, setSavedGames] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [gameName, setGameName] = useState('');
  const [showInputModal, setShowInputModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const games = getItem(STORAGE_KEYS.SAVED_GAMES) || [];
    setSavedGames(games);
  }, []);

  const handleSquareClick = (row, col) => {
    if (editMode && selectedPiece) {
      const board = parseFEN(position);
      board[row][col] = selectedPiece;
      setPosition(boardToFEN(board));
      setSelectedPiece(null);
    } else if (editMode) {
      const board = parseFEN(position);
      board[row][col] = null;
      setPosition(boardToFEN(board));
    } else {
      const square = `${row},${col}`;
      setSelectedSquare(selectedSquare === square ? null : square);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzePosition(position);
      setAnalysis(result);
    } catch (error) {
      alert('Analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveGame = () => {
    const validation = validateGameName(gameName);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    const newGame = {
      id: Date.now(),
      name: validation.value,
      position: position,
      date: new Date().toLocaleDateString(),
      analysis: analysis
    };

    const updated = [...savedGames, newGame];
    setSavedGames(updated);
    setItem(STORAGE_KEYS.SAVED_GAMES, updated);
    setGameName('');
    alert('Game saved successfully!');
  };

  const handleLoadGame = (game) => {
    setPosition(game.position);
    setAnalysis(game.analysis);
    setActiveTab('board');
  };

  const handleDeleteGame = (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      const updated = savedGames.filter(g => g.id !== id);
      setSavedGames(updated);
      setItem(STORAGE_KEYS.SAVED_GAMES, updated);
    }
  };

  const handleReset = () => {
    setPosition(STARTING_FEN);
    setAnalysis(null);
    setSelectedSquare(null);
    setSelectedPiece(null);
    setEditMode(false);
  };

  const handleClearBoard = () => {
    setPosition('8/8/8/8/8/8/8/8');
  };

  const handleImportSubmit = (type, value) => {
    if (type === 'fen') {
      const validation = validateFEN(value);
      if (validation.valid) {
        setPosition(value.trim());
        setShowInputModal(false);
      } else {
        alert(validation.error);
      }
    } else if (type === 'pgn') {
      alert('PGN parsing requires chess.js library. This demo shows the UI.');
      setShowInputModal(false);
    }
  };

  const handleImageUpload = (file) => {
    alert('Image uploaded! In production, this would use CV to detect the position.');
    setTimeout(() => {
      setPosition('rnbqkb1r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R');
      setActiveTab('board');
    }, 1500);
  };

  const handleLogin = () => {
    setUser({ name: 'Demo User', email: 'demo@example.com' });
    alert('Login simulation - In production, this would use Google OAuth');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

      {/* Navigation Tabs */}
      <div className="bg-white text-black border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-0">
            {['board', 'saved', 'upload'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-bold transition capitalize border-r-2 border-black ${
                  activeTab === tab
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {tab === 'board' && '♟ Analysis'}
                {tab === 'saved' && '💾 Saved Games'}
                {tab === 'upload' && '📷 Upload'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'board' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChessBoard
                position={position}
                editMode={editMode}
                selectedPiece={selectedPiece}
                selectedSquare={selectedSquare}
                isAnalyzing={isAnalyzing}
                onSquareClick={handleSquareClick}
                onPieceSelect={setSelectedPiece}
                onToggleEdit={() => setEditMode(!editMode)}
                onReset={handleReset}
                onClearBoard={handleClearBoard}
                onImport={() => setShowInputModal(true)}
                onAnalyze={handleAnalyze}
                parseFEN={parseFEN}
              />
            </div>
            <AnalysisPanel
              gameName={gameName}
              setGameName={setGameName}
              onSaveGame={handleSaveGame}
              analysis={analysis}
            />
          </div>
        )}

        {activeTab === 'saved' && (
          <SavedGames
            savedGames={savedGames}
            onLoadGame={handleLoadGame}
            onDeleteGame={handleDeleteGame}
          />
        )}

        {activeTab === 'upload' && (
          <UploadImage onImageUpload={handleImageUpload} />
        )}
      </main>

      <InputModal
        show={showInputModal}
        onClose={() => setShowInputModal(false)}
        onSubmit={handleImportSubmit}
      />

      {/* Footer */}
      <footer className="mt-12 py-6 border-t-2 border-white text-center text-white text-sm">
        <p className="font-bold">Chess Analysis Platform - Student Project</p>
        <p className="mt-1">Built with React • Zero Cost Stack</p>
      </footer>
    </div>
  );
}

export default App;