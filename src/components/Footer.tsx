'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 sm:py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-900">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Mastered Language Coach"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-lg font-black text-white block">
                Mastered Language Coach
              </span>
              <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">
                Speak With Confidence
              </span>
            </div>
          </div>

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert('Privacy Policy placeholder: Mastered Language Coach respects your data privacy.');
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                alert('Terms & Conditions placeholder: Mastered Language Coach Speaking Challenge.');
              }}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="#refund"
              onClick={(e) => {
                e.preventDefault();
                alert('Refund Policy placeholder: 100% transparent enrollment terms.');
              }}
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                alert('Contact Support: support@masteredlanguagecoach.com');
              }}
              className="hover:text-white transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 text-center text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Mastered Language Coach. All rights reserved.</p>
          <p className="mt-1 text-slate-600">
            Powered by Vercel & Razorpay Standard Checkout Integration.
          </p>
        </div>
      </div>
    </footer>
  );
}
