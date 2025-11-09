'use client';

import React, { useState, useEffect } from 'react';
import { GameFormData } from '@/types/game';

interface GenerationProgressProps {
  formData: GameFormData;
  onComplete: () => void;
}

interface Stage {
  emoji: string;
  title: string;
  subtext: string;
  progressStart: number;
  progressEnd: number;
}

const funFacts = [
  "Did you know? Students retain 90% more when learning through games!",
  "Gamification increases engagement by 60% in elementary classrooms",
  "Your students are going to LOVE this!",
  "Game-based learning improves problem-solving skills by 75%",
  "Students spend 3x more time on game-based activities",
  "Educational games boost motivation and reduce test anxiety",
  "You're creating something magical for your students!",
];

export default function GenerationProgress({ formData, onComplete }: GenerationProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const stages: Stage[] = [
    {
      emoji: '🔍',
      title: 'Reading your sketch...',
      subtext: 'Identifying game elements and learning objectives',
      progressStart: 0,
      progressEnd: 15,
    },
    {
      emoji: '🎨',
      title: 'Designing the learning experience...',
      subtext: 'Creating age-appropriate visuals and mechanics',
      progressStart: 15,
      progressEnd: 35,
    },
    {
      emoji: '📚',
      title: 'Adding educational content...',
      subtext: `Embedding ${formData.topic} into gameplay`,
      progressStart: 35,
      progressEnd: 60,
    },
    {
      emoji: '🎮',
      title: 'Building your game...',
      subtext: `Testing difficulty for ${formData.gradeLevel} students`,
      progressStart: 60,
      progressEnd: 90,
    },
    {
      emoji: '✅',
      title: 'Ready for students!',
      subtext: 'Your learning game is ready to share',
      progressStart: 90,
      progressEnd: 100,
    },
  ];

  const currentStage = stages.find(
    (stage) => progress >= stage.progressStart && progress < stage.progressEnd
  ) || stages[stages.length - 1];

  useEffect(() => {
    // Prevent body scroll when overlay is active
    document.body.style.overflow = 'hidden';

    // Progress timer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setShowConfetti(true);
          setTimeout(() => {
            setShowSuccess(true);
          }, 500);
          setTimeout(() => {
            onComplete();
          }, 4000);
          return 100;
        }
        return prev + 100 / 60; // 60 seconds total
      });
    }, 1000);

    // Fun facts rotation
    const factsInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 5000);

    return () => {
      // Restore body scroll when component unmounts
      document.body.style.overflow = 'auto';
      clearInterval(progressInterval);
      clearInterval(factsInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-primary-600 via-grass-500 to-sunny-500 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white opacity-10 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white opacity-10 rounded-full animate-bounce-slow"></div>
      </div>

      {!showSuccess ? (
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          {/* Current Stage */}
          <div className="mb-10">
            <div className="text-5xl mb-5 animate-bounce-slow">{currentStage.emoji}</div>
            <h2 className="text-4xl font-bold text-white mb-3">{currentStage.title}</h2>
            <p className="text-lg text-white opacity-90">{currentStage.subtext}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10 max-w-[500px] mx-auto">
            <div className="bg-white bg-opacity-30 rounded-full h-6 overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-sunny-400 to-sunny-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                style={{ width: `${progress}%` }}
              >
                <span className="text-white font-bold text-base">{Math.round(progress)}%</span>
              </div>
            </div>
            <p className="text-white text-base mt-2 opacity-75">
              Estimated time: {Math.max(0, Math.ceil(60 - (progress / 100) * 60))} seconds
            </p>
          </div>

          {/* Fun Facts */}
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-5 border-2 border-white border-opacity-30 max-w-[500px] mx-auto">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div className="text-left">
                <p className="text-white text-base leading-relaxed transition-opacity duration-500">
                  {funFacts[currentFactIndex]}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Success Screen */
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-20px',
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                >
                  {['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}

          <div className="animate-scale-in">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-5 shadow-2xl animate-bounce-slow">
                <div className="text-4xl">🎉</div>
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              Success!
            </h2>
            <p className="text-xl text-white mb-3 opacity-95">
              Your game is ready for students!
            </p>
            <p className="text-lg text-white opacity-80 mb-8">
              <span className="font-bold">{formData.topic}</span> • {formData.gradeLevel} •{' '}
              {formData.subject}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button className="group bg-white text-grass-700 font-bold text-lg py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center gap-3">
                  🎮 Test It First
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </button>
              <button className="group bg-sunny-500 hover:bg-sunny-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center gap-3">
                  📤 Share with Students
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 border-2 border-white border-opacity-30">
              <p className="text-white text-base">
                ✨ Your game has been saved to your dashboard
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
