import React from 'react';
import { motion } from 'framer-motion';
import { menuCategories } from '../data/menuData';

const CategoryNav = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-lg border-b border-orange-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
          {menuCategories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.id)}
              className={`relative flex items-center space-x-2 px-5 py-2.5 rounded-full whitespace-nowrap font-medium text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
              {activeCategory === category.id && (
                <motion.div
                  layoutId="active-category"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
