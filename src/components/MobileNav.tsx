import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface MobileNavProps {
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeCategory, onCategoryClick }) => {
  const { categories } = useCategories();

  return (
    <div className="sticky top-16 z-40 bg-brew-off-white/95 backdrop-blur-md border-b border-brew-gray/10 md:hidden shadow-lg">
      <div className="flex overflow-x-auto scrollbar-hide px-4 py-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`flex-shrink-0 flex items-center space-x-3 px-6 py-3 rounded-xl mr-3 transition-all duration-300 font-art-school font-medium ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-brew-black to-brew-dark text-brew-off-white shadow-lg transform scale-105'
                : 'bg-brew-light text-brew-gray hover:bg-brew-gray/20 hover:text-brew-black'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;