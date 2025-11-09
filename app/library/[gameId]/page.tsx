'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { LIBRARY_GAMES } from '@/types/library';

export default function GameDemoPage() {
  const params = useParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdaptCTA, setShowAdaptCTA] = useState(false);

  const game = LIBRARY_GAMES.find((g) => g.id === params.gameId);

  useEffect(() => {
    if (!game) {
      router.push('/library');
    }
  }, [game, router]);

  if (!game) {
    return null;
  }

  const handlePlayDemo = () => {
    setIsPlaying(true);
    // Simulate gameplay duration
    setTimeout(() => {
      setShowAdaptCTA(true);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-sunny-50 to-grass-50">
      {/* Header */}
      <nav className="bg-white border-b border-primary-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/library"
            className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
          >
            ← Back to Library
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Game Info Header */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex items-start gap-6">
              <div
                className={`${game.backgroundColor} w-32 h-32 rounded-2xl flex items-center justify-center flex-shrink-0`}
              >
                <div className="text-6xl">{game.icon}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-primary-800">{game.title}</h1>
                  <span className="bg-primary-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {game.subject}
                  </span>
                  <span className="bg-sunny-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {game.gradeLevel}
                  </span>
                </div>
                <p className="text-lg text-primary-700 mb-4">{game.description}</p>
                <div className="flex items-center gap-4 text-sm text-primary-600">
                  <div>
                    <span className="font-semibold">Topic:</span> {game.topic}
                  </div>
                  <div>
                    <span className="font-semibold">Type:</span>{' '}
                    {game.gameType.charAt(0).toUpperCase() + game.gameType.slice(1)}
                  </div>
                  <div>
                    <span className="font-semibold">Difficulty:</span>{' '}
                    {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Demo Area */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            {!isPlaying ? (
              <div
                className={`${game.backgroundColor} h-[600px] flex flex-col items-center justify-center`}
              >
                <div className="text-9xl mb-8 animate-bounce-slow">{game.icon}</div>
                <h2 className="text-3xl font-bold text-primary-800 mb-4">
                  Ready to Play a Demo?
                </h2>
                <p className="text-xl text-primary-700 mb-8 max-w-md text-center">
                  See how students will interact with this game
                </p>
                <button
                  onClick={handlePlayDemo}
                  className="bg-gradient-to-r from-grass-500 to-grass-600 hover:from-grass-600 hover:to-grass-700 text-white text-2xl font-bold py-6 px-16 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  ▶️ Play Demo
                </button>
              </div>
            ) : (
              <div
                className={`${game.backgroundColor} h-[600px] flex flex-col items-center justify-center relative`}
              >
                {/* Simulated Gameplay */}
                <div className="text-center">
                  <div className="text-9xl mb-8 animate-float">{game.icon}</div>
                  <div className="bg-white bg-opacity-90 rounded-3xl p-8 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-primary-800 mb-4">
                      Demo in Progress...
                    </h3>
                    <p className="text-lg text-primary-700 mb-6">
                      This is a simulated version of the game. The actual game will be
                      interactive and engaging for your students!
                    </p>

                    {/* Sample Question/Interaction */}
                    <div className="bg-primary-50 rounded-2xl p-6 mb-6">
                      <p className="text-xl font-semibold text-primary-800 mb-4">
                        {game.gameType === 'quiz' && 'Sample Question:'}
                        {game.gameType === 'platformer' && 'Jump to collect items!'}
                        {game.gameType === 'runner' && 'Dodge obstacles!'}
                        {game.gameType === 'puzzle' && 'Solve the puzzle!'}
                      </p>
                      {game.gameType === 'quiz' && (
                        <div className="space-y-2">
                          <button className="w-full bg-white hover:bg-grass-100 text-primary-800 font-semibold py-3 px-6 rounded-xl transition-colors text-left">
                            A) Option 1
                          </button>
                          <button className="w-full bg-white hover:bg-grass-100 text-primary-800 font-semibold py-3 px-6 rounded-xl transition-colors text-left">
                            B) Option 2
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-primary-600">
                      <span className="font-semibold">Note:</span> Full game includes
                      scoring, levels, and adaptive difficulty
                    </div>
                  </div>
                </div>

                {/* Adapt CTA Overlay */}
                {showAdaptCTA && (
                  <div className="absolute inset-0 bg-primary-900 bg-opacity-95 flex items-center justify-center animate-fade-in">
                    <div className="text-center max-w-2xl px-8">
                      <div className="text-7xl mb-6">✨</div>
                      <h2 className="text-5xl font-bold text-white mb-6">
                        Love This Game?
                      </h2>
                      <p className="text-2xl text-white mb-10 opacity-90">
                        Adapt it to match your lesson plan in just 60 seconds!
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Link
                          href={`/create?template=${game.id}`}
                          className="bg-gradient-to-r from-grass-500 to-grass-600 hover:from-grass-600 hover:to-grass-700 text-white text-xl font-bold py-5 px-12 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                          Adapt This Game
                        </Link>
                        <button
                          onClick={() => setShowAdaptCTA(false)}
                          className="bg-white text-primary-800 text-xl font-bold py-5 px-12 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                          Keep Playing
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/create?template=${game.id}`}
              className="bg-gradient-to-r from-grass-500 to-grass-600 hover:from-grass-600 hover:to-grass-700 text-white text-xl font-bold py-6 px-8 rounded-2xl text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🎨 Customize This Game
            </Link>
            <Link
              href="/library"
              className="bg-white border-2 border-primary-300 hover:border-primary-500 text-primary-700 hover:text-primary-900 text-xl font-bold py-6 px-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse More Games
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
