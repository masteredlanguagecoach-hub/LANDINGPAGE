'use client';

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Trophy, Target, Clock, ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToEnrollment = () => {
    const el = document.getElementById('courses') || document.getElementById('enrollment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-800/80">
      {/* Background Decorative Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Brand Pill */}
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 px-4 py-2 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-400">
              MASTERED ENGLISH SPEAKING CHALLENGE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.12]">
            32 CHALLENGES.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-red-500">
              2 MONTHS.
            </span>{' '}
            ONE GOAL:
            <span className="block mt-2 text-white">START SPEAKING ENGLISH.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Accept the challenge, build a consistent English-speaking practice, complete all required challenges within 2 months, and <strong className="text-amber-300 font-black underline decoration-amber-400/50 underline-offset-4">earn ₹300 back</strong>.
          </p>

          {/* Visual Commitment Diagram */}
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              HOW THE COMMITMENT MECHANISM WORKS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Step 1 */}
              <div className="bg-[#1F2937] border border-slate-700/80 p-4 rounded-2xl text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">STEP 1</span>
                <span className="text-xl font-black text-white block">PAY ₹399</span>
                <span className="text-xs font-semibold text-brand-400 block">Creates Commitment</span>
              </div>

              {/* Arrow 1 */}
              <div className="hidden sm:flex items-center justify-center text-brand-400 font-bold">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="sm:hidden flex items-center justify-center text-brand-400 py-1">
                <ArrowDown className="w-5 h-5" />
              </div>

              {/* Step 2 */}
              <div className="bg-[#1F2937] border border-brand-500/40 p-4 rounded-2xl text-center space-y-1 ring-2 ring-brand-500/20">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block">STEP 2</span>
                <span className="text-lg font-black text-white block">32 CHALLENGES (2 MONTHS)</span>
                <span className="text-xs font-semibold text-slate-300 block">Creates Consistent Practice</span>
              </div>

              {/* Arrow 2 */}
              <div className="hidden sm:flex items-center justify-center text-emerald-400 font-bold">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="sm:hidden flex items-center justify-center text-emerald-400 py-1">
                <ArrowDown className="w-5 h-5" />
              </div>

              {/* Step 3 */}
              <div className="bg-emerald-500/10 border border-emerald-500/40 p-4 rounded-2xl text-center space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">STEP 3</span>
                <span className="text-xl font-black text-emerald-400 block">GET ₹300 BACK</span>
                <span className="text-xs font-semibold text-emerald-300 block">Effective Cost = ₹99</span>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-2 flex flex-col items-center gap-3">
            <button
              onClick={scrollToEnrollment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-500 via-brand-600 to-red-600 hover:from-brand-600 hover:to-red-700 active:scale-[0.99] text-white font-black text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 rounded-2xl shadow-xl shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>ACCEPT THE CHALLENGE — ₹399</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            <p className="text-xs sm:text-sm font-semibold text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Successfully complete the challenge according to the published rules → Earn ₹300 back.</span>
            </p>
          </div>

          {/* Quick Anchor Badges */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5 bg-[#1F2937]/80 border border-slate-800 p-3 rounded-xl text-left">
              <Target className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-200">32 Structured Speaking Missions</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#1F2937]/80 border border-slate-800 p-3 rounded-xl text-left">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-200">2-Month Habit Goal</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#1F2937]/80 border border-slate-800 p-3 rounded-xl text-left">
              <Trophy className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-200">₹300 Completion Reward</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
