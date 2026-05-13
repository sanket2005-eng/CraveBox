import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Phone, Clock, MapPin, Receipt } from 'lucide-react';

const OrderSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const orderId = 'POC' + Date.now().toString().slice(-8);
  const estimatedTime = '25-35 min';

  return (
    <div className="pt-24 pb-16 min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Success Animation */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl font-bold text-gray-900 mb-2"
          >
            Order Placed! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500"
          >
            Your delicious food is being prepared
          </motion.p>
        </div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-card p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Receipt className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-gray-700">Order ID</span>
            </div>
            <span className="font-bold text-gray-900">{orderId}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-bold text-gray-900">{estimatedTime}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivering To</p>
                <p className="font-bold text-gray-900">Gurgaon, Haryana</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Restaurant Contact</p>
                <p className="font-bold text-gray-900">+91 9933880173</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tracking Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-card p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Order Status</h3>
          <div className="space-y-4">
            {[
              { label: 'Order Confirmed', time: 'Just now', active: true },
              { label: 'Food Being Prepared', time: 'Pending', active: false },
              { label: 'Out for Delivery', time: 'Pending', active: false },
              { label: 'Delivered', time: 'Pending', active: false },
            ].map((step, index) => (
              <div key={step.label} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  step.active ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <p className={`font-medium ${step.active ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                </div>
                <span className={`text-xs ${step.active ? 'text-green-600' : 'text-gray-400'}`}>
                  {step.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 hover:shadow-xl transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
