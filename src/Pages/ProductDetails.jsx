import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

const ProductDetails = () => {
  const { id } = useParams();

  // State Declarations
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Form Fields
  const [bidAmount, setBidAmount] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerContact, setBuyerContact] = useState('');
  const [buyerImage, setBuyerImage] = useState('');

  // 1. Fetch Product Details (Tries multiple route variations to avoid 404s)
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const endpoints = [
        `http://localhost:3000/products/${id}`,
        `http://localhost:3000/all-products/${id}`,
        `http://localhost:3000/product/${id}`
      ];

      let fetchedProduct = null;
      let lastErrorStatus = '';

      for (const url of endpoints) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            fetchedProduct = await response.json();
            break; // Successfully fetched, exit loop
          } else {
            lastErrorStatus = `${response.status} ${response.statusText}`;
          }
        } catch (err) {
          lastErrorStatus = err.message;
        }
      }

      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setBidAmount(fetchedProduct.price_min || fetchedProduct.price || '');
        setError(null);
      } else {
        setError(`Failed to fetch product details (${lastErrorStatus})`);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // 2. Fetch Bids for Current Product
  const fetchBids = async () => {
    try {
      const response = await fetch(`http://localhost:3000/bids?productId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setBids(data);
      }
    } catch (err) {
      console.error('Error fetching bids:', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBids();
    }
  }, [id]);

  // Modal Controls
  const handleOpenModal = () => {
    setFormError('');
    if (product) {
      setBidAmount(product.price_min || product.price || '');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormError('');
  };

  // 3. Submit New Bid (POST /bids)
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const numericBid = Number(bidAmount);
    const minPrice = Number(product?.price_min || product?.price || 0);

    if (numericBid < minPrice) {
      setFormError(`Your bid must be at least $${minPrice.toLocaleString()}`);
      return;
    }

    setSubmitting(true);

    const bidPayload = {
      product: product._id,
      product_id: product._id,
      product_title: product.title || product.name,
      buyer_image: buyerImage || 'https://i.pravatar.cc/150?img=33',
      buyer_name: buyerName,
      buyer_contact: buyerContact,
      buyer_email: buyerEmail,
      seller_email: product.email || product.seller_email,
      seller_name: product.seller_name,
      bid_price: numericBid,
      status: 'pending'
    };

    try {
      const response = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bidPayload)
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resData.message || `Server error: ${response.statusText}`);
      }

      setSubmitting(false);
      handleCloseModal();

      fetchBids();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center my-12">
        <p className="text-red-500 font-semibold text-lg">{error || 'Product not found.'}</p>
        <Link to="/" className="btn btn-outline btn-sm mt-4">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* Product Details Section */}
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200">
        <figure className="lg:w-1/2 p-6">
          <img
            src={product.image || 'https://via.placeholder.com/400'}
            alt={product.title || product.name}
            className="rounded-xl object-cover max-h-96 w-full"
          />
        </figure>

        <div className="card-body lg:w-1/2">
          <div className="badge badge-secondary mb-2">{product.category || 'Product'}</div>
          <h2 className="card-title text-3xl font-bold">{product.title || product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="divider"></div>

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Minimum Price:</span> ${(product.price_min || product.price || 0).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Seller:</span> {product.seller_name || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Seller Contact:</span> {product.email || product.seller_email || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Condition:</span> {product.condition || 'Used'}
            </p>
          </div>

          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary" onClick={handleOpenModal}>
              Place a Bid
            </button>
          </div>
        </div>
      </div>

      {/* Bids List Section */}
      <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-200">
        <h3 className="text-2xl font-bold mb-4">Current Bids ({bids.length})</h3>

        {bids.length === 0 ? (
          <p className="text-gray-500 italic">No bids placed yet. Be the first to place a bid!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Contact</th>
                  <th>Bid Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img src={bid.buyer_image} alt={bid.buyer_name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                          <div className="text-xs opacity-50">{bid.buyer_email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{bid.buyer_contact}</td>
                    <td className="font-semibold text-success">${bid.bid_price?.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${bid.status === 'accepted' ? 'badge-success' : 'badge-ghost'}`}>
                        {bid.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              onClick={handleCloseModal}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4">Place Your Bid</h3>

            {formError && (
              <div className="alert alert-error text-sm py-2 mb-4">
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bid Amount ($)</span>
                </label>
                <input
                  type="number"
                  required
                  min={product.price_min || product.price || 0}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder={`Min bid $${product.price_min || product.price || 0}`}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact Number</span>
                </label>
                <input
                  type="text"
                  required
                  value={buyerContact}
                  onChange={(e) => setBuyerContact(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Image URL (Optional)</span>
                </label>
                <input
                  type="url"
                  value={buyerImage}
                  onChange={(e) => setBuyerImage(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="modal-action">
                <button type="button" onClick={handleCloseModal} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn btn-primary">
                  {submitting ? 'Submitting...' : 'Confirm Bid'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;