'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const scrollToEnrollment = () => {
    const el = document.getElementById('enrollment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Mastered Language Coach Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
              Mastered Language Coach
            </span>
            <span className="text-xs sm:text-sm font-semibold text-brand-500 tracking-wide uppercase">
              Speak With Confidence
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Speaking Program</span>
          </div>

          <button
            onClick={scrollToEnrollment}
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base cursor-pointer"
          >
            <span>Join Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
