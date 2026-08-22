'use client';

import React from 'react';
import { Mic, Zap, Target, Award, BrainCircuit, Users } from 'lucide-react';

export default function SolutionSection() {
  const features = [
    {
      icon: Mic,
      title: 'Daily Speaking Prompts',
      description: 'Engage with practical daily voice exercises designed for real-world workplace and casual conversations.',
    },
    {
      icon: BrainCircuit,
      title: 'Stop Head-Translation',
      description: 'Train your brain to think directly in English so your speech flows naturally without unnatural pauses.',
    },
    {
      icon: Zap,
      title: 'Instant Practice Web App',
      description: 'Access your practice web app anywhere, on any phone or laptop, immediately after instant verification.',
    },
    {
      icon: Target,
      title: 'Native Language Bridge',
      description: 'Specifically crafted for Malayalam & Hindi speakers to overcome region-specific pronunciation and phrasing habits.',
    },
    {
      icon: Users,
      title: 'Real Communication Focus',
      description: 'Forget passive video lectures. Every exercise requires active vocal response to build real confidence.',
    },
    {
      icon: Award,
      title: 'Guaranteed Confidence Boost',
      description: 'Notice a dramatic improvement in your speaking fluency, clarity, and posture within 30 challenge days.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full">
            The Mastered Method
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            A Challenge Built for <span className="text-brand-500">Speaking</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            We replaced old textbook memorization with active speaking repetition. Practice real English for real life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700/80 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
