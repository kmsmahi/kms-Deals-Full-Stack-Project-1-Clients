import React from 'react';
import { Link } from 'react-router';
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-100 border-t border-gray-200/80 text-gray-700 mt-12">
      <div className="w-11/12 mx-auto max-w-7xl py-12 px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
                <HiMiniCurrencyDollar className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent tracking-tight">
                KmsDeals
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              Your trusted local online marketplace for buying, selling, and real-time competitive bidding. Post your products or negotiate prices on neighborhood deals effortlessly.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-gray-200/80 hover:bg-purple-600 hover:text-white transition-all">
                <FaGithub className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-gray-200/80 hover:bg-purple-600 hover:text-white transition-all">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-gray-200/80 hover:bg-purple-600 hover:text-white transition-all">
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="font-semibold text-gray-900 text-base mb-4">Marketplace</h6>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/all-products" className="hover:text-purple-600 transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/my-products" className="hover:text-purple-600 transition-colors">My Listings</Link>
              </li>
              <li>
                <Link to="/my-bids" className="hover:text-purple-600 transition-colors">My Bids</Link>
              </li>
              <li>
                <Link to="/create-product" className="hover:text-purple-600 transition-colors">Post Product</Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h6 className="font-semibold text-gray-900 text-base mb-4">Account</h6>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-purple-600 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-purple-600 transition-colors">Register</Link>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">Profile Settings</span>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">Bidding History</span>
              </li>
            </ul>
          </div>

          {/* Legal / Community */}
          <div>
            <h6 className="font-semibold text-gray-900 text-base mb-4">Community & Legal</h6>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#terms" className="hover:text-purple-600 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#rules" className="hover:text-purple-600 transition-colors">Bidding Guidelines</a>
              </li>
              <li>
                <a href="#support" className="hover:text-purple-600 transition-colors">Trust & Safety</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} KMS-DEALS. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, Vite, Tailwind CSS & Firebase
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;