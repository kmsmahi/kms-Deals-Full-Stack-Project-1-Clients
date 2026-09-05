import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SingleCard from '../Componenets/SingleCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetch('http://localhost:3000/all-products')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []); // Added dependency array to stop infinite loops

  // Search & Filter Logic
  const filteredProducts = allProducts
    .filter((product) => {
      const matchTitle = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = product.category?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTitle || matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.price_min || 0) - (b.price_min || 0);
      if (sortBy === 'price-high') return (b.price_min || 0) - (a.price_min || 0);
      return 0;
    });

  return (
    <div className="w-11/12 mx-auto max-w-7xl py-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100/80 px-3.5 py-1.5 rounded-full">
          Marketplace Collection
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mt-5">
          Explore All Products
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover exclusive deals, place bids, and find rare items listed across all categories.
        </p>
      </div>

      {/* Control Bar: Search & Sort */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-sm text-gray-800 transition-all"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-gray-200 text-sm text-gray-800 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-600"
          >
            <option value="default">Newest Listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Grid Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-purple-600"></span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-gray-300 space-y-3">
          <p className="text-gray-600 font-semibold text-lg">No products found matching your search.</p>
          <button
            onClick={() => { setSearchTerm(''); setSortBy('default'); }}
            className="btn btn-sm btn-outline border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((singleProduct) => (
            <SingleCard key={singleProduct._id} singleProduct={singleProduct} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllProducts;