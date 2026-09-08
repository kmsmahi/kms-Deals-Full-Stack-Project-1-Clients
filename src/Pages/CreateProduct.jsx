import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../Provider/AuthProvider';

const CreateProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Pre-fill seller details from AuthContext if available
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    price_min: '',
    price_max: '',
    usage_time: '',
    condition: 'Used - Like New',
    image: '',
    description: '',
    seller_name: user?.displayName || '',
    seller_email: user?.email || '',
    seller_contact: '',
    seller_image: user?.photoURL || '',
    seller_location: ''
  });

  const categories = [
    'Electronics',
    'Vehicles',
    'Property & Real Estate',
    'Home & Garden',
    'Fashion & Beauty',
    'Hobbies & Sports',
    'Others'
  ];

  const conditions = [
    'Brand New',
    'Used - Like New',
    'Used - Good',
    'Used - Fair',
    'Refurbished'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newProduct = {
      ...formData,
      price_min: Number(formData.price_min),
      price_max: Number(formData.price_max),
      created_at: new Date()
    };

    try {
      const response = await fetch('http://127.0.0.1:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product listed successfully!');
        navigate('/my-products');
      } else {
        alert(data.message || 'Failed to create product.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Network error. Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100/80 px-3.5 py-1.5 rounded-full">
          List Your Item
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
          Create New Listing
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Fill out the product details below to post your item for buyers to bid on.
        </p>
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-purple-100 shadow-xl p-6 sm:p-10"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Product Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-600 inline-block"></span>
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g., iPhone 13 Pro Max - 128GB Graphite"
                  value={formData.title}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Condition <span className="text-rose-500">*</span>
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="select select-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                >
                  {conditions.map((cond) => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Price ($) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="price_min"
                  required
                  min="0"
                  placeholder="e.g., 500"
                  value={formData.price_min}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximum Price ($) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="price_max"
                  required
                  min="0"
                  placeholder="e.g., 750"
                  value={formData.price_max}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                />
              </div>

              {/* Usage Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usage Duration <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="usage_time"
                  required
                  placeholder="e.g., 6 Months / 1 Year"
                  value={formData.usage_time}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                />
              </div>

              {/* Product Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Image URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  name="image"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                />
              </div>

              {/* Product Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  placeholder="Describe your product's features, defects (if any), and reason for selling..."
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl text-sm"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 2: Seller Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span>
              Seller Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seller Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seller Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="seller_name"
                  required
                  placeholder="Your Name"
                  value={formData.seller_name}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl bg-gray-50"
                />
              </div>

              {/* Seller Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seller Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="seller_email"
                  required
                  readOnly
                  placeholder="seller@email.com"
                  value={formData.seller_email}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Seller Contact */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="seller_contact"
                  required
                  placeholder="+8801700000000"
                  value={formData.seller_contact}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                />
              </div>

              {/* Seller Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location / City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="seller_location"
                  required
                  placeholder="e.g., Chattogram, Bangladesh"
                  value={formData.seller_location}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                />
              </div>

              {/* Seller Photo URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seller Avatar URL
                </label>
                <input
                  type="url"
                  name="seller_image"
                  placeholder="https://example.com/seller-photo.jpg"
                  value={formData.seller_image}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:outline-none focus:border-purple-600 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Publishing Listing...
                </>
              ) : (
                'Create Product Listing'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProduct;