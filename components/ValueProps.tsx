import React from 'react';

interface ValuePropProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

function ValueProp({ icon, title, description, color }: ValuePropProps) {
  return (
    <div className="group flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div className={`text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 ${color}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-primary-800 mb-3">{title}</h3>
      <p className="text-primary-600 text-lg leading-relaxed">{description}</p>
    </div>
  );
}

export default function ValueProps() {
  const props: ValuePropProps[] = [
    {
      icon: '📚',
      title: 'Align games to your curriculum',
      description:
        'Every game adapts to your lesson plans. Math, reading, science, or social studies - create games that reinforce exactly what you\'re teaching.',
      color: 'filter drop-shadow-lg',
    },
    {
      icon: '⚡',
      title: 'Generate in 60 seconds',
      description:
        'Sketch it. Click it. Done. No tech skills needed. From idea to playable game faster than photocopying worksheets.',
      color: 'filter drop-shadow-lg',
    },
    {
      icon: '🎮',
      title: 'Students love playing, you love the results',
      description:
        'Watch engagement soar as students beg for "just one more round." Track progress and see real learning happen through play.',
      color: 'filter drop-shadow-lg',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary-800 mb-16">
          Why Teachers Love DreamWeaver
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <ValueProp key={index} {...prop} />
          ))}
        </div>
      </div>
    </section>
  );
}
