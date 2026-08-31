'use client';

import React from 'react';
import { Mic, Bot, Sparkles, Flame, CalendarCheck, CheckSquare, Trophy } from 'lucide-react';

export default function WhatYouGetSection() {
  const valueCards = [
    {
      number: '01',
      title: 'ACTUAL SPEAKING PRACTICE',
      description: 'You spend time actually speaking English instead of only passively watching English lessons.',
      icon: Mic,
      badge: 'Real Action',
    },
    {
      number: '02',
      title: 'AI COACH PRACTICE',
      description: 'Practice in a private, low-pressure environment where you can try, make mistakes, and improve without fear.',
      icon: Bot,
      badge: 'Low Pressure',
    },
    {
      number: '03',
      title: 'SPEAKING CONFIDENCE',
      description: 'Repeated speaking attempts help you overcome hesitation and feel natural using English in daily life.',
      icon: Sparkles,
      badge: 'Mindset Shift',
    },
    {
      number: '04',
      title: 'CONSISTENCY',
      description: 'The challenge structure gives you a clear goal and daily accountability to keep coming back.',
      icon: Flame,
      badge: 'Daily Momentum',
    },
    {
      number: '05',
      title: 'PRACTICE HABIT',
      description: 'The 2-month journey is specifically designed to turn English speaking into a permanent daily habit.',
      icon: CalendarCheck,
      badge: 'Lifetime Habit',
    },
    {
      number: '06',
      title: '32 COMPLETED MISSIONS',
      description: 'You finish with proven experience having successfully completed 32 structured speaking challenges.',
      icon: CheckSquare,
      badge: 'Proven Result',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-block">
            THE REAL RETURN ON INVESTMENT
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            &ldquo;SO... IS ₹300 THE ONLY THING I GET?&rdquo;
          </h2>

          <p className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-brand-400">
            NO.
          </p>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Here is what you actually gain by accepting and completing the challenge:
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {valueCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-4 hover:border-brand-500/40 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-lg">
                      CARD {card.number}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                      {card.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-white leading-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Banner */}
        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-brand-950 via-slate-900 to-emerald-950 border border-brand-500/30 p-6 sm:p-8 rounded-3xl text-center space-y-2 shadow-2xl">
          <p className="text-base sm:text-xl font-black text-white">
            <strong className="text-amber-300">₹300 IS YOUR COMPLETION REWARD.</strong>
          </p>
          <p className="text-sm sm:text-lg text-emerald-300 font-extrabold">
            SPEAKING PRACTICE + CONSISTENCY + HABIT ARE THE REAL RETURN.
          </p>
        </div>

      </div>
    </section>
  );
}
