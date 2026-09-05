import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProductCard = ({ prod }) => {
  const { _id, title, price_min, price_max, image, category } = prod || {};

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Container */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={image || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={title || 'Product Image'}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <span className="absolute top-3 right-3 bg-purple-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
            {category || 'Marketplace'}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-purple-600 transition-colors">
            {title || 'Untitled Product'}
          </h3>

          {/* Updated Price Range Div */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Price Range
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-purple-700 tracking-tight text-right">
              ${price_min ? Number(price_min).toLocaleString() : '0'} – ${price_max ? Number(price_max).toLocaleString() : '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Button */}
      <div className="px-5 pb-5">
        <Link to={`/products/${_id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn border-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-md shadow-purple-500/20"
          >
            View Details & Bid
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;