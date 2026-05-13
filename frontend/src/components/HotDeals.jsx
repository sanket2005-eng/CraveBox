import React from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, Tag, Sparkles } from 'lucide-react';
import { hotDeals } from '../data/menuData';
import toast from 'react-hot-toast';

const HotDeals = () => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon ${code} copied!`);
  };

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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Limited Time Offers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Hot Deals 🔥
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Exclusive offers for our valued customers. Grab them before they expire!
          </p>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group cursor-pointer"
              onClick={() => handleCopyCode(deal.code)}
            >
              <div className={`bg-gradient-to-br ${deal.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10" />

                <div className="relative">
                  <Tag className="w-8 h-8 mb-3 opacity-80" />
                  <h3 className="font-display text-2xl font-bold mb-1">{deal.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{deal.subtitle}</p>

                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs font-medium">Code:</span>
                      <span className="font-bold ml-1">{deal.code}</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <Copy className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotDeals;
