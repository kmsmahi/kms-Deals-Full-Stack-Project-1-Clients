import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SingleCard = ({ singleProduct }) => {
  const {
    _id,
    title,
    price_min,
    price_max,
    image,
    category,
    status,
    location,
    condition,
    description
  } = singleProduct || {};

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Card Header Image & Badges */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-100">
          <img
            src={image || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={title || 'Product Image'}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Category Badge */}
          <span className="absolute top-3 right-3 bg-purple-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
            {category || 'Marketplace'}
          </span>

          {/* Status Badge */}
          {status && (
            <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md text-white ${
              status.toLowerCase() === 'active' || status.toLowerCase() === 'live'
                ? 'bg-emerald-600'
                : 'bg-amber-600'
            }`}>
              {status}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {location && (
              <span className="flex items-center gap-1 font-medium text-gray-600">
                <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            )}
            {condition && (
              <span className="bg-slate-100 px-2.5 py-0.5 rounded-md font-semibold text-gray-700">
                {condition}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-purple-600 transition-colors">
            {title || 'Untitled Product'}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Price Range Box */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Price Range
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-purple-700 tracking-tight text-right">
              ${price_min ? Number(price_min).toLocaleString() : '0'} – ${price_max ? Number(price_max).toLocaleString() : '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-5 pb-5">
        <Link to={`/productDetails/${_id}`}>
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

export default SingleCard;