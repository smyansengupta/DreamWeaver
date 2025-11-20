'use client';

import React, { useState } from 'react';
import { SketchAnalysis } from '@/types/game';

interface SketchAnalysisEditModalProps {
  analysis: SketchAnalysis;
  onSave: (updatedAnalysis: SketchAnalysis) => void;
  onCancel: () => void;
}

export default function SketchAnalysisEditModal({
  analysis,
  onSave,
  onCancel,
}: SketchAnalysisEditModalProps) {
  const [editedAnalysis, setEditedAnalysis] = useState<SketchAnalysis>({ ...analysis });

  const handleSave = () => {
    onSave(editedAnalysis);
  };

  const updateCharacter = (field: 'type' | 'style', value: string) => {
    setEditedAnalysis({
      ...editedAnalysis,
      character: {
        ...editedAnalysis.character,
        type: editedAnalysis.character?.type || '',
        style: editedAnalysis.character?.style || '',
        [field]: value,
      },
    });
  };

  const updateGameStructure = (value: string) => {
    setEditedAnalysis({ ...editedAnalysis, game_structure: value });
  };

  const updateGoal = (field: 'type' | 'message', value: string) => {
    setEditedAnalysis({
      ...editedAnalysis,
      goal: {
        ...editedAnalysis.goal,
        type: editedAnalysis.goal?.type || '',
        message: editedAnalysis.goal?.message || '',
        [field]: value,
      },
    });
  };

  const updateEducationalElement = (
    category: 'problems' | 'correct_answers' | 'incorrect_answers' | 'vocabulary_words' | 'facts',
    index: number,
    value: string
  ) => {
    const elements = { ...editedAnalysis.educational_elements };
    const items = elements[category] || [];
    items[index] = value;
    setEditedAnalysis({
      ...editedAnalysis,
      educational_elements: { ...elements, [category]: items },
    });
  };

  const addEducationalElement = (
    category: 'problems' | 'correct_answers' | 'incorrect_answers' | 'vocabulary_words' | 'facts'
  ) => {
    const elements = { ...editedAnalysis.educational_elements };
    const items = elements[category] || [];
    items.push('');
    setEditedAnalysis({
      ...editedAnalysis,
      educational_elements: { ...elements, [category]: items },
    });
  };

  const removeEducationalElement = (
    category: 'problems' | 'correct_answers' | 'incorrect_answers' | 'vocabulary_words' | 'facts',
    index: number
  ) => {
    const elements = { ...editedAnalysis.educational_elements };
    const items = elements[category] || [];
    items.splice(index, 1);
    setEditedAnalysis({
      ...editedAnalysis,
      educational_elements: { ...elements, [category]: items },
    });
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Edit Game Elements</h2>
              <p className="text-primary-100">Adjust the details to match your lesson plan</p>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Character */}
          <div className="bg-primary-50 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-primary-800 mb-4 flex items-center gap-2">
              <span>👦</span> Player Character
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">
                  Character Type
                </label>
                <input
                  type="text"
                  value={editedAnalysis.character?.type || ''}
                  onChange={(e) => updateCharacter('type', e.target.value)}
                  placeholder="e.g., student, robot, animal"
                  className="w-full px-4 py-2 rounded-xl border-2 border-primary-200 focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">
                  Character Style
                </label>
                <input
                  type="text"
                  value={editedAnalysis.character?.style || ''}
                  onChange={(e) => updateCharacter('style', e.target.value)}
                  placeholder="e.g., friendly, cartoonish"
                  className="w-full px-4 py-2 rounded-xl border-2 border-primary-200 focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Game Structure */}
          <div className="bg-primary-50 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-primary-800 mb-4 flex items-center gap-2">
              <span>🎮</span> Game Structure
            </h3>
            <textarea
              value={editedAnalysis.game_structure || ''}
              onChange={(e) => updateGameStructure(e.target.value)}
              placeholder="Describe the game type and layout"
              rows={2}
              className="w-full px-4 py-2 rounded-xl border-2 border-primary-200 focus:border-primary-500 focus:outline-none resize-none"
            />
          </div>

          {/* Goal */}
          <div className="bg-primary-50 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-primary-800 mb-4 flex items-center gap-2">
              <span>🏆</span> Goal
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">
                  Goal Type
                </label>
                <input
                  type="text"
                  value={editedAnalysis.goal?.type || ''}
                  onChange={(e) => updateGoal('type', e.target.value)}
                  placeholder="e.g., finish line, trophy"
                  className="w-full px-4 py-2 rounded-xl border-2 border-primary-200 focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">
                  Success Message
                </label>
                <input
                  type="text"
                  value={editedAnalysis.goal?.message || ''}
                  onChange={(e) => updateGoal('message', e.target.value)}
                  placeholder="e.g., Great job!"
                  className="w-full px-4 py-2 rounded-xl border-2 border-primary-200 focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-sunny-50 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-primary-800 mb-4 flex items-center gap-2">
              <span>✏️</span> Educational Content
            </h3>

            {/* Problems */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-primary-700">Problems/Questions</label>
                <button
                  onClick={() => addEducationalElement('problems')}
                  className="text-xs bg-primary-500 text-white px-3 py-1 rounded-full hover:bg-primary-600 transition-all"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {(editedAnalysis.educational_elements?.problems || []).map((problem, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={problem}
                      onChange={(e) => updateEducationalElement('problems', idx, e.target.value)}
                      placeholder="e.g., 3 × 4 = ?"
                      className="flex-1 px-3 py-2 rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:outline-none"
                    />
                    <button
                      onClick={() => removeEducationalElement('problems', idx)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Correct Answers */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-primary-700">Correct Answers</label>
                <button
                  onClick={() => addEducationalElement('correct_answers')}
                  className="text-xs bg-grass-500 text-white px-3 py-1 rounded-full hover:bg-grass-600 transition-all"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {(editedAnalysis.educational_elements?.correct_answers || []).map((answer, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => updateEducationalElement('correct_answers', idx, e.target.value)}
                      placeholder="e.g., 12"
                      className="flex-1 px-3 py-2 rounded-lg border-2 border-grass-200 focus:border-grass-500 focus:outline-none"
                    />
                    <button
                      onClick={() => removeEducationalElement('correct_answers', idx)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary Words */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-primary-700">Vocabulary Words</label>
                <button
                  onClick={() => addEducationalElement('vocabulary_words')}
                  className="text-xs bg-primary-500 text-white px-3 py-1 rounded-full hover:bg-primary-600 transition-all"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {(editedAnalysis.educational_elements?.vocabulary_words || []).map((word, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={word}
                      onChange={(e) => updateEducationalElement('vocabulary_words', idx, e.target.value)}
                      placeholder="e.g., photosynthesis"
                      className="flex-1 px-3 py-2 rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:outline-none"
                    />
                    <button
                      onClick={() => removeEducationalElement('vocabulary_words', idx)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t-2 border-primary-100 p-6 rounded-b-3xl">
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold py-3 px-6 rounded-full transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-grass-500 to-grass-600 hover:from-grass-600 hover:to-grass-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
