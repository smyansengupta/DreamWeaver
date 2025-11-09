'use client';

import React from 'react';
import Link from 'next/link';
import { LibraryGame } from '@/types/library';

interface GameCardProps {
  game: LibraryGame;
}

const subjectColors = {
  Math: 'bg-blue-500',
  Reading: 'bg-purple-500',
  Science: 'bg-green-500',
  'Social Studies': 'bg-orange-500',
};

const gameTypeLabels = {
  platformer: 'Platformer',
  runner: 'Runner',
  puzzle: 'Puzzle',
  quiz: 'Quiz',
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Game Thumbnail */}
      <div
        className={`${game.backgroundColor} h-48 relative flex items-center justify-center overflow-hidden`}
      >
        <div className="text-8xl animate-float">{game.icon}</div>

        {/* Badges */}
        <div className="absolute top-3 left-3">
          <span
            className={`${subjectColors[game.subject]} text-white text-xs font-bold px-3 py-1 rounded-full`}
          >
            {game.subject}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white text-primary-800 text-xs font-bold px-3 py-1 rounded-full">
            {game.gradeLevel}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-800 mb-2 line-clamp-1">
          {game.title}
        </h3>

        <p className="text-sm text-primary-600 mb-1">
          <span className="font-semibold">Topic:</span> {game.topic}
        </p>

        <p className="text-sm text-primary-700 mb-4 line-clamp-2 h-10">
          {game.description}
        </p>

        {/* Game Info Pills */}
        <div className="flex items-center gap-2 mb-4 text-xs">
          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-semibold">
            {gameTypeLabels[game.gameType]}
          </span>
          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-semibold capitalize">
            {game.difficulty}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/library/${game.id}`}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-all duration-300 transform group-hover:scale-105"
          >
            Play Demo
          </Link>
          <Link
            href={`/create?template=${game.id}`}
            className="flex-1 bg-grass-500 hover:bg-grass-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-all duration-300 transform group-hover:scale-105"
          >
            Customize
          </Link>
        </div>
      </div>
    </div>
  );
}
