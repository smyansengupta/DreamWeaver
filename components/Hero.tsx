import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-sunny-50 to-grass-50 py-20 px-4">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-grass-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main tagline */}
        <h1 className="text-5xl md:text-6xl font-bold text-primary-800 mb-6 leading-tight">
          Turn Lesson Plans Into{' '}
          <span className="text-grass-600">Learning Games</span>{' '}
          <span className="inline-block animate-bounce-slow">in 60 Seconds</span>
        </h1>

        {/* Subheading */}
        <p className="text-2xl md:text-3xl text-primary-700 mb-4 font-medium">
          For K-5 Teachers. No Coding Required.
        </p>

        <p className="text-lg text-primary-600 mb-10 max-w-2xl mx-auto">
          Transform your hand-drawn sketches and lesson ideas into interactive games
          that make learning irresistible for your students.
        </p>

        {/* CTA Button */}
        <Link href="/create" className="inline-block group relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-xl font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <span className="relative z-10">Create Your First Game</span>
          <div className="absolute inset-0 bg-sunny-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
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
        </Link>

        {/* Trust badge */}
        <p className="mt-8 text-sm text-primary-600">
          ✨ Join 10,000+ teachers creating magical learning experiences
        </p>
      </div>
    </section>
  );
}
