import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* Wand icon with sparkles */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-float"
        >
          {/* Magic wand */}
          <path
            d="M8 32L28 12L32 16L12 36L8 32Z"
            fill="#0073e6"
            stroke="#005bb3"
            strokeWidth="2"
          />
          {/* Star at wand tip */}
          <path
            d="M28 8L30 12L34 10L32 14L36 16L32 18L34 22L30 20L28 24L26 20L22 22L24 18L20 16L24 14L22 10L26 12L28 8Z"
            fill="#ffc107"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          {/* Small sparkles */}
          <circle cx="16" cy="8" r="2" fill="#22c55e" />
          <circle cx="8" cy="16" r="2" fill="#ffc107" />
          <circle cx="32" cy="28" r="2" fill="#0073e6" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-primary-700">
          Dream<span className="text-grass-600">Weaver</span>
        </h1>
        <p className="text-xs text-primary-600 -mt-1">AI Learning Games</p>
      </div>
    </div>
  );
}
