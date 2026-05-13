import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Clock, Flame } from 'lucide-react';
import { menuItems } from '../data/menuData';
import FoodCard from './FoodCard';

const PopularSection = () => {
  // Get bestseller and popular items
  const popularItems = menuItems.filter(
    (item) => item.tags.includes('Bestseller') || item.tags.includes('Popular') || item.tags.includes('Chef Special')
  ).slice(0, 6);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Popular in India 🇮🇳
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Our most loved dishes that keep our customers coming back for more!
          </p>
        </motion.div>

        {/* Popular Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item, index) => (
            <FoodCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
