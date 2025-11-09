'use client';

import React from 'react';

interface FilterBarProps {
  searchQuery: string;
  selectedSubject: string;
  selectedGrade: string;
  onSearchChange: (query: string) => void;
  onSubjectChange: (subject: string) => void;
  onGradeChange: (grade: string) => void;
  totalGames: number;
  filteredCount: number;
}

export default function FilterBar({
  searchQuery,
  selectedSubject,
  selectedGrade,
  onSearchChange,
  onSubjectChange,
  onGradeChange,
  totalGames,
  filteredCount,
}: FilterBarProps) {
  const handleReset = () => {
    onSearchChange('');
    onSubjectChange('');
    onGradeChange('');
  };

  const hasActiveFilters = searchQuery || selectedSubject || selectedGrade;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Find a game..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Subject Filter */}
        <div className="md:w-56">
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full px-4 py-4 text-lg border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
          >
            <option value="">All Subjects</option>
            <option value="Math">Math</option>
            <option value="Reading">Reading</option>
            <option value="Science">Science</option>
            <option value="Social Studies">Social Studies</option>
          </select>
        </div>

        {/* Grade Level Filter */}
        <div className="md:w-48">
          <select
            value={selectedGrade}
            onChange={(e) => onGradeChange(e.target.value)}
            className="w-full px-4 py-4 text-lg border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
          >
            <option value="">All Grades</option>
            <option value="K-2">K-2nd Grade</option>
            <option value="3-5">3rd-5th Grade</option>
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="md:w-auto px-6 py-4 bg-primary-100 hover:bg-primary-200 text-primary-700 font-semibold rounded-xl transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-primary-600">
          {filteredCount === totalGames ? (
            <span>
              <span className="font-bold text-primary-800">{totalGames}</span> ready-to-play
              games
            </span>
          ) : (
            <span>
              Showing <span className="font-bold text-primary-800">{filteredCount}</span> of{' '}
              <span className="font-bold text-primary-800">{totalGames}</span> games
            </span>
          )}
        </p>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm">
            {selectedSubject && (
              <span className="bg-grass-500 text-white px-3 py-1 rounded-full font-semibold">
                {selectedSubject}
              </span>
            )}
            {selectedGrade && (
              <span className="bg-sunny-500 text-white px-3 py-1 rounded-full font-semibold">
                {selectedGrade}
              </span>
            )}
            {searchQuery && (
              <span className="bg-primary-500 text-white px-3 py-1 rounded-full font-semibold">
                &quot;{searchQuery}&quot;
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
