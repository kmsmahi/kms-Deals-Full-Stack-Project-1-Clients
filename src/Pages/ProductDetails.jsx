import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State & Form Controls
  const bidModalRef = useRef(null);
  const [bidAmount, setBidAmount] = useState('');
  const [buyerContact, setBuyerContact] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

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

  const handleOpenModal = () => {
    setFormError('');
    if (product?.price_min) {
      setBidAmount(product.price_min);
    }
    if (bidModalRef.current) {
      bidModalRef.current.showModal();
    }
  };

  const handleCloseModal = () => {
    if (bidModalRef.current) {
      bidModalRef.current.close();
    }
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const numericBid = Number(bidAmount);
    const minPrice = Number(product?.price_min || 0);

    if (numericBid < minPrice) {
      setFormError(`Your bid must be at least $${minPrice.toLocaleString()}`);
      return;
    }

    setSubmitting(true);

    const bidPayload = {
      productId: product._id,
      productTitle: product.title,
      sellerEmail: product.email,
      bidAmount: numericBid,
      buyerContact,
      deliveryAddress,
      status: 'pending',
      createdAt: new Date()
    };

    try {
      // POST request to backend API (adjust endpoint if needed)
      const response = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bidPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit bid. Please try again.');
      }

      setSubmitting(false);
      handleCloseModal();
      alert(`Success! Your offer of $${numericBid.toLocaleString()} for "${product.title}" has been submitted.`);
      
      // Reset Form
      setBuyerContact('');
      setDeliveryAddress('');
    } catch (err) {
      console.error("Error submitting bid:", err);
      setFormError(err.message || 'Something went wrong while submitting your bid.');
      setSubmitting(false);
    }
  };

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
        <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/all-products" className="hover:text-purple-600 transition-colors">All Products</Link>
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
                alt={seller_name || "Seller"}
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

          {/* Trigger Button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status?.toLowerCase() === 'sold'}
              onClick={handleOpenModal}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
                status?.toLowerCase() === 'sold'
                  ? 'bg-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/25'
              }`}
            >
              {status?.toLowerCase() === 'sold' ? 'Item Sold Out' : 'I Want To Buy / Place A Bid'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Professional Industry-Standard Modal */}
      <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 bg-white rounded-3xl overflow-hidden max-w-lg shadow-2xl border border-gray-100">
          
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white relative">
            <button
              onClick={handleCloseModal}
              type="button"
              className="btn btn-sm btn-circle btn-ghost text-white/80 hover:text-white hover:bg-white/10 absolute right-4 top-4"
            >
              ✕
            </button>
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-white">
              Purchase Offer
            </span>
            <h3 className="text-xl font-extrabold mt-2 line-clamp-1">{title}</h3>
            <p className="text-xs text-purple-100 mt-1">
              Minimum acceptable bid: <span className="font-bold">${price_min ? Number(price_min).toLocaleString() : '0'}</span>
            </p>
          </div>

          {/* Modal Body Form */}
          <form onSubmit={handleBidSubmit} className="p-6 space-y-4">
            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {formError}
              </div>
            )}

            {/* Input: Bid Amount */}
            <div className="form-control w-full">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Your Offer Amount ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  min={price_min || 0}
                  required
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your offer"
                  className="input input-bordered w-full pl-8 font-semibold text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Input: Contact Number */}
            <div className="form-control w-full">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                required
                value={buyerContact}
                onChange={(e) => setBuyerContact(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="input input-bordered w-full font-medium text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl"
              />
            </div>

            {/* Input: Delivery / Meeting Location */}
            <div className="form-control w-full">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Preferred Delivery / Pickup Location
              </label>
              <textarea
                required
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="City, Area, or specific meeting point..."
                className="textarea textarea-bordered w-full font-medium text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl text-sm"
              />
            </div>

            {/* Seller Summary Preview */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-gray-100 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={seller_image || "https://i.pravatar.cc/150?img=33"}
                  alt={seller_name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-gray-600 font-medium">Seller: <strong className="text-gray-900">{seller_name || 'Marketplace Member'}</strong></span>
              </div>
              <span className="text-purple-600 font-bold">Direct Offer</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="btn btn-ghost text-gray-500 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl border-none px-6"
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Offer'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop click to close */}
        <form method="dialog" className="modal-backdrop bg-gray-900/40 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>
    </motion.div>
  );
};

export default ProductDetails;