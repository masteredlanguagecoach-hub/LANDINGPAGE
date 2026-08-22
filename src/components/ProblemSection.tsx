'use client';

import React from 'react';
import { XCircle, AlertCircle, RefreshCw, VolumeX, ShieldAlert } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: VolumeX,
      title: 'Understanding Everything, But Freezing When Speaking',
      description: 'You can read, write, and listen to English easily, but when it is time to speak out loud, the words just don\'t come out.',
    },
    {
      icon: ShieldAlert,
      title: 'Constant Fear of Making Grammatical Mistakes',
      description: 'You worry that others will judge your accent or grammar errors, making you stay silent during conversations.',
    },
    {
      icon: RefreshCw,
      title: 'Translating in Your Head Before Speaking',
      description: 'You translate every sentence from Malayalam or Hindi into English before opening your mouth, creating painful delays.',
    },
    {
      icon: AlertCircle,
      title: 'No Dedicated Daily Speaking Partners',
      description: 'You know grammar rules from books, but you lack a structured daily environment to actually practice speaking.',
    },
    {
      icon: XCircle,
      title: 'Losing Confidence in Work & Social Calls',
      description: 'Missing career promotions or feeling left out in workplace meetings simply because you hesitate to speak up in English.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Sound Familiar?
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            You Don't Need More Grammar.{' '}
            <span className="text-brand-500">You Need More Speaking.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Most people spend years studying rules but never build the muscle memory required to speak fluently under pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-brand-200 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100/80 text-brand-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    {problem.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* High-Impact Solution Callout Box */}
          <div className="bg-gradient-to-br from-brand-500 to-red-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-100 bg-white/20 px-3 py-1 rounded-full">
                The Breakthrough
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-snug">
                Break the Silence Barrier in 30 Days
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                The Speaking Challenge is engineered around real-time daily speaking exercises. No boring grammar lectures—just pure speaking practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
