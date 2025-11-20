'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GeneratedGame } from '@/types/game';

interface GamePreviewProps {
  game: GeneratedGame;
  onClose?: () => void;
  onShare?: () => void;
}

export default function GamePreview({ game, onClose, onShare }: GamePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [gameHtml, setGameHtml] = useState<string>('');
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    // Generate the complete HTML for the game
    const html = generateGameHTML(game.gameCode);
    setGameHtml(html);
  }, [game]);

  const generateGameHTML = (gameCode: string): string => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${game.title || 'Educational Game'}</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: Arial, sans-serif;
    }
    #game-container {
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="game-container"></div>
  <script>
    ${gameCode}
  </script>
</body>
</html>
    `;
  };

  const handleDownload = () => {
    const blob = new Blob([gameHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${game.title?.replace(/\s+/g, '-') || 'game'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(gameHtml);
    alert('Game code copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{game.title || 'Your Educational Game'}</h2>
            <div className="flex items-center gap-4 text-sm text-primary-100">
              <span>📚 {game.metadata.subject}</span>
              <span>🎓 {game.metadata.gradeLevel}</span>
              <span>🎮 {game.metadata.gameType}</span>
              <span>⚡ {game.metadata.difficulty}</span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-primary-100 bg-primary-50">
          <button
            onClick={() => setShowCode(false)}
            className={`flex-1 py-3 px-6 font-semibold transition-all ${
              !showCode
                ? 'bg-white text-primary-700 border-b-2 border-primary-500'
                : 'text-primary-600 hover:bg-primary-100'
            }`}
          >
            🎮 Play Game
          </button>
          <button
            onClick={() => setShowCode(true)}
            className={`flex-1 py-3 px-6 font-semibold transition-all ${
              showCode
                ? 'bg-white text-primary-700 border-b-2 border-primary-500'
                : 'text-primary-600 hover:bg-primary-100'
            }`}
          >
            💻 View Code
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {!showCode ? (
            /* Game Preview */
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-grass-50 rounded-2xl">
              <iframe
                ref={iframeRef}
                srcDoc={gameHtml}
                className="w-full h-full min-h-[600px] border-0 rounded-2xl shadow-xl"
                title="Game Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          ) : (
            /* Code View */
            <div className="bg-gray-900 rounded-2xl p-6 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">Complete Game Code</h3>
                <button
                  onClick={handleCopyCode}
                  className="bg-grass-500 hover:bg-grass-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  📋 Copy Code
                </button>
              </div>
              <pre className="text-green-400 text-sm font-mono overflow-x-auto">
                <code>{gameHtml}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-primary-100 p-6 bg-primary-50">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleDownload}
              className="bg-gradient-to-r from-grass-500 to-grass-600 hover:from-grass-600 hover:to-grass-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Game
              </span>
            </button>

            {onShare && (
              <button
                onClick={onShare}
                className="bg-sunny-500 hover:bg-sunny-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share with Students
                </span>
              </button>
            )}

            <button
              onClick={() => window.location.reload()}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
            >
              🔄 Create Another Game
            </button>
          </div>

          {/* Features Summary */}
          <div className="mt-6 text-center">
            <p className="text-sm text-primary-600 mb-2 font-semibold">Game Features:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {game.metadata.features.hints && (
                <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-primary-700">
                  💡 Hints
                </span>
              )}
              {game.metadata.features.progressFeedback && (
                <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-primary-700">
                  📊 Progress Tracking
                </span>
              )}
              {game.metadata.features.encouragingMessages && (
                <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-primary-700">
                  ⭐ Encouraging Messages
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
