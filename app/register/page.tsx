'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('পাসওয়ার্ড মিলছে না');
      return;
    }
    
    // Store user data
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userPoints', '0');
    localStorage.setItem('userPosts', '[]');
    
    router.push('/feed');
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
          <p className="text-[#2d5016]/70">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#2d5016] mb-2">
                নাম
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-[#22c55e] focus:outline-none transition-colors text-[#2d5016]"
                placeholder="আপনার পূর্ণ নাম"
              />
            </div>

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
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-[#22c55e] focus:outline-none transition-colors text-[#2d5016]"
                placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#2d5016] mb-2">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-[#22c55e] focus:outline-none transition-colors text-[#2d5016]"
                placeholder="পাসওয়ার্ড পুনরায় লিখুন"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 mr-2 w-4 h-4 text-[#22c55e] border-green-300 rounded focus:ring-[#22c55e]"
              />
              <label htmlFor="terms" className="text-sm text-[#2d5016]/70">
                আমি{' '}
                <a href="#" className="text-[#16a34a] hover:text-[#22c55e] transition-colors">
                  ব্যবহারের শর্তাবলী
                </a>{' '}
                এবং{' '}
                <a href="#" className="text-[#16a34a] hover:text-[#22c55e] transition-colors">
                  গোপনীয়তা নীতি
                </a>{' '}
                পড়েছি এবং সম্মত
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#16a34a] transition-all transform hover:scale-105 shadow-lg"
            >
              নিবন্ধন করুন
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-green-200"></div>
            <span className="px-4 text-sm text-[#2d5016]/60">অথবা</span>
            <div className="flex-1 border-t border-green-200"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-[#2d5016]/70">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link href="/login" className="text-[#16a34a] hover:text-[#22c55e] font-semibold transition-colors">
                প্রবেশ করুন
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

