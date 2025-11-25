'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Demo credentials: any email/password combination works
    // For demo purposes, accept any non-empty credentials
    if (formData.email.trim() && formData.password.trim()) {
      // Store demo login state (in a real app, use proper auth)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      
      // Initialize user data if not exists
      if (!localStorage.getItem('userName')) {
        localStorage.setItem('userName', formData.email.split('@')[0]);
      }
      if (!localStorage.getItem('userPoints')) {
        localStorage.setItem('userPoints', '0');
      }
      if (!localStorage.getItem('userPosts')) {
        localStorage.setItem('userPosts', '[]');
      }
      
      router.push('/feed');
    } else {
      setError('ইমেইল এবং পাসওয়ার্ড প্রয়োজন');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#fef9e7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-[#16a34a] mb-2">নাগরিক সংবাদ</h1>
          </Link>
          <p className="text-[#2d5016]/70">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#2d5016] mb-2">
                ইমেইল
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-[#22c55e] focus:outline-none transition-colors text-[#2d5016]"
                placeholder="আপনার ইমেইল ঠিকানা"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2d5016] mb-2">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-[#22c55e] focus:outline-none transition-colors text-[#2d5016]"
                placeholder="আপনার পাসওয়ার্ড"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#16a34a] hover:text-[#22c55e] transition-colors">
                পাসওয়ার্ড ভুলে গেছেন?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#16a34a] transition-all transform hover:scale-105 shadow-lg"
            >
              প্রবেশ করুন
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-green-200"></div>
            <span className="px-4 text-sm text-[#2d5016]/60">অথবা</span>
            <div className="flex-1 border-t border-green-200"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-[#2d5016]/70">
              নতুন ব্যবহারকারী?{' '}
              <Link href="/register" className="text-[#16a34a] hover:text-[#22c55e] font-semibold transition-colors">
                নিবন্ধন করুন
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[#2d5016]/70 hover:text-[#16a34a] transition-colors">
            ← হোমপেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}

