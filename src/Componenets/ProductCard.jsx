// src/Components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const ProductCard = ({ prod }) => {
  const { _id, title, price, image, category } = prod;

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img 
            src={image || "https://via.placeholder.com/300"} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5">
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            {category || 'Deal'}
          </span>
          <h3 className="text-lg font-bold text-gray-800 mt-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Current Bid Price</p>
          <p className="text-2xl font-extrabold text-purple-700">${price}</p>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link to={`/products/${_id}`}>
          <button className="w-full btn border-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-md shadow-purple-500/20">
            View Details & Bid
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;