'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Trophy, Sparkles, Target } from 'lucide-react';

export default function FinalConversionCta() {
  const scrollToEnrollment = () => {
    const el = document.getElementById('courses') || document.getElementById('enrollment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const checklist = [
    '32 Structured Speaking Challenges',
    '2 Months Habit Deadline',
    'AI Coach Speaking Practice',
    'Malayalam / Hindi Explanation Content',
    'Build Daily Consistency',
    'Create Permanent Speaking Habit',
    'Complete the Challenge',
    'Get ₹300 Back After Verification',
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500/20 to-red-500/20 border border-brand-500/40 px-4 py-2 rounded-full text-brand-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>THE FINAL CHALLENGE DECISION</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              YOU ARE NOT PAYING ₹399 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-red-500">
                JUST TO BUY ANOTHER COURSE.
              </span>
            </h2>

            <p className="text-xl sm:text-3xl font-black text-amber-300 tracking-tight">
              YOU ARE COMMITTING YOURSELF TO SPEAK ENGLISH FOR THE NEXT 2 MONTHS.
            </p>
          </div>

          {/* Checklist */}
          <div className="bg-[#111827] border border-slate-800 p-6 sm:p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-left shadow-2xl">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-200">{item}</span>
              </div>
            ))}
          </div>

          {/* The Big Question */}
          <div className="bg-gradient-to-r from-brand-950/60 via-slate-900 to-emerald-950/60 border border-brand-500/30 p-6 sm:p-8 rounded-3xl space-y-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">THE QUESTION ISN&apos;T:</span>
            <p className="text-lg sm:text-xl font-bold text-slate-300 italic line-through decoration-red-500/80 decoration-2">
              &ldquo;Can I learn English?&rdquo;
            </p>
            <span className="text-xs font-black text-brand-400 uppercase tracking-widest block pt-2">THE QUESTION IS:</span>
            <p className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              &ldquo;CAN I COMPLETE THE CHALLENGE?&rdquo;
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              onClick={scrollToEnrollment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-500 via-brand-600 to-red-600 hover:from-brand-600 hover:to-red-700 active:scale-[0.99] text-white font-black text-lg sm:text-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-2xl shadow-2xl shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>ACCEPT THE CHALLENGE — ₹399</span>
              <ArrowRight className="w-7 h-7" />
            </button>

            <p className="text-xs sm:text-sm font-semibold text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Successfully meet the challenge completion requirements within 2 months → Eligible for ₹300 back.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
