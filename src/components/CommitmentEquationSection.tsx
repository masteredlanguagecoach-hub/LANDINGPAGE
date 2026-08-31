'use client';

import React from 'react';
import { Lock, Clock, Target, Repeat, Award, CheckCircle } from 'lucide-react';

export default function CommitmentEquationSection() {
  const equations = [
    { label: '₹399 ENTRY FEE', result: 'COMMITMENT', icon: Lock, color: 'text-brand-400 border-brand-500/40 bg-brand-500/10' },
    { label: '2-MONTH DEADLINE', result: 'CONSISTENCY', icon: Clock, color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
    { label: '32 SPEAKING MISSIONS', result: 'ACTION', icon: Target, color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
    { label: 'REGULAR PRACTICE', result: 'DAILY HABIT', icon: Repeat, color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
    { label: 'SUCCESSFUL COMPLETION', result: '₹300 BACK', icon: Award, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10 ring-2 ring-emerald-500/20' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/30 px-4 py-1.5 rounded-full inline-block">
            BEHAVIOURAL DESIGN
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            WHY DO YOU PAY ₹399?
          </h2>

          {/* Core Behavioral Rationale */}
          <div className="bg-[#111827] border border-slate-800 p-6 sm:p-10 rounded-3xl text-left space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-medium shadow-xl">
            <p className="text-white font-black text-lg sm:text-xl">
              Because commitment changes behaviour.
            </p>
            <p>
              When something has no commitment attached to it, it is easy to say: <strong className="text-amber-300 font-bold">&ldquo;I&apos;ll do it tomorrow.&rdquo;</strong>
            </p>
            <p>
              The <strong className="text-white font-bold">₹399 entry</strong> creates a reason to take the challenge seriously. The <strong className="text-white font-bold">2-month deadline</strong> creates urgency and consistency. The <strong className="text-white font-bold">32 speaking challenges</strong> create action. The <strong className="text-emerald-400 font-bold">₹300 completion reward</strong> creates an additional reason to finish.
            </p>
          </div>

          {/* Visual Commitment Equation List */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              THE COMMITMENT EQUATION
            </span>

            <div className="space-y-3">
              {equations.map((eq, idx) => {
                const IconComp = eq.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl border ${eq.color} gap-3 font-black text-sm sm:text-base shadow-md`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="w-5 h-5 flex-shrink-0" />
                      <span className="text-slate-200">{eq.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">= CREATES</span>
                      <span className="text-base sm:text-lg tracking-tight underline underline-offset-4 font-black">{eq.result}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
