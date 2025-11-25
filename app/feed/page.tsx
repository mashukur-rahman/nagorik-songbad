'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NewsItem {
  id: string;
  caption: string;
  mediaUrl: string | null;
  mediaType: 'image' | 'video' | null;
  author: string;
  timestamp: Date;
  verified: boolean;
}

export default function FeedPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    caption: '',
    media: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [modalState, setModalState] = useState<'verifying' | 'verified' | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setUserEmail(email || '');
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

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, caption: e.target.value });
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, media: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setFormData({ ...formData, media: null });
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.caption.trim()) {
      alert('ক্যাপশন প্রয়োজন');
      return;
    }

    setIsSubmitting(true);
    
    // Show verifying modal
    setModalState('verifying');
    
    // Store media URL for the news item
    const mediaUrl = preview;
    const mediaType = formData.media?.type.startsWith('image/') ? 'image' : 
                     formData.media?.type.startsWith('video/') ? 'video' : null;
    
    // After 5 seconds, show verified and add to feed
    setTimeout(() => {
      setModalState('verified');
      
      // Create new news item
      const newNewsItem: NewsItem = {
        id: Date.now().toString(),
        caption: formData.caption,
        mediaUrl: mediaUrl,
        mediaType: mediaType,
        author: userEmail,
        timestamp: new Date(),
        verified: true,
      };
      
      // Add to news feed
      setNewsItems(prev => [newNewsItem, ...prev]);
      
      // Award points (10 points per verified post)
      const pointsPerPost = 10;
      const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
      const newPoints = currentPoints + pointsPerPost;
      localStorage.setItem('userPoints', newPoints.toString());
      
      // Store user posts in localStorage for profile page (without mediaUrl to avoid quota issues)
      try {
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        // Store only essential data without the large base64 media URL
        const postWithoutMedia = {
          id: newNewsItem.id,
          caption: newNewsItem.caption,
          mediaType: newNewsItem.mediaType,
          author: newNewsItem.author,
          timestamp: newNewsItem.timestamp.toISOString(),
          verified: newNewsItem.verified,
          hasMedia: !!newNewsItem.mediaUrl, // Just store if media exists, not the actual data
        };
        userPosts.push(postWithoutMedia);
        
        // Keep only the last 50 posts to prevent quota issues
        const limitedPosts = userPosts.slice(-50);
        localStorage.setItem('userPosts', JSON.stringify(limitedPosts));
      } catch (error) {
        // If storage fails, just log it but don't break the flow
        console.warn('Could not save post to localStorage:', error);
        // Clear old posts and try again with just the new one
        try {
          const postWithoutMedia = {
            id: newNewsItem.id,
            caption: newNewsItem.caption,
            mediaType: newNewsItem.mediaType,
            author: newNewsItem.author,
            timestamp: newNewsItem.timestamp.toISOString(),
            verified: newNewsItem.verified,
            hasMedia: !!newNewsItem.mediaUrl,
          };
          localStorage.setItem('userPosts', JSON.stringify([postWithoutMedia]));
        } catch (retryError) {
          // If even that fails, just skip storing
          console.warn('Could not save post even after cleanup:', retryError);
        }
      }
      
      // Reset form
      setFormData({ caption: '', media: null });
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setIsSubmitting(false);
      
      // Close modal after showing verified message for 2 seconds
      setTimeout(() => {
        setModalState(null);
      }, 2000);
    }, 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#fef9e7]">
      {/* Navigation */}
      <nav className="w-full border-b border-green-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-[#16a34a]">নাগরিক সংবাদ</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/leaderboard"
                className="text-sm text-[#2d5016] hover:text-[#16a34a] transition-colors font-medium"
              >
                লিডারবোর্ড
              </Link>
              <Link
                href="/profile"
                className="text-sm text-[#2d5016] hover:text-[#16a34a] transition-colors font-medium"
              >
                প্রোফাইল
              </Link>
              <span className="text-sm text-[#2d5016]/70 hidden sm:inline">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-[#2d5016] hover:text-[#16a34a] transition-colors font-medium"
              >
                লগআউট
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Publish News Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-8">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">নতুন সংবাদ প্রকাশ করুন</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Caption Field */}
            <div>
              <label htmlFor="caption" className="block text-sm font-semibold text-[#2d5016] mb-2">
                সংবাদের ক্যাপশন
              </label>
              <textarea
                id="caption"
                name="caption"
                value={formData.caption}
                onChange={handleCaptionChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-[#22c55e] focus:outline-none transition-colors text-[#2d5016] resize-none"
                placeholder="আপনার সংবাদের বিবরণ লিখুন..."
              />
            </div>

            {/* Media Upload Field */}
            <div>
              <label htmlFor="media" className="block text-sm font-semibold text-[#2d5016] mb-2">
                ছবি বা ভিডিও আপলোড করুন
              </label>
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="media"
                  name="media"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-[#22c55e]/10 text-[#16a34a] rounded-lg font-semibold hover:bg-[#22c55e]/20 transition-colors border-2 border-dashed border-[#22c55e]"
                  >
                    {formData.media ? 'মিডিয়া পরিবর্তন করুন' : 'মিডিয়া নির্বাচন করুন'}
                  </button>
                  {formData.media && (
                    <button
                      type="button"
                      onClick={handleRemoveMedia}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                    >
                      সরান
                    </button>
                  )}
                </div>
                
                {/* Preview */}
                {preview && (
                  <div className="mt-4">
                    {formData.media?.type.startsWith('image/') ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-w-full max-h-64 rounded-lg border-2 border-green-200 object-contain"
                      />
                    ) : formData.media?.type.startsWith('video/') ? (
                      <video
                        src={preview}
                        controls
                        controlsList="play pause volume seek fullscreen"
                        preload="metadata"
                        className="max-w-full max-h-64 rounded-lg border-2 border-green-200 w-full"
                      />
                    ) : null}
                    <p className="text-sm text-[#2d5016]/70 mt-2">
                      নির্বাচিত: {formData.media?.name}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#16a34a] transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'জমা দেওয়া হচ্ছে...' : 'সংবাদ প্রকাশ করুন'}
            </button>
          </form>
        </div>

        {/* News Feed Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-4">সংবাদ ফিড</h2>
          
          {/* News Items */}
          {newsItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <p className="text-[#2d5016]/70 text-center py-8">
                এখনও কোনো সংবাদ নেই। প্রথম সংবাদ প্রকাশ করুন!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {newsItems.map((news) => (
                <div key={news.id} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                  {/* Author and Timestamp */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#16a34a] font-semibold">
                          {news.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#2d5016]">{news.author}</p>
                        <p className="text-sm text-[#2d5016]/60">
                          {news.timestamp.toLocaleString('bn-BD', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    {news.verified && (
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
                    {news.caption}
                  </p>
                  
                  {/* Media */}
                  {news.mediaUrl && (
                    <div className="mt-4">
                      {news.mediaType === 'image' ? (
                        <img
                          src={news.mediaUrl}
                          alt="News media"
                          className="w-full rounded-lg border-2 border-green-200 object-contain max-h-96"
                        />
                      ) : news.mediaType === 'video' ? (
                        <video
                          src={news.mediaUrl}
                          controls
                          controlsList="play pause volume seek fullscreen"
                          preload="metadata"
                          className="w-full rounded-lg border-2 border-green-200 max-h-96"
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Verification Modal */}
      {modalState && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-green-100">
            {modalState === 'verifying' ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-[#22c55e]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <svg className="w-10 h-10 text-[#22c55e] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2d5016] mb-2">AI যাচাইকরণ চলছে</h3>
                <p className="text-[#2d5016]/70">
                  আমাদের AI এজেন্ট আপনার সংবাদ যাচাই করছে...
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#2d5016]/60">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    <span>ক্যাপশন-মিডিয়া মিল পরীক্ষা করা হচ্ছে</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2d5016]/60">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    <span>মেটাডেটা বিশ্লেষণ করা হচ্ছে</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2d5016]/60">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    <span>ডিপফেক সনাক্তকরণ চলছে</span>
                  </div>
                </div>
              </div>
            ) : modalState === 'verified' ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2d5016] mb-2">সংবাদ যাচাইকৃত!</h3>
                <p className="text-[#2d5016]/70">
                  আপনার সংবাদ সফলভাবে যাচাই করা হয়েছে এবং ফিডে প্রকাশিত হয়েছে।
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

