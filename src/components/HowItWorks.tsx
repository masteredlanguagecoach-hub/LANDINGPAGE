'use client';

import React from 'react';
import { UserCheck, PlayCircle, Mic, Trophy, Award, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 'STEP 01',
      title: 'JOIN',
      description: 'Pay ₹399 and get instant access to the challenge portal.',
      icon: UserCheck,
      color: 'border-brand-500/40 text-brand-400',
    },
    {
      number: 'STEP 02',
      title: 'LEARN',
      description: 'Use the explanation videos, detailed audios, quizzes, and practice activities inside the Web App tailored for Malayalam or Hindi speakers.',
      icon: PlayCircle,
      color: 'border-blue-500/40 text-blue-400',
    },
    {
      number: 'STEP 03',
      title: 'SPEAK',
      description: 'Practice English with the AI Coach in a low-pressure environment where you actually speak out loud.',
      icon: Mic,
      color: 'border-purple-500/40 text-purple-400',
    },
    {
      number: 'STEP 04',
      title: 'COMPLETE',
      description: 'Complete all 32 required Speaking Challenges within 2 months from your challenge start date.',
      icon: Trophy,
      color: 'border-amber-500/40 text-amber-400',
    },
    {
      number: 'STEP 05',
      title: 'GET ₹300 BACK',
      description: 'Satisfy the published challenge-completion and verification requirements to receive your ₹300 refund.',
      icon: Award,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/30 px-3.5 py-1.5 rounded-full inline-block">
            5-STEP SIMPLE JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            THE CHALLENGE IS SIMPLE.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A clear, structured path designed to transform you from a passive learner into an active English speaker.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className={`bg-[#111827] border-2 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 relative ${step.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest uppercase opacity-80">
                      {step.number}
                    </span>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-black text-white tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {step.description}
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
