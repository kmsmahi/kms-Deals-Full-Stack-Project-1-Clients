import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { HiMiniCurrencyDollar, HiUser } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../Provider/AuthProvider';


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Public items visible to all users
  const publicNavItems = [
    { title: 'Home', path: '/' },
    { title: 'All Products', path: '/all-products' },
  ];

  // Protected items visible ONLY when authenticated
  const protectedNavItems = [
    { title: 'My Products', path: '/my-products' },
    { title: 'My Bids', path: '/my-bids' },
    { title: 'Create Product', path: '/create-product' },
  ];

  // Dynamically merge navigation items based on auth state
  const visibleNavItems = user 
    ? [...publicNavItems, ...protectedNavItems] 
    : publicNavItems;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await logOut();
      navigate('/auth/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="top-0 z-[999] backdrop-blur-md bg-base-100/90  border-purple-100/50 ">
      <div className="navbar w-11/12 mx-auto max-w-7xl px-0 py-2">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown Container */}
          <div className="relative lg:hidden mr-2" ref={dropdownRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="btn btn-ghost btn-circle text-purple-600 hover:bg-purple-50 hover:text-purple-700"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>

            {/* Framer Motion Mobile Dropdown */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute left-0 mt-3 w-64 p-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-900/15 border border-purple-100/80 z-50 flex flex-col gap-1"
                >
                  {/* User Header in Mobile Menu (If Logged In) */}
                  {user && (
                    <div className="flex items-center gap-3 p-2.5 mb-1 bg-purple-50/60 rounded-xl border border-purple-100">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-purple-300 flex-shrink-0 bg-purple-100 flex items-center justify-center">
                        {user?.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user?.displayName || "Profile"}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <HiUser className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="font-bold text-gray-900 text-xs truncate">
                          {user?.displayName || "User"}
                        </span>
                        <span className="text-[11px] text-gray-500 truncate">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Nav Links */}
                  <div className="flex flex-col gap-1">
                    {visibleNavItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `px-4 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-between ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                              : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50/80'
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>

                  {/* Auth Action Footer for Mobile */}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors text-center"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/auth/login"
                        onClick={() => setIsOpen(false)}
                        className="block w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 text-center shadow-md shadow-purple-500/20"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1 bg-purple-50/60 border border-purple-100/80 p-1.5 rounded-full">
            {visibleNavItems.map((item) => (
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
        <div className="navbar-end gap-3 items-center">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Profile Image Dropdown */}
              <div className="dropdown dropdown-end">
                <div 
                  tabIndex={0} 
                  role="button" 
                  title={user?.displayName || "User Profile"}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-600 shadow-md shadow-purple-500/20 transition-all cursor-pointer flex items-center justify-center bg-purple-100"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user?.displayName || "Profile"}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <HiUser className="w-6 h-6 text-purple-600" />
                  )}
                </div>

                {/* Profile Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-52 p-3 shadow-xl border border-gray-100 gap-1"
                >
                  <li className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="font-bold text-gray-900 text-sm truncate">{user?.displayName || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </li>
                  <li>
                    <Link to="/my-products" className="py-2 text-gray-700 font-medium">My Products</Link>
                  </li>
                  <li>
                    <Link to="/my-bids" className="py-2 text-gray-700 font-medium">My Bids</Link>
                  </li>
                  <li>
                    <Link to="/create-product" className="py-2 text-gray-700 font-medium">Create Product</Link>
                  </li>
                </ul>
              </div>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn border-none bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full px-6 min-h-0 h-10 font-semibold text-sm transition-all"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <Link to="/auth/login">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn border-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full px-7 min-h-0 h-11 font-medium shadow-md shadow-purple-500/20"
              >
                Login
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;