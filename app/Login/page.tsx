'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react"
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false, // Prevent default redirect to handle manually
      });

      if (res?.error) {
        setErrorMessage('Invalid credentials. Please try again.');
      } else {
        window.location.href = '/CMS'; // Redirect on successful login
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = () => {
    signIn('github', { callbackUrl: '/CMS' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-white/80">Sign in to access your CMS dashboard</p>
            </motion.div>

            {errorMessage && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-center text-red-500">
                {errorMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="mb-6">
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 bg-white/20 border border-white/30 rounded focus:ring-white/50" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
                  Forgot password?
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-white/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? <span className="animate-spin">🔄</span> : 'Sign in'}
                </button>
              </motion.div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white/70 mb-4">Or continue with</p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <button
                  onClick={handleGithubLogin}
                  className="w-full flex items-center justify-center px-4 py-3 border border-white/30 rounded-lg text-white bg-black/30 hover:bg-black/40 transition-all"
                >
                  <FaGithub className="w-5 h-5 mr-2" />
                  Continue with GitHub
                </button>
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-white/20 p-6 text-center">
            <p className="text-sm text-white">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-white hover:text-white/80 transition-colors">
                Sign up
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div> */}
<button onClick={() => signIn('github', { callbackUrl: '/CMS' })}>Sign in</button>    </div>
  );
}
