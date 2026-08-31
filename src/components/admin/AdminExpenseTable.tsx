'use client';

import React from 'react';
import { ExpenseRow } from '@/types';
import { Tag, Receipt, Calendar, FileText } from 'lucide-react';

interface AdminExpenseTableProps {
  expenses: ExpenseRow[];
  isLoading: boolean;
}

export default function AdminExpenseTable({ expenses, isLoading }: AdminExpenseTableProps) {
  if (isLoading) {
    return (
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 font-semibold text-xs">Loading recorded expenses...</p>
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 text-center space-y-2">
        <Receipt className="w-8 h-8 text-slate-600 mx-auto" />
        <p className="text-slate-300 font-bold text-sm">No business expenses recorded yet</p>
        <p className="text-slate-500 text-xs">
          Click "+ Add New Expense" above to record marketing ads, software tools, or hosting costs.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl shadow-xl overflow-hidden space-y-4 p-6">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400">
        <Receipt className="w-4 h-4 text-red-400" />
        <span>EXPENSES HISTORY LOG</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#1F2937]/80 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Expense ID</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Description</th>
              <th className="px-6 py-3.5">Amount</th>
              <th className="px-6 py-3.5 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {expenses.map((expense, idx) => {
              const formattedDate = expense.date || expense.createdAt
                ? new Date(expense.date || expense.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';

              return (
                <tr key={expense.expenseId || idx} className="hover:bg-[#1F2937]/40 transition-colors">
                  {/* Expense ID */}
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-400 font-bold">
                    {expense.expenseId || `EXP_${idx + 1}`}
                  </td>

                  {/* Category Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-extrabold px-3 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      <span>{expense.category || 'Other'}</span>
                    </span>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4 max-w-md truncate text-xs text-slate-300">
                    {expense.description || '—'}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-red-400 text-base">
                    - ₹{(expense.amount || 0).toLocaleString('en-IN')}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs text-slate-400">
                    {formattedDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
