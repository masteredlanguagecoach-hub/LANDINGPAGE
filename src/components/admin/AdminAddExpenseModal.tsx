'use client';

import React, { useState } from 'react';
import { PlusCircle, X, DollarSign, Tag, FileText, Calendar, AlertCircle } from 'lucide-react';

interface AdminAddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitExpense: (expense: {
    category: string;
    description: string;
    amount: number;
    date: string;
  }) => Promise<boolean>;
}

const CATEGORIES = [
  'Meta Ads',
  'Google Ads',
  'Domain & Hosting',
  'Software & Tools',
  'Content & Design',
  'Operational',
  'Other',
];

export default function AdminAddExpenseModal({
  isOpen,
  onClose,
  onSubmitExpense,
}: AdminAddExpenseModalProps) {
  const [category, setCategory] = useState('Meta Ads');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid expense amount');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const success = await onSubmitExpense({
      category,
      description: description.trim(),
      amount: numAmount,
      date,
    });

    setIsSubmitting(false);

    if (success) {
      setDescription('');
      setAmount('');
      onClose();
    } else {
      setError('Failed to record expense. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-red-400">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>ACCOUNTING LOG</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Record Business Expense</h2>
          <p className="text-xs text-slate-400">
            Log marketing, software, hosting, or operational costs. Appends directly to Google Sheets.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-400" />
              <span>Expense Category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
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
              placeholder="e.g. 1500"
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-bold"
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Date</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Description / Note (Optional)</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Meta Ads campaign targeting Malayalam speakers in Kerala"
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-red-400 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-red-900/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Saving to Google Sheet...' : 'Save Expense to Database'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
