'use client';

import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminPinModalProps {
  onVerify: (pin: string) => Promise<boolean>;
}

export default function AdminPinModal({ onVerify }: AdminPinModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Please enter Admin PIN');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const isValid = await onVerify(pin.trim());
    if (!isValid) {
      setError('Invalid Admin PIN. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-slate-100">
        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center text-brand-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">Admin Authentication</h2>
          <p className="text-sm font-medium text-slate-400">
            Enter your Admin PIN to access live sales reports & Google Sheet database.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-brand-400" />
              <span>Admin PIN</span>
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter Admin PIN"
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3.5 text-center text-2xl font-mono tracking-widest text-white placeholder:text-slate-500 placeholder:text-base placeholder:font-sans focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-red-400 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-base py-4 rounded-xl shadow-lg shadow-brand-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Access Admin Dashboard'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-800/60">
          <span className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Live Google Sheet Connection</span>
          </span>
        </div>
      </div>
    </div>
  );
}
