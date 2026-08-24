'use client';

import React from 'react';
import { DollarSign, Users, TrendingUp, Clock } from 'lucide-react';

interface AdminKpiGridProps {
  totalRevenue: number;
  totalPaidStudentsCount: number;
  todaySalesCount: number;
  todaySalesAmount: number;
  pendingOrdersCount: number;
}

export default function AdminKpiGrid({
  totalRevenue,
  totalPaidStudentsCount,
  todaySalesCount,
  todaySalesAmount,
  pendingOrdersCount,
}: AdminKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* 1. All Time Revenue Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            All Time Revenue
          </span>
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-black text-white block tracking-tight">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-xs font-semibold text-emerald-400 block">
            Total Lifetime Collected
          </span>
        </div>
      </div>

      {/* 2. All Time Paid Students Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            All Time Paid Students
          </span>
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-black text-white block tracking-tight">
            {totalPaidStudentsCount}
          </span>
          <span className="text-xs font-semibold text-blue-400 block">
            Confirmed Lifetime Enrolled
          </span>
        </div>
      </div>

      {/* 3. Today's Sales Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Today's Sales
          </span>
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-black text-white block tracking-tight">
            {todaySalesCount} <span className="text-lg font-medium text-slate-400">Students</span>
          </span>
          <span className="text-xs font-semibold text-brand-400 block">
            ₹{todaySalesAmount.toLocaleString('en-IN')} Collected Today
          </span>
        </div>
      </div>

      {/* 4. Pending Orders Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Pending Orders
          </span>
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-black text-white block tracking-tight">
            {pendingOrdersCount}
          </span>
          <span className="text-xs font-semibold text-amber-400 block">
            Awaiting Payment
          </span>
        </div>
      </div>
    </div>
  );
}
