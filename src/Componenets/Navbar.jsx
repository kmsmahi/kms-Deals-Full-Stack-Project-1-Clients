import React from 'react';
import { NavLink, Link } from 'react-router';
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { motion } from 'framer-motion';

const Navbar = () => {
  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'All Products', path: '/all-products' },
    { title: 'My Products', path: '/my-products' },
    { title: 'My Bids', path: '/my-bids' },
    { title: 'Create Product', path: '/create-product' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 mt-3">
      <div className="navbar w-11/12 mx-auto max-w-7xl px-0 py-2">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost lg:hidden text-purple-600 hover:bg-purple-50 hover:text-purple-700"
            >
              <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-56 p-3 shadow-xl border border-purple-100 flex flex-col gap-1"
            >
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-xl font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30"
            >
              <HiMiniCurrencyDollar className="w-6 h-6" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent tracking-tight">
              KmsDeals
            </span>
          </Link>
        </div>

        {/* Navbar Center (Desktop Links with Framer Motion Active Indicator) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1 bg-purple-50/60 border border-purple-100/80 p-1.5 rounded-full">
            {navItems.map((item) => (
              <li key={item.path} className="relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 z-10 block ${
                      isActive ? 'text-white' : 'text-gray-600 hover:text-purple-700'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.title}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-md shadow-purple-500/30 z-0"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn border-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full px-7 min-h-0 h-11 font-medium shadow-md shadow-purple-500/20"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;