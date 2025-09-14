import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative paper-texture py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-noto font-semibold text-brew-black mb-6 animate-fade-in">
         Artisanal Coffee & Pastries
          <span className="block text-brew-accent mt-2">Brew&Co. </span>
        </h1>
        <p className="text-xl text-brew-gray mb-8 max-w-2xl mx-auto animate-slide-up">
          Crafted with Passion, Served with Care
        </p>
        <div className="flex justify-center">
          <a 
            href="#coffee"
            className="bg-brew-black text-brew-off-white px-8 py-3 rounded-full hover:bg-brew-dark transition-all duration-300 transform hover:scale-105 font-medium border border-brew-accent/20"
          >
            Explore Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;