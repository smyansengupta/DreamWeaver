'use client';

import React from 'react';
import { GameFormData, SUBJECTS, GRADE_LEVELS } from '@/types/game';

interface Step2DetailsProps {
  formData: GameFormData;
  updateFormData: (data: Partial<GameFormData>) => void;
}

export default function Step2Details({ formData, updateFormData }: Step2DetailsProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-800 mb-3">
          Learning Details
        </h2>
        <p className="text-lg text-primary-600">
          Tell us about what students will learn
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
        {/* Subject */}
        <div>
          <label className="block text-lg font-bold text-primary-800 mb-3">
            Subject <span className="text-sunny-600">*</span>
          </label>
          <select
            value={formData.subject}
            onChange={(e) => updateFormData({ subject: e.target.value })}
            className="w-full px-4 py-4 text-lg border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors bg-white"
            required
          >
            <option value="">Select a subject...</option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Grade Level */}
        <div>
          <label className="block text-lg font-bold text-primary-800 mb-3">
            Grade Level <span className="text-sunny-600">*</span>
          </label>
          <select
            value={formData.gradeLevel}
            onChange={(e) => updateFormData({ gradeLevel: e.target.value })}
            className="w-full px-4 py-4 text-lg border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors bg-white"
            required
          >
            <option value="">Select a grade level...</option>
            {GRADE_LEVELS.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-lg font-bold text-primary-800 mb-3">
            Topic <span className="text-sunny-600">*</span>
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => updateFormData({ topic: e.target.value })}
            placeholder="e.g., Multiplication tables 3-5"
            className="w-full px-4 py-4 text-lg border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
            required
          />
          <p className="text-sm text-primary-500 mt-2 ml-1">
            💡 Be specific so the game matches your lesson plan
          </p>
        </div>

        {/* Learning Objective */}
        <div>
          <label className="block text-lg font-bold text-primary-800 mb-3">
            Learning Objective <span className="text-sunny-600">*</span>
          </label>
          <textarea
            value={formData.learningObjective}
            onChange={(e) => updateFormData({ learningObjective: e.target.value })}
            placeholder="Students will practice basic multiplication and improve recall speed"
            className="w-full px-4 py-4 text-lg border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors resize-none"
            rows={3}
            required
          />
          <p className="text-sm text-primary-500 mt-2 ml-1">
            What should students learn from this game?
          </p>
        </div>

        {/* Vocabulary/Content */}
        <div>
          <label className="block text-lg font-bold text-primary-800 mb-3">
            Vocabulary/Content
          </label>
          <textarea
            value={formData.vocabularyContent}
            onChange={(e) => updateFormData({ vocabularyContent: e.target.value })}
            placeholder="3x1=3, 3x2=6, 3x3=9, 3x4=12, 3x5=15"
            className="w-full px-4 py-4 text-lg border-2 border-primary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors resize-none"
            rows={4}
          />
          <p className="text-sm text-primary-500 mt-2 ml-1">
            Any specific content, words, or facts to include?
          </p>
        </div>

        {/* Helper card */}
        <div className="bg-sunny-50 border-2 border-sunny-200 rounded-xl p-6 mt-6">
          <div className="flex gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <p className="font-bold text-primary-800 mb-2">Quick Tip</p>
              <p className="text-sm text-primary-700">
                The more specific you are, the better your game will align with your lesson.
                Think about what you&apos;d normally put on a worksheet - that works great here too!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
