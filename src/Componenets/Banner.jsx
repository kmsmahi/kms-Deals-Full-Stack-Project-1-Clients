import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { FiArrowRight, FiPlusCircle } from 'react-icons/fi';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    /* Outer section uses the exact same container width as Navbar */
    <section className="w-11/12 mx-auto max-w-7xl my-6">
      {/* Hero Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-100 via-purple-50/40 to-slate-50 border border-purple-100/80 shadow-sm py-12 sm:py-16 px-6 lg:px-12">
        
        {/* Background Blur Orbs (Constrained within card) */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 text-purple-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
            The #1 Local Marketplace & Bidding Platform
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight"
          >
            Deal Your Products in a{' '}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
              Smart Way!
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl font-normal leading-relaxed"
          >
            KMS-DEALS empowers you to buy, sell, and negotiate prices through live bidding with verified local neighbors—all in one place.
          </motion.p>

          {/* Search Bar Input */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-xl mt-8"
          >
            <form 
              onSubmit={handleSearchSubmit} 
              className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-md shadow-purple-500/5"
            >
              <div className="relative w-full">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-500 text-sm" />
                <input
                  type="text"
                  placeholder="Search products, categories, or sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full sm:w-auto btn border-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-6 min-h-0 h-11 text-sm font-medium shadow-md shadow-purple-500/20 whitespace-nowrap"
              >
                Search
              </motion.button>
            </form>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto"
          >
            <Link to="/all-products" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto btn border-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full px-8 min-h-0 h-12 text-sm font-semibold shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
              >
                <span>Explore All Products</span>
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <Link to="/create-product" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto btn bg-white hover:bg-purple-50 border border-purple-200 text-purple-700 rounded-full px-8 min-h-0 h-12 text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
              >
                <FiPlusCircle className="w-4 h-4 text-purple-600" />
                <span>Post an Item</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick Stats Footer inside Hero Card */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 sm:gap-12 mt-10 pt-6 border-t border-purple-100/80 w-full max-w-2xl text-center"
          >
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-900">100%</p>
              <p className="text-xs text-gray-500 mt-0.5">Verified Bids</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-900">Local</p>
              <p className="text-xs text-gray-500 mt-0.5">Neighborhood Deals</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-900">Instant</p>
              <p className="text-xs text-gray-500 mt-0.5">Price Negotiations</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;