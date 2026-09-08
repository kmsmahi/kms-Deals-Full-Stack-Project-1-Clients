import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SingleCard from '../Componenets/SingleCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:3000/all-products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data in React:", data); // Check browser console (F12)
        if (Array.isArray(data)) {
          setAllProducts(data);
        } else {
          setAllProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error in AllProducts:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getProductPrice = (item) => Number(item.price_min ?? item.price ?? item.min_price ?? 0);

  const filteredProducts = allProducts
    .filter((product) => {
      const title = product.title || product.name || '';
      const category = product.category || '';
      const matchTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTitle || matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return getProductPrice(a) - getProductPrice(b);
      if (sortBy === 'price-high') return getProductPrice(b) - getProductPrice(a);
      return 0;
    });

  return (
    <div className="w-11/12 mx-auto max-w-7xl py-12">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100/80 px-3.5 py-1.5 rounded-full">
          Marketplace Collection
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mt-5">
          Explore All Products
        </h1>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500 uppercase">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none"
          >
            <option value="default">Newest Listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading & Errors */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-purple-600"></span>
        </div>
      )}

      {error && (
        <div className="text-center py-10 bg-red-50 text-red-600 rounded-2xl border border-red-200">
          <p className="font-bold">Failed to load products</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-600 font-semibold text-lg">No products found matching your filter.</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
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