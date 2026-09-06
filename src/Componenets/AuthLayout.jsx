import React from 'react';
import { Outlet } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50/60 text-gray-800 flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* Top Header / Navigation */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Navbar></Navbar>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Minimal Footer for Auth Pages */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-6 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Smart Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;