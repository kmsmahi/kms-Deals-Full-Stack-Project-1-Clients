import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Add Firebase/Auth login here (e.g., await signInWithEmailAndPassword(auth, email, password))
      console.log('Logging in user:', formData);
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Add Google OAuth Provider login here
      console.log('Google login initiated');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Failed to sign in with Google.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            Welcome Back
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-xs text-gray-500">
            Enter your credentials to access your dashboard & bids
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium text-center">
            {error}
          </div>
        )}

        {/* Social Login Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-slate-50 text-gray-700 font-semibold text-sm transition-all shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-gray-400 font-medium absolute">
            OR
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="input input-bordered w-full font-medium text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl"
            />
          </div>

          <div className="form-control w-full">
            <div className="flex items-center justify-between">
              <label className="label text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full font-medium text-gray-900 border-gray-200 focus:border-purple-600 focus:outline-none rounded-xl pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-semibold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Updated link target to match auth/register route */}
        <p className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-bold text-purple-600 hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;