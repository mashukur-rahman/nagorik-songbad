'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  name: string;
  email: string;
  points: number;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  // Demo leaderboard data
  const demoLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'আহমেদ হাসান', email: 'ahmed@example.com', points: 450 },
    { rank: 2, name: 'ফাতিমা খাতুন', email: 'fatima@example.com', points: 380 },
    { rank: 3, name: 'রহমান আলী', email: 'rahman@example.com', points: 320 },
    { rank: 4, name: 'সুমাইয়া ইসলাম', email: 'sumaiya@example.com', points: 290 },
    { rank: 5, name: 'করিম উদ্দিন', email: 'karim@example.com', points: 250 },
    { rank: 6, name: 'নাজমা বেগম', email: 'nazma@example.com', points: 220 },
    { rank: 7, name: 'ইমরান হোসেন', email: 'imran@example.com', points: 190 },
    { rank: 8, name: 'আয়েশা খান', email: 'ayesha@example.com', points: 170 },
    { rank: 9, name: 'মাহমুদ হাসান', email: 'mahmud@example.com', points: 150 },
    { rank: 10, name: 'রোকেয়া সুলতানা', email: 'rokeya@example.com', points: 130 },
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      const points = parseInt(localStorage.getItem('userPoints') || '0');
      setUserPoints(points);
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

  const userEmail = localStorage.getItem('userEmail') || '';
  const userEntry = demoLeaderboard.find(entry => entry.email === userEmail);
  
  // If user is not in top 10, calculate their rank
  let userRank = demoLeaderboard.findIndex(entry => entry.email === userEmail) + 1;
  if (userRank === 0) {
    // User is not in top 10, estimate rank based on points
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    const rankAbove = demoLeaderboard.filter(entry => entry.points > userPoints).length;
    userRank = rankAbove + 1;
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
                href="/profile"
                className="text-sm text-[#2d5016] hover:text-[#16a34a] transition-colors font-medium"
              >
                প্রোফাইল
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2d5016] mb-4">লিডারবোর্ড</h1>
          <p className="text-lg text-[#2d5016]/70">
            সর্বোচ্চ পয়েন্ট অর্জনকারী নাগরিক সাংবাদিকরা
          </p>
        </div>

        {/* User's Current Rank */}
        <div className="bg-gradient-to-r from-[#22c55e]/10 to-[#16a34a]/10 rounded-2xl p-6 mb-8 border-2 border-[#22c55e]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2d5016]/70 mb-1">আপনার র‍্যাঙ্ক</p>
              <p className="text-3xl font-bold text-[#2d5016]">#{userRank}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#2d5016]/70 mb-1">আপনার পয়েন্ট</p>
              <p className="text-3xl font-bold text-[#16a34a]">{userPoints}</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#22c55e]/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2d5016]">র‍্যাঙ্ক</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2d5016]">নাম</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#2d5016]">পয়েন্ট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {demoLeaderboard.map((entry, index) => (
                  <tr
                    key={entry.rank}
                    className={`hover:bg-green-50/50 transition-colors ${
                      entry.email === userEmail ? 'bg-[#22c55e]/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {entry.rank <= 3 ? (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            entry.rank === 1 ? 'bg-yellow-500' :
                            entry.rank === 2 ? 'bg-gray-400' :
                            'bg-amber-600'
                          }`}>
                            {entry.rank}
                          </div>
                        ) : (
                          <span className="text-lg font-semibold text-[#2d5016]">#{entry.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
                          <span className="text-[#16a34a] font-semibold">
                            {entry.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#2d5016]">{entry.name}</p>
                          <p className="text-sm text-[#2d5016]/60">{entry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold text-[#16a34a]">{entry.points}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brave Citizen Award Notice */}
        <div className="mt-8 bg-gradient-to-r from-[#22c55e]/10 to-[#16a34a]/10 rounded-2xl p-6 border-2 border-[#22c55e]/20">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#2d5016] mb-2">সাহসী নাগরিক পুরস্কার</h3>
              <p className="text-[#2d5016]/70 leading-relaxed">
                বছরের শেষে সর্বোচ্চ পয়েন্ট অর্জনকারী নাগরিক সাংবাদিককে দেওয়া হবে{' '}
                <span className="font-bold text-[#16a34a]">সাহসী নাগরিক পুরস্কার</span>।
                প্রতিটি যাচাইকৃত সংবাদের জন্য আপনি পয়েন্ট অর্জন করুন এবং লিডারবোর্ডে আপনার অবস্থান উন্নত করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

