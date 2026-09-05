import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/productDetails/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch product details.');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-purple-600"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-11/12 mx-auto max-w-4xl py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-500">The requested item could not be retrieved from the server.</p>
        <Link to="/all-products" className="btn bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
          Back to All Products
        </Link>
      </div>
    );
  }

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
    usage,
    description,
    created_at,
    seller_name,
    seller_image,
    seller_contact,
    email
  } = product;

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-11/12 mx-auto max-w-7xl py-8 sm:py-12"
    >
      {/* Breadcrumb Navigation */}
      <nav className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-purple-600">Home</Link>
        <span>/</span>
        <Link to="/all-products" className="hover:text-purple-600">All Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Display */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-slate-100 shadow-sm">
            <img
              src={image || "https://images.unsplash.com/photo-1688578735427-994ec3238384"}
              alt={title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1688578735427-994ec3238384";
              }}
              className="w-full h-[350px] sm:h-[480px] object-cover"
            />
            {status && (
              <span className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-md ${
                status.toLowerCase() === 'sold' ? 'bg-rose-600' : 'bg-emerald-600'
              }`}>
                {status}
              </span>
            )}
            <span className="absolute top-4 right-4 bg-purple-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
              {category || 'General'}
            </span>
          </div>
        </div>

        {/* Right Column: Information & Seller Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3 pb-6 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-xs text-gray-400 font-mono">
              Product ID: <span className="text-gray-600 font-medium">{_id}</span>
            </p>

            {/* Price Box */}
            <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 mt-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 block">
                  Price Range
                </span>
                <span className="text-2xl sm:text-3xl font-black text-purple-700">
                  ${price_min ? Number(price_min).toLocaleString() : '0'} – ${price_max ? Number(price_max).toLocaleString() : '0'}
                </span>
              </div>
            </div>
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-xs font-medium text-gray-500 block">Condition</span>
              <span className="font-semibold text-gray-800 capitalize">{condition || 'N/A'}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-xs font-medium text-gray-500 block">Usage Duration</span>
              <span className="font-semibold text-gray-800">{usage || 'N/A'}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-xs font-medium text-gray-500 block">Location</span>
              <span className="font-semibold text-gray-800">{location || 'N/A'}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-xs font-medium text-gray-500 block">Posted Date</span>
              <span className="font-semibold text-gray-800">{formattedDate}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-gray-100">
              {description || 'No description provided for this item.'}
            </p>
          </div>

          {/* Seller Profile Card */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Seller Information</h3>
            <div className="flex items-center gap-3">
              <img
                src={seller_image || "https://i.pravatar.cc/150?img=33"}
                alt={seller_name}
                className="w-12 h-12 rounded-full object-cover border border-purple-200"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base">{seller_name || 'Anonymous Seller'}</h4>
                <p className="text-xs text-gray-500">{email || 'No email provided'}</p>
              </div>
            </div>
            {seller_contact && (
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-600 flex items-center justify-between">
                <span>Contact: <strong className="text-gray-800">{seller_contact}</strong></span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status?.toLowerCase() === 'sold'}
              onClick={() => alert(`Purchase request submitted for ${title}`)}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
                status?.toLowerCase() === 'sold'
                  ? 'bg-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/25'
              }`}
            >
              {status?.toLowerCase() === 'sold' ? 'Item Sold Out' : 'I Want To Buy This Product'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;