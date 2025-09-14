import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-brew-off-white/95 backdrop-blur-sm border-b border-brew-gray/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-2 text-brew-black hover:text-brew-accent transition-colors duration-200"
          >
            <img src="/logo.jpg" className="w-10 h-10 rounded-full"/>
            <h1 className="text-2xl font-art-school font-bold">Brew&Co.</h1>
          </button>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#coffee" className="text-brew-gray hover:text-brew-accent transition-colors duration-200">Coffee</a>
            <a href="#pastries" className="text-brew-gray hover:text-brew-accent transition-colors duration-200">Pastries</a>
            <a href="#sandwiches" className="text-brew-gray hover:text-brew-accent transition-colors duration-200">Sandwiches</a>
            <a href="#beverages" className="text-brew-gray hover:text-brew-accent transition-colors duration-200">Beverages</a>
          </nav>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-brew-gray hover:text-brew-black hover:bg-brew-light rounded-full transition-all duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brew-black text-brew-off-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-gentle">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;