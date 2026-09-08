import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../Provider/AuthProvider';

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bids placed by the logged-in user
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://127.0.0.1:3000/my-bids?email=${encodeURIComponent(user.email)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch bids: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("ACTUAL BIDS DATA FROM BACKEND:", data);
          setBids(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching my bids:", err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  // Handle removing/withdrawing a bid
  const handleRemoveBid = (bidId) => {
    const confirmDelete = window.confirm("Are you sure you want to withdraw this bid?");
    if (!confirmDelete) return;

    fetch(`http://127.0.0.1:3000/bids/${bidId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setBids((prevBids) => prevBids.filter((bid) => bid._id !== bidId));
        } else {
          alert("Failed to withdraw bid. Please try again.");
        }
      })
      .catch((err) => console.error("Error removing bid:", err));
  };

  return (
    <div className="w-11/12 mx-auto max-w-7xl py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100/80 px-3.5 py-1.5 rounded-full">
          Bidding History
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
          My Placed Bids
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Track, manage, and monitor the status of all bids you have submitted across KMS-DEALS.
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
        <div className="text-center py-10 bg-red-50 text-red-600 rounded-2xl border border-red-200">
          <p className="font-bold">Failed to load bids</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && bids.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-gray-300 space-y-3">
          <p className="text-gray-600 font-semibold text-lg">You haven't placed any bids yet.</p>
          <p className="text-sm text-gray-400">Explore active marketplace listings to start bidding.</p>
        </div>
      )}

      {/* Bids Table */}
      {!loading && !error && bids.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Table Head */}
              <thead className="bg-slate-50 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4 px-6 text-left">SL</th>
                  <th className="py-4 px-6 text-left">Product</th>
                  <th className="py-4 px-6 text-left">Seller Info</th>
                  <th className="py-4 px-6 text-left">Bid Price</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {bids.map((bid, index) => {
                  const product = bid.productDetails || {};
                  
                  // Extract image with fallback
                  const productImage = product.image || product.photo || product.coverImage || "https://via.placeholder.com/80";
                  
                  // Extract product title with fallback
                  const productTitle = product.title || product.product_name || product.name || "Untitled Product";
                  
                  // Extract category
                  const productCategory = product.category || "General";

                  // Extract seller details with fallback
                  const sellerName = product.seller_name || product.owner_name || product.seller_email?.split('@')[0] || "Seller";
                  const sellerEmail = product.seller_email || product.owner_email || product.email || "N/A";
                  const sellerImage = product.seller_image || product.owner_image;

                  return (
                    <tr key={bid._id} className="hover:bg-slate-50/80 transition-colors">
                      {/* SL No */}
                      <td className="py-4 px-6 font-bold text-gray-500">
                        {index + 1}
                      </td>

                      {/* Product Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={productImage}
                            alt={productTitle}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-sm"
                          />
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">
                              {productTitle}
                            </p>
                            <span className="text-xs text-purple-600 font-medium">
                              {productCategory}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Seller Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          {sellerImage && (
                            <img
                              src={sellerImage}
                              alt={sellerName}
                              className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-gray-800">
                              {sellerName}
                            </p>
                            <p className="text-xs text-gray-500">{sellerEmail}</p>
                          </div>
                        </div>
                      </td>

                      {/* Bid Price */}
                      <td className="py-4 px-6 font-extrabold text-purple-700 text-base">
                        ${Number(bid.bid_price || 0).toLocaleString()}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            bid.status?.toLowerCase() === 'confirmed' || bid.status?.toLowerCase() === 'accepted'
                              ? 'bg-emerald-100 text-emerald-700'
                              : bid.status?.toLowerCase() === 'rejected'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {bid.status || 'Pending'}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleRemoveBid(bid._id)}
                          disabled={
                            bid.status?.toLowerCase() === 'confirmed' || 
                            bid.status?.toLowerCase() === 'accepted'
                          }
                          className="btn btn-sm btn-ghost text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                          title={
                            bid.status?.toLowerCase() === 'confirmed' || bid.status?.toLowerCase() === 'accepted'
                              ? "Confirmed bids cannot be removed"
                              : "Withdraw Bid"
                          }
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Withdraw
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyBids;