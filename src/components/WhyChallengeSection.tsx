'use client';

import React from 'react';
import { RefreshCw, Zap, Volume2, Repeat, CheckCircle } from 'lucide-react';

export default function WhyChallengeSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/30 px-4 py-2 rounded-full inline-block">
            THE PSYCHOLOGY BEHIND MASTERED
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            WE DON&apos;T WANT YOU TO JUST BUY ENGLISH.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-red-500">
              WE WANT YOU TO PRACTICE IT.
            </span>
          </h2>

          {/* Core Philosophy Copy */}
          <div className="bg-[#111827] border border-slate-800 p-6 sm:p-10 rounded-3xl text-left space-y-5 shadow-xl">
            <p className="text-lg sm:text-xl font-black text-white leading-snug">
              Knowing English and speaking English are not the same thing.
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Speaking improves when you actually speak. <strong className="text-brand-300 underline decoration-brand-500 underline-offset-4">Again. And again. And again.</strong>
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              The Mastered challenge gives you a structure that encourages you to stop being only a passive video consumer and become an active, confident English speaker.
            </p>
          </div>

          {/* Visual Cycle Flow */}
          <div className="space-y-4 pt-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              THE HABIT FORMATION CYCLE
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center font-black text-xs sm:text-sm">
              <div className="bg-[#1F2937] border border-slate-800 p-4 rounded-2xl text-slate-300">
                <span className="block text-brand-400 mb-1 font-bold">01</span>
                <span>LEARN</span>
              </div>
              <div className="bg-[#1F2937] border border-slate-800 p-4 rounded-2xl text-slate-300">
                <span className="block text-brand-400 mb-1 font-bold">02</span>
                <span>SPEAK</span>
              </div>
              <div className="bg-[#1F2937] border border-brand-500/40 p-4 rounded-2xl text-white ring-2 ring-brand-500/20">
                <span className="block text-brand-400 mb-1 font-bold">03</span>
                <span>PRACTICE</span>
              </div>
              <div className="bg-[#1F2937] border border-slate-800 p-4 rounded-2xl text-slate-300">
                <span className="block text-amber-400 mb-1 font-bold">04</span>
                <span>REPEAT</span>
              </div>
              <div className="bg-[#1F2937] border border-slate-800 p-4 rounded-2xl text-slate-300">
                <span className="block text-amber-400 mb-1 font-bold">05</span>
                <span>CONSISTENCY</span>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/40 p-4 rounded-2xl text-emerald-400 col-span-2 sm:col-span-1">
                <span className="block text-emerald-300 mb-1 font-bold">06</span>
                <span>SPEAKING HABIT</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
