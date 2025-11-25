'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NewsItem {
  id: string;
  caption: string;
  mediaUrl?: string | null;
  mediaType: 'image' | 'video' | null;
  author: string;
  timestamp: Date;
  verified: boolean;
  hasMedia?: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [userPosts, setUserPosts] = useState<NewsItem[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      const email = localStorage.getItem('userEmail') || '';
      const name = localStorage.getItem('userName') || email.split('@')[0];
      const points = parseInt(localStorage.getItem('userPoints') || '0');
      const posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
      
      // Convert timestamp strings back to Date objects
      const postsWithDates = posts.map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp),
      }));
      
      setUserEmail(email);
      setUserName(name);
      setUserPoints(points);
      setUserPosts(postsWithDates);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fef9e7] flex items-center justify-center">
        <div className="text-[#2d5016]">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef9e7]">
      {/* Navigation */}
      <nav className="w-full border-b border-green-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/feed" className="flex items-center">
              <h1 className="text-2xl font-bold text-[#16a34a]">নাগরিক সংবাদ</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/feed"
                className="text-sm text-[#2d5016] hover:text-[#16a34a] transition-colors font-medium"
              >
                ফিড
              </Link>
              <Link
                href="/leaderboard"
                className="text-sm text-[#2d5016] hover:text-[#16a34a] transition-colors font-medium"
              >
                লিডারবোর্ড
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold text-[#16a34a]">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#2d5016] mb-2">{userName}</h1>
              <p className="text-[#2d5016]/70 mb-6">{userEmail}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#22c55e]/10 rounded-lg p-4">
                  <p className="text-sm text-[#2d5016]/70 mb-1">মোট পোস্ট</p>
                  <p className="text-2xl font-bold text-[#16a34a]">{userPosts.length}</p>
                </div>
                <div className="bg-[#22c55e]/10 rounded-lg p-4">
                  <p className="text-sm text-[#2d5016]/70 mb-1">মোট পয়েন্ট</p>
                  <p className="text-2xl font-bold text-[#16a34a]">{userPoints}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Posts Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">আমার প্রকাশিত সংবাদ</h2>
          
          {userPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <p className="text-[#2d5016]/70 text-center py-8">
                আপনি এখনও কোনো সংবাদ প্রকাশ করেননি। প্রথম সংবাদ প্রকাশ করুন!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                  {/* Timestamp */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-[#2d5016]/60">
                      {post.timestamp.toLocaleString('bn-BD', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {post.verified && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                        <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold text-[#16a34a]">যাচাইকৃত</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Caption */}
                  <p className="text-[#2d5016] mb-4 leading-relaxed whitespace-pre-wrap">
                    {post.caption}
                  </p>
                  
                  {/* Media */}
                  {post.hasMedia && (
                    <div className="mt-4">
                      {post.mediaUrl ? (
                        post.mediaType === 'image' ? (
                          <img
                            src={post.mediaUrl}
                            alt="News media"
                            className="w-full rounded-lg border-2 border-green-200 object-contain max-h-96"
                          />
                        ) : post.mediaType === 'video' ? (
                          <video
                            src={post.mediaUrl}
                            controls
                            controlsList="play pause volume seek fullscreen"
                            preload="metadata"
                            className="w-full rounded-lg border-2 border-green-200 max-h-96"
                          />
                        ) : null
                      ) : (
                        <div className="w-full h-48 bg-green-50 rounded-lg border-2 border-green-200 border-dashed flex items-center justify-center">
                          <div className="text-center">
                            <svg className="w-12 h-12 text-[#22c55e] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-[#2d5016]/70">
                              {post.mediaType === 'image' ? 'ছবি' : post.mediaType === 'video' ? 'ভিডিও' : 'মিডিয়া'} আপলোড করা হয়েছিল
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

