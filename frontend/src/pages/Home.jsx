import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChefHat, Truck, Shield, Clock } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import HotDeals from '../components/HotDeals';
import ComboOffers from '../components/ComboOffers';
import PopularSection from '../components/PopularSection';

const Home = () => {
  const features = [
    {
      icon: ChefHat,
      title: 'Freshly Prepared',
      description: 'Every dish is made fresh with quality ingredients',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Hot food delivered to your doorstep in 30 mins',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: Shield,
      title: 'Hygiene First',
      description: 'FSSAI certified kitchen with strict hygiene standards',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Clock,
      title: 'Open Daily',
      description: 'Serving you delicious food from 10 AM to 11 PM',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HotDeals />
      <ComboOffers />
      <PopularSection />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-3xl p-10 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full" />
              <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-white rounded-full" />
            </div>
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Hungry? Order Now!
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Get your favorite food delivered hot and fresh. First order gets free delivery!
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
