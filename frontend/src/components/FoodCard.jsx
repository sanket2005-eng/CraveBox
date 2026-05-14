import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Star, Clock, Leaf, Flame, ChevronDown, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ item, index }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const handleAddToCart = () => {
    addToCart(item, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    setQuantity(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-3 left-3">
          <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center ${
            item.isVeg 
              ? 'bg-green-50 border-green-600' 
              : 'bg-red-50 border-red-600'
          }`}>
            <div className={`w-3.5 h-3.5 rounded-full ${
              item.isVeg ? 'bg-green-600' : 'bg-red-600'
            }`} />
          </div>
        </div>

        {/* Tags */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {item.tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                tag === 'Bestseller'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : tag === 'Premium'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : tag === 'Chef Special'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-white/90 text-gray-800'
              }`}
            >
              {tag === 'Bestseller' && <Flame className="w-3 h-3 inline mr-1" />}
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold text-gray-800">{item.rating}</span>
        </div>

        {/* Prep Time */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5 text-white" />
          <span className="text-xs font-medium text-white">{item.prepTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>

        {/* Variant Selector */}
        {item.variants.length > 1 && (
          <div className="mb-3">
            <button
              onClick={() => setShowVariants(!showVariants)}
              className="flex items-center justify-between w-full px-3 py-2 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span>{selectedVariant.size} - ₹{selectedVariant.price}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showVariants ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showVariants && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 space-y-1">
                    {item.variants.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setShowVariants(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-sm text-left transition-colors ${
                          selectedVariant.size === variant.size
                            ? 'bg-orange-50 text-orange-700 font-medium'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {variant.size} - ₹{variant.price}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Single Variant Display */}
        {item.variants.length === 1 && (
          <div className="mb-3 px-3 py-2 bg-orange-50 rounded-xl">
            <span className="text-sm font-bold text-orange-700">₹{item.variants[0].price}</span>
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow text-gray-600"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-gray-800">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow text-gray-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <motion.button
            data-testid="add-to-cart-btn"
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`relative px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden ${
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300'
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Added</span>
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add ₹{selectedVariant.price * quantity}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
