'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProgressIndicator from '@/components/create/ProgressIndicator';
import Step1Upload from '@/components/create/Step1Upload';
import Step2Details from '@/components/create/Step2Details';
import Step3Settings from '@/components/create/Step3Settings';
import Step4Review from '@/components/create/Step4Review';
import Logo from '@/components/Logo';
import { GameFormData } from '@/types/game';

const TOTAL_STEPS = 4;

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GameFormData>({
    subject: '',
    gradeLevel: '',
    topic: '',
    learningObjective: '',
    vocabularyContent: '',
    gameType: '',
    difficulty: 'medium',
    includeHints: true,
    showProgressFeedback: true,
    addEncouragingMessages: true,
  });

  const updateFormData = (data: Partial<GameFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const canProceedToNextStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.imagePreview;
      case 2:
        return !!(
          formData.subject &&
          formData.gradeLevel &&
          formData.topic &&
          formData.learningObjective
        );
      case 3:
        return !!formData.gameType;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-sunny-50 to-grass-50">
      {/* Header */}
      <nav className="bg-white border-b border-primary-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/library"
              className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
            >
              Game Library
            </Link>
            <Link
              href="/"
              className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12 px-4">
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Step Content */}
        <div className="mb-12">
          {currentStep === 1 && (
            <Step1Upload formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <Step2Details formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && (
            <Step3Settings formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && (
            <Step4Review
              formData={formData}
              updateFormData={updateFormData}
              onEdit={handleEdit}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < TOTAL_STEPS && (
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`
                px-8 py-4 font-bold rounded-full transition-all duration-300
                ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-primary-700 hover:bg-primary-100 border-2 border-primary-300'
                }
              `}
            >
              ← Back
            </button>

            <div className="flex-1 text-center">
              <p className="text-sm text-primary-600">
                Step {currentStep} of {TOTAL_STEPS}
              </p>
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
              className={`
                px-8 py-4 font-bold rounded-full transition-all duration-300 transform
                ${
                  canProceedToNextStep()
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {currentStep === TOTAL_STEPS - 1 ? 'Review →' : 'Continue →'}
            </button>
          </div>
        )}

        {/* Help section */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-primary-100">
            <div className="flex gap-4 items-start">
              <div className="text-3xl">💬</div>
              <div>
                <p className="font-bold text-primary-800 mb-2">Need Help?</p>
                <p className="text-sm text-primary-700">
                  Watch our{' '}
                  <a href="#" className="text-primary-600 underline hover:text-primary-800">
                    quick tutorial video
                  </a>{' '}
                  or check out{' '}
                  <a href="#" className="text-primary-600 underline hover:text-primary-800">
                    example games
                  </a>{' '}
                  for inspiration. Creating your first game takes less than 5 minutes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
