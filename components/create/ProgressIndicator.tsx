import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps: Step[] = [
  { number: 1, title: 'Upload Drawing', description: 'Add your sketch' },
  { number: 2, title: 'Learning Details', description: 'Subject & grade' },
  { number: 3, title: 'Game Settings', description: 'Choose game type' },
  { number: 4, title: 'Review & Generate', description: 'Create your game' },
];

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="absolute top-5 left-0 right-0 h-2 bg-primary-100 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-grass-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>

        {/* Step indicators */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            const isUpcoming = step.number > currentStep;

            return (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    transition-all duration-300 relative z-10
                    ${isCompleted ? 'bg-grass-500 text-white scale-110' : ''}
                    ${isCurrent ? 'bg-primary-500 text-white scale-125 shadow-lg' : ''}
                    ${isUpcoming ? 'bg-white border-2 border-primary-200 text-primary-400' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6"
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
                  ) : (
                    step.number
                  )}
                </div>
                <div className="mt-3 text-center hidden md:block">
                  <p
                    className={`
                      text-sm font-semibold
                      ${isCurrent ? 'text-primary-800' : 'text-primary-600'}
                    `}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-primary-500 mt-1">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile step title */}
      <div className="md:hidden text-center">
        <p className="text-lg font-bold text-primary-800">{steps[currentStep - 1].title}</p>
        <p className="text-sm text-primary-600">{steps[currentStep - 1].description}</p>
      </div>
    </div>
  );
}
