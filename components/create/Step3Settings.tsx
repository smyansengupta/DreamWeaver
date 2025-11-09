'use client';

import React from 'react';
import { GameFormData, GAME_TYPES, DIFFICULTY_LEVELS } from '@/types/game';

interface Step3SettingsProps {
  formData: GameFormData;
  updateFormData: (data: Partial<GameFormData>) => void;
}

export default function Step3Settings({ formData, updateFormData }: Step3SettingsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-800 mb-3">
          Game Settings
        </h2>
        <p className="text-lg text-primary-600">
          Choose how students will play and learn
        </p>
      </div>

      <div className="space-y-8">
        {/* Game Type */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <label className="block text-xl font-bold text-primary-800 mb-6">
            Game Type <span className="text-sunny-600">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GAME_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => updateFormData({ gameType: type.id as any })}
                className={`
                  relative p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105
                  ${
                    formData.gameType === type.id
                      ? 'border-grass-500 bg-grass-50 shadow-lg scale-105'
                      : 'border-primary-200 bg-white hover:border-primary-400 hover:shadow-md'
                  }
                `}
              >
                {formData.gameType === type.id && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-grass-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
                <div className="text-5xl mb-3">{type.icon}</div>
                <p className="font-bold text-primary-800 mb-1">{type.label}</p>
                <p className="text-sm text-primary-600">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <label className="block text-xl font-bold text-primary-800 mb-6">
            Difficulty Level <span className="text-sunny-600">*</span>
          </label>

          {/* Visual difficulty selector */}
          <div className="space-y-4">
            {DIFFICULTY_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => updateFormData({ difficulty: level.value as any })}
                className={`
                  w-full p-6 rounded-2xl border-3 transition-all duration-300 text-left
                  flex items-center gap-6
                  ${
                    formData.difficulty === level.value
                      ? 'border-grass-500 bg-grass-50 shadow-lg'
                      : 'border-primary-200 bg-white hover:border-primary-400 hover:shadow-md'
                  }
                `}
              >
                <div className="text-6xl">{level.emoji}</div>
                <div className="flex-1">
                  <p className="text-xl font-bold text-primary-800 mb-1">{level.label}</p>
                  <p className="text-primary-600">{level.description}</p>
                </div>
                {formData.difficulty === level.value && (
                  <div className="w-8 h-8 bg-grass-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Educational Features */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <label className="block text-xl font-bold text-primary-800 mb-6">
            Educational Features
          </label>
          <div className="space-y-4">
            {/* Include Hints */}
            <label className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.includeHints}
                onChange={(e) => updateFormData({ includeHints: e.target.checked })}
                className="w-6 h-6 mt-1 text-grass-500 border-2 border-primary-300 rounded focus:ring-grass-500 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-bold text-primary-800 mb-1">Include hints for students</p>
                <p className="text-sm text-primary-600">
                  Provide helpful clues when students get stuck
                </p>
              </div>
            </label>

            {/* Show Progress */}
            <label className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.showProgressFeedback}
                onChange={(e) =>
                  updateFormData({ showProgressFeedback: e.target.checked })
                }
                className="w-6 h-6 mt-1 text-grass-500 border-2 border-primary-300 rounded focus:ring-grass-500 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-bold text-primary-800 mb-1">Show progress feedback</p>
                <p className="text-sm text-primary-600">
                  Display score, level, and achievement indicators
                </p>
              </div>
            </label>

            {/* Encouraging Messages */}
            <label className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.addEncouragingMessages}
                onChange={(e) =>
                  updateFormData({ addEncouragingMessages: e.target.checked })
                }
                className="w-6 h-6 mt-1 text-grass-500 border-2 border-primary-300 rounded focus:ring-grass-500 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-bold text-primary-800 mb-1">Add encouraging messages</p>
                <p className="text-sm text-primary-600">
                  &quot;Great job!&quot; &quot;Keep going!&quot; messages to boost confidence
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Helper tip */}
        <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
          <div className="flex gap-4">
            <div className="text-3xl">🎯</div>
            <div>
              <p className="font-bold text-primary-800 mb-2">Recommendation</p>
              <p className="text-sm text-primary-700">
                We recommend enabling all educational features for the best learning experience.
                Students stay more engaged and learn better with feedback and encouragement!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
