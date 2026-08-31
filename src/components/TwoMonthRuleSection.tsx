'use client';

import React from 'react';
import { Calendar, Clock, Flame, ShieldAlert, ArrowRight } from 'lucide-react';

export default function TwoMonthRuleSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-black uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>THE 2-MONTH DEADLINE PURPOSE</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              &ldquo;WHY DO I HAVE TO COMPLETE IT WITHIN 2 MONTHS?&rdquo;
            </h2>

            <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-emerald-400">
              BECAUSE WE WANT PRACTICE TO BECOME A HABIT.
            </p>
          </div>

          {/* Detailed Rationale */}
          <div className="bg-[#111827] border border-slate-800 p-6 sm:p-10 rounded-3xl text-left space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-medium shadow-xl">
            <p>
              The 2-month rule is not there simply to make the refund difficult. <strong className="text-white font-bold underline decoration-amber-400">It exists because this challenge is designed around consistency.</strong>
            </p>
            <p>
              If someone takes six months or a year to complete 32 challenges, there can be long gaps between practice sessions. That is not the behaviour we are trying to build.
            </p>
            <p className="text-emerald-300 font-bold">
              Completing the challenge within 2 months encourages you to regularly find time for English, speak repeatedly, continue practising, and make English practice part of your daily routine.
            </p>
          </div>

          {/* Habit Pipeline Visual */}
          <div className="bg-[#1F2937]/50 border border-slate-800 p-6 rounded-2xl space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              THE CONSISTENCY FORMULA
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-black text-white">
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">PRACTICE</span>
              <span className="text-brand-400">→</span>
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">REPEAT</span>
              <span className="text-brand-400">→</span>
              <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">CONSISTENCY</span>
              <span className="text-amber-400">→</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-lg">HABIT</span>
              <span className="text-emerald-400">→</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-lg">SPEAKING FLUENCY</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-extrabold text-slate-400 italic">
            &ldquo;Not pressure for the sake of pressure. A deadline with a purpose.&rdquo;
          </p>

        </div>

      </div>
    </section>
  );
}
