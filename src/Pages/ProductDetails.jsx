import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();

  // State Management
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidsLoading, setBidsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal & Form State
  const bidModalRef = useRef(null);
  const [bidAmount, setBidAmount] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerContact, setBuyerContact] = useState('');
  const [buyerImage, setBuyerImage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // 1. Fetch Product Details
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/productDetails/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product details.');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product details:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // 2. Fetch All Bids for This Specific Product (GET /bids/product/:productId)
  const fetchBids = () => {
    setBidsLoading(true);
    fetch(`http://localhost:3000/bids/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bids.');
        return res.json();
      })
      .then((data) => {
        setBids(data);
        setBidsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bids:', err);
        setBidsLoading(false);
      });
  };

  useEffect(() => {
    if (id) fetchBids();
  }, [id]);

  // Handle Opening Modal
  const handleOpenModal = () => {
    setFormError('');
    if (product?.price_min) {
      setBidAmount(product.price_min);
    }
    if (bidModalRef.current) {
      bidModalRef.current.showModal();
    }
  };

  // Handle Closing Modal
  const handleCloseModal = () => {
    if (bidModalRef.current) {
      bidModalRef.current.close();
    }
  };

  // 3. Submit New Bid (POST /bids)
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
      product: product._id, // References Products._id
      buyer_image: buyerImage || 'https://i.pravatar.cc/150?img=33',
      buyer_name: buyerName,
      buyer_contact: buyerContact,
      buyer_email: buyerEmail,
      bid_price: numericBid
    };

    try {
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
      
      // Auto-refresh the bids table with the new data
      fetchBids();

      // Reset form input values
      setBuyerName('');
      setBuyerEmail('');
      setBuyerContact('');
      setBuyerImage('');
    } catch (err) {
      console.error('Error submitting bid:', err);
      setFormError(err.message || 'Something went wrong while submitting.');
      setSubmitting(false);
    }
  };

  // 4. Update Bid Status: Accept or Reject (PATCH /bids/:id)
  const handleStatusUpdate = async (bidId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/bids/${bidId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh table to show updated status
        fetchBids();
      } else {
        console.error('Failed to update bid status');
      }
    } catch (err) {
      console.error('Error updating bid status:', err);
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
      className="w-11/12 mx-auto max-w-7xl py-8 sm:py-12 space-y-12"
    >
      {/* Breadcrumb Navigation */}
      <nav className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/all-products" className="hover:text-purple-600 transition-colors">All Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{title}</span>
      </nav>

      {/* Main Product Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-slate-100 shadow-sm">
            <img
              src={image || 'https://images.unsplash.com/photo-1688578735427-994ec3238384'}
              alt={title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1688578735427-994ec3238384';
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

        {/* Right: Product & Seller Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3 pb-6 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-xs text-gray-400 font-mono">
              Product ID: <span className="text-gray-600 font-medium">{_id}</span>
            </p>

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
                src={seller_image || 'https://i.pravatar.cc/150?img=33'}
                alt={seller_name || 'Seller'}
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

          {/* Trigger Modal Button */}
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

      {/* Bids Table Section */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bids for this Product</h2>
            <p className="text-xs text-gray-500 mt-1">All live offers submitted by buyers</p>
          </div>
          <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-100">
            Total Bids: {bids.length}
          </span>
        </div>

        {bidsLoading ? (
          <div className="py-12 text-center">
            <span className="loading loading-spinner loading-md text-purple-600"></span>
            <p className="text-xs text-gray-400 mt-2">Loading active offers...</p>
          </div>
        ) : bids.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-gray-200 space-y-2">
            <p className="text-sm font-semibold text-gray-600">No bids submitted yet.</p>
            <p className="text-xs text-gray-400">Click "I Want To Buy / Place A Bid" above to submit the first offer!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase text-gray-400 bg-slate-50/50">
                  <th className="py-3 px-4">SL No</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Buyer Info</th>
                  <th className="py-3 px-4">Seller Name</th>
                  <th className="py-3 px-4">Bid Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {bids.map((bid, index) => (
                  <tr key={bid._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* 1. SL No */}
                    <td className="py-4 px-4 font-bold text-gray-500">{index + 1}</td>

                    {/* 2. Product Name */}
                    <td className="py-4 px-4 font-medium text-gray-900 max-w-[180px] truncate">{title}</td>

                    {/* 3. Buyer Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={bid.buyer_image || 'https://i.pravatar.cc/150?img=33'}
                          alt={bid.buyer_name}
                          className="w-9 h-9 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-bold text-xs text-gray-900">{bid.buyer_name || 'Anonymous Buyer'}</p>
                          <p className="text-[11px] text-gray-400">{bid.buyer_email || 'No Email'}</p>
                          {bid.buyer_contact && (
                            <p className="text-[11px] text-purple-600 font-medium">{bid.buyer_contact}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 4. Seller Name */}
                    <td className="py-4 px-4 text-gray-600 font-medium">{seller_name || 'Marketplace Seller'}</td>

                    {/* 5. Bid Price */}
                    <td className="py-4 px-4 font-extrabold text-purple-700">
                      ${Number(bid.bid_price).toLocaleString()}
                    </td>

                    {/* 6. Status Badge */}
                    <td className="py-4 px-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        bid.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : bid.status === 'rejected'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {bid.status}
                      </span>
                    </td>

                    {/* 7. Actions (Accept or Reject) */}
                    <td className="py-4 px-4 text-center">
                      {bid.status === 'pending' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleStatusUpdate(bid._id, 'confirmed')}
                            className="btn btn-xs bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-lg"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(bid._id, 'rejected')}
                            className="btn btn-xs bg-rose-600 hover:bg-rose-700 text-white border-none rounded-lg"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No actions available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Place Bid Modal Window */}
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
              Minimum acceptable offer: <span className="font-bold">${price_min ? Number(price_min).toLocaleString() : '0'}</span>
            </p>
          </div>

          {/* Modal Form */}
          <form onSubmit={handleBidSubmit} className="p-6 space-y-4">
            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {formError}
              </div>
            )}

            {/* Buyer Name */}
            <div className="form-control w-full">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                required
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Enter your name"
                className="input input-bordered w-full font-medium text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl"
              />
            </div>

            {/* Buyer Email */}
            <div className="form-control w-full">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                placeholder="buyer@example.com"
                className="input input-bordered w-full font-medium text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl"
              />
            </div>

            {/* Buyer Contact */}
            <div className="form-control w-full">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Phone / WhatsApp Contact
              </label>
              <input
                type="text"
                required
                value={buyerContact}
                onChange={(e) => setBuyerContact(e.target.value)}
                placeholder="+880 1700-000000"
                className="input input-bordered w-full font-medium text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl"
              />
            </div>

            {/* Buyer Profile Picture URL */}
            <div className="form-control w-full">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Profile Photo URL (Optional)
              </label>
              <input
                type="url"
                value={buyerImage}
                onChange={(e) => setBuyerImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full font-medium text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl"
              />
            </div>

            {/* Bid Amount */}
            <div className="form-control w-full">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Offer Amount ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  min={price_min || 0}
                  required
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your offer price"
                  className="input input-bordered w-full pl-8 font-semibold text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl"
                />
              </div>
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

        {/* Backdrop overlay to close */}
        <form method="dialog" className="modal-backdrop bg-gray-900/40 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>
    </motion.div>
  );
};

export default ProductDetails;