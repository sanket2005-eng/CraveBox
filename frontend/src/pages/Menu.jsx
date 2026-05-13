import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { menuItems, menuCategories } from '../data/menuData';
import FoodCard from '../components/FoodCard';
import CategoryNav from '../components/CategoryNav';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('pizza-veg');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('all'); // all, veg, nonveg

  useEffect(() => {
    let items = menuItems.filter((item) => item.category === activeCategory);

    if (searchQuery) {
      items = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType === 'veg') {
      items = items.filter((item) => item.isVeg);
    } else if (filterType === 'nonveg') {
      items = items.filter((item) => !item.isVeg);
    }

    setFilteredItems(items);
  }, [activeCategory, searchQuery, filterType]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our Menu 📋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-xl mx-auto"
          >
            Explore our wide range of delicious Indian fast food
          </motion.p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-lg border-b border-orange-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your favorite food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all ${
                showFilters
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    { value: 'all', label: 'All Items', color: 'bg-gray-100 text-gray-700' },
                    { value: 'veg', label: 'Veg Only', color: 'bg-green-100 text-green-700' },
                    { value: 'nonveg', label: 'Non-Veg', color: 'bg-red-100 text-red-700' },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setFilterType(filter.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filterType === filter.value
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                          : filter.color
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Title */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-gray-900">
            {menuCategories.find((c) => c.id === activeCategory)?.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {filteredItems.length} items available
          </p>
        </motion.div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <FoodCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
