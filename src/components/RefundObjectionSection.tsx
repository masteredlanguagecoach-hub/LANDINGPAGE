'use client';

import React from 'react';
import { HelpCircle, ArrowDown, Check, Zap, AlertCircle } from 'lucide-react';

export default function RefundObjectionSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header Card */}
        <div className="max-w-4xl mx-auto bg-[#111827] border-2 border-brand-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 px-4 py-2 rounded-full text-brand-400 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-brand-400" />
            <span>ANSWERING THE BIGGEST QUESTION FIRST</span>
          </div>

          {/* Big Headline */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              &ldquo;YOU CHARGE ₹399 AND GIVE ₹300 BACK? <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-brand-400 to-emerald-400">
                HOW IS THAT POSSIBLE?
              </span>&rdquo;
            </h2>

            <p className="text-base sm:text-xl text-emerald-400 font-extrabold flex items-center gap-2">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span>Yes. Successfully complete the challenge according to the challenge rules and you can receive ₹300 back.</span>
            </p>
          </div>

          {/* Detailed Explanation */}
          <div className="bg-[#1F2937]/70 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            <p className="text-white font-black text-lg sm:text-xl">
              The reason is simple:
            </p>
            <p>
              We don&apos;t want you to pay ₹399, buy another English course, watch a few videos, and stop practising. <strong className="text-white font-bold underline decoration-brand-500">We want you to SPEAK ENGLISH.</strong>
            </p>
            <p>
              Many learners start English courses with motivation. They watch videos. They learn grammar. They learn vocabulary. Then, after a few days, the practice stops.
            </p>
            <p className="text-amber-300 font-bold">
              Mastered was designed to change that behaviour. That&apos;s why this is not positioned as just another course. It&apos;s a SPEAKING CHALLENGE.
            </p>
          </div>

          {/* Visual Step Journey */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block text-center">
              THE 5-STEP CHALLENGE REWARD PATH
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center font-bold text-xs sm:text-sm">
              <div className="bg-[#1F2937] border border-slate-700 p-3.5 rounded-xl text-white space-y-1">
                <span className="text-[10px] text-brand-400 block font-black">STEP 01</span>
                <span>YOU JOIN FOR ₹399</span>
              </div>
              <div className="bg-[#1F2937] border border-slate-700 p-3.5 rounded-xl text-white space-y-1">
                <span className="text-[10px] text-brand-400 block font-black">STEP 02</span>
                <span>YOU COMMIT TO PRACTICE</span>
              </div>
              <div className="bg-[#1F2937] border border-brand-500/50 p-3.5 rounded-xl text-white space-y-1 ring-2 ring-brand-500/20">
                <span className="text-[10px] text-brand-400 block font-black">STEP 03</span>
                <span>32 SPEAKING MISSIONS</span>
              </div>
              <div className="bg-[#1F2937] border border-slate-700 p-3.5 rounded-xl text-white space-y-1">
                <span className="text-[10px] text-brand-400 block font-black">STEP 04</span>
                <span>MEET REQUIREMENTS</span>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/40 p-3.5 rounded-xl text-emerald-400 space-y-1">
                <span className="text-[10px] text-emerald-300 block font-black">STEP 05</span>
                <span>GET ₹300 BACK</span>
              </div>
            </div>
          </div>

          {/* Explanatory Effective Retained Note */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center space-y-1">
            <span className="text-xs sm:text-sm font-bold text-slate-300">
              After successful completion according to official rules, the effective amount retained is <strong className="text-emerald-400 font-black text-base sm:text-lg">₹99</strong>.
            </span>
            <span className="text-[11px] text-slate-500 block">
              (Entry price remains ₹399. ₹99 is the explanatory retained amount after eligible ₹300 refund.)
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
