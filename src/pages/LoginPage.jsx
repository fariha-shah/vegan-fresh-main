// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Mail, Lock, Leaf } from 'lucide-react';
import { loginSuccess } from '../store/slices/authSlice';
import vegImage from '../assets/images/veg.png';
import logo from '../assets/images/logo.png';
import { useLocation } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem('registered_user') || 'null'
    );

    let userData;

    // ADMIN LOGIN (fixed credentials)
    if (form.email === 'admin@gmail.com' && form.password === 'admin123') {
      userData = {
        name: 'Admin',
        email: form.email,
        role: 'admin',
      };
    }
    // REGISTERED USER LOGIN
    else if (
      savedUser &&
      savedUser.email === form.email &&
      savedUser.password === form.password
    ) {
      userData = {
        name: savedUser.name,
        email: savedUser.email,
        role: 'user',
      };
    }
    // DEMO USER
    else {
      userData = {
        name: form.email.split('@')[0],
        email: form.email,
        role: 'user',
      };
    }

    dispatch(loginSuccess({ user: userData, token: 'demo-token' }));
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify(userData));
    // 👇 redirect logic
    const redirectPath =
      location.state?.from ||
      (userData.role === 'admin' ? '/admin' : '/dashboard');

    navigate(redirectPath, { replace: true });
  };
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-pale via-white to-green-light/20 px-4 pt-[120px] pb-16">
      {/* Ambient background blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-green-light/30 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-green-primary/10 blur-3xl"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex items-center max-w-3xl w-full">
        {/* Frosted glass form card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-20 bg-white/70 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-card p-10 w-full max-w-md -mr-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-poppins text-3xl font-bold text-green-dark mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-inter text-sm text-text-dark/50 mb-8"
          >
            Login to continue shopping fresh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 pb-2 border-b-2 border-green-light/40 flex items-center justify-between focus-within:border-green-primary transition-colors"
          >
            <div className="flex-1">
              <label className="block text-xs text-text-dark/50 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none font-inter text-sm text-text-dark"
              />
            </div>
            <Mail size={16} className="text-green-primary shrink-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="mb-8 pb-2 border-b-2 border-green-light/40 flex items-center justify-between focus-within:border-green-primary transition-colors"
          >
            <div className="flex-1">
              <label className="block text-xs text-text-dark/50 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none font-inter text-sm text-text-dark"
              />
            </div>
            <Lock size={16} className="text-green-primary shrink-0" />
          </motion.div>

          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-green-primary to-green-dark text-white font-poppins font-bold py-3.5 rounded-full shadow-card hover:shadow-hover transition-shadow"
          >
            Login
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-center font-inter text-sm text-text-dark/60 mt-6"
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-green-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </motion.p>
        </motion.form>

        {/* Image panel — layered green gradient, glow, leaves, logo above vegetables */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="hidden md:flex relative z-10 w-[320px] h-[460px] rounded-[32px] bg-gradient-to-br from-green-dark via-green-primary to-green-dark items-center justify-center overflow-hidden shadow-card"
        >
          {/* Decorative glow */}
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-green-light/40 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Subtle dot texture */}
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Floating leaf accents */}
          <motion.div
            className="absolute top-8 right-10 text-white/20"
            animate={{ rotate: [0, 15, 0], y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Leaf size={36} />
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-8 text-white/15"
            animate={{ rotate: [0, -12, 0], y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Leaf size={28} />
          </motion.div>

          {/* Logo above the vegetables */}
          <div className="relative z-10 flex flex-col items-center px-8">
            <Link to="/">
              <motion.img
                src={logo}
                alt="The Vegan"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="h-20 w-auto object-contain drop-shadow-lg mb-2 cursor-pointer"
              />
            </Link>
            <motion.img
              src={vegImage}
              alt="Fresh vegetables"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-[230px] object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
