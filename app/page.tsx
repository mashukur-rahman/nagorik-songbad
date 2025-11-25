import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fef9e7]">
      {/* Navigation */}
      <nav className="w-full border-b border-green-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-[#16a34a]">নাগরিক সংবাদ</h1>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-[#2d5016] hover:text-[#16a34a] transition-colors font-medium">
                বৈশিষ্ট্য
              </a>
              <a href="#how-it-works" className="text-[#2d5016] hover:text-[#16a34a] transition-colors font-medium">
                কিভাবে কাজ করে
              </a>
              <Link href="/login" className="bg-[#22c55e] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#16a34a] transition-colors">
                প্রবেশ করুন
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2d5016] mb-6 leading-tight">
            সত্যের জন্য নাগরিকদের কণ্ঠ
          </h1>
          <p className="text-xl md:text-2xl text-[#2d5016]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-যাচাইকৃত নাগরিক সাংবাদিকতার প্ল্যাটফর্ম যেখানে প্রতিটি সংবাদ সত্যতা যাচাই করে প্রকাশিত হয়
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-[#22c55e] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#16a34a] transition-all transform hover:scale-105 shadow-lg">
              সংবাদ শেয়ার করুন
            </button>
            <button className="bg-white text-[#2d5016] border-2 border-[#22c55e] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#22c55e]/10 transition-all">
              আরও জানুন
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2d5016] mb-4">আমাদের বৈশিষ্ট্য</h2>
          <p className="text-lg text-[#2d5016]/70 max-w-2xl mx-auto">
            AI-চালিত যাচাইকরণ প্রক্রিয়া যা নিশ্চিত করে প্রতিটি সংবাদের সত্যতা
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#2d5016] mb-4">ক্যাপশন-মিডিয়া যাচাই</h3>
            <p className="text-[#2d5016]/70 leading-relaxed">
              AI এজেন্ট স্বয়ংক্রিয়ভাবে চিত্র/ভিডিও এবং ক্যাপশনের মধ্যে প্রাসঙ্গিকতা পরীক্ষা করে
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#2d5016] mb-4">মেটাডেটা ও রিভার্স সার্চ</h3>
            <p className="text-[#2d5016]/70 leading-relaxed">
              প্রতিটি চিত্র/ভিডিওর মেটাডেটা বিশ্লেষণ এবং রিভার্স ইমেজ সার্চের মাধ্যমে সত্যতা যাচাই
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#ef4444]/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#2d5016] mb-4">ডিপফেক সনাক্তকরণ</h3>
            <p className="text-[#2d5016]/70 leading-relaxed">
              উন্নত API ব্যবহার করে ডিপফেক এবং ম্যানিপুলেটেড মিডিয়া সনাক্তকরণ
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white/50 rounded-3xl mx-4 md:mx-auto mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2d5016] mb-4">কিভাবে কাজ করে</h2>
          <p className="text-lg text-[#2d5016]/70 max-w-2xl mx-auto">
            সহজ তিনটি ধাপে আপনার সংবাদ যাচাই করুন
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-[#22c55e] text-white rounded-full flex items-center justify-center font-bold text-xl">
              ১
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#2d5016] mb-2">সংবাদ আপলোড করুন</h3>
              <p className="text-[#2d5016]/70 leading-relaxed">
                চিত্র বা ভিডিও সহ আপনার সংবাদের ক্যাপশন আপলোড করুন
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-[#22c55e] text-white rounded-full flex items-center justify-center font-bold text-xl">
              ২
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#2d5016] mb-2">AI যাচাইকরণ</h3>
              <p className="text-[#2d5016]/70 leading-relaxed">
                আমাদের AI এজেন্ট স্বয়ংক্রিয়ভাবে ক্যাপশন-মিডিয়া মিল, মেটাডেটা, রিভার্স সার্চ এবং ডিপফেক পরীক্ষা করবে
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-[#22c55e] text-white rounded-full flex items-center justify-center font-bold text-xl">
              ৩
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#2d5016] mb-2">প্রকাশনা বা প্রত্যাখ্যান</h3>
              <p className="text-[#2d5016]/70 leading-relaxed">
                সত্যতা যাচাই হলে সংবাদ প্রকাশিত হবে এবং আপনি পয়েন্ট পাবেন। মিথ্যা হলে অ্যাকাউন্ট নিষিদ্ধ হবে
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#22c55e]/10 to-[#16a34a]/10 rounded-3xl p-12 text-center border-2 border-[#22c55e]/20">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-[#2d5016] mb-4">পয়েন্ট ও পুরস্কার</h2>
            <p className="text-xl text-[#2d5016]/80 mb-6 leading-relaxed">
              প্রতিটি যাচাইকৃত সংবাদের জন্য পয়েন্ট অর্জন করুন
            </p>
            <p className="text-lg text-[#2d5016]/70 mb-8 leading-relaxed">
              বছরের শেষে সর্বোচ্চ অবদানকারীকে দেওয়া হবে <span className="font-bold text-[#16a34a]">সাহসী নাগরিক পুরস্কার</span>
            </p>
            <Link href="/register" className="inline-block bg-[#22c55e] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#16a34a] transition-all transform hover:scale-105 shadow-lg">
              এখনই শুরু করুন
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-green-200/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#16a34a] mb-4">নাগরিক সংবাদ</h3>
            <p className="text-[#2d5016]/70 mb-6">
              সত্যের জন্য নাগরিকদের কণ্ঠ
            </p>
            <div className="flex justify-center space-x-6 text-sm text-[#2d5016]/60">
              <a href="#" className="hover:text-[#16a34a] transition-colors">গোপনীয়তা নীতি</a>
              <a href="#" className="hover:text-[#16a34a] transition-colors">ব্যবহারের শর্তাবলী</a>
              <a href="#" className="hover:text-[#16a34a] transition-colors">যোগাযোগ</a>
            </div>
            <p className="text-sm text-[#2d5016]/50 mt-8">
              © ২০২৪ নাগরিক সংবাদ। সকল অধিকার সংরক্ষিত।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
