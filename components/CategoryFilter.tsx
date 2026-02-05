'use client';

import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="flex flex-wrap gap-3">
        {categories.map((cat, index) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 animate-slide-up ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};