'use client';

import React, { useState } from 'react';
import { PlusCircle, X, DollarSign, User, Mail, Phone, Calendar, FileText, Smartphone } from 'lucide-react';

interface AdminAddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitIncome: (income: {
    source: string;
    fullName: string;
    email: string;
    whatsappNumber: string;
    amount: number;
    notes: string;
    date: string;
  }) => Promise<boolean>;
}

const SOURCES = [
  'GPay / PhonePe',
  'Bank Transfer',
  'Offline Cash',
  'Sponsorship',
  'Other',
];

export default function AdminAddIncomeModal({
  isOpen,
  onClose,
  onSubmitIncome,
}: AdminAddIncomeModalProps) {
  const [source, setSource] = useState('GPay / PhonePe');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid income amount');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const success = await onSubmitIncome({
      source,
      fullName: fullName.trim() || 'Direct Student / Client',
      email: email.trim(),
      whatsappNumber: whatsappNumber.trim(),
      amount: numAmount,
      notes: notes.trim(),
      date,
    });

    setIsSubmitting(false);

    if (success) {
      setFullName('');
      setEmail('');
      setWhatsappNumber('');
      setAmount('');
      setNotes('');
      onClose();
    } else {
      setError('Failed to record income. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-400">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>DIRECT INCOME LOGGER</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Record Non-Razorpay Income</h2>
          <p className="text-xs text-slate-400">
            Log GPay, PhonePe, Bank Transfer, or Cash payments. Strictly saved to Google Sheets.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Payment Source */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-brand-400" />
              <span>Payment Source / Method</span>
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
            >
              {SOURCES.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Amount (₹ INR)</span>
            </label>
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 399"
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-bold"
              required
            />
          </div>

          {/* Student / Client Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Student / Client Name</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rahul Kumar"
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* WhatsApp & Email (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Phone</span>
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="919876543210"
                className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gmail.com"
                className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Date Received</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
              required
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Notes / Transaction Ref</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Received via GPay for Malayalam Speaking Challenge"
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-red-400 text-xs font-semibold">
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-emerald-950/40 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Saving to Google Sheet...' : 'Save Manual Income to Database'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
