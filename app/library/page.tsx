'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import FilterBar from '@/components/library/FilterBar';
import GameCard from '@/components/library/GameCard';
import { LIBRARY_GAMES } from '@/types/library';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');

  // Filter games based on search and filters
  const filteredGames = useMemo(() => {
    return LIBRARY_GAMES.filter((game) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.topic.toLowerCase().includes(searchQuery.toLowerCase());

      // Subject filter
      const matchesSubject = !selectedSubject || game.subject === selectedSubject;

      // Grade filter
      const matchesGrade = !selectedGrade || game.gradeLevel === selectedGrade;

      return matchesSearch && matchesSubject && matchesGrade;
    });
  }, [searchQuery, selectedSubject, selectedGrade]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-sunny-50 to-grass-50">
      {/* Header */}
      <nav className="bg-white border-b border-primary-100 px-6 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/library"
              className="text-primary-700 hover:text-primary-900 font-semibold transition-colors"
            >
              Game Library
            </Link>
            <Link
              href="/create"
              className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
            >
              Create Game
            </Link>
            <Link href="/" className="text-primary-700 hover:text-primary-900 font-medium transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-primary-800 mb-4">
              Game Library
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Browse our collection of ready-to-play educational games. Play demos or
              customize any game to match your lesson plans!
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            selectedSubject={selectedSubject}
            selectedGrade={selectedGrade}
            onSearchChange={setSearchQuery}
            onSubjectChange={setSelectedSubject}
            onGradeChange={setSelectedGrade}
            totalGames={LIBRARY_GAMES.length}
            filteredCount={filteredGames.length}
          />

          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-primary-800 mb-2">
                No games found
              </h3>
              <p className="text-primary-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubject('');
                  setSelectedGrade('');
                }}
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-grass-500 to-grass-600 rounded-3xl shadow-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Don&apos;t See What You Need?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Create a custom game from scratch in just 60 seconds!
            </p>
            <Link
              href="/create"
              className="inline-block bg-white text-grass-700 font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Create Custom Game
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-8 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-primary-300">
            &copy; 2024 DreamWeaver. Making learning magical for elementary students
            everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}
