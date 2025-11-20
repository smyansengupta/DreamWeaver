'use client';

import React, { useState } from 'react';
import { GameFormData, GAME_TYPES, GeneratedGame } from '@/types/game';
import GenerationProgress from './GenerationProgress';
import GamePreview from './GamePreview';

interface Step4ReviewProps {
  formData: GameFormData;
  updateFormData: (data: Partial<GameFormData>) => void;
  onEdit: (step: number) => void;
}

export default function Step4Review({ formData, updateFormData, onEdit }: Step4ReviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const gameType = GAME_TYPES.find((t) => t.id === formData.gameType);

  const handleGenerate = () => {
    setIsGenerating(true);
  };

  const handleGenerationComplete = (generatedGame?: GeneratedGame) => {
    if (generatedGame) {
      updateFormData({ generatedGame });
      setShowPreview(true);
    }
    setIsGenerating(false);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    alert('Sharing functionality coming soon!');
  };

  const difficultyEmoji = {
    easy: '😊',
    medium: '😐',
    hard: '😈',
  };

  return (
    <>
      {isGenerating && (
        <GenerationProgress formData={formData} onComplete={handleGenerationComplete} />
      )}
      <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-800 mb-3">
          Review & Generate
        </h2>
        <p className="text-lg text-primary-600">
          Everything look good? Let&apos;s create your game!
        </p>
      </div>

      <div className="space-y-6">
        {/* Image Preview */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-primary-800">Your Game Sketch</h3>
            <button
              onClick={() => onEdit(1)}
              className="text-primary-600 hover:text-primary-800 font-semibold text-sm transition-colors"
            >
              Edit ✏️
            </button>
          </div>
          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Game sketch"
              className="w-full h-48 object-contain bg-primary-50 rounded-xl"
            />
          )}
        </div>

        {/* Learning Details */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-primary-800">Learning Details</h3>
            <button
              onClick={() => onEdit(2)}
              className="text-primary-600 hover:text-primary-800 font-semibold text-sm transition-colors"
            >
              Edit ✏️
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-primary-600 mb-1">Subject</p>
              <p className="font-semibold text-primary-800">{formData.subject}</p>
            </div>
            <div>
              <p className="text-sm text-primary-600 mb-1">Grade Level</p>
              <p className="font-semibold text-primary-800">{formData.gradeLevel}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-primary-600 mb-1">Topic</p>
              <p className="font-semibold text-primary-800">{formData.topic}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-primary-600 mb-1">Learning Objective</p>
              <p className="text-primary-800">{formData.learningObjective}</p>
            </div>
            {formData.vocabularyContent && (
              <div className="md:col-span-2">
                <p className="text-sm text-primary-600 mb-1">Vocabulary/Content</p>
                <p className="text-primary-800">{formData.vocabularyContent}</p>
              </div>
            )}
          </div>
        </div>

        {/* Game Settings */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-primary-800">Game Settings</h3>
            <button
              onClick={() => onEdit(3)}
              className="text-primary-600 hover:text-primary-800 font-semibold text-sm transition-colors"
            >
              Edit ✏️
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
              <div className="text-4xl">{gameType?.icon}</div>
              <div>
                <p className="text-sm text-primary-600">Game Type</p>
                <p className="font-semibold text-primary-800">{gameType?.label}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
              <div className="text-4xl">{difficultyEmoji[formData.difficulty]}</div>
              <div>
                <p className="text-sm text-primary-600">Difficulty</p>
                <p className="font-semibold text-primary-800 capitalize">
                  {formData.difficulty}
                </p>
              </div>
            </div>
            <div className="p-4 bg-primary-50 rounded-xl">
              <p className="text-sm text-primary-600 mb-2">Educational Features</p>
              <div className="flex flex-wrap gap-2">
                {formData.includeHints && (
                  <span className="bg-grass-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Hints
                  </span>
                )}
                {formData.showProgressFeedback && (
                  <span className="bg-grass-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Progress
                  </span>
                )}
                {formData.addEncouragingMessages && (
                  <span className="bg-grass-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Encouragement
                  </span>
                )}
                {!formData.includeHints &&
                  !formData.showProgressFeedback &&
                  !formData.addEncouragingMessages && (
                    <span className="text-primary-600 text-sm">None selected</span>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Auto-generated description */}
        <div className="bg-gradient-to-br from-sunny-100 to-sunny-200 rounded-3xl shadow-xl p-8 border-2 border-sunny-300">
          <h3 className="text-xl font-bold text-primary-800 mb-4">
            🎮 Your Game Description
          </h3>
          <p className="text-primary-800 leading-relaxed">
            A {formData.difficulty} difficulty {gameType?.label.toLowerCase()} game for{' '}
            {formData.gradeLevel} students learning about {formData.topic.toLowerCase()} in{' '}
            {formData.subject}. {formData.learningObjective}
          </p>
        </div>

        {/* Generate button */}
        <div className="text-center pt-6">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`
              relative group bg-gradient-to-r from-sunny-500 to-sunny-600
              hover:from-sunny-600 hover:to-sunny-700
              text-white text-2xl font-bold py-6 px-16 rounded-full
              shadow-2xl transition-all duration-300 transform
              ${isGenerating ? 'scale-95 opacity-70 cursor-not-allowed' : 'hover:scale-105'}
            `}
          >
            {isGenerating ? (
              <span className="flex items-center gap-3">
                <svg
                  className="animate-spin h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Your Game...
              </span>
            ) : (
              <span>
                ✨ Generate Learning Game
                <svg
                  className="inline-block ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            )}
          </button>

          <p className="text-primary-600 mt-4">
            {isGenerating ? (
              <span className="font-semibold">⏱️ Generating... approximately 45 seconds remaining</span>
            ) : (
              <span>⏱️ Estimated time: 60 seconds</span>
            )}
          </p>
        </div>
      </div>
    </div>

    {/* Game Preview Modal */}
    {showPreview && formData.generatedGame && (
      <GamePreview
        game={formData.generatedGame}
        onClose={handleClosePreview}
        onShare={handleShare}
      />
    )}
    </>
  );
}
