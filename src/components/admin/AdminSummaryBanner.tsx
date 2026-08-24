'use client';

import React from 'react';
import { BarChart3, CheckCircle2, Clock, Users } from 'lucide-react';

interface AdminSummaryBannerProps {
  dateRangeLabel: string;
  filteredRevenue: number;
  filteredCount: number;
  pendingOrdersCount: number;
}

export default function AdminSummaryBanner({
  dateRangeLabel,
  filteredRevenue,
  filteredCount,
  pendingOrdersCount,
}: AdminSummaryBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#111827] via-[#0F172A] to-[#1E1B4B] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left Big Highlight */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-400">
            <BarChart3 className="w-4 h-4 text-brand-400" />
            <span>SALES REPORT SUMMARY • {dateRangeLabel.toUpperCase()}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              ₹{filteredRevenue.toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-400">
            Total Amount Collected from{' '}
            <strong className="text-white font-bold">{filteredCount} Paid Students</strong> for this filter.
          </p>
        </div>

        {/* Right 3 Summary Counter Pills matching screenshot */}
        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
          {/* Enrolled Students Counter */}
          <div className="bg-[#1F2937]/70 border border-slate-700/60 rounded-2xl p-4 text-center space-y-1 shadow-sm">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
              STUDENTS COUNT
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white block">
              {filteredCount}
            </span>
            <span className="text-[11px] font-semibold text-emerald-400 block flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 inline" /> Enrolled
            </span>
          </div>

          {/* Amount Collected Counter */}
          <div className="bg-[#1F2937]/70 border border-slate-700/60 rounded-2xl p-4 text-center space-y-1 shadow-sm">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
              AMOUNT COLLECTED
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">
              ₹{filteredRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-semibold text-emerald-400 block">
              Razorpay Verified
            </span>
          </div>

          {/* Pending Orders Counter */}
          <div className="bg-[#1F2937]/70 border border-slate-700/60 rounded-2xl p-4 text-center space-y-1 shadow-sm">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
              PENDING ORDERS
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 block">
              {pendingOrdersCount}
            </span>
            <span className="text-[11px] font-semibold text-amber-400 block">
              Awaiting
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
