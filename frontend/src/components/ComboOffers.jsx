import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Tag, ArrowRight } from 'lucide-react';
import { combos } from '../data/menuData';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ComboOffers = () => {
  const { addToCart } = useCart();

  const handleAddCombo = (combo) => {
    const comboItem = {
      id: combo.id,
      name: combo.name,
      category: 'combos',
      isVeg: true,
      description: combo.description,
      image: combo.image,
      variants: [{ size: 'Combo Pack', price: combo.price }],
      rating: 4.5,
      prepTime: '30-35 min',
      tags: combo.tags,
    };
    addToCart(comboItem, comboItem.variants[0]);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Tag className="w-4 h-4" />
            <span>Best Value</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Combo Offers 🎁
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Save more with our specially curated combos. Perfect for sharing with family & friends!
          </p>
        </motion.div>

        {/* Combos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {combos.map((combo, index) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  SAVE ₹{combo.originalPrice - combo.price}
                </div>

                {/* Tags */}
                {combo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-[10px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{combo.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{combo.description}</p>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-orange-600">₹{combo.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{combo.originalPrice}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    {Math.round(((combo.originalPrice - combo.price) / combo.originalPrice) * 100)}% OFF
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddCombo(combo)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-orange-200 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Combo</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboOffers;
