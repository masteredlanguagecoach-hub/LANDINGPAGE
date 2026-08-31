'use client';

import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, FileText, CheckCircle } from 'lucide-react';

export default function ChallengeRulesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const rules = [
    {
      title: 'Entry Fee & Commitment Deposit',
      content: 'The official challenge entry fee is ₹399 INR. This entry fee creates the initial commitment mechanism to encourage active participant completion.',
    },
    {
      title: 'Challenge Mission Requirements',
      content: 'Participants must complete all 32 structured Speaking Challenges inside the Mastered Web App portal.',
    },
    {
      title: '2-Month Completion Deadline',
      content: 'All 32 challenges must be completed within 2 months (60 calendar days) from the participant\'s official challenge enrollment date.',
    },
    {
      title: '₹300 Completion Refund Terms',
      content: 'Upon successful completion of all 32 challenges within the 2-month period and official system verification, the participant is eligible to receive a ₹300 INR refund via their original payment method.',
    },
    {
      title: 'Effective Cost Transparency',
      content: 'The effective retained cost of ₹99 applies only after an eligible ₹300 completion refund. Payment of ₹399 is required at signup. Joining alone without completing the 32 challenges does not qualify for the refund.',
    },
    {
      title: 'No Guaranteed Fluency Disclaimer',
      content: 'The Mastered Challenge provides structured speaking exercises and AI Coach practice designed to build consistency and speaking confidence. Fluency outcomes depend on participant effort and regular practice.',
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="rules" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-slate-300 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>TRANSPARENCY & ACCORDION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            CHALLENGE & REFUND RULES
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Clear, 100% transparent guidelines governing the 32 Speaking Challenges and ₹300 completion refund.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {rules.map((rule, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-extrabold text-white text-sm sm:text-base hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{rule.title}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 font-medium">
                    {rule.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
