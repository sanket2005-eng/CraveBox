import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Pizza O Cafe</h3>
                <p className="text-xs text-gray-400">The Family Restaurant</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Serving the best Indian fast food since 2015. Quality ingredients, authentic taste, and quick delivery.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: MessageCircle, label: 'WhatsApp' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/menu', label: 'Our Menu' },
                { path: '/cart', label: 'Cart' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Galsi Thana Para, Near Eye Care,<br />
                  Gurgaon, Haryana - 122001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="tel:+919933880173" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  +91 9933880173
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Open: 10:00 AM - 11:00 PM<br />
                  All Days Open
                </span>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-bold text-lg mb-4">We Accept</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Cash on Delivery', color: 'bg-green-600' },
                { name: 'UPI', color: 'bg-blue-600' },
                { name: 'Paytm', color: 'bg-cyan-600' },
                { name: 'PhonePe', color: 'bg-purple-600' },
                { name: 'Google Pay', color: 'bg-indigo-600' },
                { name: 'Cards', color: 'bg-red-600' },
              ].map((method) => (
                <div
                  key={method.name}
                  className={`${method.color} rounded-lg px-3 py-2 text-center`}
                >
                  <span className="text-xs font-bold text-white">{method.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded-xl">
              <p className="text-xs text-gray-400 text-center">
                FSSAI License: 12345678901234<br />
                GSTIN: 06ABCDE1234F1Z5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2025 Pizza O Cafe. All rights reserved. Made with ❤️ in India
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
