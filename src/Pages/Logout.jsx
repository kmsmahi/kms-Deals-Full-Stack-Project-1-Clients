import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';

const Logout = () => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // Execute your auth logout method here (e.g., await signOut(auth))
      console.log('Logging out user...');
      
      // Delay briefly for user feedback
      setTimeout(() => {
        setLoggingOut(false);
        navigate('/login');
      }, 800);
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl p-8 text-center space-y-6"
      >
        {/* Icon */}
        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">Signing Out</h2>
          <p className="text-xs text-gray-500">
            Are you sure you want to end your session? You will need to sign in again to submit bids or manage listings.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            {loggingOut ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Logging out...
              </>
            ) : (
              'Confirm Logout'
            )}
          </button>

          <Link
            to="/"
            className="block w-full py-3 rounded-xl font-semibold text-gray-600 bg-slate-50 hover:bg-slate-100 transition-colors text-sm"
          >
            Cancel & Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Logout;