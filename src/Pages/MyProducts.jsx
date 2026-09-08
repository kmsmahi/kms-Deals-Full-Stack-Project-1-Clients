import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../Provider/AuthProvider';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products listed by the logged-in user
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://127.0.0.1:3000/my-products?email=${encodeURIComponent(user.email)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching my products:", err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  // Handle deleting a product
  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    fetch(`http://127.0.0.1:3000/products/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setProducts((prevProducts) => prevProducts.filter((item) => item._id !== productId));
        } else {
          alert("Failed to delete product. Please try again.");
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <div className="w-11/12 mx-auto max-w-7xl py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100/80 px-3.5 py-1.5 rounded-full">
          Seller Dashboard
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
          My Listed Products
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage, track, and monitor all product listings you have posted on KMS-DEALS.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-purple-600"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-10 bg-red-50 text-red-600 rounded-2xl border border-red-200 max-w-xl mx-auto">
          <p className="font-bold">Failed to load listings</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-gray-300 space-y-4 max-w-xl mx-auto">
          <p className="text-gray-600 font-semibold text-lg">You haven't listed any products yet.</p>
          <p className="text-sm text-gray-400">Start selling by adding your first product listing.</p>
          <Link
            to="/create-product"
            className="inline-block px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md shadow-purple-500/20"
          >
            Create Product
          </Link>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/400x250"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-purple-700 shadow-sm">
                  {product.category || "General"}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
                    {product.title}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Price Range & Details */}
                <div className="space-y-2 border-t border-gray-100 pt-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">Price Range:</span>
                    <span className="font-extrabold text-purple-700">
                      ${Number(product.price_min || 0).toLocaleString()} - ${Number(product.price_max || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Condition: <strong className="text-gray-700">{product.condition}</strong></span>
                    <span>Usage: <strong className="text-gray-700">{product.usage_time}</strong></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Link
                    to={`/productDetails/${product._id}`}
                    className="flex-1 py-2 text-center text-xs font-bold rounded-xl text-purple-600 bg-purple-50 hover:bg-purple-100 transition-colors "
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="py-2 px-3 text-xs font-bold rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                    title="Delete Listing"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;