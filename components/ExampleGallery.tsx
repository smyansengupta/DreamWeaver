import React from 'react';
import Link from 'next/link';

interface GameExampleProps {
  title: string;
  subject: string;
  grade: string;
  description: string;
  bgColor: string;
  accentColor: string;
  emoji: string;
}

function GameCard({ title, subject, grade, description, bgColor, accentColor, emoji }: GameExampleProps) {
  return (
    <div className={`group relative ${bgColor} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}>
      {/* Card content */}
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className={`text-5xl animate-float`}>{emoji}</div>
          <span className={`${accentColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {grade}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-primary-900 mb-2">{title}</h3>
        <p className={`text-sm font-semibold ${accentColor.replace('bg-', 'text-')} mb-3`}>
          {subject}
        </p>
        <p className="text-primary-700 leading-relaxed mb-6">{description}</p>

        {/* Preview button */}
        <button className={`w-full ${accentColor} hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform group-hover:scale-105`}>
          Preview Game →
        </button>
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full"></div>
    </div>
  );
}

export default function ExampleGallery() {
  const games: GameExampleProps[] = [
    {
      title: 'Fraction Pizza Party',
      subject: 'Mathematics',
      grade: 'Grade 3-4',
      description:
        'Students slice pizzas into fractions and compete to serve the correct portions. Visualize equivalent fractions while racing against the clock!',
      bgColor: 'bg-gradient-to-br from-sunny-100 to-sunny-200',
      accentColor: 'bg-sunny-600',
      emoji: '🍕',
    },
    {
      title: 'Spelling Bee Adventure',
      subject: 'Language Arts',
      grade: 'Grade 2-5',
      description:
        'Guide a friendly bee through a garden by spelling words correctly. Includes your custom word lists and adapts difficulty automatically.',
      bgColor: 'bg-gradient-to-br from-primary-100 to-primary-200',
      accentColor: 'bg-primary-600',
      emoji: '🐝',
    },
    {
      title: 'Ecosystem Explorer',
      subject: 'Science',
      grade: 'Grade 4-5',
      description:
        'Build and balance food chains by matching predators and prey. Learn about habitats and interdependence through interactive play.',
      bgColor: 'bg-gradient-to-br from-grass-100 to-grass-200',
      accentColor: 'bg-grass-600',
      emoji: '🌳',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Real games created by real teachers. Each one started as a simple sketch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-primary-700 mb-6">
            Ready to create your own? It takes less than a minute.
          </p>
          <Link href="/create" className="inline-block bg-gradient-to-r from-grass-500 to-grass-600 hover:from-grass-600 hover:to-grass-700 text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Start Creating Free
          </Link>
        </div>
      </div>
    </section>
  );
}
