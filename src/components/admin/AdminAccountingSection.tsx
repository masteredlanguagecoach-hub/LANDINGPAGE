'use client';

import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PlusCircle, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AdminAccountingSectionProps {
  totalRevenue: number;
  totalExpenses: number;
  netBalance: number;
  onOpenAddExpense: () => void;
}

export default function AdminAccountingSection({
  totalRevenue,
  totalExpenses,
  netBalance,
  onOpenAddExpense,
}: AdminAccountingSectionProps) {
  const isProfit = netBalance >= 0;
  const profitMargin = totalRevenue > 0 ? ((netBalance / totalRevenue) * 100).toFixed(1) : '0';

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <PieChart className="w-3.5 h-3.5" />
            <span>ACCOUNTING SESSION & BALANCE SHEET</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Financial Balance & Expense Tracker
          </h2>
        </div>

        {/* Add Expense Button */}
        <button
          onClick={onOpenAddExpense}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-red-950/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add New Expense</span>
        </button>
      </div>

      {/* 3 Accounting Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Net Balance Amount Card */}
        <div
          className={`rounded-3xl p-6 border-2 relative overflow-hidden transition-all shadow-xl ${
            isProfit
              ? 'bg-gradient-to-br from-emerald-950/40 via-[#111827] to-[#111827] border-emerald-500/40 shadow-emerald-950/20'
              : 'bg-gradient-to-br from-red-950/40 via-[#111827] to-[#111827] border-red-500/40 shadow-red-950/20'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Net Balance / Profit
            </span>
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isProfit
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl sm:text-4xl font-black tracking-tight ${
                  isProfit ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                ₹{netBalance.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <span className="text-slate-400">Profit Margin:</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                  isProfit
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}
              >
                {isProfit ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                <span>{profitMargin}%</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. Total Gross Revenue Card */}
        <div className="bg-[#1F2937]/60 border border-slate-700/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Gross Revenue
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-white block tracking-tight">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-blue-400 block">
              100% Verified Sales Inflow
            </span>
          </div>
        </div>

        {/* 3. Total Expenses Card */}
        <div className="bg-[#1F2937]/60 border border-slate-700/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Business Expenses
            </span>
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-red-400 block tracking-tight">
              ₹{totalExpenses.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-red-400 block">
              Recorded Costs & Ads Outflow
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
