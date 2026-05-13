import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MapPin, Phone, Menu, X, Flame, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/cart', label: 'Cart' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-orange-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-300/50 transition-shadow">
                <Flame className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-xl lg:text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Pizza O Cafe
              </span>
              <span className={`text-[10px] lg:text-xs font-medium tracking-wider uppercase transition-colors ${
                isScrolled ? 'text-orange-600' : 'text-orange-200'
              }`}>
                The Family Restaurant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm transition-colors hover:text-orange-500 ${
                  location.pathname === link.path
                    ? 'text-orange-600'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white/90'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className={`hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full ${
              isScrolled ? 'bg-orange-50' : 'bg-white/10 backdrop-blur-sm'
            }`}>
              <MapPin className={`w-4 h-4 ${isScrolled ? 'text-orange-600' : 'text-white'}`} />
              <span className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                Gurgaon, India
              </span>
            </div>

            {/* Phone */}
            <a
              href="tel:+919933880173"
              className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full transition-colors ${
                isScrolled
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">9933880173</span>
            </a>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <div className={`p-2.5 rounded-full transition-all ${
                isScrolled
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-200'
                  : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
              }`}>
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-orange-100 shadow-xl"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-2 px-4 py-2 text-gray-600">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Gurgaon, Haryana, India</span>
              </div>
              <a href="tel:+919933880173" className="flex items-center space-x-2 px-4 py-2 text-gray-600">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-sm">+91 9933880173</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
