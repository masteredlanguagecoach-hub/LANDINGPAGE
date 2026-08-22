'use client';

import React from 'react';
import { MousePointerClick, ShieldCheck, CreditCard, MailCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: MousePointerClick,
      title: 'Choose Your Course',
      description: 'Select Malayalam → English or Hindi → English based on your native language.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Verify Your Details',
      description: 'Enter your full name, WhatsApp number, and verify your email address.',
    },
    {
      num: '03',
      icon: CreditCard,
      title: 'Complete Secure Payment',
      description: 'Pay safely using UPI, Cards, NetBanking, or Wallets via Razorpay Standard Checkout.',
    },
    {
      num: '04',
      icon: MailCheck,
      title: 'Check Email & Start',
      description: 'Receive instant web app access link on your registered email and begin speaking.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            How It <span className="text-brand-500">Works</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Get instant access to your speaking challenge in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-brand-500/30">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
