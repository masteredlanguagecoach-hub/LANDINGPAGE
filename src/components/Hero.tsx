'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, MessageSquareQuote, Shield, Play } from 'lucide-react';

export default function Hero() {
  const scrollToCourse = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-slate-50/50 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-100">
      {/* Background Decorative Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Brand Presentation Pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200/80 shadow-sm px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              Mastered Language Coach • Speaking Challenge
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] sm:leading-[1.12]">
            Stop Learning English.{' '}
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-600 to-red-700">
              Start Speaking It.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl md:text-2xl font-medium text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join the <strong className="text-slate-900 font-bold">Mastered Language Coach Speaking Challenge</strong> and build the confidence to use English in real conversations.
          </p>

          {/* Featured YouTube Video Embed */}
          <div className="pt-2 pb-4 max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-slate-900/15 bg-slate-950 aspect-video ring-1 ring-slate-200">
              <iframe
                src="https://www.youtube.com/embed/VB2wfG95w5I?rel=0&modestbranding=1"
                title="Mastered Language Coach Speaking Challenge Intro Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-2xl"
              />
            </div>
            <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-500 flex items-center justify-center gap-1.5">
              <Play className="w-4 h-4 text-brand-500 fill-brand-500" />
              <span>Watch how the Speaking Challenge transforms your fluency</span>
            </p>
          </div>

          {/* Primary CTA & Secondary Message */}
          <div className="pt-2 flex flex-col items-center gap-4">
            <button
              onClick={scrollToCourse}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-extrabold text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 rounded-2xl shadow-xl hover:shadow-2xl shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Join the Speaking Challenge</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            <p className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2">
              <span>Choose your language and start your speaking journey.</span>
            </p>
          </div>

          {/* Quick Value Badges */}
          <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-700">100% Practical Speaking</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <MessageSquareQuote className="w-5 h-5 text-brand-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-700">Daily Guided Practice</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-700">Instant App Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
