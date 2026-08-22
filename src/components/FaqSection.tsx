'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I access the practice web app after payment?',
      a: 'Immediately after your payment is securely verified, your practice web app link is emailed to your registered email address. You can click the link and start practicing instantly on any phone, tablet, or computer.',
    },
    {
      q: 'Is this course suitable if I speak Malayalam or Hindi at home?',
      a: 'Yes! We offer dedicated tracks for Malayalam → English and Hindi → English. Each track is customized to address regional accent hesitations and common translation mistakes.',
    },
    {
      q: 'How much time do I need to spend every day?',
      a: 'Just 15 to 20 minutes of active speaking practice per day. The challenge is designed to fit easily into busy work and study routines.',
    },
    {
      q: 'What if I don\'t receive the access email after paying?',
      a: 'Check your Spam or Promotions folder first. You can also click the "Resend Email" button on the payment success screen, or contact our support team anytime.',
    },
    {
      q: 'Is my payment secure?',
      a: '100% secure. Payments are processed through Razorpay Standard Checkout supporting UPI, Credit/Debit Cards, NetBanking, and Digital Wallets with bank-level encryption.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Frequently Asked <span className="text-brand-500">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Everything you need to know about the Mastered Language Coach Speaking Challenge.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left font-extrabold text-base sm:text-lg text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    {faq.a}
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
