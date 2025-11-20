'use client';

import React, { useState } from 'react';
import { SketchAnalysis, EducationalElements } from '@/types/game';

interface SketchAnalysisPreviewProps {
  analysis: SketchAnalysis;
  onApprove: () => void;
  onEdit: () => void;
  onAnalyzeAgain: () => void;
}

export default function SketchAnalysisPreview({
  analysis,
  onApprove,
  onEdit,
  onAnalyzeAgain,
}: SketchAnalysisPreviewProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getCharacterIcon = () => {
    const type = analysis.character?.type?.toLowerCase() || '';
    if (type.includes('student') || type.includes('kid') || type.includes('child')) return '👦';
    if (type.includes('robot')) return '🤖';
    if (type.includes('cat') || type.includes('animal')) return '🐱';
    if (type.includes('dog')) return '🐶';
    if (type.includes('alien')) return '👽';
    return '🎮';
  };

  const getGameStructureIcon = () => {
    const structure = analysis.game_structure?.toLowerCase() || '';
    if (structure.includes('platform')) return '🎮';
    if (structure.includes('runner')) return '🏃';
    if (structure.includes('maze') || structure.includes('path')) return '🌀';
    if (structure.includes('quiz') || structure.includes('question')) return '🎯';
    return '🎲';
  };

  const getPlatformCount = () => analysis.platforms?.length || 0;
  const getObstacleCount = () => analysis.obstacles?.length || 0;
  const getCollectibleCount = () => analysis.collectibles?.length || 0;

  const getEducationalContentSummary = () => {
    const elements = analysis.educational_elements;
    if (!elements) return null;

    const items = [];
    if (elements.problems && elements.problems.length > 0) {
      items.push(`${elements.problems.length} problem${elements.problems.length > 1 ? 's' : ''}`);
    }
    if (elements.vocabulary_words && elements.vocabulary_words.length > 0) {
      items.push(`${elements.vocabulary_words.length} vocabulary word${elements.vocabulary_words.length > 1 ? 's' : ''}`);
    }
    if (elements.facts && elements.facts.length > 0) {
      items.push(`${elements.facts.length} fact${elements.facts.length > 1 ? 's' : ''}`);
    }

    return items.length > 0 ? items.join(', ') : 'Ready to add your content';
  };

  return (
    <div className="bg-gradient-to-br from-grass-50 to-primary-50 rounded-3xl p-6 border-4 border-grass-400 shadow-2xl animate-scale-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-grass-500 text-white px-6 py-3 rounded-full font-bold text-lg mb-4 shadow-lg">
          <span className="text-2xl">✨</span>
          <span>I found these game elements!</span>
        </div>
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="bg-white rounded-2xl p-5 mb-6 border-2 border-grass-300">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🎨</div>
            <div>
              <p className="text-primary-800 leading-relaxed">{analysis.summary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Key Elements Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Character */}
        {analysis.character && (
          <div className="bg-white rounded-2xl p-5 border-2 border-primary-200 hover:border-primary-400 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{getCharacterIcon()}</span>
              <div>
                <p className="text-sm text-primary-600 font-semibold">Player Character</p>
                <p className="text-lg font-bold text-primary-800 capitalize">
                  {analysis.character.type}
                </p>
                {analysis.character.style && (
                  <p className="text-sm text-primary-600">{analysis.character.style}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Game Structure */}
        {analysis.game_structure && (
          <div className="bg-white rounded-2xl p-5 border-2 border-primary-200 hover:border-primary-400 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{getGameStructureIcon()}</span>
              <div>
                <p className="text-sm text-primary-600 font-semibold">Game Type</p>
                <p className="text-base font-bold text-primary-800">
                  {analysis.game_structure}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Platforms */}
        {getPlatformCount() > 0 && (
          <div className="bg-white rounded-2xl p-5 border-2 border-primary-200 hover:border-primary-400 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🟩</span>
              <div>
                <p className="text-sm text-primary-600 font-semibold">Platforms/Paths</p>
                <p className="text-lg font-bold text-primary-800">
                  {getPlatformCount()} found
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Obstacles */}
        {getObstacleCount() > 0 && (
          <div className="bg-white rounded-2xl p-5 border-2 border-primary-200 hover:border-primary-400 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <p className="text-sm text-primary-600 font-semibold">Obstacles</p>
                <p className="text-lg font-bold text-primary-800">
                  {getObstacleCount()} found
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collectibles */}
        {getCollectibleCount() > 0 && (
          <div className="bg-white rounded-2xl p-5 border-2 border-primary-200 hover:border-primary-400 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <div>
                <p className="text-sm text-primary-600 font-semibold">Collectibles</p>
                <p className="text-lg font-bold text-primary-800">
                  {getCollectibleCount()} found
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Goal */}
        {analysis.goal && (
          <div className="bg-white rounded-2xl p-5 border-2 border-primary-200 hover:border-primary-400 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="text-sm text-primary-600 font-semibold">Goal</p>
                <p className="text-lg font-bold text-primary-800 capitalize">
                  {analysis.goal.type}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Educational Content */}
      {analysis.educational_elements && (
        <div className="bg-sunny-100 rounded-2xl p-5 mb-6 border-2 border-sunny-300">
          <div className="flex items-start gap-3">
            <span className="text-3xl">✏️</span>
            <div className="flex-1">
              <p className="text-sm text-primary-600 font-semibold mb-2">Learning Content</p>
              <p className="text-lg font-bold text-primary-800 mb-3">
                {getEducationalContentSummary()}
              </p>

              {/* Show details toggle */}
              {(analysis.educational_elements.problems ||
                analysis.educational_elements.vocabulary_words ||
                analysis.educational_elements.facts) && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-primary-600 hover:text-primary-800 text-sm font-semibold underline"
                >
                  {showDetails ? 'Hide details' : 'Show details'}
                </button>
              )}

              {/* Expandable details */}
              {showDetails && (
                <div className="mt-4 space-y-3">
                  {analysis.educational_elements.problems && analysis.educational_elements.problems.length > 0 && (
                    <div>
                      <p className="text-xs text-primary-600 font-semibold mb-1">Problems/Questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.educational_elements.problems.map((problem, idx) => (
                          <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-primary-800">
                            {problem}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.educational_elements.correct_answers && analysis.educational_elements.correct_answers.length > 0 && (
                    <div>
                      <p className="text-xs text-primary-600 font-semibold mb-1">Correct Answers:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.educational_elements.correct_answers.map((answer, idx) => (
                          <span key={idx} className="bg-grass-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ✓ {answer}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.educational_elements.vocabulary_words && analysis.educational_elements.vocabulary_words.length > 0 && (
                    <div>
                      <p className="text-xs text-primary-600 font-semibold mb-1">Vocabulary:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.educational_elements.vocabulary_words.map((word, idx) => (
                          <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-primary-800">
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onApprove}
          className="flex-1 bg-gradient-to-r from-grass-500 to-grass-600 hover:from-grass-600 hover:to-grass-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-xl">👍</span>
            <span>This looks good! Continue</span>
          </span>
        </button>

        <button
          onClick={onEdit}
          className="flex-1 bg-sunny-500 hover:bg-sunny-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-xl">✏️</span>
            <span>Let me adjust</span>
          </span>
        </button>

        <button
          onClick={onAnalyzeAgain}
          className="bg-primary-100 hover:bg-primary-200 text-primary-700 font-semibold py-3 px-6 rounded-full transition-all duration-300"
        >
          🔄 Analyze again
        </button>
      </div>

      {/* Help text */}
      <p className="text-center text-sm text-primary-600 mt-4">
        💡 I'll use these elements to build your interactive learning game
      </p>
    </div>
  );
}
