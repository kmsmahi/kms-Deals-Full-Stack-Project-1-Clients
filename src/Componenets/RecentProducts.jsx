import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

// Container variant for staggered child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const RecentProducts = ({ products = [], loading }) => {
  if (loading) {
    return (
      <div className="w-11/12 mx-auto max-w-7xl py-16 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-purple-600"></span>
      </div>
    );
  }

  return (
    <section className="w-11/12 mx-auto max-w-7xl py-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100/80 px-3.5 py-1.5 rounded-full">
          Live Bidding
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Recent Product Listings
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Browse through the newest items added to KMS-DEALS and place your bids in real-time.
        </p>
      </div>

      {/* Grid Layout or Empty State */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No recent products available right now.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((prod) => (
            <ProductCard key={prod._id} prod={prod} />
          ))}
        </motion.div>
      )}

      {/* View All CTA */}
      <div className="text-center mt-12">
        <Link to="/all-products">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-outline border-purple-600 text-purple-600 hover:bg-purple-600 hover:border-purple-600 hover:text-white rounded-full px-8 font-semibold shadow-sm"
          >
            See All Products
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default RecentProducts;