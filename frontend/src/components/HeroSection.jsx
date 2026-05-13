import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Star, Truck, Percent, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-orange-800" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />

        {/* Animated Shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-red-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">Galsi Thana Para, Near Eye Care</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Taste the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400">
                Best
              </span>{' '}
              Indian Fast Food
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-8 max-w-lg"
            >
              Authentic pizzas, juicy burgers, delicious momos & creamy pasta. 
              Delivered hot and fresh to your doorstep in Gurgaon!
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {[
                { icon: Star, label: '4.5 Rating', color: 'text-yellow-400' },
                { icon: Clock, label: '20-30 Min', color: 'text-orange-300' },
                { icon: Truck, label: 'Free Delivery', color: 'text-green-300' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center space-x-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-white font-medium">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/menu"
                className="group inline-flex items-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919933880173"
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <span>Call: 9933880173</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Food Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative h-[500px]"
          >
            {/* Main Pizza */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-0 w-72 h-72"
            >
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop"
                alt="Pizza"
                className="w-full h-full object-cover rounded-3xl shadow-2xl shadow-orange-900/30"
              />
              <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-bold shadow-lg">
                From ₹60
              </div>
            </motion.div>

            {/* Burger */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-10 left-10 w-56 h-56"
            >
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop"
                alt="Burger"
                className="w-full h-full object-cover rounded-3xl shadow-2xl shadow-orange-900/30"
              />
              <div className="absolute -top-3 -left-3 bg-red-500 text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-lg">
                Hot & Fresh
              </div>
            </motion.div>

            {/* Momos */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/2 left-0 w-44 h-44"
            >
              <img
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=400&fit=crop"
                alt="Momos"
                className="w-full h-full object-cover rounded-3xl shadow-2xl shadow-orange-900/30"
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/4 right-1/4 w-16 h-16 border-4 border-yellow-400/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-1/4 right-10 w-12 h-12 border-4 border-white/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#hero-gradient)"
          />
          <defs>
            <linearGradient id="hero-gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop stopColor="#fff7ed" />
              <stop offset="0.5" stopColor="#fef2f2" />
              <stop offset="1" stopColor="#fffbeb" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
